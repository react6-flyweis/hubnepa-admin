import { useState } from "react"
import { ListFilter, Plus, Search, ShoppingBag, Store } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PartnerManagementTable } from "@/components/partner-management/PartnerManagementTable"
import { partners } from "@/data/partners"

type ActiveTab = "restaurants" | "retailers"

export default function PartnerManagementPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("restaurants")
  const [search, setSearch] = useState("")

  const filteredPartners = partners.filter((p) => {
    const matchesTab =
      activeTab === "restaurants"
        ? p.type === "restaurant"
        : p.type === "retailer"
    const matchesSearch =
      p.businessName.toLowerCase().includes(search.toLowerCase()) ||
      p.owner.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  function handleTabChange(value: string) {
    setActiveTab(value as ActiveTab)
    setSearch("")
  }

  const searchPlaceholder =
    activeTab === "restaurants"
      ? "Search restaurants..."
      : "Search retailers..."

  return (
    <div>
      <PageHeader
        title="Partner Management"
        description="Onboard, verify, and manage restaurants and retailers."
        right={
          <Button
            asChild
            size="lg"
            className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Link to="/partners/new">
              <Plus className="h-4 w-4" />
              Add New Partner
            </Link>
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
        <Card className="rounded-none p-4 ring-0">
          <TabsList className="w-fit bg-transparent">
            <TabsTrigger value="restaurants" className="gap-2 px-3">
              <Store className="h-4 w-4" />
              Restaurants
            </TabsTrigger>
            <TabsTrigger value="retailers" className="gap-2 px-3">
              <ShoppingBag className="h-4 w-4" />
              Retailers (Vendors)
            </TabsTrigger>
          </TabsList>
        </Card>

        {(["restaurants", "retailers"] as ActiveTab[]).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
            {/* Search & Filter */}
            <Card className="p-4 shadow">
              <div className="flex items-center justify-between gap-3">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder={searchPlaceholder}
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <ListFilter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </Card>

            {/* Table */}
            <Card className="rounded-none border py-0 shadow ring-0">
              <PartnerManagementTable partners={filteredPartners} />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
