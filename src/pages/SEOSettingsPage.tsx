import {
  ArrowLeft,
  Globe,
  Share2,
  Search,
  FileText,
  CheckCircle2,
  Save,
} from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const seoSettingsSchema = z.object({
  metaTitle: z.string().max(60, "Max 60 characters").min(1, "Required"),
  metaDescription: z.string().max(160, "Max 160 characters").min(1, "Required"),
  keywords: z.string().min(1, "Required"),
  enableIndexing: z.boolean(),
  sitemapUrl: z.string().url("Invalid URL"),
  ogImageUrl: z.string().url("Invalid URL").or(z.literal("")),
})

type SEOSettingsFormData = z.infer<typeof seoSettingsSchema>

export default function SEOSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<SEOSettingsFormData>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      metaTitle: "HUBNEPA | Food Delivery & Local Marketplace",
      metaDescription:
        "Order food from top restaurants and shop local groceries with fast delivery. HUBNEPA connects you with the best of your city.",
      keywords:
        "food delivery, groceries, marketplace, local shops, fast delivery, nearby restaurants",
      enableIndexing: true,
      sitemapUrl: "https://hubnepa.com/sitemap.xml",
      ogImageUrl: "https://hubnepa.com/assets/og-share.jpg",
    },
  })

  const metaTitle = watch("metaTitle")
  const metaDescription = watch("metaDescription")
  //   const ogImage = watch("ogImageUrl")

  const onSubmit = async (data: SEOSettingsFormData) => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saved SEO Settings:", data)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/marketing"
            className="mt-1 inline-flex items-center justify-center rounded-lg p-1 hover:bg-slate-100"
          >
            <ArrowLeft className="size-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900">
              SEO Settings
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Optimize search engine visibility and social sharing.
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving}
          size="lg"
          className="bg-[#00a86b] px-4 hover:bg-[#00905a]"
        >
          <Save className="mr-2 size-4" />
          Save Changes
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]"
      >
        {/* Left Column */}
        <div className="space-y-6">
          {/* Search Engine Listing */}
          <Card className="">
            <CardHeader className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded bg-blue-50">
                <Search className="size-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="font-display text-lg font-bold text-slate-900">
                  Search Engine Listing
                </CardTitle>
                <CardDescription className="font-sans">
                  How HUBNEPA appears on Google, Bing, etc.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Meta Title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="metaTitle"
                  className="text-sm font-semibold text-slate-800"
                >
                  Meta Title
                </Label>
                <Input
                  id="metaTitle"
                  className="h-11 rounded-lg border-slate-200 text-sm"
                  {...register("metaTitle")}
                />
                <div className="mt-1.5 text-right text-xs font-medium text-slate-400">
                  {metaTitle.length} / 60 characters
                </div>
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="metaDescription"
                  className="text-sm font-semibold text-slate-800"
                >
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  className="min-h-[80px] resize-none rounded-lg border-slate-200 py-3 text-sm"
                  {...register("metaDescription")}
                />
                <div className="mt-1.5 text-right text-xs font-medium text-slate-400">
                  {metaDescription.length} / 160 characters
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="keywords"
                  className="text-sm font-semibold text-slate-800"
                >
                  Keywords (Comma separated)
                </Label>
                <Input
                  id="keywords"
                  className="h-11 rounded-lg border-slate-200 text-sm"
                  {...register("keywords")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <Card>
            <CardHeader className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded bg-indigo-50">
                <Share2 className="size-5 text-indigo-500" />
              </div>
              <div>
                <CardTitle className="font-display text-lg font-bold text-slate-900">
                  Social Sharing (Open Graph)
                </CardTitle>
                <CardDescription className="font-sans">
                  Preview for Facebook, Twitter, and LinkedIn.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* OG Image URL */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="ogImageUrl"
                  className="text-sm font-semibold text-slate-800"
                >
                  OG Image URL
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="ogImageUrl"
                    className="h-11 flex-1 rounded-lg border-slate-200 text-sm"
                    {...register("ogImageUrl")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-lg border-slate-200 px-6 font-semibold text-slate-700"
                  >
                    Browse
                  </Button>
                </div>
              </div>

              {/* Preview */}

              <div className="pointer-events-none overflow-hidden rounded-xl border border-slate-100 bg-[#f8f9fa] p-3">
                <p className="mb-1 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  PREVIEW
                </p>
                <div className="flex h-50 items-center justify-center rounded-t-lg bg-[#e9ecef]">
                  <Globe className="size-16 stroke-1 text-slate-400/70" />
                </div>
                <div className="rounded-b-lg border-t border-slate-100 bg-white p-5">
                  <h3 className="mb-1 truncate text-base font-bold text-slate-900">
                    {metaTitle}
                  </h3>
                  <p className="mb-2 line-clamp-2 text-sm leading-snug text-slate-500">
                    {metaDescription}
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    hubnepa.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded bg-orange-50">
                <FileText className="size-5 text-orange-500" />
              </div>
              <div>
                <CardTitle className="font-display text-lg font-bold text-slate-900">
                  Indexing & Sitemap
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Search Engine Indexing */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Search Engine Indexing
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Allow crawlers to index site
                  </p>
                </div>
                <Switch
                  {...register("enableIndexing")}
                  className="data-[state=checked]:bg-[#f97316]"
                />
              </div>

              {/* Sitemap.xml */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="sitemapUrl"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Sitemap.xml
                  </Label>
                  <div className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="size-3.5" />
                    Updated
                  </div>
                </div>
                <Input
                  id="sitemapUrl"
                  className="h-11 rounded-lg border-slate-200 bg-slate-50/50 text-sm"
                  readOnly
                  {...register("sitemapUrl")}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 h-11 w-full rounded-lg border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Regenerate Sitemap
                </Button>
              </div>

              {/* Robots.txt */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <Label className="text-sm font-semibold text-slate-800">
                  Robots.txt
                </Label>
                <div className="rounded-xl bg-[#0f172a] p-4 font-mono text-sm leading-relaxed text-slate-300 shadow-inner">
                  <div>User-agent: *</div>
                  <div>Allow: /</div>
                  <div>Disallow: /admin</div>
                  <div>Disallow: /api</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
