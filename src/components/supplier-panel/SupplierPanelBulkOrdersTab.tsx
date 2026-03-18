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

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled"

interface BulkOrder {
  id: string
  client: string
  items: number
  amount: string
  status: OrderStatus
  eta: string
}

const bulkOrders: BulkOrder[] = [
  {
    id: "BO-1245",
    client: "Urban Mart",
    items: 48,
    amount: "$2,450",
    status: "processing",
    eta: "-",
  },
  {
    id: "BO-1244",
    client: "Mega Store",
    items: 62,
    amount: "$3,120",
    status: "shipped",
    eta: "-",
  },
  {
    id: "BO-1243",
    client: "Quick Shop",
    items: 35,
    amount: "$1,890",
    status: "delivered",
    eta: "-",
  },
  {
    id: "BO-1242",
    client: "Fresh Market",
    items: 58,
    amount: "$2,780",
    status: "processing",
    eta: "-",
  },
]

const statusColorMap: Record<OrderStatus, string> = {
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-sky-100 text-sky-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export function SupplierPanelBulkOrdersTab() {
  return (
    <TabsContent value="bulk-orders" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Bulk Orders
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
                <TableHead>Client</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bulkOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.eta}</TableCell>
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
