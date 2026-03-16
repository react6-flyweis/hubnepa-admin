import {
  StatsCard,
  type StatsCardProps,
} from "@/components/dashboard/StatsCard"
import { CreditCard, DollarSign, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"

const stats: StatsCardProps[] = [
  {
    title: "Sales",
    value: "$45,250",
    change: "12.5%",
    changeType: "positive",
    icon: <DollarSign className="h-5 w-5" />,
    iconClassName: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Expenses",
    value: "$28,150",
    change: "8.2%",
    changeType: "negative",
    icon: <Wallet className="h-5 w-5" />,
    iconClassName: "bg-rose-500/10 text-rose-600",
  },
  {
    title: "Total Staff",
    value: "24",
    change: "+2 ",
    changeType: "positive",
    icon: <Users className="h-5 w-5" />,
    iconClassName: "bg-sky-500/10 text-sky-600",
  },
  {
    title: "Salary",
    value: "$18,500",
    change: "5.7%",
    changeType: "positive",
    icon: <CreditCard className="h-5 w-5" />,
    iconClassName: "bg-amber-500/10 text-amber-600",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Admin Dashboard"
        description="Platform overview and performance metrics."
        right={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="outline" size="lg">
              Download Report
            </Button>
            <Button size="lg" className="bg-black">
              System Health
            </Button>
          </div>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  )
}
