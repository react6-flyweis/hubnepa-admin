import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export type AdminUserModuleId =
  | "dashboard"
  | "userManagement"
  | "partnerManagement"
  | "restaurantPanel"
  | "retailerPanel"

export type AdminUserModulePermission = "view" | "create" | "edit" | "delete"

export type AdminUserModuleAccess = Record<
  AdminUserModuleId,
  Record<AdminUserModulePermission, boolean>
>

export type NewAdminUser = {
  fullName: string
  email: string
  password: string
  role: string
  moduleAccess: AdminUserModuleAccess
}

const moduleOptions: Array<{ id: AdminUserModuleId; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "userManagement", label: "User Management" },
  { id: "partnerManagement", label: "Partner Management" },
  { id: "restaurantPanel", label: "Restaurant Panel" },
  { id: "retailerPanel", label: "Retailer Panel" },
]

const permissionOptions: Array<{
  id: AdminUserModulePermission
  label: string
}> = [
  { id: "view", label: "View" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
]

const addAdminUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Role is required"),
  moduleAccess: z.record(
    z.string(),
    z.object({
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      delete: z.boolean(),
    })
  ),
})

type AddAdminUserValues = z.infer<typeof addAdminUserSchema>

const defaultModuleAccess: AdminUserModuleAccess = Object.fromEntries(
  moduleOptions.map((module) => [
    module.id,
    {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  ])
) as AdminUserModuleAccess

interface AddAdminUserDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: (values: AddAdminUserValues) => void
}

export function AddAdminUserDialog({
  open,
  onClose,
  onSubmit,
}: AddAdminUserDialogProps) {
  const form = useForm<AddAdminUserValues>({
    resolver: zodResolver(addAdminUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
      moduleAccess: defaultModuleAccess,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        fullName: "",
        email: "",
        password: "",
        role: "",
        moduleAccess: defaultModuleAccess,
      })
    }
  }, [open, form])

  const roleOptions = useMemo(
    () => ["Admin", "Manager", "Editor", "Viewer"],
    []
  )

  function handleSubmit(values: AddAdminUserValues) {
    if (onSubmit) {
      onSubmit(values)
    }
    onClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-h-[90vh] w-full overflow-x-hidden overflow-y-auto p-0 sm:max-w-xl">
        <DialogHeader className="gap-0 border-b p-3">
          <DialogTitle className="text-lg font-medium text-slate-900">
            Add Admin User
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Create a new admin account and define the modules they can access.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 p-3"
          //   noValidate
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                id="fullName"
                placeholder="Enter full name"
                className="mt-1"
                {...form.register("fullName")}
              />
              <FieldError errors={[form.formState.errors.fullName]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="mt-1"
                {...form.register("email")}
              />
              <FieldError errors={[form.formState.errors.email]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                className="mt-1"
                {...form.register("password")}
              />
              <FieldError errors={[form.formState.errors.password]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <select
                id="role"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                {...form.register("role")}
              >
                <option value="" disabled>
                  Select role
                </option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <FieldError errors={[form.formState.errors.role]} />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Module Access</h3>
              </div>
            </div>

            <div className="mt-2 space-y-2">
              {moduleOptions.map((module) => (
                <div
                  key={module.id}
                  className="grid grid-cols-6 items-center gap-4 rounded-md border px-4 py-3"
                >
                  <div className="col-span-2 font-medium text-slate-700">
                    {module.label}
                  </div>

                  {permissionOptions.map((permission) => {
                    const fieldName =
                      `moduleAccess.${module.id}.${permission.id}` as const
                    return (
                      <div
                        key={permission.id}
                        className="flex items-center justify-center gap-2"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                          {...form.register(fieldName)}
                        />
                        <span className="text-muted-foreground">
                          {permission.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 bg-transparent">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Admin</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
