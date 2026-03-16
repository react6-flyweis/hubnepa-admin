import { MapPin, Navigation, Phone } from "lucide-react"

import routeMapImg from "@/assets/map.jpg"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

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

interface RouteDialogDeliveryLog {
  id: string
  orderId: string
  driver: string
  routeDetails: RouteDetails
}

interface RouteDetailsDialogProps {
  deliveryLog: RouteDialogDeliveryLog
}

const timelineMarkerColorMap: Record<RouteTimelineState, string> = {
  past: "bg-slate-300",
  success: "bg-emerald-500",
  issue: "bg-rose-500",
}

function getDriverInitials(name: string) {
  if (name.trim() === "-" || name.trim().length === 0) {
    return "NA"
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.replace(".", "") ?? "")
    .join("")
    .toUpperCase()
}

export function RouteDetailsDialog({ deliveryLog }: RouteDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-6 w-full">
          View Route Map
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-xl"
      >
        <div className="border-b bg-background px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                Route Details
              </DialogTitle>
              <DialogDescription className="mt-1">
                Delivery tracking for Order #{deliveryLog.orderId}
              </DialogDescription>
            </div>

            <Badge
              variant="outline"
              className="w-fit rounded-full px-3 py-0.5 text-xs font-medium"
            >
              {deliveryLog.id}
            </Badge>
          </div>
        </div>

        <div className="grid max-h-[calc(90vh-76px)] grid-cols-1 overflow-y-auto md:grid-cols-[minmax(0,1.8fr)_240px] md:overflow-hidden">
          <div className="relative min-h-[340px] overflow-hidden bg-muted md:min-h-[460px]">
            <img
              src={routeMapImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-amber-50/15" />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="M28 39C34 42 39 45 45 50C51 55 59 61 67 67C73 72 79 76 85 79"
                fill="none"
                stroke="#F97316"
                strokeDasharray="2.2 2.2"
                strokeLinecap="round"
                strokeWidth="0.7"
              />
              <path
                d="M27 37C33 40 39 45 45 50C52 55 60 62 68 69C74 73 79 76 85 80"
                fill="none"
                stroke="#2563EB"
                strokeDasharray="2.2 2.2"
                strokeLinecap="round"
                strokeWidth="0.7"
              />
            </svg>

            <div className="absolute top-[31%] left-[20%] flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg">
              <span className="h-3 w-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />
            </div>

            <div className="absolute top-[63%] left-[56%] flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
              <MapPin className="h-5 w-5 text-rose-500" />
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2.5 text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                    <Navigation className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium">
                    Total Distance: {deliveryLog.routeDetails.distance}
                  </p>
                </div>

                <div className="hidden h-8 w-px bg-border sm:block" />

                <p className="text-sm font-medium text-foreground">
                  Est. Time: {deliveryLog.routeDetails.eta}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t bg-background px-4 py-6 md:border-t-0 md:border-l md:px-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Driver Info
              </p>
              <div className="mt-4 rounded-xl bg-muted/60 px-3 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={deliveryLog.routeDetails.driverImage}
                      alt={deliveryLog.driver}
                    />
                    <AvatarFallback className="bg-slate-200 font-medium text-slate-700">
                      {getDriverInitials(deliveryLog.driver)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="h-8 w-px bg-border" />

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="ml-auto rounded-full text-muted-foreground"
                    disabled={!deliveryLog.routeDetails.driverPhone}
                    aria-label={
                      deliveryLog.routeDetails.driverPhone
                        ? `Call ${deliveryLog.driver}`
                        : "Driver unavailable"
                    }
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Delivery Timeline
              </p>

              <div className="mt-4 space-y-6">
                {deliveryLog.routeDetails.timeline.map(
                  (timelineItem, index) => (
                    <div key={timelineItem.id} className="relative pl-6">
                      {index < deliveryLog.routeDetails.timeline.length - 1 ? (
                        <span className="absolute top-3 left-[5px] h-[calc(100%+1.2rem)] w-px bg-border" />
                      ) : null}

                      <span
                        className={cn(
                          "absolute top-1 left-0 h-3 w-3 rounded-full border-2 border-background",
                          timelineMarkerColorMap[timelineItem.state]
                        )}
                      />

                      <p className="text-base leading-snug font-medium text-foreground">
                        {timelineItem.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {timelineItem.time}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
