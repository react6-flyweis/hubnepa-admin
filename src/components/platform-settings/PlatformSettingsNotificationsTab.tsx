import { Mail, MessageSquare, Smartphone } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notificationProviders = [
  {
    id: "email",
    title: "Email Provider",
    provider: "SendGrid",
    details: "SMTP: smtp.sendgrid.net (Port 587)",
    actionLabel: "Configure SMTP",
    icon: Mail,
    iconWrapperClassName: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "sms",
    title: "SMS Gateway",
    provider: "Twilio",
    details: "Balance: $45.20 USD",
    actionLabel: "Manage Keys",
    icon: MessageSquare,
    iconWrapperClassName: "bg-blue-50 text-blue-600",
  },
  {
    id: "push",
    title: "Push Notifications",
    provider: "Firebase (FCM)",
    details: "Apps: iOS, Android, Web",
    actionLabel: "Update Certs",
    icon: Smartphone,
    iconWrapperClassName: "bg-fuchsia-50 text-fuchsia-600",
  },
] as const

const notificationChannels = [
  { key: "email", label: "Email" },
  { key: "push", label: "Push" },
  { key: "sms", label: "SMS" },
] as const

const notificationTriggerSections = [
  {
    id: "customer-orders",
    title: "Customer Orders",
    triggers: [
      {
        id: "orderPlaced",
        eventName: "Order Placed",
        description: "Sent when customer completes checkout",
        defaults: { email: true, push: true, sms: false },
      },
      {
        id: "orderConfirmed",
        eventName: "Order Confirmed",
        description: "Sent when restaurant accepts the order",
        defaults: { email: true, push: true, sms: true },
      },
      {
        id: "outForDelivery",
        eventName: "Out for Delivery",
        description: "Sent when driver picks up the order",
        defaults: { email: false, push: true, sms: true },
      },
      {
        id: "orderDelivered",
        eventName: "Order Delivered",
        description: "Sent upon successful delivery",
        defaults: { email: true, push: true, sms: false },
      },
    ],
  },
  {
    id: "user-account",
    title: "User Account",
    triggers: [
      {
        id: "welcomeEmail",
        eventName: "Welcome Email",
        description: "Sent after successful registration",
        defaults: { email: true, push: false, sms: false },
      },
      {
        id: "passwordReset",
        eventName: "Password Reset",
        description: "Sent when user requests password reset",
        defaults: { email: true, push: false, sms: true },
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    triggers: [
      {
        id: "promotionalOffers",
        eventName: "Promotional Offers",
        description: "General marketing campaigns",
        defaults: { email: true, push: true, sms: false },
      },
      {
        id: "abandonedCart",
        eventName: "Abandoned Cart",
        description: "Reminder for items left in cart",
        defaults: { email: true, push: true, sms: false },
      },
    ],
  },
] as const

type NotificationChannelKey = (typeof notificationChannels)[number]["key"]
type NotificationTriggerId =
  (typeof notificationTriggerSections)[number]["triggers"][number]["id"]

interface PlatformSettingsNotificationsTabProps {
  notificationSettings: Record<
    NotificationTriggerId,
    Record<NotificationChannelKey, boolean>
  >
  onNotificationChannelChange: (
    triggerId: NotificationTriggerId,
    channelKey: NotificationChannelKey,
    value: boolean
  ) => void
}

function PlatformSettingsNotificationsTab({
  notificationSettings,
  onNotificationChannelChange,
}: PlatformSettingsNotificationsTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        {notificationProviders.map((provider) => (
          <Card key={provider.id} className="py-5">
            <CardHeader className="space-y-3 px-5 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${provider.iconWrapperClassName}`}
                >
                  <provider.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg leading-none font-semibold text-slate-900">
                  {provider.title}
                </CardTitle>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xl leading-none font-semibold text-slate-900">
                  {provider.provider}
                </p>
                <Badge className="rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
                  Active
                </Badge>
              </div>
              <p className="text-sm leading-tight text-slate-500">
                {provider.details}
              </p>
            </CardHeader>

            <CardContent className="px-5">
              <Button
                type="button"
                variant="outline"
                className="h-9 w-full border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {provider.actionLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="">
        <CardHeader className="">
          <CardTitle className="font-display text-xl leading-none font-semibold text-slate-900">
            Notification Triggers
          </CardTitle>
          <p className="mt-2 font-sans text-sm text-slate-500">
            Control which events send notifications across different channels
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {notificationTriggerSections.map((section) => (
            <section key={section.id}>
              <h3 className="font-display text-xl leading-none font-semibold text-slate-900">
                {section.title}
              </h3>

              <div className="mt-4 overflow-x-auto">
                <div className="min-w-175">
                  <div className="grid grid-cols-[minmax(0,1fr)_96px_96px_96px] border-t border-slate-200 px-4 py-3">
                    <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      Event Name
                    </p>
                    {notificationChannels.map((channel) => (
                      <p
                        key={channel.key}
                        className="text-center text-xs font-semibold tracking-wide text-slate-500 uppercase"
                      >
                        {channel.label}
                      </p>
                    ))}
                  </div>

                  <div className="divide-y divide-slate-100">
                    {section.triggers.map((trigger) => (
                      <div
                        key={trigger.id}
                        className="grid grid-cols-[minmax(0,1fr)_96px_96px_96px] items-center gap-2 px-4 py-4"
                      >
                        <div>
                          <p className="text-lg leading-none font-semibold text-slate-900">
                            {trigger.eventName}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {trigger.description}
                          </p>
                        </div>

                        {notificationChannels.map((channel) => (
                          <div
                            key={channel.key}
                            className="flex justify-center"
                          >
                            <Switch
                              checked={
                                notificationSettings[trigger.id][channel.key]
                              }
                              className="data-checked:bg-amber-600 data-unchecked:bg-amber-200"
                              onCheckedChange={(value) =>
                                onNotificationChannelChange(
                                  trigger.id,
                                  channel.key,
                                  value
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default PlatformSettingsNotificationsTab
