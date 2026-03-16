import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ArrowLeft, Filter, Search } from "lucide-react"

import { users } from "@/data/users"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type OrderStatus = "Delivered" | "Cancelled" | "Pending" | "In Transit"

interface Order {
  id: string
  store: string
  date: string
  items: string
  total: string
  status: OrderStatus
}

const statusColorMap: Record<OrderStatus, string> = {
  Delivered: "border-emerald-500 bg-emerald-50 text-emerald-600",
  Cancelled: "border-rose-400 bg-rose-50 text-rose-600",
  Pending: "border-amber-400 bg-amber-50 text-amber-600",
  "In Transit": "border-sky-400 bg-sky-50 text-sky-600",
}

const mockOrders: Order[] = [
  {
    id: "ORD-5521",
    store: "Burger King Clone",
    date: "Feb 12, 2024",
    items: "Spicy Chicken Burger x1",
    total: "$28.50",
    status: "Delivered",
  },
  {
    id: "ORD-5520",
    store: "Fresh Mart",
    date: "Feb 10, 2024",
    items: "Organic Bananas, Milk",
    total: "$15.20",
    status: "Delivered",
  },
  {
    id: "ORD-5490",
    store: "Sushi Palace",
    date: "Feb 05, 2024",
    items: "Sushi Platter Large",
    total: "$45.00",
    status: "Cancelled",
  },
  {
    id: "ORD-5488",
    store: "Spicy Kitchen",
    date: "Jan 28, 2024",
    items: "Pad Thai, Spring Rolls",
    total: "$22.00",
    status: "Delivered",
  },
]

export default function OrderHistoryPage() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()
  const [search, setSearch] = useState("")

  const currentUser = useMemo(
    () => users.find((u) => u.id === userId) ?? users[0],
    [userId]
  )

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return mockOrders

    const query = search.trim().toLowerCase()
    return mockOrders.filter((order) =>
      [order.id, order.store, order.items].some((val) =>
        val.toLowerCase().includes(query)
      )
    )
  }, [search])

  const totalOrders = mockOrders.length
  const completedOrders = mockOrders.filter(
    (o) => o.status === "Delivered"
  ).length
  const canceledOrders = mockOrders.filter(
    (o) => o.status === "Cancelled"
  ).length

  return (
    <div className="">
      <div className="font-sherif flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h1 className="font-display text-2xl font-semibold">
              Order History
            </h1>
            <p className="text-sm text-muted-foreground">
              User: <span className="font-semibold">{currentUser.name}</span>
              <span className="mx-2">•</span>
              ID: <span className="font-semibold">{currentUser.id}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-muted-foreground">
            Total Orders
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {totalOrders}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-700">Completed</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-900">
            {completedOrders}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-rose-50 p-5">
          <p className="text-sm font-semibold text-rose-700">Cancelled</p>
          <p className="mt-2 text-3xl font-semibold text-rose-900">
            {canceledOrders}
          </p>
        </div>
      </div>

      <Card className="mt-6 p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Table>
          <TableHeader className="border-b-0 bg-gray-50">
            <TableRow>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Restaurant/Store
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Items
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Total
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide uppercase">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="font-semibold">{order.store}</TableCell>
                <TableCell className="text-muted-foreground">
                  {order.date}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.items}
                </TableCell>
                <TableCell className="font-semibold">{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-0.5 text-xs font-semibold",
                      statusColorMap[order.status]
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
