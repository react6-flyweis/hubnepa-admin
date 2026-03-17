import {
  BarChart3,
  DollarSign,
  PackageSearch,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
  Package,
  Tag,
  RotateCcw,
  Wallet,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RetailerPanelOverviewTab } from "@/components/retailer-panel/RetailerPanelOverviewTab"
import { RetailerPanelProductsTab } from "@/components/retailer-panel/RetailerPanelProductsTab"
import { cn } from "@/lib/utils"

type RetailerTab =
  | "overview"
  | "products"
  | "orders"
  | "customers"
  | "offers"
  | "refunds"
  | "finance"
  | "analytics"

interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

const tabs: Array<{
  value: RetailerTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "overview", label: "Overview", icon: ShoppingCart },
  { value: "products", label: "Products", icon: Package },
  { value: "orders", label: "Orders", icon: ShoppingCart },
  { value: "customers", label: "Customers", icon: Users },
  { value: "offers", label: "Offers", icon: Tag },
  { value: "refunds", label: "Refunds", icon: RotateCcw },
  { value: "finance", label: "Finance", icon: Wallet },
  { value: "analytics", label: "Analytics", icon: BarChart3 },
]

const stats: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$45,890",
    change: "+14%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "568",
    change: "+9%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Pending Payments",
    value: "32",
    change: "+3%",
    trend: "down",
    icon: Wallet,
  },
  {
    title: "Low Stock Alerts",
    value: "12",
    change: "-8%",
    trend: "up",
    icon: PackageSearch,
  },
]

const trendColorMap: Record<StatItem["trend"], string> = {
  up: "text-emerald-600",
  down: "text-red-500",
}

function StatCard({ item }: { item: StatItem }) {
  const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card className="gap-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-base text-slate-500">{item.title}</p>
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

function TabComingSoon({ tabLabel }: { tabLabel: string }) {
  return (
    <Card className="rounded-2xl border-slate-200 py-10 ring-0">
      <CardContent className="text-center">
        <p className="text-base font-semibold text-slate-900">{tabLabel}</p>
        <p className="mt-2 text-sm text-slate-500">
          This section is intentionally left as placeholder content for now.
        </p>
      </CardContent>
    </Card>
  )
}

export default function RetailerPanelPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Retailer Panel"
        description="Manage products, orders, and customer relationships"
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

        <RetailerPanelOverviewTab />
        <RetailerPanelProductsTab />

        {tabs
          .filter((tab) => tab.value !== "overview" && tab.value !== "products")
          .map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <TabComingSoon tabLabel={tab.label} />
            </TabsContent>
          ))}
      </Tabs>
    </div>
  )
}
