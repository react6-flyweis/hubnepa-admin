import { AlertTriangle, Mail, MapPin, Phone } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"
import { type RefObject } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const currencyValues = ["USD", "NPR", "EUR"] as const
const currencyOptions = [
  { value: currencyValues[0], label: "USD ($)" },
  { value: currencyValues[1], label: "NPR (Rs)" },
  { value: currencyValues[2], label: "EUR (€)" },
]

const languageValues = ["english", "nepali", "hindi"] as const
const languageOptions = [
  { value: languageValues[0], label: "English" },
  { value: languageValues[1], label: "Nepali" },
  { value: languageValues[2], label: "Hindi" },
]

const timezoneOptions = [
  { value: "UTC", label: "UTC (GMT+0)" },
  { value: "Asia/Kathmandu", label: "Asia/Kathmandu (GMT+5:45)" },
  { value: "America/New_York", label: "America/New_York (GMT-4)" },
]

const systemStatusItems = [
  {
    field: "maintenanceMode",
    title: "Maintenance Mode",
    description: "Disable customer access for updates",
  },
  {
    field: "acceptingOrders",
    title: "Accepting Orders",
    description: "Global switch to pause all orders",
  },
] as const

interface PlatformSettingsGeneralTabProps {
  form: UseFormReturn<{
    platformName: string
    tagline?: string
    supportEmail: string
    supportPhone?: string
    hqAddress?: string
    currency: "USD" | "NPR" | "EUR"
    language: "english" | "nepali" | "hindi"
    timezone: string
    maintenanceMode: boolean
    acceptingOrders: boolean
  }>
  logoPreview: string | null
  initials: string
  onUploadClick: () => void
  onRemoveLogo: () => void
  systemStatusValues: Record<string, boolean>
  fileInputRef: RefObject<HTMLInputElement | null>
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function PlatformSettingsGeneralTab({
  form,
  logoPreview,
  initials,
  onUploadClick,
  onRemoveLogo,
  systemStatusValues,
  fileInputRef,
  onFileChange,
}: PlatformSettingsGeneralTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <Card className="rounded-2xl border border-slate-200 ring-slate-200/70">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="font-display text-xl leading-none font-semibold text-slate-900">
              Platform Identity
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Brand settings visible to all users
            </p>
          </CardHeader>

          <CardContent className="px-5 pb-5">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Avatar className="size-20 border border-slate-300 bg-slate-100">
                  {logoPreview ? (
                    <AvatarImage src={logoPreview} alt="Platform logo" />
                  ) : (
                    <AvatarFallback className="bg-slate-100 text-2xl font-semibold text-slate-400">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div>
                  <p className="text-base font-semibold text-slate-900">
                    Brand Logo
                  </p>
                  <p className="text-sm text-slate-500">
                    Recommended: 512×512px PNG or SVG
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-slate-300 bg-white text-slate-700"
                      onClick={onUploadClick}
                    >
                      Upload New
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="px-1 text-destructive hover:bg-transparent hover:text-destructive"
                      onClick={onRemoveLogo}
                      disabled={!logoPreview}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />

              <div className="grid gap-4">
                <Field>
                  <FieldLabel
                    htmlFor="platformName"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Platform Name
                  </FieldLabel>
                  <Input
                    id="platformName"
                    placeholder="HUBNEPA"
                    className="mt-2 h-9"
                    {...form.register("platformName")}
                  />
                  <FieldError
                    errors={[form.formState.errors.platformName]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="tagline"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Tagline / Description
                  </FieldLabel>
                  <Textarea
                    id="tagline"
                    rows={2}
                    placeholder="The ultimate marketplace for food and groceries"
                    className="mt-2 min-h-14"
                    {...form.register("tagline")}
                  />
                  <FieldError
                    errors={[form.formState.errors.tagline]}
                    className="mt-1"
                  />
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 ring-slate-200/70">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="font-display text-xl leading-none font-semibold text-slate-900">
              Localization
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Regional settings and preferences
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel
                  htmlFor="currency"
                  className="text-sm font-semibold text-slate-700"
                >
                  Currency
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="currency"
                        className="mt-2 h-9 w-full rounded-lg border-slate-200 bg-white px-3"
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="language"
                  className="text-sm font-semibold text-slate-700"
                >
                  Language
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="language"
                        className="mt-2 h-9 w-full rounded-lg border-slate-200 bg-white px-3"
                      >
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="md:col-span-2">
                <FieldLabel
                  htmlFor="timezone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Timezone
                </FieldLabel>
                <Controller
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="timezone"
                        className="mt-2 h-9 w-full rounded-lg border-slate-200 bg-white px-3"
                      >
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="rounded-2xl border border-slate-200 ring-slate-200/70">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="font-display text-xl leading-none font-semibold text-slate-900">
              Contact Information
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Public contact details for support
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="grid gap-4">
              <Field>
                <FieldLabel
                  htmlFor="supportEmail"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  Support Email
                </FieldLabel>
                <Input
                  id="supportEmail"
                  type="email"
                  placeholder="support@hubnepa.com"
                  className="mt-2 h-9"
                  {...form.register("supportEmail")}
                />
                <FieldError
                  errors={[form.formState.errors.supportEmail]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="supportPhone"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <Phone className="h-4 w-4 text-slate-400" />
                  Support Phone
                </FieldLabel>
                <Input
                  id="supportPhone"
                  placeholder="+1 (555) 123-4567"
                  className="mt-2 h-9"
                  {...form.register("supportPhone")}
                />
                <FieldError
                  errors={[form.formState.errors.supportPhone]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="hqAddress"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                  <MapPin className="h-4 w-4 text-slate-400" />
                  HQ Address
                </FieldLabel>
                <Textarea
                  id="hqAddress"
                  rows={2}
                  placeholder="123 Innovation Dr, Tech City, ST 94000"
                  className="mt-2 min-h-12"
                  {...form.register("hqAddress")}
                />
                <FieldError
                  errors={[form.formState.errors.hqAddress]}
                  className="mt-1"
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-amber-200 bg-amber-50/70 ring-amber-200/60">
          <CardHeader className="px-5 pt-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-700" />
              <CardTitle className="font-display text-xl leading-none font-semibold text-amber-800">
                System Status
              </CardTitle>
            </div>
            <p className="mt-1 text-sm text-amber-600">
              Control platform availability
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-4">
              {systemStatusItems.map((item) => (
                <div
                  key={item.field}
                  className="rounded-xl border border-amber-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={systemStatusValues[item.field]}
                      className="data-checked:bg-amber-500 data-unchecked:bg-amber-200"
                      onCheckedChange={(value) =>
                        form.setValue(item.field, value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PlatformSettingsGeneralTab
