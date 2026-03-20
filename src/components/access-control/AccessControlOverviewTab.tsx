import {
  MoreVertical,
  PencilLine,
  Plus,
  Shield,
  ShieldAlert,
  Users,
} from "lucide-react"
import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type StatTone = "blue" | "green" | "amber"
type RoleType = "system" | "custom"
type RoleTone = "neutral" | "green"

interface StatCardData {
  id: string
  label: string
  value: string
  tone: StatTone
}

interface RoleCardData {
  id: string
  title: string
  activeUsers: number
  description: string
  includes: string
  roleType: RoleType
  tone: RoleTone
}

const statCards: StatCardData[] = [
  { id: "roles", label: "Total Roles", value: "4", tone: "blue" },
  { id: "admins", label: "Active Admins", value: "24", tone: "green" },
  { id: "security", label: "Security Score", value: "98%", tone: "amber" },
]

const roleCards: RoleCardData[] = [
  {
    id: "super-admin",
    title: "Super Admin",
    activeUsers: 2,
    description: "Full system access with no restrictions.",
    includes: "All Access",
    roleType: "system",
    tone: "neutral",
  },
  {
    id: "support-agent",
    title: "Support Agent",
    activeUsers: 15,
    description: "Handle customer inquiries and view order details.",
    includes: "Read Orders, Manage Tickets",
    roleType: "custom",
    tone: "green",
  },
  {
    id: "content-manager",
    title: "Content Manager",
    activeUsers: 4,
    description: "Create and edit products, menus, and marketing campaigns.",
    includes: "Manage Products, Marketing",
    roleType: "custom",
    tone: "green",
  },
  {
    id: "finance-lead",
    title: "Finance Lead",
    activeUsers: 3,
    description: "Manage settlements, payouts, and financial reporting.",
    includes: "View Finance, Approve Payouts",
    roleType: "custom",
    tone: "green",
  },
]

const statToneMap: Record<
  StatTone,
  { iconContainer: string; iconColor: string; icon: typeof Shield }
> = {
  blue: {
    iconContainer: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: Shield,
  },
  green: {
    iconContainer: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: Users,
  },
  amber: {
    iconContainer: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: ShieldAlert,
  },
}

const roleTypeLabelMap: Record<RoleType, string> = {
  system: "System Default",
  custom: "Custom Role",
}

const roleTypeColorMap: Record<RoleType, string> = {
  system: "border-transparent bg-slate-100 text-slate-500",
  custom: "border-blue-200 bg-blue-50 text-blue-600",
}

const roleToneMap: Record<RoleTone, string> = {
  neutral: "bg-slate-100 text-slate-500",
  green: "bg-emerald-50 text-emerald-600",
}

function StatCard({ item }: { item: StatCardData }) {
  const tone = statToneMap[item.tone]
  const Icon = tone.icon

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-none">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            tone.iconContainer
          )}
        >
          <Icon className={cn("h-5 w-5", tone.iconColor)} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="font-display text-3xl leading-none text-slate-900">
            {item.value}
          </p>
        </div>
      </div>
    </Card>
  )
}

function RoleCard({ item }: { item: RoleCardData }) {
  const editRoleLink = `/access-control/roles/${item.id}/edit`

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg",
              roleToneMap[item.tone]
            )}
          >
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-xl leading-tight text-slate-900">
              {item.title}
            </h3>
            <p className="text-sm text-slate-500">
              {item.activeUsers} Active Users
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "h-6 rounded-full px-2.5 text-xs font-semibold",
            roleTypeColorMap[item.roleType]
          )}
        >
          {roleTypeLabelMap[item.roleType]}
        </Badge>
      </div>

      <p className="mt-3 min-h-12 text-sm leading-5 text-slate-600">
        {item.description}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="font-semibold tracking-wide text-slate-500 uppercase">
          Includes:
        </span>
        <Badge
          variant="outline"
          className="h-6 rounded-full border-transparent bg-slate-100 px-2.5 text-xs font-medium text-slate-500"
        >
          {item.includes}
        </Badge>
      </div>

      <div className="mt-3 h-px bg-slate-100" />

      <div className="mt-3 flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          className="h-8 flex-1 border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          <Link
            to={editRoleLink}
            state={{ roleName: item.title, description: item.description }}
          >
            <PencilLine className="h-4 w-4" />
            Edit Permissions
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-500 hover:bg-slate-100"
              aria-label={`Open ${item.title} actions`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem asChild>
              <Link
                to={editRoleLink}
                state={{ roleName: item.title, description: item.description }}
              >
                Edit role
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate role</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Delete role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}

export function AccessControlOverviewTab() {
  return (
    <TabsContent value="overview" className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {statCards.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {roleCards.map((item) => (
          <RoleCard key={item.id} item={item} />
        ))}

        <Link to="/access-control/new-role" className="block">
          <Card className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-none transition-colors hover:bg-slate-100">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow">
                <Plus className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl text-slate-400">
                Create New Role
              </h3>
              <p className="mt-2 text-sm leading-5 text-slate-400">
                Define a new set of permissions for specific staff members.
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </TabsContent>
  )
}
