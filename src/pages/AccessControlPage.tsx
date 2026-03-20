import { useState } from "react"
import { FileText, Lock, Plus } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AccessControlAdminsTab } from "@/components/access-control/AccessControlAdminsTab"
import { AccessControlAuditTab } from "@/components/access-control/AccessControlAuditTab"
import { AccessControlOverviewTab } from "@/components/access-control/AccessControlOverviewTab"

type TabType = "overview" | "admins" | "audit"

const tabItems = [
  { value: "overview", label: "Overview & Roles" },
  { value: "admins", label: "Admin Users" },
  { value: "audit", label: "Audit Logs" },
]

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [is2FAEnforced, setIs2FAEnforced] = useState(true)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <PageHeader
        title="Access Control"
        description="Manage admin roles, permissions, and security settings."
        right={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" className="h-9 gap-2 px-3">
              <FileText className="h-4 w-4" />
              View Logs
            </Button>
            <Button
              asChild
              size="lg"
              className="h-9 gap-2 bg-primary px-3 text-white hover:bg-primary/90"
            >
              <Link to="/access-control/new-role">
                <Plus className="h-4 w-4" />
                Add New Role
              </Link>
            </Button>
          </div>
        }
      />

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
      >
        <TabsList className="grid h-12! w-full grid-cols-3 rounded-xl border border-slate-200 bg-white p-2">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg text-sm text-slate-500 data-active:bg-slate-50 data-active:text-slate-900"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AccessControlOverviewTab />
        <AccessControlAdminsTab />
        <AccessControlAuditTab />
      </Tabs>

      <Card className="bg-[#F8FAFC] p-6 py-8 shadow-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-xl leading-tight text-slate-900">
                Global Security Settings
              </h3>
              <p className="max-w-md text-sm leading-5 text-slate-500">
                Configure 2FA, Session Timeouts, and IP Restrictions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={is2FAEnforced}
                onCheckedChange={setIs2FAEnforced}
                className="data-[state=checked]:bg-amber-500"
                aria-label="Toggle enforce 2FA"
              />
              <span className="text-sm font-semibold text-slate-700">
                Enforce 2FA
              </span>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="h-9 border-slate-200 px-4 text-sm font-semibold text-slate-700"
            >
              Manage Security
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
