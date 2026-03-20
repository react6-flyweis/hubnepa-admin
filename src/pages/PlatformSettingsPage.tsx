import { Bell, CreditCard, Save, Settings, Shield } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import PlatformSettingsGeneralTab from "@/components/platform-settings/PlatformSettingsGeneralTab"
import PlatformSettingsLegalTab from "@/components/platform-settings/PlatformSettingsLegalTab"
import PlatformSettingsNotificationsTab from "@/components/platform-settings/PlatformSettingsNotificationsTab"
import PlatformSettingsPaymentsTab from "@/components/platform-settings/PlatformSettingsPaymentsTab"

const currencyValues = ["USD", "NPR", "EUR"] as const
const languageValues = ["english", "nepali", "hindi"] as const

const settingsTabs = [
  { value: "general", label: "General", icon: Settings },
  { value: "legal", label: "Legal & Policies", icon: Shield },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "payments", label: "Payment Gateways", icon: CreditCard },
] as const

function getNotificationDefaults(): Record<string, Record<string, boolean>> {
  const triggers = [
    { id: "orderPlaced", defaults: { email: true, push: true, sms: false } },
    { id: "orderConfirmed", defaults: { email: true, push: true, sms: true } },
    { id: "outForDelivery", defaults: { email: false, push: true, sms: true } },
    { id: "orderDelivered", defaults: { email: true, push: true, sms: false } },
    { id: "welcomeEmail", defaults: { email: true, push: false, sms: false } },
    { id: "passwordReset", defaults: { email: true, push: false, sms: true } },
    {
      id: "promotionalOffers",
      defaults: { email: true, push: true, sms: false },
    },
    { id: "abandonedCart", defaults: { email: true, push: true, sms: false } },
  ]

  return Object.fromEntries(
    triggers.map((trigger) => [
      trigger.id,
      {
        email: trigger.defaults.email,
        push: trigger.defaults.push,
        sms: trigger.defaults.sms,
      },
    ])
  )
}

const platformSettingsSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  tagline: z.string().optional(),
  supportEmail: z.string().email("Enter a valid email address"),
  supportPhone: z.string().optional(),
  hqAddress: z.string().optional(),
  currency: z.enum(currencyValues),
  language: z.enum(languageValues),
  timezone: z.string().min(1, "Timezone is required"),
  maintenanceMode: z.boolean(),
  acceptingOrders: z.boolean(),
})

type PlatformSettingsFormValues = z.infer<typeof platformSettingsSchema>
type NotificationChannelKey = "email" | "push" | "sms"
type NotificationTriggerId =
  | "orderPlaced"
  | "orderConfirmed"
  | "outForDelivery"
  | "orderDelivered"
  | "welcomeEmail"
  | "passwordReset"
  | "promotionalOffers"
  | "abandonedCart"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")
}

export default function PlatformSettingsPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [notificationSettings, setNotificationSettings] = useState(() =>
    getNotificationDefaults()
  )
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<PlatformSettingsFormValues>({
    resolver: zodResolver(platformSettingsSchema),
    defaultValues: {
      platformName: "HUBNEPA",
      tagline: "The ultimate marketplace for food and groceries",
      supportEmail: "support@hubnepa.com",
      supportPhone: "+1 (555) 123-4567",
      hqAddress: "123 Innovation Dr, Tech City, ST 94000",
      currency: "USD",
      language: "english",
      timezone: "UTC",
      maintenanceMode: false,
      acceptingOrders: true,
    },
  })

  const platformName = useWatch({ control: form.control, name: "platformName" })
  const [maintenanceMode, acceptingOrders] = useWatch({
    control: form.control,
    name: ["maintenanceMode", "acceptingOrders"],
  })

  const systemStatusValues: Record<string, boolean> = {
    maintenanceMode: maintenanceMode ?? false,
    acceptingOrders: acceptingOrders ?? false,
  }

  const initials = useMemo(
    () => getInitials(platformName ?? "HN"),
    [platformName]
  )

  function onSubmit(values: PlatformSettingsFormValues) {
    // TODO: Persist settings via API
    console.log("Settings saved", {
      ...values,
      notifications: notificationSettings,
    })
  }

  function handleNotificationChannelChange(
    triggerId: NotificationTriggerId,
    channelKey: NotificationChannelKey,
    value: boolean
  ) {
    setNotificationSettings((current) => ({
      ...current,
      [triggerId]: {
        ...current[triggerId],
        [channelKey]: value,
      },
    }))
  }

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setLogoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleRemoveLogo() {
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-900">
            Platform Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure global application preferences.
          </p>
        </div>
        <Button type="submit" className="gap-2" size="default">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid h-10! w-full grid-cols-4 gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="justify-center gap-2 rounded-md text-sm font-medium text-slate-500 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <PlatformSettingsGeneralTab
            form={form}
            logoPreview={logoPreview}
            initials={initials}
            onUploadClick={handleUploadClick}
            onRemoveLogo={handleRemoveLogo}
            systemStatusValues={systemStatusValues}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
          />
        </TabsContent>

        <TabsContent value="legal" className="space-y-5">
          <PlatformSettingsLegalTab />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <PlatformSettingsNotificationsTab
            notificationSettings={notificationSettings}
            onNotificationChannelChange={handleNotificationChannelChange}
          />
        </TabsContent>

        <TabsContent value="payments" className="space-y-5">
          <PlatformSettingsPaymentsTab />
        </TabsContent>
      </Tabs>
    </form>
  )
}
