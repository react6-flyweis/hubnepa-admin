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

type PaymentStatus = "paid" | "pending" | "failed"

interface OrderItem {
  id: string
  customer: string
  items: number
  amount: string
  paymentStatus: PaymentStatus
}

const orders: OrderItem[] = [
  {
    id: "ORD-5678",
    customer: "John Smith",
    items: 3,
    amount: "$156",
    paymentStatus: "paid",
  },
  {
    id: "ORD-5677",
    customer: "Sarah Johnson",
    items: 5,
    amount: "$289",
    paymentStatus: "paid",
  },
  {
    id: "ORD-5676",
    customer: "Mike Davis",
    items: 2,
    amount: "$78",
    paymentStatus: "paid",
  },
  {
    id: "ORD-5675",
    customer: "Emily Brown",
    items: 4,
    amount: "$215",
    paymentStatus: "paid",
  },
]

const paymentStatusColorMap: Record<PaymentStatus, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
}

const paymentStatusLabelMap: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
}

export function RetailerPanelOrdersTab() {
  return (
    <TabsContent value="orders" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Order Management
            </CardTitle>
          </div>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Order ID
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Customer
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Items
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Amount
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Payment Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-slate-900">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {order.items}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "h-7 rounded-full px-3 text-xs font-semibold",
                        paymentStatusColorMap[order.paymentStatus]
                      )}
                    >
                      {paymentStatusLabelMap[order.paymentStatus]}
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
