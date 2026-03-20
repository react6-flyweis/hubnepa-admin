import { Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NotificationStatus = "Sent" | "Active" | "Scheduled"

type PushNotification = {
  id: string
  message: string
  audience: string
  status: NotificationStatus
  sentDate: string
  reach: string
}

const notifications: PushNotification[] = [
  {
    id: "notif_001",
    message: "Flash Deal Tuesday: 50% Off Pizza!",
    audience: "All Users",
    status: "Sent",
    sentDate: "Jul 02, 2024",
    reach: "15,420",
  },
  {
    id: "notif_002",
    message: "Your order is on the way!",
    audience: "Triggers",
    status: "Active",
    sentDate: "Automated",
    reach: "Daily",
  },
  {
    id: "notif_003",
    message: "New Restaurants near you",
    audience: "Inactive Users",
    status: "Scheduled",
    sentDate: "Tomorrow, 10:00 AM",
    reach: "2,300 (Est)",
  },
]

const statusColorMap: Record<NotificationStatus, string> = {
  Sent: "border-blue-100 bg-blue-50 text-blue-700",
  Active: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Scheduled: "border-amber-100 bg-amber-50 text-amber-700",
}

export function PushNotificationsTab() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Push Notifications
          </h2>
          <p className="mt-1 font-serif text-sm text-slate-500">
            History of alerts sent to user devices
          </p>
        </div>

        <Button className="h-9 rounded-lg bg-white px-4 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          <Send className="size-4" />
          Send New
        </Button>
      </CardHeader>

      <CardContent className="px-0">
        <Table className="min-w-full">
          <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Message
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Target Audience
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Sent Date
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Reach
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} className="hover:bg-slate-50">
                <TableCell className="px-4 py-4 text-sm font-medium text-slate-900">
                  {notification.message}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {notification.audience}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <Badge
                    className={cn(
                      "h-6 rounded-full px-3 text-xs font-semibold",
                      statusColorMap[notification.status]
                    )}
                  >
                    {notification.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-slate-600">
                  {notification.sentDate}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm font-semibold text-slate-900">
                  {notification.reach}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
