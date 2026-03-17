import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

type OrderStatus = "completed" | "pending" | "shipped" | "cancelled"

interface RecentOrder {
  id: string
  customer: string
  items: number
  amount: string
  status: OrderStatus
}

const recentOrders: RecentOrder[] = [
  {
    id: "ORD-5678",
    customer: "John Smith",
    items: 3,
    amount: "$156",
    status: "completed",
  },
  {
    id: "ORD-5677",
    customer: "Sarah Johnson",
    items: 5,
    amount: "$289",
    status: "pending",
  },
  {
    id: "ORD-5676",
    customer: "Mike Davis",
    items: 2,
    amount: "$78",
    status: "completed",
  },
  {
    id: "ORD-5675",
    customer: "Emily Brown",
    items: 4,
    amount: "$215",
    status: "shipped",
  },
]

const statusColorMap: Record<OrderStatus, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  shipped: "bg-sky-100 text-sky-700",
  cancelled: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<OrderStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  shipped: "Shipped",
  cancelled: "Cancelled",
}

export function RetailerPanelOverviewTab() {
  return (
    <TabsContent value="overview" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Recent Orders
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusColorMap[order.status]
                      )}
                    >
                      {statusLabelMap[order.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
