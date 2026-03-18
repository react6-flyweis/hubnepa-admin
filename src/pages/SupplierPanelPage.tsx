import {
  ClipboardList,
  DollarSign,
  Package,
  PackageSearch,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupplierPanelOverviewTab } from "@/components/supplier-panel/SupplierPanelOverviewTab"
import { SupplierPanelProductCatalogTab } from "@/components/supplier-panel/SupplierPanelProductCatalogTab"
import { SupplierPanelBulkOrdersTab } from "@/components/supplier-panel/SupplierPanelBulkOrdersTab"
import { SupplierPanelWarehouseTab } from "@/components/supplier-panel/SupplierPanelWarehouseTab"
import { SupplierPanelClientsTab } from "@/components/supplier-panel/SupplierPanelClientsTab"
import { SupplierPanelLogisticsTab } from "@/components/supplier-panel/SupplierPanelLogisticsTab"
import { SupplierPanelFinanceTab } from "@/components/supplier-panel/SupplierPanelFinanceTab"
import { SupplierPanelReportsTab } from "@/components/supplier-panel/SupplierPanelReportsTab"
import { cn } from "@/lib/utils"

type SupplierTab =
  | "overview"
  | "product-catalog"
  | "bulk-orders"
  | "warehouse"
  | "clients"
  | "logistics"
  | "finance"
  | "reports"

interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

const tabs: Array<{
  value: SupplierTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "overview", label: "Overview", icon: ClipboardList },
  { value: "product-catalog", label: "Product Catalog", icon: Package },
  { value: "bulk-orders", label: "Bulk Orders", icon: PackageSearch },
  { value: "warehouse", label: "Warehouse", icon: Package },
  { value: "clients", label: "Clients", icon: Users },
  { value: "logistics", label: "Logistics", icon: Truck },
  { value: "finance", label: "Finance", icon: DollarSign },
  { value: "reports", label: "Reports", icon: ClipboardList },
]

const stats: StatItem[] = [
  {
    title: "Total Revenue",
    value: "$89,240",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Bulk Orders",
    value: "127",
    change: "+22%",
    trend: "up",
    icon: PackageSearch,
  },
  {
    title: "Low Stock Items",
    value: "18",
    change: "-5%",
    trend: "down",
    icon: Package,
  },
  {
    title: "Active Clients",
    value: "342",
    change: "+12%",
    trend: "up",
    icon: Users,
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

export default function SupplierPanelPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Supplier Panel"
        description="Manage bulk orders, inventory, and logistics"
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

        <SupplierPanelOverviewTab />
        <SupplierPanelProductCatalogTab />
        <SupplierPanelBulkOrdersTab />
        <SupplierPanelWarehouseTab />
        <SupplierPanelClientsTab />
        <SupplierPanelLogisticsTab />
        <SupplierPanelFinanceTab />
        <SupplierPanelReportsTab />
      </Tabs>
    </div>
  )
}
