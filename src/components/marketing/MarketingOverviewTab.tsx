import {
  Bell,
  Eye,
  ImagePlus,
  Megaphone,
  Smartphone,
  Tag,
  TrendingDown,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type MarketingMetricKey = "campaigns" | "reach" | "redemptions" | "ctr"

type MarketingMetricTrend = "positive" | "negative"

type MarketingMetric = {
  key: MarketingMetricKey
  title: string
  value: string
  change: string
  trend: MarketingMetricTrend
  icon: LucideIcon
}

type QuickActionTone = "green" | "blue" | "amber" | "pink"

type QuickAction = {
  title: string
  subtitle: string
  tone: QuickActionTone
  icon: LucideIcon
}

type CampaignPerformanceDatum = {
  day: string
  reach: number
  clicks: number
}

const metricIconColorMap: Record<
  MarketingMetricKey,
  { containerClassName: string; iconClassName: string }
> = {
  campaigns: {
    containerClassName: "bg-emerald-50",
    iconClassName: "text-emerald-600",
  },
  reach: {
    containerClassName: "bg-blue-50",
    iconClassName: "text-blue-600",
  },
  redemptions: {
    containerClassName: "bg-amber-50",
    iconClassName: "text-amber-600",
  },
  ctr: {
    containerClassName: "bg-fuchsia-50",
    iconClassName: "text-fuchsia-600",
  },
}

const trendColorMap: Record<
  MarketingMetricTrend,
  {
    badgeClassName: string
    iconClassName: string
    Icon: LucideIcon
  }
> = {
  positive: {
    badgeClassName: "bg-emerald-100 text-emerald-700",
    iconClassName: "text-emerald-600",
    Icon: TrendingUp,
  },
  negative: {
    badgeClassName: "bg-slate-100 text-slate-600",
    iconClassName: "text-slate-500",
    Icon: TrendingDown,
  },
}

const quickActionColorMap: Record<
  QuickActionTone,
  { containerClassName: string; iconClassName: string }
> = {
  green: {
    containerClassName: "bg-emerald-50",
    iconClassName: "text-emerald-600",
  },
  blue: {
    containerClassName: "bg-blue-50",
    iconClassName: "text-blue-600",
  },
  amber: {
    containerClassName: "bg-amber-50",
    iconClassName: "text-amber-600",
  },
  pink: {
    containerClassName: "bg-pink-50",
    iconClassName: "text-pink-600",
  },
}

const marketingMetrics: MarketingMetric[] = [
  {
    key: "campaigns",
    title: "Active Campaigns",
    value: "12",
    change: "+12%",
    trend: "positive",
    icon: Megaphone,
  },
  {
    key: "reach",
    title: "Total Reach",
    value: "45.2k",
    change: "+5.4%",
    trend: "positive",
    icon: Eye,
  },
  {
    key: "redemptions",
    title: "Coupon Redemptions",
    value: "892",
    change: "-2%",
    trend: "negative",
    icon: Tag,
  },
  {
    key: "ctr",
    title: "Click-Through Rate",
    value: "3.8%",
    change: "+24%",
    trend: "positive",
    icon: Smartphone,
  },
]

const quickActions: QuickAction[] = [
  {
    title: "New Campaign",
    subtitle: "Multi-channel promotion",
    tone: "green",
    icon: Megaphone,
  },
  {
    title: "Push Notification",
    subtitle: "Send alerts to users",
    tone: "blue",
    icon: Bell,
  },
  {
    title: "Create Coupon",
    subtitle: "Discounts and vouchers",
    tone: "amber",
    icon: Tag,
  },
  {
    title: "Add Banner",
    subtitle: "Homepage sliders",
    tone: "pink",
    icon: ImagePlus,
  },
]

const campaignPerformanceData: CampaignPerformanceDatum[] = [
  { day: "Mon", reach: 4000, clicks: 2500 },
  { day: "Tue", reach: 3000, clicks: 1500 },
  { day: "Wed", reach: 2000, clicks: 10000 },
  { day: "Thu", reach: 2800, clicks: 4000 },
  { day: "Fri", reach: 2000, clicks: 4800 },
  { day: "Sat", reach: 2300, clicks: 3800 },
  { day: "Sun", reach: 3500, clicks: 4300 },
]

const campaignPerformanceChartConfig = {
  reach: {
    label: "Reach",
    color: "#10b981",
  },
  clicks: {
    label: "Clicks",
    color: "#3b82f6",
  },
} satisfies ChartConfig

function MarketingMetricCard({ metric }: { metric: MarketingMetric }) {
  const Icon = metric.icon
  const iconConfig = metricIconColorMap[metric.key]
  const trendConfig = trendColorMap[metric.trend]
  const TrendIcon = trendConfig.Icon

  return (
    <Card className="min-w-0 gap-0 rounded-xl border-[#dbe3ee] bg-white py-0 shadow-none ring-1 ring-[#d6deeb]">
      <CardHeader className="flex flex-row items-center justify-between px-3.5 pt-3.5 pb-2.5">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md",
            iconConfig.containerClassName
          )}
        >
          <Icon className={cn("size-3.5", iconConfig.iconClassName)} />
        </div>

        <Badge
          className={cn("h-5 gap-1 px-2 text-xs", trendConfig.badgeClassName)}
        >
          <TrendIcon className={cn("size-3", trendConfig.iconClassName)} />
          {metric.change}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-1 px-3.5 pb-3.5">
        <p className="text-3xl leading-none font-semibold text-[#13243b]">
          {metric.value}
        </p>
        <p className="text-sm text-[#6b7b93]">{metric.title}</p>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({ action }: { action: QuickAction }) {
  const Icon = action.icon
  const toneConfig = quickActionColorMap[action.tone]

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-muted"
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          toneConfig.containerClassName
        )}
      >
        <Icon className={cn("size-4", toneConfig.iconClassName)} />
      </div>

      <div className="flex-1">
        <p className="text-base font-semibold text-[#1d2942]">{action.title}</p>
        <p className="text-sm text-[#7688a1]">{action.subtitle}</p>
      </div>
    </button>
  )
}

