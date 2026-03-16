import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  Database,
  Globe,
  HardDrive,
  RefreshCw,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type ServiceStatus = {
  name: string
  uptime: string
  latency: string
  icon: LucideIcon
  status: "operational" | "degraded" | "outage"
}

type LogEntry = {
  message: string
  source: string
  time: string
  type: "error" | "warning" | "success" | "info"
}

type ServerResource = {
  name: string
  value: number
  color: string
}

const serviceStatuses: ServiceStatus[] = [
  {
    name: "API Gateway",
    uptime: "99.99%",
    latency: "45ms",
    icon: Globe,
    status: "operational",
  },
  {
    name: "Primary Database (PostgreSQL)",
    uptime: "99.95%",
    latency: "12ms",
    icon: Database,
    status: "operational",
  },
  {
    name: "Object Storage (CDN)",
    uptime: "100%",
    latency: "24ms",
    icon: HardDrive,
    status: "operational",
  },
  {
    name: "Payment Processing",
    uptime: "99.9%",
    latency: "-",
    icon: CreditCard,
    status: "operational",
  },
]

const statusColorMap: Record<ServiceStatus["status"], string> = {
  operational: "bg-emerald-100 text-emerald-700",
  degraded: "bg-amber-100 text-amber-700",
  outage: "bg-red-100 text-red-700",
}

const latencyData = [
  { time: "10:00", latency: 125 },
  { time: "10:05", latency: 132 },
  { time: "10:10", latency: 110 },
  { time: "10:15", latency: 150 },
  { time: "10:20", latency: 195 },
  { time: "10:25", latency: 148 },
  { time: "10:30", latency: 125 },
]

const latencyChartConfig = {
  latency: {
    label: "Latency (ms)",
    color: "#f59e0b",
  },
} satisfies ChartConfig

const serverResources: ServerResource[] = [
  { name: "CPU Usage", value: 42, color: "bg-blue-500" },
  { name: "Memory (RAM)", value: 68, color: "bg-purple-500" },
  { name: "Storage", value: 24, color: "bg-emerald-500" },
]

const recentLogs: LogEntry[] = [
  {
    message: "Failed to connect to SMTP",
    source: "Notifications",
    time: "10:24 AM",
    type: "error",
  },
  {
    message: "High memory usage detected",
    source: "Worker-01",
    time: "10:15 AM",
    type: "warning",
  },
  {
    message: "Daily backup completed successfully",
    source: "Backup Service",
    time: "09:00 AM",
    type: "success",
  },
  {
    message: "New deployment version v2.4.1",
    source: "Deployer",
    time: "08:30 AM",
    type: "info",
  },
]

const logIconMap: Record<
  LogEntry["type"],
  { icon: LucideIcon; className: string }
> = {
  error: { icon: AlertCircle, className: "text-red-500" },
  warning: { icon: AlertTriangle, className: "text-amber-500" },
  success: { icon: CheckCircle2, className: "text-emerald-500" },
  info: { icon: Clock, className: "text-blue-500" },
}

export default function SystemHealthPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-semibold">
              System Health
            </h1>
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-1 text-lg text-gray-600">
            Real-time infrastructure monitoring and status reports.
          </p>
        </div>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      {/* Service Status Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {serviceStatuses.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.name} className="gap-3">
              <CardHeader className="flex flex-row items-start justify-between pb-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    statusColorMap[service.status]
                  )}
                >
                  {service.status.charAt(0).toUpperCase() +
                    service.status.slice(1)}
                </span>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="leading-snug font-medium text-gray-900">
                  {service.name}
                </p>
                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <span>
                    Uptime:{" "}
                    <span className="font-semibold text-gray-700">
                      {service.uptime}
                    </span>
                  </span>
                  <span>
                    Lat:{" "}
                    <span className="font-semibold text-gray-700">
                      {service.latency}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Chart + Resources + Logs */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
        {/* API Latency Chart */}
        <Card className="min-w-0">
          <CardHeader className="space-y-1">
            <CardTitle className="font-display text-2xl font-semibold tracking-tight">
              API Latency &amp; Traffic
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Response time in milliseconds (ms) over the last 30 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={latencyChartConfig}
              className="aspect-auto h-72 w-full sm:h-80"
            >
              <AreaChart
                data={latencyData}
                margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="latency-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  domain={[0, 200]}
                  ticks={[0, 50, 100, 150, 200]}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => (
                        <span className="font-medium text-foreground">
                          {value}ms
                        </span>
                      )}
                      labelFormatter={(label) => `Time · ${label}`}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="latency"
                  stroke="var(--color-latency)"
                  strokeWidth={3}
                  fill="url(#latency-fill)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#f59e0b", strokeWidth: 0 }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Server Resources */}
          <div className="rounded-xl bg-[#0f172a] p-6 text-white">
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <HardDrive className="h-4 w-4 text-white" />
              </div>
              <h2 className="font-semibold text-white">Server Resources</h2>
            </div>
            <div className="space-y-5">
              {serverResources.map((resource) => (
                <div key={resource.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-300">{resource.name}</span>
                    <span className="font-semibold text-white">
                      {resource.value}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn("h-full rounded-full", resource.color)}
                      style={{ width: `${resource.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Logs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">
                Recent Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLogs.map((log, index) => {
                const { icon: LogIcon, className } = logIconMap[log.type]
                return (
                  <div key={index} className="flex items-start gap-3">
                    <LogIcon
                      className={cn("mt-0.5 h-4 w-4 shrink-0", className)}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {log.message}
                      </p>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">
                          {log.source}
                        </span>
                        <span className="text-xs text-gray-400">
                          {log.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <button className="mt-1 w-full text-center text-sm font-medium text-blue-600 hover:underline">
                View All Logs
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
