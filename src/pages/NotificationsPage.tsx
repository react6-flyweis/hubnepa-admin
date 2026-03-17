import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Bell,
  CircleAlert,
  CircleCheck,
  Clock3,
  House,
  ShieldAlert,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { cn } from "@/lib/utils"

type NotificationTone =
  | "partner"
  | "order"
  | "backup"
  | "payout"
  | "milestone"
  | "security"
  | "content"

type NotificationGroup = "partner" | "system"
type NotificationFilter = "all" | "unread" | "partner" | "system"

interface NotificationItem {
  id: string
  title: string
  description: string
  timeLabel: string
  tone: NotificationTone
  group: NotificationGroup
  isRead: boolean
}

interface NotificationToneConfig {
  icon: LucideIcon
  iconWrapperClassName: string
  iconClassName: string
}

interface NotificationCardProps {
  notification: NotificationItem
  onMarkAsRead: (notificationId: string) => void
}

interface NotificationFilterItem {
  id: NotificationFilter
  label: string
  showCount: boolean
  showLeadingDot?: boolean
}

interface NotificationFilterPanelProps {
  activeFilter: NotificationFilter
  countMap: Record<NotificationFilter, number>
  onSelectFilter: (filter: NotificationFilter) => void
}

const notificationToneMap: Record<NotificationTone, NotificationToneConfig> = {
  partner: {
    icon: House,
    iconWrapperClassName: "bg-[#D8F3E5]",
    iconClassName: "text-[#0F9D73]",
  },
  order: {
    icon: AlertTriangle,
    iconWrapperClassName: "bg-[#FCE9B6]",
    iconClassName: "text-[#EB8A00]",
  },
  backup: {
    icon: CircleAlert,
    iconWrapperClassName: "bg-[#DBEAFE]",
    iconClassName: "text-[#2563EB]",
  },
  payout: {
    icon: AlertTriangle,
    iconWrapperClassName: "bg-[#FDE2E4]",
    iconClassName: "text-[#E11D48]",
  },
  milestone: {
    icon: Bell,
    iconWrapperClassName: "bg-[#E9EFF5]",
    iconClassName: "text-[#475569]",
  },
  security: {
    icon: ShieldAlert,
    iconWrapperClassName: "bg-[#F2E8FF]",
    iconClassName: "text-[#9333EA]",
  },
  content: {
    icon: CircleAlert,
    iconWrapperClassName: "bg-[#FFEED9]",
    iconClassName: "text-[#F97316]",
  },
}

const filterItems: NotificationFilterItem[] = [
  {
    id: "all",
    label: "All Notification",
    showCount: true,
  },
  {
    id: "unread",
    label: "Unread Only",
    showCount: true,
  },
  {
    id: "partner",
    label: "Partner Requests",
    showCount: false,
  },
  {
    id: "system",
    label: "System Alerts",
    showCount: false,
    showLeadingDot: true,
  },
]

const initialNotifications: NotificationItem[] = [
  {
    id: "partner-request-spice-garden",
    title: "New Partner Request",
    description:
      "Spice Garden (Restaurant) has submitted verification documents.",
    timeLabel: "10 mins ago",
    tone: "partner",
    group: "partner",
    isRead: false,
  },
  {
    id: "high-value-order-9921",
    title: "High Value Order",
    description: "Order #ORD-9921 placed for $450.00 requires verification.",
    timeLabel: "25 mins ago",
    tone: "order",
    group: "system",
    isRead: false,
  },
  {
    id: "system-backup-completed",
    title: "System Backup Completed",
    description: "Daily database backup finished successfully (Size: 2.4GB).",
    timeLabel: "2 hours ago",
    tone: "backup",
    group: "system",
    isRead: true,
  },
  {
    id: "payout-failed-404",
    title: "Payout Batch Failed",
    description: "Weekly payout for Batch #BATCH-404 failed for 2 vendors.",
    timeLabel: "5 hours ago",
    tone: "payout",
    group: "system",
    isRead: false,
  },
  {
    id: "user-milestone",
    title: "New User Milestone",
    description: "Platform reached 15,000 active users today!",
    timeLabel: "1 day ago",
    tone: "milestone",
    group: "system",
    isRead: true,
  },
  {
    id: "suspicious-login",
    title: "Suspicious Login Attempt",
    description: "Failed login attempt detected from IP 192.168.1.1 (Russia).",
    timeLabel: "1 day ago",
    tone: "security",
    group: "system",
    isRead: true,
  },
  {
    id: "content-reported",
    title: "Content Reported",
    description:
      "User flagged a review on 'Burger King' for inappropriate content.",
    timeLabel: "2 days ago",
    tone: "content",
    group: "system",
    isRead: true,
  },
]

