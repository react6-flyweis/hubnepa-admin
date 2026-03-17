import {
  BarChart3,
  ClipboardList,
  Clock3,
  DollarSign,
  ForkKnifeCrossed,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RestaurantPanelOverviewTab } from "@/components/restaurant-panel/RestaurantPanelOverviewTab"
import { RestaurantPanelOrdersTab } from "@/components/restaurant-panel/RestaurantPanelOrdersTab"
import { RestaurantPanelMenuManagementTab } from "@/components/restaurant-panel/RestaurantPanelMenuManagementTab"
import { RestaurantPanelInventoryRecipesTab } from "@/components/restaurant-panel/RestaurantPanelInventoryRecipesTab"
import { RestaurantPanelExpensesTab } from "@/components/restaurant-panel/RestaurantPanelExpensesTab"
import { RestaurantPanelReportsTab } from "@/components/restaurant-panel/RestaurantPanelReportsTab"
import { cn } from "@/lib/utils"

type PanelTab =
  | "overview"
  | "orders"
  | "menu-management"
  | "inventory-recipes"
  | "expenses"
  | "reports"

interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

const tabs: Array<{
  value: PanelTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "overview", label: "Overview", icon: ClipboardList },
  { value: "orders", label: "Orders", icon: ClipboardList },
  {
    value: "menu-management",
    label: "Menu Management",
    icon: ForkKnifeCrossed,
  },
  { value: "inventory-recipes", label: "Inventory & Recipes", icon: Package },
  { value: "expenses", label: "Expenses", icon: DollarSign },
  { value: "reports", label: "Reports", icon: BarChart3 },
]

const stats: StatItem[] = [
  {
    title: "Total Orders",
    value: "1,456",
    change: "+16%",
    trend: "up",
    icon: ClipboardList,
  },
  {
    title: "Revenue",
    value: "$52,340",
    change: "+11%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Avg Prep Time",
    value: "12 mins",
    change: "-3%",
    trend: "down",
    icon: Clock3,
  },
  {
    title: "Active Customers",
    value: "2,890",
    change: "+7%",
    trend: "up",
    icon: Users,
  },
]

const trendColorMap: Record<StatItem["trend"], string> = {
  up: "text-emerald-600",
  down: "text-emerald-600",
}

function StatCard({ item }: { item: StatItem }) {
  const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card className="gap-2">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <p className="text-base text-slate-500">{item.title}</p>
          {/* <item.icon className="size-4 text-slate-400" /> */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">
          {item.value}
        </p>
        <div
          className={cn(
            "inline-flex items-center gap-1 text-base font-medium",
            trendColorMap[item.trend]
          )}
        >
          <TrendIcon className="size-4" />
          <span>{item.change}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RestaurantPanelPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Restaurant Panel"
        description="Manage orders, menu, inventory, and operations"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <Card className="rounded-lg border-slate-200 p-0 ring-0">
          <TabsList className="h-12! w-full bg-transparent p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="w-fit rounded-lg px-3 py-2 text-sm data-active:bg-amber-500 data-active:text-white"
                >
                  <Icon className="size-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Card>

        <RestaurantPanelOverviewTab />
        <RestaurantPanelOrdersTab />
        <RestaurantPanelMenuManagementTab />
        <RestaurantPanelInventoryRecipesTab />
        <RestaurantPanelExpensesTab />
        <RestaurantPanelReportsTab />
      </Tabs>
    </div>
  )
}
