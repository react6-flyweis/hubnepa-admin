import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ShoppingBag,
  Store,
  Upload,
} from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const partnerTypeOptions = [
  {
    label: "Restaurant",
    value: "restaurant",
    icon: Store,
  },
  {
    label: "Retailer",
    value: "retailer",
    icon: ShoppingBag,
  },
] as const

const categoryOptions = [
  "Fast Food",
  "Asian Cuisine",
  "Italian",
  "Bakery",
  "Grocery",
  "Pharmacy",
  "Convenience",
  "Electronics",
] as const

const stepConfig = [
  {
    id: 1,
    title: "Partner Information",
    description: "Select partner type and basic details.",
  },
  {
    id: 2,
    title: "Location & Details",
    description: "Address and business categorization.",
  },
  {
    id: 3,
    title: "Verification Documents",
    description: "Upload required business licenses.",
  },
] as const

const requiredFileSchema = z
  .unknown()
  .refine(
    (value): value is File => value instanceof File,
    "This file is required"
  )

const addPartnerSchema = z.object({
  partnerType: z.enum(["restaurant", "retailer"]),
  businessName: z.string().min(1, "Business name is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  emailAddress: z.email("Enter a valid email address"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  category: z.string().min(1, "Category is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  businessLicense: requiredFileSchema,
  taxDocument: requiredFileSchema,
})

type AddPartnerFormValues = z.infer<typeof addPartnerSchema>
type FormStep = 1 | 2 | 3

const stepFieldMap: Record<FormStep, Array<keyof AddPartnerFormValues>> = {
  1: [
    "partnerType",
    "businessName",
    "ownerName",
    "emailAddress",
    "phoneNumber",
  ],
  2: ["category", "streetAddress", "city", "zipCode"],
  3: ["businessLicense", "taxDocument"],
}

const partnerTypeColorMap: Record<
  AddPartnerFormValues["partnerType"],
  { selected: string; idle: string }
> = {
  restaurant: {
    selected: "border-emerald-500 bg-emerald-50 text-emerald-700",
    idle: "border-slate-200 bg-white text-slate-900 hover:border-slate-300",
  },
  retailer: {
    selected: "border-emerald-500 bg-emerald-50 text-emerald-700",
    idle: "border-slate-200 bg-white text-slate-900 hover:border-slate-300",
  },
}

interface StepIndicatorProps {
  currentStep: FormStep
}

function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mt-8 flex items-center justify-center">
      {stepConfig.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isCurrent = step.id === currentStep
        const isUpcoming = step.id > currentStep

        return (
          <div key={step.id} className="flex items-center">
            {isUpcoming ? (
              <div className="flex size-10 items-center justify-center text-xl font-medium text-slate-500">
                {step.id}
              </div>
            ) : (
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full text-base font-semibold",
                  isCurrent || isCompleted
                    ? "bg-[#0F172B] text-white"
                    : "bg-slate-100 text-slate-700"
                )}
              >
                {isCompleted ? <Check className="size-5" /> : step.id}
              </div>
            )}

            {index < stepConfig.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-[78px] rounded-full",
                  step.id < currentStep ? "bg-[#0F172B]" : "bg-slate-200"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface DocumentUploadInputProps {
  id: "businessLicense" | "taxDocument"
  title: string
  fileName?: string
  onSelect: (file: File | undefined) => void
  error?: string
}

function DocumentUploadInput({
  id,
  title,
  fileName,
  onSelect,
  error,
}: DocumentUploadInputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    onSelect(file)
  }

  return (
    <Field>
      <label htmlFor={id} className="block cursor-pointer">
        <div
          className={cn(
            "flex min-h-44 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center transition-colors",
            "hover:border-slate-300",
            error && "border-destructive"
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Upload className="size-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="mt-2 text-sm text-slate-500">
              {fileName ?? "PDF, JPG, or PNG (Max 5MB)"}
            </p>
          </div>
        </div>
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleChange}
      />
      <FieldError
        errors={error ? [{ message: error }] : undefined}
        className="mt-2"
      />
    </Field>
  )
}

export default function AddPartnerPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<FormStep>(1)

  const form = useForm<AddPartnerFormValues>({
    resolver: zodResolver(addPartnerSchema),
    defaultValues: {
      partnerType: "restaurant",
      businessName: "",
      ownerName: "",
      emailAddress: "",
      phoneNumber: "",
      category: "",
      streetAddress: "",
      city: "",
      zipCode: "",
    },
  })

  const activeStep = stepConfig.find((item) => item.id === step)
  const selectedType = form.watch("partnerType")
  const businessLicense = form.watch("businessLicense")
  const taxDocument = form.watch("taxDocument")

  async function handleNextStep() {
    const fields = stepFieldMap[step]
    const isValid = await form.trigger(fields)
    if (!isValid) {
      return
    }

    if (step < 3) {
      setStep((prev) => (prev + 1) as FormStep)
    }
  }

  function handleBackStep() {
    if (step === 1) {
      navigate("/partners")
      return
    }

    setStep((prev) => (prev - 1) as FormStep)
  }

  function onSubmit(values: AddPartnerFormValues) {
    form.reset({
      partnerType: values.partnerType,
      businessName: "",
      ownerName: "",
      emailAddress: "",
      phoneNumber: "",
      category: "",
      streetAddress: "",
      city: "",
      zipCode: "",
    })
    navigate("/partners")
  }

  return (
    <div className="max-w-6xl pb-8">
      <div className="flex items-start gap-3">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="mt-1 rounded-full"
        >
          <Link to="/partners" aria-label="Back to partner management">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>

        <div>
          <h1 className="font-display text-3xl font-semibold text-[#0F172B]">
            Add New Partner
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Onboard a new restaurant or retail vendor to the platform.
          </p>
        </div>
      </div>

      <StepIndicator currentStep={step} />

      <Card className="mt-8 rounded-2xl border border-slate-200 bg-white py-0 ring-0">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="font-display text-xl font-semibold">
            {activeStep?.title}
          </CardTitle>
          <FieldDescription className="">
            {activeStep?.description}
          </FieldDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-5">
                <Field>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {partnerTypeOptions.map((option) => {
                      const isSelected = selectedType === option.value
                      const Icon = option.icon

                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={cn(
                            "flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border text-center transition-colors",
                            isSelected
                              ? partnerTypeColorMap[option.value].selected
                              : partnerTypeColorMap[option.value].idle
                          )}
                          onClick={() =>
                            form.setValue("partnerType", option.value)
                          }
                        >
                          <Icon className="size-7" />
                          <span className="text-base font-semibold">
                            {option.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <FieldError
                    errors={[form.formState.errors.partnerType]}
                    className="mt-1"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel
                      htmlFor="businessName"
                      className="text-sm text-slate-900"
                    >
                      Business Name
                    </FieldLabel>
                    <Input
                      id="businessName"
                      placeholder="e.g. Tasty Bites"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.businessName)}
                      {...form.register("businessName")}
                    />
                    <FieldError
                      errors={[form.formState.errors.businessName]}
                      className="mt-1"
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="ownerName"
                      className="text-sm text-slate-900"
                    >
                      Owner Name
                    </FieldLabel>
                    <Input
                      id="ownerName"
                      placeholder="e.g. John Doe"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.ownerName)}
                      {...form.register("ownerName")}
                    />
                    <FieldError
                      errors={[form.formState.errors.ownerName]}
                      className="mt-1"
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="emailAddress"
                      className="text-sm text-slate-900"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      id="emailAddress"
                      type="email"
                      placeholder="partner@hubnepa.com"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.emailAddress)}
                      {...form.register("emailAddress")}
                    />
                    <FieldError
                      errors={[form.formState.errors.emailAddress]}
                      className="mt-1"
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="phoneNumber"
                      className="text-sm text-slate-900"
                    >
                      Phone Number
                    </FieldLabel>
                    <Input
                      id="phoneNumber"
                      placeholder="+1 (555) 000-0000"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.phoneNumber)}
                      {...form.register("phoneNumber")}
                    />
                    <FieldError
                      errors={[form.formState.errors.phoneNumber]}
                      className="mt-1"
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <Field>
                  <FieldLabel
                    htmlFor="category"
                    className="text-sm text-slate-900"
                  >
                    Category
                  </FieldLabel>
                  <Select
                    value={form.watch("category")}
                    onValueChange={(value) => form.setValue("category", value)}
                  >
                    <SelectTrigger id="category" className="mt-2 w-full px-4">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={[form.formState.errors.category]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="streetAddress"
                    className="text-sm text-slate-900"
                  >
                    Street Address
                  </FieldLabel>
                  <Input
                    id="streetAddress"
                    placeholder="123 Main St"
                    className="px-4"
                    aria-invalid={Boolean(form.formState.errors.streetAddress)}
                    {...form.register("streetAddress")}
                  />
                  <FieldError
                    errors={[form.formState.errors.streetAddress]}
                    className="mt-1"
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field>
                    <FieldLabel
                      htmlFor="city"
                      className="text-sm text-slate-900"
                    >
                      City
                    </FieldLabel>
                    <Input
                      id="city"
                      placeholder="Scranton"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.city)}
                      {...form.register("city")}
                    />
                    <FieldError
                      errors={[form.formState.errors.city]}
                      className="mt-1"
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="zipCode"
                      className="text-sm text-slate-900"
                    >
                      Zip Code
                    </FieldLabel>
                    <Input
                      id="zipCode"
                      placeholder="18503"
                      className="px-4"
                      aria-invalid={Boolean(form.formState.errors.zipCode)}
                      {...form.register("zipCode")}
                    />
                    <FieldError
                      errors={[form.formState.errors.zipCode]}
                      className="mt-1"
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <DocumentUploadInput
                  id="businessLicense"
                  title="Upload Business License"
                  fileName={businessLicense?.name}
                  onSelect={(file) =>
                    form.setValue("businessLicense", file as File, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  error={form.formState.errors.businessLicense?.message}
                />
                <DocumentUploadInput
                  id="taxDocument"
                  title="Upload Tax ID / EIN"
                  fileName={taxDocument?.name}
                  onSelect={(file) =>
                    form.setValue("taxDocument", file as File, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  error={form.formState.errors.taxDocument?.message}
                />
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="px-6"
                onClick={handleBackStep}
              >
                Back
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  size="lg"
                  className="px-8"
                  onClick={handleNextStep}
                >
                  Next Step
                  <ChevronRight className="size-5" />
                </Button>
              ) : (
                <Button type="submit" size="lg" className="px-8">
                  Create Partner Account
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
