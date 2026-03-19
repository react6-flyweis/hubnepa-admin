import { useMemo, useState } from "react"
import { Clock3, Download, Percent, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinanceCommissionsTab from "@/components/finance/FinanceCommissionsTab"
import FinanceRefundsTab from "@/components/finance/FinanceRefundsTab"
import FinanceSettlementsTab from "@/components/finance/FinanceSettlementsTab"
import { ProcessPayoutsDialog } from "@/components/finance/ProcessPayoutsDialog"
import { cn } from "@/lib/utils"

type FinanceTab = "settlements" | "refunds" | "commissions"

interface FinanceSummaryCard {
  id: string
  title: string
  value: string
  helper: string
  icon: typeof Wallet
  active?: boolean
}

const financeSummaryCards: FinanceSummaryCard[] = [
  {
    id: "revenue",
    title: "Total Revenue (YTD)",
    value: "$425,000.00",
    helper: "+12%",
    icon: Wallet,
    active: true,
  },
  {
    id: "pending",
    title: "Pending Settlements",
    value: "$12,450.00",
    helper: "4 Pending",
    icon: Clock3,
  },
  {
    id: "commission",
    title: "Total Commissions",
    value: "$48,200.00",
    helper: "+5%",
    icon: Percent,
  },
]

const tabLabelMap: Record<FinanceTab, string> = {
  settlements: "Settlements",
  refunds: "Refunds",
  commissions: "Commissions",
}

export default function FinanceSettlementsPage() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("settlements")
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState(false)

  const { totalAmount, totalPartners } = useMemo(() => {
    const pendingCard = financeSummaryCards.find(
      (card) => card.id === "pending"
    )

    const partnerCount = pendingCard
      ? Number((pendingCard.helper.match(/\d+/) ?? [0])[0])
      : 0

    const amount = pendingCard
      ? Number(pendingCard.value.replace(/[^0-9.]/g, ""))
      : 0

    return {
      totalAmount: amount,
      totalPartners: partnerCount,
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold text-slate-900">
            Finance & Settlements
          </h1>
          <p className="mt-1 max-w-2xl text-base text-slate-500">
            Manage partner payouts, refunds, and financial reporting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-9 gap-2 bg-white px-3 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Download Reports
          </Button>
          <Button
            size="lg"
            className="h-9 gap-2 px-3 font-semibold"
            onClick={() => setIsPayoutDialogOpen(true)}
          >
            <Wallet className="h-4 w-4" />
            Process Payouts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {financeSummaryCards.map((card) => {
          const Icon = card.icon

          return (
            <Card
              key={card.id}
              className={cn(
                "rounded-2xl border border-slate-200 py-0 shadow-sm",
                card.active &&
                  "border-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white"
              )}
            >
              <CardContent className="p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      card.active ? "bg-teal-500/15" : "bg-slate-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        card.active ? "text-teal-300" : "text-slate-600"
                      )}
                    />
                  </div>

                  <p
                    className={cn(
                      "text-sm font-semibold",
                      card.active ? "text-emerald-300" : "text-slate-500"
                    )}
                  >
                    {card.helper}
                  </p>
                </div>

                <p
                  className={cn(
                    "text-[15px]",
                    card.active ? "text-slate-300" : "text-slate-500"
                  )}
                >
                  {card.title}
                </p>
                <p className="mt-2 font-display text-3xl leading-none font-semibold">
                  {card.value}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as FinanceTab)}
        className="gap-3"
      >
        <TabsList className="h-10 rounded-xl border border-slate-200 bg-white p-1">
          {(Object.keys(tabLabelMap) as FinanceTab[]).map((tabKey) => (
            <TabsTrigger
              key={tabKey}
              value={tabKey}
              className="h-8 min-w-28 rounded-lg px-4 text-sm data-active:bg-slate-100"
            >
              {tabLabelMap[tabKey]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {activeTab === "settlements" ? <FinanceSettlementsTab /> : null}
      {activeTab === "refunds" ? <FinanceRefundsTab /> : null}
      {activeTab === "commissions" ? <FinanceCommissionsTab /> : null}

      <ProcessPayoutsDialog
        open={isPayoutDialogOpen}
        onOpenChange={setIsPayoutDialogOpen}
        totalPartners={totalPartners}
        totalAmount={totalAmount}
        onConfirm={() => {
          // TODO: replace with real payout logic
          console.log("Confirmed payouts")
        }}
      />
    </div>
  )
}
