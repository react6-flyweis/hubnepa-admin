import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

type RefundStatus = "Approved" | "Pending" | "Rejected"

interface RefundItem {
  id: string
  customerName: string
  orderId: string
  reason: string
  date: string
  status: RefundStatus
  amount: number
}

const refundItems: RefundItem[] = [
  {
    id: "RF-8821",
    customerName: "John Doe",
    orderId: "ORD-9921",
    reason: "Item missing",
    date: "Feb 12, 2024",
    status: "Approved",
    amount: 12.5,
  },
  {
    id: "RF-8822",
    customerName: "Sarah Smith",
    orderId: "ORD-9925",
    reason: "Food cold",
    date: "Feb 12, 2024",
    status: "Pending",
    amount: 24,
  },
  {
    id: "RF-8823",
    customerName: "Mike Johnson",
    orderId: "ORD-9918",
    reason: "Wrong item",
    date: "Feb 11, 2024",
    status: "Rejected",
    amount: 8.99,
  },
  {
    id: "RF-8824",
    customerName: "Emily Davis",
    orderId: "ORD-9880",
    reason: "Damaged packaging",
    date: "Feb 10, 2024",
    status: "Approved",
    amount: 45,
  },
]

const refundStatusColorMap: Record<RefundStatus, string> = {
  Approved: "border-emerald-200 bg-emerald-100 text-emerald-700",
  Pending: "border-amber-200 bg-amber-100 text-amber-700",
  Rejected: "border-red-200 bg-red-100 text-red-700",
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatDateLabel(dateValue: string) {
  const [monthDay, year] = dateValue.split(", ")

  return { monthDay, year }
}

export default function FinanceRefundsTab() {
  const [search, setSearch] = useState("")

  const filteredRefunds = useMemo(() => {
    const query = search.trim().toLowerCase()

    return refundItems.filter((item) => {
      if (!query) {
        return true
      }

      return [
        item.id,
        item.customerName,
        item.orderId,
        item.reason,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    })
  }, [search])

  return (
    <Card className="rounded-2xl border border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-3 p-0">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              Customer Refunds
            </h2>
            <Badge
              variant="outline"
              className="h-6 rounded-full border-red-100 bg-red-50 px-3 text-xs font-semibold text-red-600"
            >
              2 Pending Action
            </Badge>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search order or customer..."
              className="h-9 border-slate-200 bg-white pl-9 text-sm"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Refund ID
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Customer
                <br />& Order
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Reason
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Date
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Amount
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase" />
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr]:border-slate-200 [&_tr:last-child]:border-b">
            {filteredRefunds.map((item) => {
              const { monthDay, year } = formatDateLabel(item.date)

              return (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500">
                    {item.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-900">
                    <p className="font-semibold text-slate-800">
                      {item.customerName}
                    </p>
                    <p className="text-xs font-medium text-blue-500">
                      {item.orderId}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-500">
                    {item.reason}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-500">
                    <p>{monthDay}</p>
                    <p>{year}</p>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-6 rounded-full border px-2.5 text-xs font-semibold",
                        refundStatusColorMap[item.status]
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-lg font-semibold text-slate-900">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {item.status === "Pending" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 border-emerald-200 bg-emerald-50 px-3 text-emerald-700 hover:bg-emerald-100"
                      >
                        Approve
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
