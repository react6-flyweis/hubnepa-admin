import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  changeType?: "positive" | "negative"
  icon: React.ReactNode
  iconClassName?: string
}

export type { StatsCardProps }

const changeTypeMap = {
  positive: {
    accent: "bg-emerald-500/10",
    changeText: "text-emerald-600",
  },
  negative: {
    accent: "bg-rose-500/10",
    changeText: "text-rose-600",
  },
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  iconClassName,
}: StatsCardProps) {
  const typeConfig = changeTypeMap[changeType]
  const ArrowIcon = changeType === "positive" ? TrendingUp : TrendingDown

  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconClassName
          )}
        >
          {icon}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 font-semibold",
            typeConfig.changeText
          )}
        >
          <ArrowIcon className="h-5" />
          <span>{change}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="font-display text-lg font-medium text-muted-foreground">
          {title}
        </p>
        <div className="text-2xl font-semibold tracking-tight text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}
