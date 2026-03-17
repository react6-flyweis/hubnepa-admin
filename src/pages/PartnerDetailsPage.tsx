import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShoppingBag,
  Star,
  Store,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { partners } from "@/data/partners"
import type { PartnerStatus, PartnerVerification } from "@/types/partner"

const statusColorMap: Record<PartnerStatus, string> = {
  Active: "border-emerald-500 bg-emerald-50 text-emerald-600",
  Pending: "border-amber-400 bg-amber-50 text-amber-600",
  Suspended: "border-red-400 bg-red-50 text-red-500",
  Inactive: "border-gray-400 bg-gray-50 text-gray-500",
}

const verificationConfig: Record<
  PartnerVerification,
  { icon: React.ReactNode; className: string }
> = {
  Verified: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    className: "text-emerald-600",
  },
  "Pending Review": {
    icon: <AlertTriangle className="h-4 w-4" />,
    className: "text-amber-600",
  },
  Rejected: {
    icon: <XCircle className="h-4 w-4" />,
    className: "text-red-500",
  },
}

const orderStatusColorMap: Record<string, string> = {
  Delivered: "border-emerald-500 bg-emerald-50 text-emerald-600",
  Cancelled: "border-red-400 bg-red-50 text-red-500",
  Pending: "border-amber-400 bg-amber-50 text-amber-600",
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className={cn("h-full rounded-full", color)}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}

export default function PartnerDetailsPage() {
  const { partnerId } = useParams<{ partnerId: string }>()
  const navigate = useNavigate()

  const partner = partners.find((p) => p.id === partnerId)

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-700">Partner not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          No partner with ID "{partnerId}" exists.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => navigate("/partners")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Partners
        </Button>
      </div>
    )
  }

  const initials = partner.businessName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const verif = verificationConfig[partner.verification]

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="mt-1 shrink-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className={cn("size-14 shrink-0")}>
            <AvatarFallback
              className={cn(
                "text-lg font-bold text-white",
                partner.avatarColor ?? "bg-slate-500"
              )}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{partner.businessName}</h1>
              <Badge
                variant="outline"
                className={cn("font-medium", statusColorMap[partner.status])}
              >
                {partner.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Partner ID: {partner.id}
              {partner.joinDate && ` • Joined ${partner.joinDate}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2 sm:shrink-0">
          <Button asChild variant="outline">
            <Link to={`/partners/${partner.id}/verification-documents`}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Verify Documents
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={`/partners/${partner.id}/settings`}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
            label: "Total Orders",
            value: partner.totalOrders?.toLocaleString() ?? "—",
            bg: "bg-blue-50",
          },
          {
            icon: <span className="text-lg font-bold text-emerald-500">$</span>,
            label: "Total Revenue",
            value: partner.totalRevenue
              ? `$${partner.totalRevenue.toLocaleString()}`
              : "—",
            bg: "bg-emerald-50",
          },
          {
            icon: <Star className="h-5 w-5 text-amber-400" />,
            label: "Rating",
            value: partner.rating ?? "—",
            bg: "bg-amber-50",
          },
          {
            icon: <Store className="h-5 w-5 text-purple-500" />,
            label: "Outlets",
            value: partner.outlets ?? "—",
            bg: "bg-purple-50",
          },
        ].map((stat) => (
          <Card key={stat.label} className="gap-2 rounded-md">
            <CardContent className="flex items-center gap-3 py-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  stat.bg
                )}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Business Information */}
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base font-semibold">
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Owner Name
                  </p>
                  <p className="mt-1 font-medium">{partner.owner}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Category
                  </p>
                  <p className="mt-1 font-medium">
                    {partner.category} •{" "}
                    {partner.type === "restaurant" ? "Restaurant" : "Retailer"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Email Address
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{partner.email ?? "—"}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Phone Number
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {partner.phone ?? "—"}
                  </p>
                </div>
              </div>
              {partner.address && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Address
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-medium">
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {partner.address}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <CardTitle className="text-base font-semibold">
                Recent Orders
              </CardTitle>
              <Link
                to={`/orders`}
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                View All
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {!partner.recentOrders || partner.recentOrders.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No orders yet.
                </p>
              ) : (
                <ul className="divide-y">
                  {partner.recentOrders.map((order) => (
                    <li
                      key={order.id}
                      className="flex items-center gap-4 px-6 py-3"
                    >
                      <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500">
                        #{order.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items} item{order.items !== 1 ? "s" : ""} • $
                          {order.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-medium",
                            orderStatusColorMap[order.status]
                          )}
                        >
                          {order.status}
                        </Badge>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {order.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Commission Rate */}
          <Card className="bg-slate-900 text-white">
            <CardHeader className="border-b border-slate-700">
              <CardTitle className="text-base font-semibold text-white">
                Commission Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-5xl font-bold text-emerald-400">
                  {partner.commissionRate ?? "—"}%
                </span>
                <span className="ml-2 text-sm text-slate-400">per order</span>
              </div>
              <Separator className="bg-slate-700" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Current Plan</span>
                  <span className="font-semibold">
                    {partner.currentPlan ?? "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Payout</span>
                  <span className="font-semibold">
                    {partner.nextPayout ?? "—"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base font-semibold">
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Store Status</span>
                {partner.storeStatus ? (
                  <Badge
                    variant="outline"
                    className={
                      partner.storeStatus === "Open Now"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "border-gray-400 bg-gray-50 text-gray-500"
                    }
                  >
                    {partner.storeStatus}
                  </Badge>
                ) : (
                  <span>—</span>
                )}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Active</span>
                <span className="font-medium">{partner.lastActive ?? "—"}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verification</span>
                <div
                  className={cn(
                    "flex items-center gap-1 font-medium",
                    verif.className
                  )}
                >
                  {verif.icon}
                  {partner.verification}
                  {partner.verification === "Verified" && (
                    <ExternalLink className="h-3 w-3" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Performance */}
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base font-semibold">
                Store Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {partner.performance ? (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Order Acceptance
                      </span>
                      <span className="font-semibold">
                        {partner.performance.orderAcceptance}%
                      </span>
                    </div>
                    <ProgressBar
                      value={partner.performance.orderAcceptance}
                      color="bg-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        On-Time Delivery
                      </span>
                      <span className="font-semibold">
                        {partner.performance.onTimeDelivery}%
                      </span>
                    </div>
                    <ProgressBar
                      value={partner.performance.onTimeDelivery}
                      color="bg-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Customer Satisfaction
                      </span>
                      <span className="font-semibold">
                        {partner.performance.customerSatisfaction}/5.0
                      </span>
                    </div>
                    <ProgressBar
                      value={
                        (partner.performance.customerSatisfaction / 5) * 100
                      }
                      color="bg-amber-400"
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No performance data available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
