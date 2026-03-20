import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowLeft,
  CalendarDays,
  ImagePlus,
  PanelTop,
  Save,
  Target,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const campaignTypeOptions = [
  "Promotional",
  "Seasonal",
  "Announcement",
  "Retention",
] as const

const statusOptions = ["Draft", "Scheduled", "Active"] as const

const audienceOptions = [
  "All Users",
  "New Users (Last 30 days)",
  "Inactive Users",
] as const

const campaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  campaignType: z.string().min(1, "Campaign type is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  audience: z.string().min(1, "Audience is required"),
  bannerImage: z
    .custom<
      File | undefined
    >((value) => value === undefined || value instanceof File)
    .optional(),
})

type CampaignFormValues = z.infer<typeof campaignSchema>

const defaultValues: CampaignFormValues = {
  campaignName: "",
  campaignType: "",
  status: "",
  description: "",
  startDate: "",
  endDate: "",
  audience: "All Users",
  bannerImage: undefined,
}

interface SelectFieldProps {
  id: keyof CampaignFormValues
  placeholder: string
  value: string
  options: readonly string[]
  error?: string
  onValueChange: (value: string) => void
}

function SelectField({
  id,
  placeholder,
  value,
  options,
  error,
  onValueChange,
}: SelectFieldProps) {
  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className="h-11 w-full rounded-lg border-slate-200 bg-white px-3 text-sm"
          aria-invalid={Boolean(error)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError
        errors={error ? [{ message: error }] : undefined}
        className="mt-1"
      />
    </>
  )
}

interface AudienceButtonProps {
  value: string
  selectedValue: string
  onSelect: (value: string) => void
}

function AudienceButton({
  value,
  selectedValue,
  onSelect,
}: AudienceButtonProps) {
  const isSelected = selectedValue === value

  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-auto w-full justify-center rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50",
        isSelected && "border-emerald-500 bg-emerald-50 text-emerald-700"
      )}
      onClick={() => onSelect(value)}
    >
      {value}
    </Button>
  )
}

export default function CreateCampaignPage() {
  const navigate = useNavigate()

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues,
  })

  function handleCancel() {
    navigate("/marketing")
  }

  function onSubmit(values: CampaignFormValues) {
    void values
    navigate("/marketing")
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    form.setValue("bannerImage", file, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const selectedImage = form.watch("bannerImage")
  const selectedAudience = form.watch("audience")

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="mt-0.5 rounded-full text-slate-700"
          >
            <Link to="/marketing" aria-label="Back to marketing">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-2xl leading-tight font-semibold text-[#0F172B]">
              Create New Campaign
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Set up a new marketing campaign across channels
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            className="h-9 px-4 text-sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-campaign-form"
            className="h-9 gap-1.5 bg-emerald-600 px-4 text-sm text-white hover:bg-emerald-700"
          >
            <Save className="size-3.5" />
            Publish Campaign
          </Button>
        </div>
      </div>

      <form
        id="create-campaign-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]"
      >
        <div className="space-y-4">
          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                  <PanelTop className="size-4 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="font-display text-xl font-semibold text-[#0F172B]">
                    Campaign Details
                  </CardTitle>
                  <FieldDescription className="text-sm text-slate-500">
                    Basic information about your campaign
                  </FieldDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <Field>
                <FieldLabel
                  htmlFor="campaignName"
                  className="text-sm text-slate-700"
                >
                  Campaign Name
                </FieldLabel>
                <Input
                  id="campaignName"
                  placeholder="e.g. Summer Food Festival"
                  className="h-11 rounded-lg border-slate-200 text-sm"
                  aria-invalid={Boolean(
                    form.formState.errors.campaignName?.message
                  )}
                  {...form.register("campaignName")}
                />
                <FieldError errors={[form.formState.errors.campaignName]} />
              </Field>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field>
                  <FieldLabel
                    htmlFor="campaignType"
                    className="text-sm text-slate-700"
                  >
                    Campaign Type
                  </FieldLabel>
                  <SelectField
                    id="campaignType"
                    placeholder="Select type"
                    value={form.watch("campaignType")}
                    options={campaignTypeOptions}
                    error={form.formState.errors.campaignType?.message}
                    onValueChange={(value) => {
                      form.setValue("campaignType", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="status"
                    className="text-sm text-slate-700"
                  >
                    Status
                  </FieldLabel>
                  <SelectField
                    id="status"
                    placeholder="Select status"
                    value={form.watch("status")}
                    options={statusOptions}
                    error={form.formState.errors.status?.message}
                    onValueChange={(value) => {
                      form.setValue("status", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-sm text-slate-700"
                >
                  Description / Message
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Internal notes or notification body text..."
                  className="min-h-24 resize-none rounded-lg border-slate-200 py-3 text-sm"
                  {...form.register("description")}
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-pink-50">
                  <ImagePlus className="size-4 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="font-display text-xl font-semibold text-[#0F172B]">
                    Creative Assets
                  </CardTitle>
                  <FieldDescription className="text-sm text-slate-500">
                    Upload banner images
                  </FieldDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <Field>
                <label htmlFor="bannerImage" className="block cursor-pointer">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-9 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                      <ImagePlus className="size-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload image
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                    {selectedImage && (
                      <p className="mt-2 text-xs text-emerald-600">
                        {selectedImage.name}
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="bannerImage"
                  type="file"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Field>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <CalendarDays className="size-4 text-blue-600" />
                </div>
                <CardTitle className="font-display text-xl font-semibold text-[#0F172B]">
                  Schedule
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <Field>
                <FieldLabel
                  htmlFor="startDate"
                  className="text-sm text-slate-700"
                >
                  Start Date
                </FieldLabel>
                <Input
                  id="startDate"
                  type="text"
                  className="h-11 rounded-lg border-slate-200 text-sm"
                  {...form.register("startDate")}
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="endDate"
                  className="text-sm text-slate-700"
                >
                  End Date
                </FieldLabel>
                <Input
                  id="endDate"
                  type="text"
                  className="h-11 rounded-lg border-slate-200 text-sm"
                  {...form.register("endDate")}
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                  <Target className="size-4 text-violet-600" />
                </div>
                <CardTitle className="font-display text-xl font-semibold text-[#0F172B]">
                  Audience
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-2.5 pt-0">
              <Field>
                <input type="hidden" {...form.register("audience")} />
                {audienceOptions.map((option) => (
                  <AudienceButton
                    key={option}
                    value={option}
                    selectedValue={selectedAudience}
                    onSelect={(value) => {
                      form.setValue("audience", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }}
                  />
                ))}
                <FieldError
                  errors={[form.formState.errors.audience]}
                  className="mt-1"
                />
              </Field>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
