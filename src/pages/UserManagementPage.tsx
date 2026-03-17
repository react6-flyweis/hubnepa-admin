import { useState } from "react"
import { Download, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { UserManagementTable } from "@/components/user-management/UserManagementTable"
import { AddAdminUserDialog } from "@/components/user-management/AddAdminUserDialog"
import { users } from "@/data/users"

export default function UserManagementPage() {
  const [search, setSearch] = useState("")
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search)
  )

  return (
    <div className="">
      <PageHeader
        title="User Management"
        description="View, edit, and manage user access and permissions."
        right={
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-black"
              onClick={() => setIsAddAdminOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        }
      />

      <Card className="mt-6 p-4">
        {/* Search & Filter */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or ID..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <UserManagementTable users={filtered} />
      </Card>

      <AddAdminUserDialog
        open={isAddAdminOpen}
        onClose={() => setIsAddAdminOpen(false)}
      />
    </div>
  )
}
