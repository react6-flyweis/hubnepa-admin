import { useMemo, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Ellipsis,
  Filter,
  Search,
} from "lucide-react"

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

type SettlementStatus = "Pending" | "Completed" | "On Hold"
type RecipientType = "Restaurant" | "Retailer"

interface SettlementPayout {
  id: string
  recipient: string
  recipientType: RecipientType
  method: string
  date: string
  status: SettlementStatus
  amount: number
}

const settlementPayouts: SettlementPayout[] = [
  {
    id: "SET-1023",
    recipient: "Spicy Kitchen",
    recipientType: "Restaurant",
    method: "Bank Transfer",
    date: "Feb 12, 2024",
    status: "Pending",
    amount: 1240.5,
  },
  {
    id: "SET-1022",
    recipient: "Fresh Mart",
    recipientType: "Retailer",
    method: "PayPal",
    date: "Feb 11, 2024",
    status: "Completed",
    amount: 850,
  },
  {
    id: "SET-1021",
    recipient: "Burger King Clone",
    recipientType: "Restaurant",
    method: "Bank Transfer",
    date: "Feb 10, 2024",
    status: "Completed",
    amount: 3400.25,
  },
  {
    id: "SET-1020",
    recipient: "Tech Gadgets",
    recipientType: "Retailer",
    method: "Wire",
    date: "Feb 09, 2024",
    status: "On Hold",
    amount: 2100,
  },
  {
    id: "SET-1019",
    recipient: "Pizza Hut Clone",
    recipientType: "Restaurant",
    method: "Bank Transfer",
    date: "Feb 08, 2024",
    status: "Completed",
    amount: 1890,
  },
]

const statusColorMap: Record<
  SettlementStatus,
  {
    badgeClass: string
    iconClass: string
  }
> = {
  Pending: {
    badgeClass: "border-amber-200 bg-amber-100 text-amber-700",
    iconClass: "text-amber-500",
  },
  Completed: {
    badgeClass: "border-emerald-200 bg-emerald-100 text-emerald-700",
    iconClass: "text-emerald-500",
  },
  "On Hold": {
    badgeClass: "border-red-200 bg-red-100 text-red-700",
    iconClass: "text-red-500",
  },
}

function getStatusIcon(status: SettlementStatus) {
  if (status === "Completed") {
    return <CheckCircle2 className="h-3 w-3" />
  }

  if (status === "On Hold") {
    return <AlertCircle className="h-3 w-3" />
  }

  return <Clock3 className="h-3 w-3" />
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

export default function FinanceSettlementsTab() {
  const [search, setSearch] = useState("")

  const filteredPayouts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return settlementPayouts.filter((item) => {
      if (!query) {
        return true
      }

      return [item.id, item.recipient, item.method, item.status]
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
              Partner Payouts
            </h2>
            <Badge
              variant="outline"
              className="h-6 rounded-full border-slate-200 bg-slate-100 px-3 text-xs font-semibold text-slate-600"
            >
              124 Total
            </Badge>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search partner..."
                className="h-9 border-slate-200 bg-white pl-9 text-sm"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="lg"
              className="h-9 gap-1.5 border-slate-200 bg-white px-3 text-sm text-slate-700"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Settlement ID
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Recipient
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Method
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
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr]:border-slate-200 [&_tr:last-child]:border-b">
            {filteredPayouts.map((item) => {
              const { monthDay, year } = formatDateLabel(item.date)
              const statusStyles = statusColorMap[item.status]

              return (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500">
                    {item.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-900">
                    <p className="font-semibold text-slate-800">
                      {item.recipient}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.recipientType}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-500">
                    {item.method === "Bank Transfer" ? (
                      <>
                        <p>Bank</p>
                        <p>Transfer</p>
                      </>
                    ) : (
                      item.method
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-500">
                    <p>{monthDay}</p>
                    <p>{year}</p>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-6 gap-1 rounded-full border px-2.5 text-xs font-semibold",
                        statusStyles.badgeClass
                      )}
                    >
                      <span className={statusStyles.iconClass}>
                        {getStatusIcon(item.status)}
                      </span>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-base font-semibold text-slate-900">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-slate-500 hover:bg-slate-100"
                    >
                      <Ellipsis className="h-4 w-4" />
                      <span className="sr-only">Open payout actions</span>
                    </Button>
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
