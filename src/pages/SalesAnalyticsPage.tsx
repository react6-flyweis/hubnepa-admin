import {
  CalendarDays,
  Download,
  TrendingUp,
  UsersRound,
  WalletCards,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
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
import type { LucideIcon } from "lucide-react"

type RevenueDatum = {
  month: string
  retail: number
  restaurant: number
}

type SalesCategoryDatum = {
  key: string
  label: string
  value: number
  fill: string
}

type AnalyticsMetricTone = "neutral" | "positive" | "excellent"

type AnalyticsMetric = {
  title: string
  value: string
  change: string
  icon: LucideIcon
  tone: AnalyticsMetricTone
}

const revenueData: RevenueDatum[] = [
  { month: "Jan", retail: 4000, restaurant: 2500 },
  { month: "Feb", retail: 3000, restaurant: 1400 },
  { month: "Mar", retail: 2000, restaurant: 9800 },
  { month: "Apr", retail: 2800, restaurant: 3900 },
  { month: "May", retail: 1900, restaurant: 4800 },
  { month: "Jun", retail: 2400, restaurant: 3800 },
]

const revenueChartConfig = {
  retail: {
    label: "Retail",
    color: "#8b89e8",
  },
  restaurant: {
    label: "Restaurant",
    color: "#72ca9a",
  },
} satisfies ChartConfig

const salesCategoryData: SalesCategoryDatum[] = [
  {
    key: "electronics",
    label: "Electronics",
    value: 34,
    fill: "#1e84e5",
  },
  {
    key: "foodAndBeverage",
    label: "Food & Bev",
    value: 26,
    fill: "#10bea2",
  },
  {
    key: "fashion",
    label: "Fashion",
    value: 22,
    fill: "#f5b72d",
  },
  {
    key: "home",
    label: "Home",
    value: 18,
    fill: "#ff8a34",
  },
]

const salesCategoryChartConfig = {
  electronics: {
    label: "Electronics",
    color: "#1e84e5",
  },
  foodAndBeverage: {
    label: "Food & Bev",
    color: "#10bea2",
  },
  fashion: {
    label: "Fashion",
    color: "#f5b72d",
  },
  home: {
    label: "Home",
    color: "#ff8a34",
  },
} satisfies ChartConfig

const analyticsMetrics: AnalyticsMetric[] = [
  {
    title: "Customer Acquisition Cost",
    value: "$12.50",
    change: "-4% from last month",
    icon: UsersRound,
    tone: "neutral",
  },
  {
    title: "Average Order Value",
    value: "$45.00",
    change: "+2% from last month",
    icon: WalletCards,
    tone: "positive",
  },
  {
    title: "Retention Rate",
    value: "85%",
    change: "↗ Excellent",
    icon: TrendingUp,
    tone: "excellent",
  },
]

const analyticsMetricToneMap: Record<
  AnalyticsMetricTone,
  { textClassName: string }
> = {
  neutral: {
    textClassName: "text-[#6f8096]",
  },
  positive: {
    textClassName: "text-[#6f8096]",
  },
  excellent: {
    textClassName: "text-emerald-600",
  },
}

function formatRevenueValue(value: number) {
  return `$${value.toLocaleString()}`
}

function AnalyticsMetricCard({ metric }: { metric: AnalyticsMetric }) {
  const Icon = metric.icon
  const toneConfig = analyticsMetricToneMap[metric.tone]

  return (
    <Card className="rounded-2xl border-[#d8dee9] bg-white py-0 shadow-none ring-1 ring-[#d6dde8]">
      <CardHeader className="flex flex-row items-start justify-between px-5 pt-5 pb-0">
        <CardTitle className="font-display text-xl leading-snug font-semibold text-[#1f2d45]">
          {metric.title}
        </CardTitle>
        <Icon className="mt-1 size-4 text-[#8ca0b9]" />
      </CardHeader>
      <CardContent className="px-5 pt-3 pb-4">
        <p className="text-2xl leading-none font-semibold tracking-tight text-[#0d1328]">
          {metric.value}
        </p>
        <p className={cn("mt-2 text-sm font-medium", toneConfig.textClassName)}>
          {metric.change}
        </p>
      </CardContent>
    </Card>
  )
}

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-3xl leading-tight font-semibold text-[#152338] sm:text-4xl">
            Sales &amp; Analytics
          </h1>
          <p className="mt-1 text-base text-[#73839a]">
            Deep dive into platform performance and user behavior.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" className="px-4">
            <CalendarDays className="size-4" />
            Last 30 Days
          </Button>
          <Button className="bg-[#0f1f3b] px-4 hover:bg-[#101f37]">
            <Download className="size-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,0.9fr)]">
        <Card className="rounded-2xl border-[#d8dee9] bg-white py-0 shadow-none ring-1 ring-[#d6dde8]">
          <CardHeader className="space-y-1 px-5 pt-5 pb-2">
            <CardTitle className="font-display text-2xl leading-none font-semibold text-[#1f2d45]">
              Revenue Growth
            </CardTitle>
            <CardDescription className="text-base text-[#73839a]">
              Comparison between Retail and Restaurant sectors.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <ChartContainer
              config={revenueChartConfig}
              className="h-[320px] w-full text-sm"
            >
              <AreaChart
                data={revenueData}
                margin={{ top: 8, right: 10, left: 8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="retail-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b89e8" stopOpacity={0.38} />
                    <stop offset="95%" stopColor="#8b89e8" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="restaurant-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#72ca9a" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#72ca9a" stopOpacity={0.06} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  domain={[0, 10000]}
                  ticks={[0, 2500, 5000, 7500, 10000]}
                />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => (
                        <span className="font-medium text-foreground">
                          {formatRevenueValue(Number(value))}
                        </span>
                      )}
                    />
                  }
                />

                <Area
                  dataKey="restaurant"
                  type="monotone"
                  stroke="var(--color-restaurant)"
                  strokeWidth={2}
                  fill="url(#restaurant-fill)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />

                <Area
                  dataKey="retail"
                  type="monotone"
                  stroke="var(--color-retail)"
                  strokeWidth={2}
                  fill="url(#retail-fill)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#d8dee9] bg-white py-0 shadow-none ring-1 ring-[#d6dde8]">
          <CardHeader className="space-y-1 px-5 pt-5 pb-2">
            <CardTitle className="font-display text-2xl leading-none font-semibold text-[#1f2d45]">
              Sales by Category
            </CardTitle>
            <CardDescription className="text-base text-[#73839a]">
              Top performing product categories.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <ChartContainer
              config={salesCategoryChartConfig}
              className="mx-auto h-[230px] w-full max-w-[260px]"
            >
              <PieChart>
                <Pie
                  data={salesCategoryData}
                  dataKey="value"
                  nameKey="key"
                  innerRadius={54}
                  outerRadius={78}
                  startAngle={110}
                  endAngle={-250}
                  strokeWidth={6}
                >
                  {salesCategoryData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={entry.fill}
                      stroke="#f8fafc"
                      strokeWidth={4}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => (
                        <span className="font-medium text-foreground">
                          {String(name)}: {value}%
                        </span>
                      )}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>

            <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-base">
              {salesCategoryData.map((entry) => (
                <div key={entry.key} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-[2px]"
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span style={{ color: entry.fill }}>{entry.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {analyticsMetrics.map((metric) => (
          <AnalyticsMetricCard key={metric.title} metric={metric} />
        ))}
      </div>
    </div>
  )
}