export function MarketingOverviewTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {marketingMetrics.map((metric) => (
          <MarketingMetricCard key={metric.key} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.9fr)_320px]">
        <Card className="rounded-xl border-[#dbe3ee] bg-white py-0 shadow-none ring-1 ring-[#d6deeb]">
          <CardHeader className="space-y-0 px-4 pt-3.5 pb-1.5">
            <CardTitle className="font-display text-2xl font-semibold text-[#1d2942]">
              Campaign Performance
            </CardTitle>
            <CardDescription className="text-sm text-[#71849f]">
              Reach vs Clicks over the last 7 days
            </CardDescription>
          </CardHeader>

          <CardContent className="px-3 pb-2.5">
            <ChartContainer
              config={campaignPerformanceChartConfig}
              className="h-80 w-full text-sm"
            >
              <LineChart
                data={campaignPerformanceData}
                margin={{ top: 8, right: 8, left: 4, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  domain={[0, 10000]}
                  ticks={[0, 2500, 5000, 7500, 10000]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke="var(--color-reach)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="var(--color-clicks)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>

            <div className="mt-2 flex items-center justify-center gap-5 text-sm font-medium">
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Reach
              </span>
              <span className="inline-flex items-center gap-1 text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Clicks
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-[#dbe3ee] bg-white py-0 shadow-none ring-1 ring-[#d6deeb]">
          <CardHeader className="space-y-0 px-4 pt-3.5 pb-1">
            <CardTitle className="font-display text-2xl font-semibold text-[#1d2942]">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-sm text-[#71849f]">
              Launch new marketing initiatives
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5 px-4 pt-2 pb-3.5">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} action={action} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
