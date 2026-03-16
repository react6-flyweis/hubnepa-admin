import { useMemo } from "react"
import { useNavigate, useParams } from "react-router"
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Download,
} from "lucide-react"

import { users } from "@/data/users"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { UserStatus } from "@/types/user"

type TransactionType = "Payment" | "Refund" | "Chargeback"

type TransactionStatus = "Success" | "Failed" | "Completed" | "Pending"

interface Transaction {
  id: string
  date: string
  type: TransactionType
  method: string
  status: TransactionStatus
  amount: string
}

const statusColorMap: Record<TransactionStatus, string> = {
  Success: "bg-emerald-100 text-emerald-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-rose-100 text-rose-700",
}

const userStatusColorMap: Record<UserStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-100",
  Blocked: "bg-rose-500/15 text-rose-100",
  Suspended: "bg-amber-500/15 text-amber-100",
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-8821",
    date: "Feb 12, 2024",
    type: "Payment",
    method: "Visa •••• 4242",
    status: "Success",
    amount: "-$28.50",
  },
  {
    id: "TXN-8820",
    date: "Feb 10, 2024",
    type: "Payment",
    method: "Mastercard •••• 8899",
    status: "Success",
    amount: "-$15.20",
  },
  {
    id: "TXN-8819",
    date: "Feb 08, 2024",
    type: "Refund",
    method: "Wallet",
    status: "Completed",
    amount: "+$12.00",
  },
  {
    id: "TXN-8818",
    date: "Feb 05, 2024",
    type: "Payment",
    method: "Visa •••• 4242",
    status: "Failed",
    amount: "-$45.00",
  },
]

export default function PaymentHistoryPage() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()

  const currentUser = useMemo(
    () => users.find((u) => u.id === userId) ?? users[0],
    [userId]
  )

  // These are placeholder values for the summary cards to match the design spec.
  const totalLifetimeSpend = 1250
  const averageOrderValue = 45

  const savedPaymentMethods = useMemo(
    () =>
      new Set(
        mockTransactions
          .filter((t) => t.method.includes("••••"))
          .map((t) => t.method)
      ).size,
    []
  )

  const getTransactionIcon = (type: TransactionType) => {
    if (type === "Payment") {
      return <ArrowUpRight className="h-4 w-4 text-emerald-500" />
    }

    if (type === "Refund") {
      return <ArrowDownLeft className="h-4 w-4 text-rose-500" />
    }

    return <ArrowDownLeft className="h-4 w-4 text-slate-500" />
  }

  const summaryCards = [
    {
      id: "total-spend",
      title: "Total Lifetime Spend",
      value: `$${totalLifetimeSpend.toFixed(2)}`,
      icon: CreditCard,
      isActive: true,
    },
    {
      id: "average-order-value",
      title: "Average Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: DollarSign,
      isActive: false,
    },
    {
      id: "saved-payment-methods",
      title: "Saved Payment Methods",
      value: `${savedPaymentMethods} Cards`,
      icon: CreditCard,
      isActive: false,
    },
  ]

  return (
    <div className="font-sherif">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              Payment History
            </h1>
            <p className="text-sm text-muted-foreground">
              Transaction log for{" "}
              <span className="font-semibold">{currentUser.name}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((summaryCard) => {
          const SummaryCardIcon = summaryCard.icon

          return (
            <Card
              key={summaryCard.id}
              className={cn(
                "border bg-white",
                summaryCard.isActive
                  ? "overflow-hidden border-0 bg-slate-950 text-white ring-0"
                  : "border-slate-200"
              )}
            >
              {summaryCard.isActive && (
                <CardHeader className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <SummaryCardIcon className="h-5 w-5 text-white" />
                  </div>
                  <Badge
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      userStatusColorMap[currentUser.status]
                    )}
                  >
                    {currentUser.status}
                  </Badge>
                </CardHeader>
              )}

              <CardContent className={summaryCard.isActive ? "" : "p-5"}>
                {!summaryCard.isActive && (
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <SummaryCardIcon className="h-5 w-5 text-slate-700" />
                  </div>
                )}
                <p
                  className={cn(
                    "text-sm font-semibold",
                    summaryCard.isActive
                      ? "font-normal text-white/70"
                      : "text-muted-foreground"
                  )}
                >
                  {summaryCard.title}
                </p>
                <p
                  className={cn(
                    "mt-2 text-3xl font-semibold",
                    summaryCard.isActive ? "text-white" : "text-slate-900"
                  )}
                >
                  {summaryCard.value}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6 shadow-sm">
        <CardContent className="p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button variant="outline" size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Download Statement
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Transaction ID
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Date
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Type
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Method
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {transaction.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {transaction.method}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-0.5 text-xs font-semibold",
                        statusColorMap[transaction.status]
                      )}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "font-semibold",
                      transaction.amount.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    )}
                  >
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
