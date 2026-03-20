import { useState } from "react"
import { MoreVertical, Search, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type AdminStatus = "Active" | "Away"

interface AdminUser {
  id: string
  name: string
  email: string
  initials: string
  role: string
  status: AdminStatus
  lastLogin: string
}

const adminUsers: AdminUser[] = [
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    email: "sarah.j@hubnepa.com",
    initials: "SJ",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2 mins ago",
  },
  {
    id: "mike-ross",
    name: "Mike Ross",
    email: "mike.r@hubnepa.com",
    initials: "MR",
    role: "Finance Lead",
    status: "Active",
    lastLogin: "1 hour ago",
  },
  {
    id: "rachel-green",
    name: "Rachel Green",
    email: "rachel.g@hubnepa.com",
    initials: "RG",
    role: "Content Manager",
    status: "Away",
    lastLogin: "Yesterday",
  },
  {
    id: "harvey-specter",
    name: "Harvey Specter",
    email: "harvey.s@hubnepa.com",
    initials: "HS",
    role: "Super Admin",
    status: "Active",
    lastLogin: "3 hours ago",
  },
  {
    id: "donna-paulsen",
    name: "Donna Paulsen",
    email: "donna.p@hubnepa.com",
    initials: "DP",
    role: "Support Agent",
    status: "Active",
    lastLogin: "5 mins ago",
  },
]

const adminStatusMap: Record<
  AdminStatus,
  { dotClassName: string; textClassName: string }
> = {
  Active: {
    dotClassName: "bg-emerald-500",
    textClassName: "text-emerald-600",
  },
  Away: {
    dotClassName: "bg-amber-500",
    textClassName: "text-amber-600",
  },
}

export function AccessControlAdminsTab() {
  const [search, setSearch] = useState("")

  const filteredAdmins = adminUsers.filter((admin) => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return true
    }

    return (
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query)
    )
  })

  return (
    <TabsContent value="admins" className="mt-4">
      <Card className="gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-none">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-display text-xl leading-tight text-slate-900">
              Admin Users
            </h3>
            <p className="text-sm text-slate-500">
              Manage staff members with access to the admin panel
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:items-center">
            <InputGroup className="h-9 w-full rounded-xl border-slate-200 px-3 sm:min-w-80">
              <InputGroupAddon align="inline-start" className="pr-2">
                <Search className="h-4 w-4 text-slate-400" />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search users..."
                className="text-sm text-slate-700 placeholder:text-slate-400"
                aria-label="Search admin users"
              />
            </InputGroup>
            <Button className="h-9 gap-2 rounded-xl bg-emerald-600 px-4 text-sm text-white hover:bg-emerald-700 sm:px-5">
              <UserPlus className="h-4 w-4" />
              Invite Admin
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-100 [&_tr]:border-b-0">
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                User
              </TableHead>
              <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Role
              </TableHead>
              <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Last Login
              </TableHead>
              <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => {
                const statusStyle = adminStatusMap[admin.status]

                return (
                  <TableRow
                    key={admin.id}
                    className="border-slate-100 bg-white hover:bg-slate-50"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 bg-slate-100">
                          <AvatarFallback className="bg-slate-100 text-sm text-slate-600">
                            {admin.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm leading-tight font-medium text-slate-900">
                            {admin.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {admin.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <Badge
                        // size="sm"

                        variant="outline"
                        className="bg-gray-50 font-medium text-slate-700"
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <div
                        className={cn(
                          "flex items-center gap-2 text-sm font-semibold",
                          statusStyle.textClassName
                        )}
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            statusStyle.dotClassName
                          )}
                        />
                        {admin.status}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3 text-sm text-slate-600">
                      {admin.lastLogin}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                            aria-label={`Open actions for ${admin.name}`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-40">
                          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Suspend Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow className="h-20 border-slate-100 bg-white hover:bg-white">
                <TableCell
                  colSpan={5}
                  className="px-5 py-4 text-center text-sm text-slate-500"
                >
                  No admin users found for this search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </TabsContent>
  )
}
