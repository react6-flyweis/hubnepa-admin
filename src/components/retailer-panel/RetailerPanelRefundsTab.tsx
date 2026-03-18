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

type RefundStatus = "pending" | "approved" | "rejected"

interface RefundRequest {
  id: string
  customer: string
  amount: string
  reason: string
  status: RefundStatus
}

const refundRequests: RefundRequest[] = [
  {
    id: "REF-234",
    customer: "John Smith",
    amount: "$45",
    reason: "Product damaged",
    status: "pending",
  },
  {
    id: "REF-233",
    customer: "Mike Davis",
    amount: "$28",
    reason: "Wrong item",
    status: "pending",
  },
]

const statusAppearanceMap: Record<RefundStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<RefundStatus, string> = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
}

export function RetailerPanelRefundsTab() {
  return (
    <TabsContent value="refunds" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Refund Requests
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundRequests.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">{refund.id}</TableCell>
                  <TableCell>{refund.customer}</TableCell>
                  <TableCell>{refund.amount}</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusAppearanceMap[refund.status]
                      )}
                    >
                      {statusLabelMap[refund.status]}
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
