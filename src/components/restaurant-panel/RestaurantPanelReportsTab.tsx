import { BarChart3, Clock, DollarSign, Utensils } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

interface ReportCard {
  title: string
  subtitle: string
  items: Array<{ label: string; value: string; highlight?: boolean }>
  icon: React.ComponentType<{ className?: string }>
}

const reportCards: ReportCard[] = [
  {
    title: "Revenue Trends",
    subtitle: "Track income over time",
    icon: BarChart3,
    items: [
      { label: "This Week", value: "$12,450" },
      { label: "Last Week", value: "$11,230" },
      { label: "Growth", value: "+10.9%", highlight: true },
    ],
  },
  {
    title: "Sales Mix",
    subtitle: "Best performing dishes",
    icon: Utensils,
    items: [
      { label: "Main Courses", value: "58%" },
      { label: "Appetizers", value: "25%" },
      { label: "Beverages", value: "17%" },
    ],
  },
  {
    title: "Peak Hours",
    subtitle: "Busiest times analysis",
    icon: Clock,
    items: [
      { label: "Lunch (12-2 PM)", value: "245 orders" },
      { label: "Dinner (7-9 PM)", value: "320 orders" },
      { label: "Peak Time", value: "8:00 PM", highlight: true },
    ],
  },
  {
    title: "Expense Breakdown",
    subtitle: "Cost analysis by category",
    icon: DollarSign,
    items: [
      { label: "Ingredients", value: "$8,450" },
      { label: "Payroll", value: "$12,200" },
      { label: "Utilities", value: "$1,850" },
    ],
  },
]

export function RestaurantPanelReportsTab() {
  return (
    <TabsContent value="reports" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Reports & Analytics
            </CardTitle>
            <p className="text-sm text-slate-500">
              Get a quick overview of performance and key trends.
            </p>
          </div>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reportCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="space-y-2">
                    <Icon className="size-7 text-amber-500" />
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        {card.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    {card.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between"
                      >
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p
                          className={
                            item.highlight
                              ? "text-base font-semibold text-emerald-700"
                              : "text-base font-semibold text-slate-900"
                          }
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
