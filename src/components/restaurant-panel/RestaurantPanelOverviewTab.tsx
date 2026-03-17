import { Badge } from "@/components/ui/badge"
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

interface TopMenuItem {
  rank: number
  name: string
  orders: number
  amount: string
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

const topMenuItems: TopMenuItem[] = [
  { rank: 1, name: "Pasta Carbonara", orders: 145, amount: "$2,175" },
  { rank: 2, name: "Margherita Pizza", orders: 132, amount: "$1,980" },
  { rank: 3, name: "Caesar Salad", orders: 98, amount: "$1,176" },
  { rank: 4, name: "Grilled Salmon", orders: 87, amount: "$2,088" },
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

export function RestaurantPanelOverviewTab() {
  return (
    <TabsContent value="overview" className="mt-0">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-2 border-emerald-200 bg-white ring-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Live Orders
            </CardTitle>
            <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
              View Only
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {liveOrders.map((order) => (
              <div key={order.id} className="rounded-md bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-slate-800">
                    {order.id}
                  </p>
                  <Badge
                    className={cn(
                      "h-6 rounded-full px-3 text-xs",
                      statusColorMap[order.status]
                    )}
                  >
                    {statusLabelMap[order.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{order.table}</p>
                <p className="mt-1 text-sm text-slate-700">{order.items}</p>
                <p className="mt-2 text-xs text-slate-400">{order.timeAgo}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Top Menu Items
            </CardTitle>
            <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
              View Only
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {topMenuItems.map((item) => (
              <div
                key={item.rank}
                className="flex items-center justify-between rounded-md bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white">
                    {item.rank}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-slate-800">
                  {item.amount}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  )
}
