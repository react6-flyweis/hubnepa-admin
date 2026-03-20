import { useMemo } from "react"
import {
  Clock,
  Download,
  Filter,
  Info,
  ShieldAlert,
  Database,
  DollarSign,
  CheckCircle,
} from "lucide-react"
import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

type AuditActionType = "settings" | "payout" | "ticket" | "backup" | "campaign"

interface AuditLogEntry {
  id: string
  actionType: AuditActionType
  actionTitle: string
  actionSubtitle: string
  performedBy: string
  target: string
  date: string
  timeAgo: string
  detailUrl?: string
}

const auditActionMap: Record<
  AuditActionType,
  {
    icon: typeof ShieldAlert
    iconBg: string
    iconColor: string
  }
> = {
  settings: {
    icon: ShieldAlert,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  payout: {
    icon: DollarSign,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  ticket: {
    icon: CheckCircle,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  backup: {
    icon: Database,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  campaign: {
    icon: Info,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
}

const auditLogs: AuditLogEntry[] = [
  {
    id: "1",
    actionType: "settings",
    actionTitle: "Updated",
    actionSubtitle: "System Settings",
    performedBy: "Sarah Jenkins",
    target: "General Configuration",
    date: "10 mins ago",
    timeAgo: "10 mins ago",
    detailUrl: "/",
  },
  {
    id: "2",
    actionType: "payout",
    actionTitle: "Processed",
    actionSubtitle: "Payout",
    performedBy: "Mike Ross",
    target: "Batch #4492",
    date: "1 hour ago",
    timeAgo: "1 hour ago",
    detailUrl: "/",
  },
  {
    id: "3",
    actionType: "ticket",
    actionTitle: "Resolved",
    actionSubtitle: "Ticket",
    performedBy: "Donna Paulsen",
    target: "#TKT-9921",
    date: "2 hours ago",
    timeAgo: "2 hours ago",
    detailUrl: "/",
  },
  {
    id: "4",
    actionType: "backup",
    actionTitle: "Backup",
    actionSubtitle: "Completed",
    performedBy: "System",
    target: "Database",
    date: "4 hours ago",
    timeAgo: "4 hours ago",
    detailUrl: "/",
  },
  {
    id: "5",
    actionType: "campaign",
    actionTitle: "Published",
    actionSubtitle: "Campaign",
    performedBy: "Rachel Green",
    target: "Summer Sale",
    date: "Yesterday",
    timeAgo: "Yesterday",
    detailUrl: "/",
  },
]

function formatCsv(rows: AuditLogEntry[]) {
  const headers = ["Action", "Performed By", "Target Resource", "Date & Time"]
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`

  const body = rows
    .map((row) =>
      [
        `${row.actionTitle} ${row.actionSubtitle}`,
        row.performedBy,
        row.target,
        row.date,
      ]
        .map(escape)
        .join(",")
    )
    .join("\n")

  return [headers.join(","), body].join("\n")
}

export function AccessControlAuditTab() {
  const csvData = useMemo(() => formatCsv(auditLogs), [])

  const handleExport = () => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "audit-logs.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <TabsContent value="audit" className="mt-4">
      <Card className="gap-0 rounded-2xl border border-slate-200 bg-white p-0 shadow-none">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl leading-tight text-slate-900">
              System Audit Logs
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Track all administrative actions for security.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 px-3"
              onClick={() => {
                // placeholder for future filter UI
              }}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 px-3"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  Action
                </TableHead>
                <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  Performed By
                </TableHead>
                <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  Target Resource
                </TableHead>
                <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  Date &amp; Time
                </TableHead>
                <TableHead className="h-14 px-5 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => {
                const actionStyle = auditActionMap[log.actionType]
                const Icon = actionStyle.icon

                return (
                  <TableRow
                    key={log.id}
                    className="border-slate-100 bg-white hover:bg-slate-50"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            actionStyle.iconBg
                          )}
                        >
                          <Icon
                            className={cn("h-4 w-4", actionStyle.iconColor)}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {log.actionTitle}
                          </p>
                          <p className="text-xs text-slate-500">
                            {log.actionSubtitle}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {log.performedBy}
                      </p>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className="rounded-full border-transparent bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {log.target}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {log.timeAgo}
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-sm">
                      <Link
                        to={log.detailUrl ?? "#"}
                        className="font-semibold text-primary hover:text-primary/80"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </TabsContent>
  )
}
