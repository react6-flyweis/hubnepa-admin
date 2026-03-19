import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AllCampaignsTab } from "@/components/marketing/AllCampaignsTab"
import { BannersTab } from "@/components/marketing/BannersTab"
import { CouponsTab } from "@/components/marketing/CouponsTab"
import { MarketingOverviewTab } from "@/components/marketing/MarketingOverviewTab"

export default function MarketingContentPage() {
  return (
    <div className="space-y-2.5">
      <PageHeader
        title="Marketing & Content"
        description="Manage banners, coupons, push notifications and SEO."
        right={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="px-3">
              <Search className="size-4" />
              SEO Settings
            </Button>
            <Button className="bg-emerald-500 px-3 text-white hover:bg-emerald-600">
              <Plus className="size-4" />
              Create Campaign
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="h-auto! w-full rounded-xl border border-slate-200 bg-white p-1">
          <TabsTrigger
            value="overview"
            className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
          >
            All Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="banners"
            className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
          >
            Banners
          </TabsTrigger>
          <TabsTrigger
            value="coupons"
            className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
          >
            Coupons
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-3">
          <MarketingOverviewTab />
        </TabsContent>

        <TabsContent value="campaigns" className="mt-3">
          <AllCampaignsTab />
        </TabsContent>

        <TabsContent value="banners" className="mt-3">
          <BannersTab />
        </TabsContent>

        <TabsContent value="coupons" className="mt-3">
          <CouponsTab />
        </TabsContent>

        <TabsContent value="notifications" className="mt-3">
          <MarketingOverviewTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
