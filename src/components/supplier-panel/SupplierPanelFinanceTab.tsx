import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

const financeStats = [
  {
    title: "Total Revenue",
    value: "$89,240",
    bg: "bg-emerald-50",
    text: "text-slate-900",
  },
  {
    title: "Pending Payments",
    value: "$12,450",
    bg: "bg-sky-50",
    text: "text-slate-900",
  },
  {
    title: "Settled This Month",
    value: "$76,790",
    bg: "bg-violet-50",
    text: "text-slate-900",
  },
]

const recentTransactions = [
  {
    title: "Payment from Urban Mart",
    date: "Feb 18, 2026",
    amount: "+$2,450",
  },
  {
    title: "Payment from Mega Store",
    date: "Feb 17, 2026",
    amount: "+$3,120",
  },
]

export function SupplierPanelFinanceTab() {
  return (
    <TabsContent value="finance" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Supplier Finance
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {financeStats.map((stat) => (
              <div key={stat.title} className={`${stat.bg} rounded-xl p-5`}>
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>
                <p className={`mt-2 text-3xl font-semibold ${stat.text}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <div className="mt-4 space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.title}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-slate-600">{transaction.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-600">
                    {transaction.amount}
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
