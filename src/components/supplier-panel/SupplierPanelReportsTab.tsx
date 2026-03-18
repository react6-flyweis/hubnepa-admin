import { BarChart3, Box, DollarSign, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

const reports = [
  {
    title: "Sales Report",
    subtitle: "View detailed sales analytics",
    icon: BarChart3,
    items: [
      { label: "Total Sales", value: "$89,240" },
      { label: "Bulk Orders", value: "127 orders" },
      { label: "Growth Rate", value: "+18%", valueClass: "text-emerald-600" },
      { label: "Avg Order Value", value: "$702.36" },
    ],
  },
  {
    title: "Inventory Report",
    subtitle: "Stock levels and movements",
    icon: Box,
    items: [
      { label: "Total Products", value: "342 items" },
      { label: "In Stock", value: "324 items", valueClass: "text-emerald-600" },
      { label: "Low Stock", value: "18 items", valueClass: "text-rose-600" },
      { label: "Stock Turnover", value: "92%" },
    ],
  },
  {
    title: "Client Performance",
    subtitle: "Client spending and trends",
    icon: Users,
    items: [
      { label: "Active Clients", value: "342 clients" },
      {
        label: "Top Client",
        value: "Fresh Market",
        valueClass: "text-amber-600",
      },
      {
        label: "Avg Spend/Client",
        value: "$261.05",
        valueClass: "text-amber-600",
      },
      { label: "Retention Rate", value: "94%", valueClass: "text-emerald-600" },
    ],
  },
  {
    title: "Financial Summary",
    subtitle: "Revenue and profit analysis",
    icon: DollarSign,
    items: [
      { label: "Total Revenue", value: "$89,240" },
      {
        label: "Pending Payments",
        value: "$12,450",
        valueClass: "text-amber-600",
      },
      {
        label: "Settled Amount",
        value: "$76,790",
        valueClass: "text-emerald-600",
      },
      { label: "Profit Margin", value: "28%" },
    ],
  },
]

export function SupplierPanelReportsTab() {
  return (
    <TabsContent value="reports" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Reports & Analytics
          </CardTitle>
          <span className="inline-flex h-7 items-center rounded-full bg-sky-100 px-3 text-xs font-medium text-sky-700">
            View Only - Admin Access
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => {
              const Icon = report.icon

              return (
                <Card
                  key={report.title}
                  className="rounded-xl border-slate-200"
                >
                  <CardHeader>
                    <div className="flex flex-col items-start gap-2">
                      <Icon className="size-6 text-amber-500" />

                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-900">
                          {report.title}
                        </CardTitle>
                        <p className="text-sm text-slate-600">
                          {report.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {report.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-600">
                          {item.label}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            item.valueClass ?? "text-slate-900"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
