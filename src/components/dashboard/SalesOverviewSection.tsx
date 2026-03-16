import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

type SalesOverviewDatum = {
  day: string
  revenue: number
}

const salesOverviewData: SalesOverviewDatum[] = [
  { day: "Mon", revenue: 4000 },
  { day: "Tue", revenue: 2900 },
  { day: "Wed", revenue: 2000 },
  { day: "Thu", revenue: 2800 },
  { day: "Fri", revenue: 1900 },
  { day: "Sat", revenue: 2400 },
  { day: "Sun", revenue: 3500 },
]

const salesOverviewChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#f59e0b",
  },
} satisfies ChartConfig

function formatCurrencyTick(value: number) {
  return `$${value}`
}

export function SalesOverviewSection() {
  return (
    <Card className="min-w-0">
      <CardHeader className="space-y-1">
        <CardTitle className="font-display text-2xl font-semibold tracking-tight text-foreground">
          Sales Overview
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Weekly revenue performance across all channels.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={salesOverviewChartConfig}
          className="aspect-auto h-80 w-full sm:h-96"
        >
          <AreaChart
            data={salesOverviewData}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="sales-overview-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.32} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              domain={[0, 4000]}
              ticks={[0, 1000, 2000, 3000, 4000]}
              tickFormatter={formatCurrencyTick}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-medium text-foreground">
                      {formatCurrencyTick(Number(value).valueOf())}
                    </span>
                  )}
                  labelFormatter={(label) => `Revenue · ${label}`}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={3}
              fill="url(#sales-overview-fill)"
              dot={false}
              activeDot={{ r: 5, fill: "#f59e0b", strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
