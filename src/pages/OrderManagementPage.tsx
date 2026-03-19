import { useMemo, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  ListFilter,
  Search,
  Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type OrderType = "Restaurant" | "Retail"
type OrderStatus = "Processing" | "Delivered" | "Cancelled" | "Shipped"
type MetricTone = "total" | "processing" | "completed" | "cancelled"

interface Order {
  id: string
  date: string
  time: string
  customer: string
  vendor: string
  type: OrderType
  status: OrderStatus
  amount: number
}

interface MetricCard {
  label: string
  value: string
  tone: MetricTone
  icon: React.ComponentType<{ className?: string }>
}

const metricColorMap: Record<
  MetricTone,
  {
    card: string
    label: string
    value: string
    icon: string
  }
> = {
  total: {
    card: "border-blue-200 bg-blue-50/70",
    label: "text-blue-600",
    value: "text-blue-800",
    icon: "text-blue-400",
  },
  processing: {
    card: "border-amber-200 bg-amber-50/70",
    label: "text-amber-600",
    value: "text-amber-800",
    icon: "text-amber-400",
  },
  completed: {
    card: "border-emerald-200 bg-emerald-50/70",
    label: "text-emerald-600",
    value: "text-emerald-800",
    icon: "text-emerald-400",
  },
  cancelled: {
    card: "border-rose-200 bg-rose-50/70",
    label: "text-rose-600",
    value: "text-rose-800",
    icon: "text-rose-400",
  },
}

const orderTypeColorMap: Record<OrderType, string> = {
  Restaurant: "border-orange-200 bg-orange-50 text-orange-600",
  Retail: "border-sky-200 bg-sky-50 text-sky-600",
}

const orderStatusColorMap: Record<OrderStatus, string> = {
  Processing: "border-blue-200 bg-blue-100 text-blue-700",
  Delivered: "border-emerald-200 bg-emerald-100 text-emerald-700",
  Cancelled: "border-rose-200 bg-rose-100 text-rose-700",
  Shipped: "border-blue-200 bg-blue-100 text-blue-700",
}

const metrics: MetricCard[] = [
  { label: "Total Orders", value: "85,200", tone: "total", icon: FileText },
  {
    label: "Processing",
    value: "145",
    tone: "processing",
    icon: Truck,
  },
  {
    label: "Completed",
    value: "84,500",
    tone: "completed",
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: "555",
    tone: "cancelled",
    icon: AlertCircle,
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-9921",
    date: "Feb 12,",
    time: "10:30 AM",
    customer: "John Doe",
    vendor: "Spicy Kitchen",
    type: "Restaurant",
    status: "Processing",
    amount: 45.5,
  },
  {
    id: "ORD-9922",
    date: "Feb 12,",
    time: "09:15 AM",
    customer: "Sarah Connor",
    vendor: "Fresh Mart",
    type: "Retail",
    status: "Delivered",
    amount: 120,
  },
  {
    id: "ORD-9923",
    date: "Feb 11,",
    time: "08:45 PM",
    customer: "Mike Ross",
    vendor: "Burger King Clone",
    type: "Restaurant",
    status: "Cancelled",
    amount: 22,
  },
  {
    id: "ORD-9924",
    date: "Feb 11,",
    time: "04:20 PM",
    customer: "Jessica Pearson",
    vendor: "Tech Gadgets",
    type: "Retail",
    status: "Shipped",
    amount: 899,
  },
  {
    id: "ORD-9925",
    date: "Feb 11,",
    time: "01:10 PM",
    customer: "Harvey Specter",
    vendor: "Spicy Kitchen",
    type: "Restaurant",
    status: "Processing",
    amount: 85,
  },
]

export default function OrderManagementPage() {
  const [search, setSearch] = useState("")

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return mockOrders

    const query = search.trim().toLowerCase()
    return mockOrders.filter((order) =>
      [order.id, order.customer, order.vendor].some((val) =>
        val.toLowerCase().includes(query)
      )
    )
  }, [search])

  return (
    <div className="space-y-4">
      <PageHeader
        title="Order Management"
        description="Track and manage all customer orders across the platform."
        right={
          <Button
            variant="outline"
            size="lg"
            className="h-10 gap-2 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export Orders
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const colors = metricColorMap[metric.tone]
          const Icon = metric.icon

          return (
            <Card
              key={metric.label}
              size="sm"
              className={cn(
                "rounded-2xl px-4 py-3 shadow-none ring-1",
                colors.card
              )}
            >
              <CardContent className="flex items-center justify-between px-0">
                <div>
                  <p className={cn("text-base font-semibold", colors.label)}>
                    {metric.label}
                  </p>
                  <p
                    className={cn("mt-1 text-2xl font-semibold", colors.value)}
                  >
                    {metric.value}
                  </p>
                </div>
                <Icon className={cn("h-9 w-9", colors.icon)} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="gap-0 py-0">
        <CardHeader className="px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by Order ID, Customer, or Vendor..."
                className="h-9 border-slate-200 bg-white pl-9 text-sm shadow-none placeholder:text-slate-400"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-2 self-end px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-700 sm:self-auto"
            >
              <ListFilter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          <Table className="min-w-225">
            <TableHeader className="bg-slate-50 [&_tr]:border-b-0">
              <TableRow className="hover:bg-slate-100">
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Order
                  <br />
                  ID
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Date
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Vendor
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Type
                </TableHead>
                <TableHead className="px-5 py-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Status
                </TableHead>
                <TableHead className="px-5 py-4 text-right text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr]:border-slate-200 [&_tr:last-child]:border-b">
              {filteredOrders.map((order) => {
                const [orderPrefix, orderNumber] = order.id.split("-")

                return (
                  <TableRow key={order.id} className="hover:bg-slate-50">
                    <TableCell className="px-5 py-5 align-top text-sm font-semibold text-slate-700">
                      <span className="block leading-5">{orderPrefix}-</span>
                      <span className="block leading-5">{orderNumber}</span>
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top text-sm font-medium text-slate-500">
                      <span className="block leading-5">{order.date}</span>
                      <span className="block leading-5">{order.time}</span>
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top font-semibold text-slate-800">
                      {order.customer}
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top font-medium text-slate-600">
                      {order.vendor}
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top">
                      <Badge
                        variant="outline"
                        className={cn("", orderTypeColorMap[order.type])}
                      >
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-5 align-top">
                      <Badge
                        variant="outline"
                        className={cn("", orderStatusColorMap[order.status])}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-5 text-right text-base font-semibold text-slate-800">
                      ${order.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}

              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-5 py-8 text-center text-sm text-slate-500"
                  >
                    No matching orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
