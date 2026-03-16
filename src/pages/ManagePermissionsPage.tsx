import { useMemo, useState } from "react"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"

import { users } from "@/data/users"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface PermissionFeature {
  id: "place-orders" | "review-products" | "beta-features"
  title: string
  description: string
}

const permissionFeatures: PermissionFeature[] = [
  {
    id: "place-orders",
    title: "Can Place Orders",
    description: "Allow user to purchase items",
  },
  {
    id: "review-products",
    title: "Can Review Products",
    description: "Allow user to leave ratings/comments",
  },
  {
    id: "beta-features",
    title: "Beta Features",
    description: "Access to experimental features",
  },
]

const roleOptions = [
  { value: "customer", label: "Customer (Standard)" },
  { value: "administrator", label: "Administrator" },
  { value: "vendor", label: "Vendor" },
  { value: "restaurant-manager", label: "Restaurant Manager" },
]

const defaultFeatureAccess: Record<PermissionFeature["id"], boolean> = {
  "place-orders": true,
  "review-products": true,
  "beta-features": false,
}

export default function ManagePermissionsPage() {
  const { userId } = useParams<{ userId: string }>()

  const currentUser = useMemo(
    () => users.find((user) => user.id === userId) ?? users[0],
    [userId]
  )

  const [selectedRole, setSelectedRole] = useState("customer")
  const [featureAccess, setFeatureAccess] =
    useState<Record<PermissionFeature["id"], boolean>>(defaultFeatureAccess)

  function toggleFeature(id: PermissionFeature["id"]) {
    setFeatureAccess((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild className="mt-1 h-8 w-8">
          <Link to="/users" aria-label="Back to user management">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-semibold">
            Manage Permissions
          </h1>
          <p className="text-lg text-slate-500">
            Security settings for {currentUser.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <Card className="rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold">
              Role Assignment
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Determine what this user can access within the platform.
            </p>

            <div className="mt-6 space-y-2">
              <label
                htmlFor="user-role"
                className="text-base font-medium text-slate-900"
              >
                Current Role
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="user-role" className="h-11 w-full text-base">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((roleOption) => (
                    <SelectItem key={roleOption.value} value={roleOption.value}>
                      {roleOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500">
                * Changing this to "Administrator" grants full access to the
                system.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold">
              Feature Access
            </h2>
            <p className="mt-1 text-base text-slate-500">
              Granular permission controls.
            </p>

            <div className="mt-6 space-y-7">
              {permissionFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-lg font-medium text-slate-900">
                      {feature.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                  <Switch
                    checked={featureAccess[feature.id]}
                    onCheckedChange={() => toggleFeature(feature.id)}
                    aria-label={`Toggle ${feature.title}`}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="rounded-2xl border-rose-200 bg-rose-50 p-6">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="font-display text-2xl font-semibold">Danger Zone</h2>
          </div>

          <div className="mt-6 space-y-8">
            <div>
              <p className="text-xl font-medium text-rose-800">Block User</p>
              <p className="text-sm text-rose-700">
                Prevent this user from logging in.
              </p>
              <Button className="mt-2 h-11 w-full bg-rose-500 text-sm text-white hover:bg-rose-500/90">
                Block Access
              </Button>
            </div>

            <div className="h-px bg-rose-200" />

            <div>
              <p className="text-xl font-medium text-rose-800">
                Delete Account
              </p>
              <p className="text-sm text-rose-700">
                Permanently remove all user data.
              </p>
              <Button
                variant="outline"
                className="mt-2 h-11 w-full border-rose-300 bg-transparent text-sm text-rose-700 hover:bg-rose-100 hover:text-rose-800"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
