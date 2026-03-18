import { Star } from "lucide-react"

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

interface CustomerRow {
  name: string
  orders: number
  spent: string
  lastOrder: string
  rating: number
}

const customerRows: CustomerRow[] = [
  {
    name: "John Smith",
    orders: 24,
    spent: "$1,450",
    lastOrder: "2 days ago",
    rating: 4.5,
  },
  {
    name: "Sarah Johnson",
    orders: 18,
    spent: "$980",
    lastOrder: "1 day ago",
    rating: 4.5,
  },
  {
    name: "Mike Davis",
    orders: 31,
    spent: "$2,120",
    lastOrder: "3 hours ago",
    rating: 4.5,
  },
  {
    name: "Emily Brown",
    orders: 12,
    spent: "$720",
    lastOrder: "1 week ago",
    rating: 4.5,
  },
]

export function RetailerPanelCustomersTab() {
  return (
    <TabsContent value="customers" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Customer Management
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRows.map((customer) => (
                <TableRow key={customer.name}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.spent}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center gap-1">
                      <Star
                        className={cn("size-4 fill-current text-amber-500")}
                      />
                      <span>{customer.rating.toFixed(1)}</span>
                    </div>
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
