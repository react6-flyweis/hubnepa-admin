import { Filter } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface LiveOrderItem {
  id: string
  table: string
  items: string
  timeAgo: string
  status: "preparing" | "ready" | "new"
}

const liveOrders: LiveOrderItem[] = [
  {
    id: "RO-8945",
    table: "Table 12",
    items: "Pasta, Salad, Drinks x2",
    timeAgo: "5 mins ago",
    status: "preparing",
  },
  {
    id: "RO-8944",
    table: "Table 7",
    items: "Burger, Fries, Shake",
    timeAgo: "8 mins ago",
    status: "ready",
  },
  {
    id: "RO-8943",
    table: "Table 3",
    items: "Pizza Margherita, Wine",
    timeAgo: "12 mins ago",
    status: "new",
  },
  {
    id: "RO-8942",
    table: "Table 15",
    items: "Steak, Soup, Coffee",
    timeAgo: "15 mins ago",
    status: "preparing",
  },
]

const statusColorMap: Record<LiveOrderItem["status"], string> = {
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-emerald-100 text-emerald-700",
  new: "bg-sky-100 text-sky-700",
}

const statusLabelMap: Record<LiveOrderItem["status"], string> = {
  preparing: "Preparing",
  ready: "Ready",
  new: "New",
}

export function RestaurantPanelOrdersTab() {
  return (
    <TabsContent value="orders" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Order Management
            </CardTitle>
            <p className="text-sm text-slate-500">
              Track and manage current orders in real time.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="size-4" />
            Filter Orders
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {liveOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900">
                  {order.id} — {order.table}
                </p>
                <p className="text-sm text-slate-500">{order.items}</p>
                <p className="text-xs text-slate-400">{order.timeAgo}</p>
              </div>

              <Badge
                className={cn(
                  "h-7 rounded-full px-3 text-xs font-semibold",
                  statusColorMap[order.status]
                )}
              >
                {statusLabelMap[order.status]}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  )
}
