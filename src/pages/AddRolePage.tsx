import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CircleAlert, Save, Shield } from "lucide-react"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const permissionModules = [
  {
    id: "dashboard",
    title: "Dashboard & Analytics",
    permissions: [
      "View Analytics Overview",
      "Export System Reports",
      "View System Logs",
    ],
  },
  {
    id: "users",
    title: "User Management",
    permissions: [
      "View User List",
      "Edit User Details",
      "Block/Unblock Users",
      "Manage User Permissions",
    ],
  },
  {
    id: "partners",
    title: "Partner Management",
    permissions: [
      "View Partner List",
      "Approve/Reject Applications",
      "Verify Documents",
      "Manage Commissions",
    ],
  },
  {
    id: "finance",
    title: "Finance & Settlements",
    permissions: [
      "View Financial Reports",
      "Process Payouts",
      "Manage Refunds",
    ],
  },
  {
    id: "products",
    title: "Product & Menu",
    permissions: [
      "View Products",
      "Add/Edit Products",
      "Approve Seller Listings",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    permissions: ["View Campaigns", "Create/Edit Campaigns", "Manage Coupons"],
  },
  {
    id: "settings",
    title: "System Settings",
    permissions: [
      "Manage General Settings",
      "Manage Roles & Access",
      "View System Health",
    ],
  },
] as const

type PermissionModule = (typeof permissionModules)[number]
type PermissionModuleId = PermissionModule["id"]
type PermissionMap = Record<PermissionModuleId, Array<string>>

const permissionStateColorMap = {
  selected: "border-slate-300 bg-slate-100 text-slate-800",
  idle: "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
} as const

const warningStateColorMap = {
  border: "border-amber-300",
  bg: "bg-amber-50",
  text: "text-amber-700",
  icon: "text-amber-500",
} as const

const emptyPermissions = permissionModules.reduce((accumulator, module) => {
  accumulator[module.id] = []
  return accumulator
}, {} as PermissionMap)

const roleEditPresetMap: Record<
  string,
  {
    roleName: string
    description: string
    enabledModules: Array<PermissionModuleId>
  }
> = {
  "super-admin": {
    roleName: "Super Admin",
    description: "Full system access with no restrictions.",
    enabledModules: permissionModules.map((module) => module.id),
  },
  "support-agent": {
    roleName: "Support Agent",
    description: "Handle customer inquiries and view order details.",
    enabledModules: ["dashboard", "users", "partners"],
  },
  "content-manager": {
    roleName: "Content Manager",
    description: "Create and edit products, menus, and marketing campaigns.",
    enabledModules: ["products", "marketing", "dashboard"],
  },
  "finance-lead": {
    roleName: "Finance Lead",
    description: "Manage settlements, payouts, and financial reporting.",
    enabledModules: ["finance", "dashboard"],
  },
}

interface RoleLocationState {
  roleName?: string
  description?: string
  permissions?: Record<string, Array<string>>
}

const addRoleSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  permissions: z.record(z.string(), z.array(z.string())),
})

type AddRoleFormValues = z.infer<typeof addRoleSchema>

const defaultValues: AddRoleFormValues = {
  roleName: "",
  description: "",
  permissions: emptyPermissions,
}

function buildPermissionMap(enabledModules: Array<PermissionModuleId>) {
  return permissionModules.reduce((accumulator, module) => {
    accumulator[module.id] = enabledModules.includes(module.id)
      ? [...module.permissions]
      : []
    return accumulator
  }, {} as PermissionMap)
}

function normalizePermissionMap(
  permissions?: Record<string, Array<string>>
): PermissionMap {
  return permissionModules.reduce((accumulator, module) => {
    accumulator[module.id] = permissions?.[module.id] ?? []
    return accumulator
  }, {} as PermissionMap)
}

function getEditModeValues(
  roleId: string,
  state: RoleLocationState | null
): AddRoleFormValues {
  const preset = roleEditPresetMap[roleId]

  return {
    roleName: state?.roleName ?? preset?.roleName ?? "",
    description: state?.description ?? preset?.description ?? "",
    permissions:
      state?.permissions != null
        ? normalizePermissionMap(state.permissions)
        : buildPermissionMap(preset?.enabledModules ?? []),
  }
}

interface PermissionModuleSectionProps {
  module: PermissionModule
  selectedPermissions: Record<PermissionModuleId, Array<string>>
  onTogglePermission: (moduleId: PermissionModuleId, permission: string) => void
  onToggleModule: (moduleId: PermissionModuleId) => void
}

function PermissionModuleSection({
  module,
  selectedPermissions,
  onTogglePermission,
  onToggleModule,
}: PermissionModuleSectionProps) {
  const activePermissions = selectedPermissions[module.id] ?? []
  const isModuleEnabled = activePermissions.length === module.permissions.length

  return (
    <section className="space-y-3 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shield className="size-3.5 text-slate-400" />
          <h3 className="font-display text-lg leading-none text-slate-900">
            {module.title}
          </h3>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-1 text-sm font-medium text-slate-500 hover:text-slate-800"
          onClick={() => onToggleModule(module.id)}
        >
          {isModuleEnabled ? "Disable All" : "Enable All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {module.permissions.map((permission) => {
          const isSelected = activePermissions.includes(permission)

          return (
            <Button
              key={permission}
              type="button"
              variant="outline"
              size="default"
              className={cn(
                "h-10 justify-start px-3 text-sm font-medium shadow-none",
                isSelected
                  ? permissionStateColorMap.selected
                  : permissionStateColorMap.idle
              )}
              onClick={() => onTogglePermission(module.id, permission)}
            >
              {permission}
            </Button>
          )
        })}
      </div>
    </section>
  )
}

