import {
  LayoutGrid,
  Package,
  Store,
  UtensilsCrossed,
  UserPlus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PlatformBreakdownItem = {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

const platformBreakdownItems: PlatformBreakdownItem[] = [
  {
    title: "New Users (Today)",
    value: "124",
    icon: UserPlus,
  },
  {
    title: "Retailers",
    value: "180",
    icon: Store,
  },
  {
    title: "Restaurants",
    value: "160",
    icon: UtensilsCrossed,
  },
  {
    title: "Products",
    value: "4,500",
    icon: Package,
  },
  {
    title: "Food Items",
    value: "2,800",
    icon: UtensilsCrossed,
  },
  {
    title: "Categories",
    value: "45",
    icon: LayoutGrid,
  },
]

export function PlatformBreakdownSection() {
  return (
    <Card className="border-0 bg-slate-950 text-slate-50 ring-1 ring-slate-800">
      <CardHeader className="space-y-1.5">
        <CardTitle className="font-display text-2xl font-semibold tracking-tight text-slate-50">
          Platform Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {platformBreakdownItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4"
              >
                <div className="mb-5 flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/90 text-slate-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-5 text-slate-400">
                    {item.title}
                  </p>
                </div>
                <p className="text-2xl font-semibold tracking-tight text-slate-50">
                  {item.value}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
