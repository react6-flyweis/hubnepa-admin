import { useMemo } from "react"
import { useNavigate, useParams } from "react-router"
import { AlertCircle, ArrowLeft, Clock3, MapPin } from "lucide-react"

import { users } from "@/data/users"

import { RouteDetailsDialog } from "@/components/delivery-logs/RouteDetailsDialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DeliveryStatus = "Delivered" | "Failed"
type RouteTimelineState = "past" | "success" | "issue"

interface RouteTimelineItem {
  id: string
  label: string
  time: string
  state: RouteTimelineState
}

interface RouteDetails {
  distance: string
  eta: string
  driverPhone?: string
  driverImage?: string
  timeline: RouteTimelineItem[]
}

interface DeliveryLog {
  id: string
  orderId: string
  address: string
  timestamp: string
  status: DeliveryStatus
  driver: string
  duration: string
  failureReason?: string
  routeDetails: RouteDetails
}

const deliveryStatusColorMap: Record<DeliveryStatus, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Failed: "bg-rose-100 text-rose-700",
}

const deliveryBorderColorMap: Record<DeliveryStatus, string> = {
  Delivered: "before:bg-emerald-500",
  Failed: "before:bg-rose-500",
}

const mockDeliveryLogs: DeliveryLog[] = [
  {
    id: "DLV-1023",
    orderId: "ORD-5521",
    address: "123 Main St, Apt 4B, New York, NY",
    timestamp: "Feb 12, 2024 - 12:45 PM",
    status: "Delivered",
    driver: "Mike S.",
    duration: "25 mins",
    routeDetails: {
      distance: "4.2 miles",
      eta: "25 mins",
      driverPhone: "+1 (555) 019-221",
      driverImage: "",
      timeline: [
        {
          id: "pickup",
          label: "Picked up from restaurant",
          time: "12:20 PM",
          state: "past",
        },
        {
          id: "arrival",
          label: "Arrived at location",
          time: "12:35 PM",
          state: "past",
        },
        {
          id: "delivery",
          label: "Delivered to customer",
          time: "12:45 PM",
          state: "success",
        },
      ],
    },
  },
  {
    id: "DLV-1022",
    orderId: "ORD-5520",
    address: "123 Main St, Apt 4B, New York, NY",
    timestamp: "Feb 10, 2024 - 06:30 PM",
    status: "Delivered",
    driver: "John D.",
    duration: "32 mins",
    routeDetails: {
      distance: "5.1 miles",
      eta: "32 mins",
      driverPhone: "+1 (555) 012-874",
      timeline: [
        {
          id: "pickup",
          label: "Picked up from restaurant",
          time: "05:58 PM",
          state: "past",
        },
        {
          id: "arrival",
          label: "Arrived at location",
          time: "06:21 PM",
          state: "past",
        },
        {
          id: "delivery",
          label: "Delivered to customer",
          time: "06:30 PM",
          state: "success",
        },
      ],
    },
  },
  {
    id: "DLV-1015",
    orderId: "ORD-5490",
    address: "Office Building 5, Floor 3, New York, NY",
    timestamp: "Feb 05, 2024 - 01:15 PM",
    status: "Failed",
    driver: "-",
    duration: "-",
    failureReason: "Customer unreachable",
    routeDetails: {
      distance: "3.6 miles",
      eta: "18 mins",
      timeline: [
        {
          id: "pickup",
          label: "Picked up from restaurant",
          time: "12:58 PM",
          state: "past",
        },
        {
          id: "arrival",
          label: "Arrived at location",
          time: "01:11 PM",
          state: "past",
        },
        {
          id: "failure",
          label: "Delivery failed",
          time: "01:15 PM",
          state: "issue",
        },
      ],
    },
  },
]

export default function DeliveryLogsPage() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()

  const currentUser = useMemo(
    () => users.find((user) => user.id === userId) ?? users[0],
    [userId]
  )

  return (
    <div className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <h1 className="font-display text-xl font-semibold">
              Delivery Logs
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Track delivery performance for{" "}
              <span className="font-semibold text-slate-900">
                {currentUser.name}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {mockDeliveryLogs.map((deliveryLog) => (
          <Card
            key={deliveryLog.id}
            className={cn(
              "font-sherif relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 before:absolute before:inset-y-0 before:left-0 before:w-1",
              deliveryBorderColorMap[deliveryLog.status]
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
              <div className="p-5 pl-8 sm:p-6 sm:pl-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
                  >
                    {deliveryLog.id}
                  </Badge>
                  <p className="text-lg font-medium text-slate-800">
                    Order #{deliveryLog.orderId}
                  </p>
                  <Badge
                    className={cn(
                      "ml-auto rounded-full px-3 py-1 text-xs font-semibold",
                      deliveryStatusColorMap[deliveryLog.status]
                    )}
                  >
                    {deliveryLog.status}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </p>
                    <p className="mt-1 text-base text-slate-700">
                      {deliveryLog.address}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      <Clock3 className="h-4 w-4" />
                      Timestamp
                    </p>
                    <p className="mt-1 text-base text-slate-700">
                      {deliveryLog.timestamp}
                    </p>
                  </div>
                </div>

                {deliveryLog.failureReason && (
                  <div className="mt-5 flex items-center gap-2 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-rose-600">
                    <AlertCircle className="h-4 w-4" />
                    <p className="font-medium">
                      Failed Reason: {deliveryLog.failureReason}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 bg-slate-50/80 p-5 md:border-t-0 md:border-l md:p-6">
                <dl className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-sm text-slate-500">Driver</dt>
                    <dd className="text-base font-semibold text-slate-800">
                      {deliveryLog.driver}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-sm text-slate-500">Duration</dt>
                    <dd className="text-base font-semibold text-slate-800">
                      {deliveryLog.duration}
                    </dd>
                  </div>
                </dl>

                <RouteDetailsDialog deliveryLog={deliveryLog} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
