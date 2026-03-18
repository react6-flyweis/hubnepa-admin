import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface FinanceMetric {
  label: string
  value: string
  bgClass: string
}

const financeMetrics: FinanceMetric[] = [
  {
    label: "Wallet Balance",
    value: "$8,450",
    bgClass: "bg-emerald-50",
  },
  {
    label: "Pending Withdrawals",
    value: "$2,300",
    bgClass: "bg-sky-50",
  },
  {
    label: "Total Withdrawn",
    value: "$35,690",
    bgClass: "bg-violet-50",
  },
]

interface Transaction {
  title: string
  date: string
  amount: string
  type: "credit" | "debit"
}

const transactions: Transaction[] = [
  {
    title: "Order Payment Received",
    date: "Feb 18, 2026",
    amount: "+$156",
    type: "credit",
  },
  {
    title: "Withdrawal to Bank",
    date: "Feb 15, 2026",
    amount: "-$5,000",
    type: "debit",
  },
]

export function RetailerPanelFinanceTab() {
  return (
    <TabsContent value="finance" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Finance Management
          </CardTitle>
          <span className="inline-flex h-7 items-center rounded-full bg-sky-100 px-3 text-xs font-medium text-sky-700">
            View Only - Admin Access
          </span>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {financeMetrics.map((metric) => (
              <div
                key={metric.label}
                className={cn("rounded-xl p-5", metric.bgClass)}
              >
                <p className="text-sm font-medium text-slate-600">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Transaction History
            </h3>
            <div className="mt-4 space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.title}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {tx.title}
                    </p>
                    <p className="text-sm text-slate-500">{tx.date}</p>
                  </div>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      tx.type === "credit" ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {tx.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
