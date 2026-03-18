import { useMemo, useState } from "react"
import {
  ForkKnifeCrossed,
  ListFilter,
  Plus,
  Search,
  ShoppingBag,
} from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductManagementTable } from "@/components/product-management/ProductManagementTable"
import { menuItems, retailProducts } from "@/data/products"
import type { Product } from "@/types/product"

type ActiveTab = "retail" | "menu"

const tabs: Array<{
  value: ActiveTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "retail", label: "Retail Products", icon: ShoppingBag },
  {
    value: "menu",
    label: "Restaurant Menu Items",
    icon: ForkKnifeCrossed,
  },
]

export default function ProductFoodPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("retail")
  const [search, setSearch] = useState("")

  const items = useMemo(() => {
    const source = activeTab === "retail" ? retailProducts : menuItems
    const lowerSearch = search.toLowerCase().trim()
    if (!lowerSearch) return source

    return source.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.vendor.toLowerCase().includes(lowerSearch)
      )
    })
  }, [activeTab, search])

  const searchPlaceholder =
    activeTab === "retail" ? "Search products..." : "Search menu items..."

  const vendorLabel = activeTab === "retail" ? "Vendor" : "Restaurant"

  function handleTabChange(value: string) {
    setActiveTab(value as ActiveTab)
    setSearch("")
  }

  const addButtonLabel =
    activeTab === "retail" ? "Add Product" : "Add Menu Item"

  const addButtonPath =
    activeTab === "retail" ? "/products/new" : "/products/menu/new"

  return (
    <div>
      <PageHeader
        title="Product & Food Management"
        description="Manage global catalog, approval requests, and categorization."
        right={
          <Button
            asChild
            size="lg"
            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Link to={addButtonPath}>
              <Plus className="h-4 w-4" />
              {addButtonLabel}
            </Link>
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <Card className="rounded-none p-4 ring-0">
          <TabsList className="w-fit bg-transparent">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="gap-2 px-3"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Card>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-4 space-y-4"
          >
            <Card className="shadow">
              <CardHeader className="flex items-center justify-between gap-3">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={searchPlaceholder}
                    className="h-10 bg-gray-100 pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <ProductManagementTable
                  items={items}
                  vendorLabel={vendorLabel}
                  emptyStateMessage={
                    activeTab === "retail"
                      ? "No products found."
                      : "No menu items found."
                  }
                  getEditUrl={(item: Product) =>
                    activeTab === "menu"
                      ? `/products/menu/${item.id}/edit`
                      : `/products/${item.id}/edit`
                  }
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
