import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, ArrowRight, Cog, Wallet } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const paymentMethods = [
  {
    id: "stripeEnabled",
    title: "Stripe",
    description: "Credit/Debit Cards",
    initials: "S",
    iconClassName: "bg-indigo-500 text-white",
  },
  {
    id: "paypalEnabled",
    title: "PayPal",
    description: "Express Checkout",
    initials: "P",
    iconClassName: "bg-sky-900 text-white",
  },
  {
    id: "cashOnDeliveryEnabled",
    title: "Cash on Delivery",
    description: "Pay upon receipt",
    initials: "$",
    iconClassName: "bg-emerald-600 text-white",
  },
] as const

const taxFields = [
  {
    id: "globalTaxRate",
    label: "Global Tax Rate (%)",
    prefix: "%",
    description: "Applied to subtotal unless overridden by product",
    min: 0,
    max: 100,
    step: "0.1",
  },
  {
    id: "platformCommission",
    label: "Platform Commission (%)",
    prefix: "%",
    description: "Default commission taken from restaurant/seller orders",
    min: 0,
    max: 100,
    step: "0.1",
  },
  {
    id: "minimumOrderValue",
    label: "Minimum Order Value",
    prefix: "$",
    description: "",
    min: 0,
    max: 100000,
    step: "0.01",
  },
] as const

const paymentStatusColorMap = {
  active: {
    cardBorderClassName: "border-slate-200",
    switchClassName: "data-checked:bg-amber-500 data-unchecked:bg-amber-200",
  },
  inactive: {
    cardBorderClassName: "border-slate-100",
    switchClassName: "data-checked:bg-amber-500 data-unchecked:bg-slate-200",
  },
} as const

const paymentSettingsSchema = z.object({
  stripeEnabled: z.boolean(),
  paypalEnabled: z.boolean(),
  cashOnDeliveryEnabled: z.boolean(),
  stripePublishableKey: z.string().min(1, "Publishable key is required"),
  globalTaxRate: z
    .number()
    .min(0, "Tax rate cannot be negative")
    .max(100, "Tax rate must be 100 or less"),
  platformCommission: z
    .number()
    .min(0, "Commission cannot be negative")
    .max(100, "Commission must be 100 or less"),
  minimumOrderValue: z.number().min(0, "Value cannot be negative"),
})

type PaymentSettingsValues = z.infer<typeof paymentSettingsSchema>
type PaymentMethodId = (typeof paymentMethods)[number]["id"]
type PaymentStatus = keyof typeof paymentStatusColorMap

const paymentMethodFieldNames = paymentMethods.map(
  (method) => method.id
) as PaymentMethodId[]

function PlatformSettingsPaymentsTab() {
  const form = useForm<PaymentSettingsValues>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      stripeEnabled: true,
      paypalEnabled: true,
      cashOnDeliveryEnabled: true,
      stripePublishableKey: "pk_live_...",
      globalTaxRate: 13,
      platformCommission: 10,
      minimumOrderValue: 10,
    },
  })

  const stripeEnabled = useWatch({
    control: form.control,
    name: "stripeEnabled",
  })
  const paymentMethodToggles = useWatch({
    control: form.control,
    name: paymentMethodFieldNames,
  })

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
      <Card className="rounded-2xl border border-slate-200 py-0 ring-0">
        <CardHeader className="px-6 pt-6">
          <CardTitle className="font-display text-2xl font-semibold text-slate-900">
            Active Payment Methods
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Enable or disable payment options for customers
          </p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          {paymentMethods.map((method, index) => {
            const isEnabled = Boolean(paymentMethodToggles?.[index])
            const status: PaymentStatus = isEnabled ? "active" : "inactive"
            const statusClasses = paymentStatusColorMap[status]

            return (
              <section
                key={method.id}
                className={cn(
                  "rounded-xl border bg-white p-4",
                  statusClasses.cardBorderClassName
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-semibold",
                        method.iconClassName
                      )}
                    >
                      {method.initials}
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-semibold text-slate-900">
                        {method.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <Controller
                    control={form.control}
                    name={method.id}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        className={statusClasses.switchClassName}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                {method.id === "stripeEnabled" && stripeEnabled ? (
                  <div className="mt-4 rounded-lg bg-slate-100 p-4">
                    <Field>
                      <FieldLabel
                        htmlFor="stripePublishableKey"
                        className="text-sm font-medium text-slate-700"
                      >
                        Publishable Key
                      </FieldLabel>
                      <Input
                        id="stripePublishableKey"
                        className="mt-2 h-8 border-slate-300 bg-white"
                        {...form.register("stripePublishableKey")}
                      />
                      <FieldError
                        errors={[form.formState.errors.stripePublishableKey]}
                        className="mt-1"
                      />
                    </Field>

                    <div className="mt-3 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-1 px-0 text-indigo-600 hover:bg-transparent hover:text-indigo-700"
                      >
                        <Cog className="h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ) : null}
              </section>
            )
          })}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="rounded-2xl border border-slate-200 py-0 ring-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Tax & Fees Configuration
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Global financial settings applied to orders
            </p>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6">
            {taxFields.map((field) => (
              <Field key={field.id}>
                <FieldLabel
                  htmlFor={field.id}
                  className="text-sm font-semibold text-slate-700"
                >
                  {field.label}
                </FieldLabel>

                <InputGroup className="mt-2 h-10 rounded-lg border-slate-300 bg-white">
                  <InputGroupAddon align="inline-start" className="pr-2 pl-3">
                    <InputGroupText className="text-xl text-slate-400">
                      {field.prefix}
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id={field.id}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="px-0 text-base"
                    aria-invalid={Boolean(form.formState.errors[field.id])}
                    {...form.register(field.id, { valueAsNumber: true })}
                  />
                </InputGroup>

                {field.description ? (
                  <FieldDescription className="mt-1 text-sm text-slate-500">
                    {field.description}
                  </FieldDescription>
                ) : null}
                <FieldError errors={[form.formState.errors[field.id]]} />
              </Field>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 py-0 ring-0">
          <CardContent className="space-y-3 px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-md bg-amber-100 p-1.5 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  Currency Settings
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Changing currency settings may affect historical financial
                  data. Please ensure you export reports before making changes.
                </p>
              </div>
            </div>

            <Button
              asChild
              variant="ghost"
              className="h-auto justify-start gap-1 px-0 py-0 text-sm font-semibold text-emerald-700 hover:bg-transparent hover:text-emerald-800"
            >
              <Link to="/dashboard/settings">
                <Wallet className="h-4 w-4" />
                Go to Localization Settings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PlatformSettingsPaymentsTab
