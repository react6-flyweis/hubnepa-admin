import { useEffect, useState } from "react"
import {
  Ban,
  CreditCard,
  History,
  MoreHorizontal,
  Shield,
  Truck,
} from "lucide-react"
import { useNavigate } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import {
  BlockUserDialog,
  type BlockUserMode,
} from "@/components/user-management/BlockUserDialog"
import type { User, UserStatus } from "@/types/user"

const statusColorMap: Record<UserStatus, string> = {
  Active: "border-emerald-500 bg-emerald-50 text-emerald-600",
  Blocked: "border-red-400 bg-red-50 text-red-500",
  Suspended: "border-amber-400 bg-amber-50 text-amber-600",
}

interface UserManagementTableProps {
  users: User[]
}

export function UserManagementTable({ users }: UserManagementTableProps) {
  const navigate = useNavigate()

  const [tableUsers, setTableUsers] = useState<User[]>(users)
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const [dialogMode, setDialogMode] = useState<BlockUserMode>("block")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setTableUsers(users)
  }, [users])

  function openBlockDialog(user: User) {
    setActiveUser(user)
    setDialogMode(user.status === "Blocked" ? "unblock" : "block")
    setIsDialogOpen(true)
  }

  function closeBlockDialog() {
    setIsDialogOpen(false)
    setActiveUser(null)
  }

  function handleConfirmBlock(user: User) {
    setTableUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: dialogMode === "block" ? "Blocked" : "Active" }
          : u
      )
    )
    closeBlockDialog()
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              User
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              Role
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              Joined
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              Stats
            </TableHead>
            <TableHead className="text-xs font-semibold tracking-wide uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.role}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-0.5 text-xs font-semibold",
                    statusColorMap[user.status]
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.joined}
              </TableCell>
              <TableCell>
                <p className="font-semibold">{user.totalSpent}</p>
                <p className="text-sm text-muted-foreground">
                  {user.totalOrders} orders
                </p>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onSelect={() => navigate(`/users/${user.id}/orders`)}
                    >
                      <History className="h-4 w-4" />
                      Order History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => navigate(`/users/${user.id}/payments`)}
                    >
                      <CreditCard className="h-4 w-4" />
                      Payment History
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() =>
                        navigate(`/users/${user.id}/delivery-logs`)
                      }
                    >
                      <Truck className="h-4 w-4" />
                      Delivery Logs
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => navigate(`/users/${user.id}/permissions`)}
                    >
                      <Shield className="h-4 w-4" />
                      Manage Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={() => openBlockDialog(user)}
                    >
                      <Ban className="h-4 w-4" />
                      {user.status === "Blocked"
                        ? "Unblock Access"
                        : "Block Access"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BlockUserDialog
        open={isDialogOpen}
        user={activeUser}
        mode={dialogMode}
        onClose={closeBlockDialog}
        onConfirm={handleConfirmBlock}
      />
    </>
  )
}
