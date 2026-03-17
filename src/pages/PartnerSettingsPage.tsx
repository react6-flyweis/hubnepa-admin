import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, ArrowLeft, Lock, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useParams } from "react-router"
import { z } from "zod"

import { partners } from "@/data/partners"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const payoutFrequencyOptions = [
  "Daily",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
] as const

const partnerSettingsSchema = z.object({
  commissionRate: z.coerce
    .number()
    .min(0, "Commission rate cannot be below 0%")
    .max(100, "Commission rate cannot exceed 100%"),
  payoutFrequency: z.enum(payoutFrequencyOptions),
})

type PartnerSettingsFormValues = z.infer<typeof partnerSettingsSchema>

export default function PartnerSettingsPage() {
  const { partnerId } = useParams<{ partnerId: string }>()
  const partner = partners.find((item) => item.id === partnerId)
  const [isBlocked, setIsBlocked] = useState(partner?.status === "Suspended")

  const form = useForm({
    resolver: zodResolver(partnerSettingsSchema),
    defaultValues: {
      commissionRate: partner?.commissionRate ?? 15,
      payoutFrequency: "Daily",
    },
  })

  function onSubmit(values: PartnerSettingsFormValues) {
    // Keeping the latest saved values in form state until API wiring is added.
    form.reset(values)
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-gray-700">Partner not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          No partner with ID &quot;{partnerId}&quot; exists.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Partners
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6 pb-8">
      <div className="flex items-start gap-2.5">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="mt-1 rounded-full"
        >
          <Link to={`/partners/${partner.id}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to partner details</span>
          </Link>
        </Button>

        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">
            Partner Settings
          </h1>
          <p className="mt-1 text-lg text-slate-500">
            Manage access, commissions, and critical settings for{" "}
            <span className="font-semibold text-slate-900">
              {partner.businessName}
            </span>
          </p>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200 py-0 ring-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="font-display text-2xl font-semibold text-slate-900">
            Financial Configuration
          </CardTitle>
          <p className="text-base text-slate-500">
            Configure commission rates and payout terms.
          </p>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <CardContent className="px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel
                  htmlFor="commissionRate"
                  className="text-sm font-medium text-slate-900"
                >
                  Commission Rate (%)
                </FieldLabel>

                <InputGroup className="mt-2 rounded-lg border-slate-200 bg-white">
                  <InputGroupInput
                    id="commissionRate"
                    type="number"
                    min={0}
                    max={100}
                    step="0.1"
                    className="px-3"
                    aria-invalid={Boolean(form.formState.errors.commissionRate)}
                    {...form.register("commissionRate")}
                  />
                  <InputGroupAddon align="inline-end" className="pr-3">
                    <InputGroupText className="text-base">%</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                <FieldDescription className="mt-2 text-sm text-slate-500">
                  Platform fee deducted from each order.
                </FieldDescription>
                <FieldError
                  errors={[form.formState.errors.commissionRate]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="payoutFrequency"
                  className="text-sm font-medium text-slate-900"
                >
                  Payout Frequency
                </FieldLabel>

                <Controller
                  control={form.control}
                  name="payoutFrequency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="payoutFrequency"
                        className="mt-2 w-full rounded-lg border-slate-200 bg-white px-3"
                      >
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {payoutFrequencyOptions.map((frequency) => (
                          <SelectItem key={frequency} value={frequency}>
                            {frequency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <FieldError
                  errors={[form.formState.errors.payoutFrequency]}
                  className="mt-1"
                />
              </Field>
            </div>
          </CardContent>

          <CardFooter className="justify-end border-t border-slate-200 bg-slate-50 px-6 py-3.5">
            <Button
              type="submit"
              className="gap-2 bg-[#0F172B] px-5 text-white hover:bg-[#1C2740]"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="rounded-2xl border border-rose-400 py-0 ring-0">
        <CardContent className="space-y-5 p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <Lock className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-rose-600">
                Access Control
              </h2>
              <p className="text-base text-slate-500">
                Manage login permissions and account status.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Block Partner Access
              </p>
              <p className="text-sm text-slate-500">
                Prevent this partner from logging into their dashboard.
              </p>
            </div>

            <Switch
              checked={isBlocked}
              onCheckedChange={setIsBlocked}
              aria-label="Toggle partner access"
              className="data-[state=checked]:bg-rose-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-rose-200 py-0 ring-0">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="font-display text-2xl font-semibold">Danger Zone</h2>
          </div>

          <p className="text-base leading-relaxed text-slate-600">
            Permanently delete this partner and all associated data. This action
            cannot be undone.
          </p>

          <Button
            type="button"
            variant="outline"
            className="border-rose-300 bg-white px-4 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete Partner Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