export default function AddRolePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roleId } = useParams<{ roleId: string }>()
  const isEditMode = Boolean(roleId)
  const roleState = (location.state as RoleLocationState | null) ?? null

  const form = useForm<AddRoleFormValues>({
    resolver: zodResolver(addRoleSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!isEditMode || !roleId) {
      form.reset(defaultValues)
      return
    }

    form.reset(getEditModeValues(roleId, roleState))
  }, [form, isEditMode, location.key, roleId, roleState])

  const selectedPermissions = useWatch({
    control: form.control,
    name: "permissions",
    defaultValue: emptyPermissions,
  }) as PermissionMap

  const hasEveryPermissionSelected = permissionModules.every((module) => {
    const activePermissions = selectedPermissions[module.id] ?? []
    return activePermissions.length === module.permissions.length
  })

  const pageTitle = isEditMode ? "Edit Role" : "Add New Role"
  const pageDescription = isEditMode
    ? "Define permissions and access levels for this role."
    : "Define permissions and access levels for this role."

  function handleBack() {
    navigate("/access-control")
  }

  function updatePermissions(
    nextPermissions: Record<PermissionModuleId, Array<string>>
  ) {
    form.setValue("permissions", nextPermissions, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  function handleTogglePermission(
    moduleId: PermissionModuleId,
    permission: string
  ) {
    const modulePermissions = selectedPermissions[moduleId] ?? []
    const hasPermission = modulePermissions.includes(permission)

    const nextModulePermissions = hasPermission
      ? modulePermissions.filter((item) => item !== permission)
      : [...modulePermissions, permission]

    updatePermissions({
      ...selectedPermissions,
      [moduleId]: nextModulePermissions,
    })
  }

  function handleToggleModule(moduleId: PermissionModuleId) {
    const module = permissionModules.find((item) => item.id === moduleId)
    if (!module) {
      return
    }

    const modulePermissions = selectedPermissions[moduleId] ?? []
    const isModuleEnabled =
      modulePermissions.length === module.permissions.length

    updatePermissions({
      ...selectedPermissions,
      [moduleId]: isModuleEnabled ? [] : [...module.permissions],
    })
  }

  function handleToggleAllModules() {
    const nextPermissions = permissionModules.reduce((accumulator, module) => {
      accumulator[module.id] = hasEveryPermissionSelected
        ? []
        : [...module.permissions]
      return accumulator
    }, {} as PermissionMap)

    updatePermissions(nextPermissions)
  }

  function onSubmit(values: AddRoleFormValues) {
    void values

    if (isEditMode) {
      navigate("/access-control")
      return
    }

    form.reset(defaultValues)
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-2.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="mt-0.5 size-8 rounded-full text-slate-600"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div>
            <h1 className="font-display text-2xl leading-tight text-[#0F172B]">
              {pageTitle}
            </h1>
            <p className="text-slate-500">{pageDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            className="h-9 px-5 text-sm text-slate-700"
            onClick={handleBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-role-form"
            className="h-9 gap-1.5 px-5 text-sm"
          >
            <Save className="size-3.5" />
            Save Role
          </Button>
        </div>
      </div>

      <form
        id="add-role-form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Card className="h-fit rounded-xl border-slate-200 p-4 lg:col-span-4 xl:col-span-3">
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-xl leading-tight text-[#0F172B]">
                  Role Information
                </h2>
                <p className="text-base text-slate-500">
                  Basic details for this role
                </p>
              </div>

              <Field>
                <FieldLabel
                  htmlFor="roleName"
                  className="text-sm text-slate-700"
                >
                  Role Name
                </FieldLabel>
                <Input
                  id="roleName"
                  placeholder="e.g. Finance Manager"
                  className="h-10 border-slate-200 text-sm"
                  aria-invalid={Boolean(form.formState.errors.roleName)}
                  {...form.register("roleName")}
                />
                <FieldError
                  errors={
                    form.formState.errors.roleName
                      ? [{ message: form.formState.errors.roleName.message }]
                      : undefined
                  }
                  className="text-xs"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-sm text-slate-700"
                >
                  Description
                </FieldLabel>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Describe what users with this role can do..."
                  className="min-h-24 border-slate-200 text-sm"
                  aria-invalid={Boolean(form.formState.errors.description)}
                  {...form.register("description")}
                />
                <FieldError
                  errors={
                    form.formState.errors.description
                      ? [{ message: form.formState.errors.description.message }]
                      : undefined
                  }
                  className="text-xs"
                />
              </Field>

              <div
                className={cn(
                  "rounded-lg border p-3.5",
                  warningStateColorMap.border,
                  warningStateColorMap.bg
                )}
              >
                <div className="flex gap-2.5">
                  <CircleAlert
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      warningStateColorMap.icon
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm leading-5",
                      warningStateColorMap.text
                    )}
                  >
                    Giving high-level permissions like "Access Control" or
                    "Finance" should be restricted to trusted personnel.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-slate-200 p-4 lg:col-span-8 xl:col-span-9">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl leading-tight text-[#0F172B]">
                  Permissions Configuration
                </h2>
                <p className="text-base text-slate-500">
                  Select access rights for each module
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-1 h-7 px-1 text-sm font-semibold text-slate-700"
                onClick={handleToggleAllModules}
              >
                {hasEveryPermissionSelected ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="divide-y divide-slate-200">
              {permissionModules.map((module) => (
                <PermissionModuleSection
                  key={module.id}
                  module={module}
                  selectedPermissions={selectedPermissions}
                  onTogglePermission={handleTogglePermission}
                  onToggleModule={handleToggleModule}
                />
              ))}
            </div>
          </Card>
        </div>
      </form>
    </div>
  )
}