function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const toneConfig = notificationToneMap[notification.tone]
  const NotificationIcon = toneConfig.icon

  return (
    <Card
      className={cn(
        "rounded-2xl border border-[#D8E4F2] px-5 py-4 shadow-none ring-0",
        notification.isRead ? "bg-white" : "bg-[#F3F8FF]"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={cn(
              "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl",
              toneConfig.iconWrapperClassName
            )}
          >
            <NotificationIcon
              className={cn("size-5", toneConfig.iconClassName)}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg leading-snug font-semibold text-[#22324A]">
                {notification.title}
              </h2>
              {!notification.isRead && (
                <span className="size-2 rounded-full bg-[#3B82F6]" />
              )}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-[#4B5E78]">
              {notification.description}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-10 rounded-xl border-[#D4DDE9] bg-white px-4 text-sm font-semibold text-[#33485F] shadow-[0_2px_6px_rgba(15,23,42,0.06)] hover:bg-[#F8FAFC]"
              >
                View Details
              </Button>

              {!notification.isRead && (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 px-0 text-sm font-semibold text-[#6B7F9B] hover:bg-transparent hover:text-[#495D78]"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-[#8DA0BC] sm:pl-6">
          <Clock3 className="size-4" />
          <span>{notification.timeLabel}</span>
        </div>
      </div>
    </Card>
  )
}

function NotificationFilterPanel({
  activeFilter,
  countMap,
  onSelectFilter,
}: NotificationFilterPanelProps) {
  const primaryFilters = filterItems.slice(0, 2)
  const secondaryFilters = filterItems.slice(2)

  return (
    <Card className="h-fit border border-[#D5DEE9] bg-[#F7FAFD] px-3 py-3 shadow-none ring-0">
      <div className="space-y-1.5">
        {primaryFilters.map((filterItem) => {
          const isActive = activeFilter === filterItem.id

          return (
            <button
              key={filterItem.id}
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#15233D] text-white"
                  : "text-[#1E2D45] hover:bg-[#EAF0F7]"
              )}
              onClick={() => onSelectFilter(filterItem.id)}
            >
              <span>{filterItem.label}</span>
              {filterItem.showCount && (
                <Badge
                  className={cn(
                    "h-6 min-w-6 rounded-full border-0 px-2 text-xs font-semibold",
                    isActive
                      ? "bg-[#EEF4FF] text-[#1B2A45]"
                      : "bg-[#DCE8FC] text-[#365A8A]"
                  )}
                >
                  {countMap[filterItem.id]}
                </Badge>
              )}
            </button>
          )
        })}
      </div>

      <div className="my-2 border-t border-[#E2EAF3]" />

      <div className="space-y-1.5">
        {secondaryFilters.map((filterItem) => {
          const isActive = activeFilter === filterItem.id

          return (
            <button
              key={filterItem.id}
              type="button"
              className={cn(
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#EAF0F7] text-[#12213A]"
                  : "text-[#1E2D45] hover:bg-[#EEF4FB]"
              )}
              onClick={() => onSelectFilter(filterItem.id)}
            >
              {filterItem.showLeadingDot && (
                <span className="size-1.5 rounded-full bg-[#89A6D1]" />
              )}
              <span>{filterItem.label}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all")

  const countMap = useMemo(
    () => ({
      all: notifications.length,
      unread: notifications.filter((notification) => !notification.isRead)
        .length,
      partner: notifications.filter(
        (notification) => notification.group === "partner"
      ).length,
      system: notifications.filter(
        (notification) => notification.group === "system"
      ).length,
    }),
    [notifications]
  )

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications
    }

    if (activeFilter === "unread") {
      return notifications.filter((notification) => !notification.isRead)
    }

    return notifications.filter(
      (notification) => notification.group === activeFilter
    )
  }, [activeFilter, notifications])

  const hasUnreadNotifications = countMap.unread > 0

  function handleMarkAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    )
  }

  function handleMarkAsRead(notificationId: string) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: true,
            }
          : notification
      )
    )
  }

  function handleClearAll() {
    setNotifications([])
  }

  return (
    <div className="">
      <PageHeader
        title="Notifications"
        description="System alerts, partner requests, and important updates."
        right={
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-10 rounded-xl border-[#CFD9E5] bg-white px-4 text-sm font-semibold text-[#425870] shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:bg-[#F8FAFC]"
              onClick={handleMarkAllAsRead}
              disabled={!hasUnreadNotifications}
            >
              <CircleCheck className="size-4" />
              Mark all read
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-10 rounded-xl border-[#E4CFD2] bg-white px-4 text-sm font-semibold text-[#E53935] shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:bg-[#FFF7F7]"
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="size-4" />
              Clear All
            </Button>
          </div>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[262px_minmax(0,1fr)]">
        <NotificationFilterPanel
          activeFilter={activeFilter}
          countMap={countMap}
          onSelectFilter={setActiveFilter}
        />

        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <Card className="rounded-2xl border border-dashed border-[#D8E2EF] bg-white px-6 py-12 text-center text-[#61738C] shadow-none ring-0">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#EEF4FB]">
              <Bell className="size-5 text-[#5E738F]" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold text-[#0F172A]">
              All caught up
            </h2>
            <p className="mt-3 text-[1.08rem] text-[#61738C]">
              New alerts and order updates will show up here as they happen.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
