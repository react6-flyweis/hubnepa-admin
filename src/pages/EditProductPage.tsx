import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ImagePlus, Save, Upload } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
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
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { menuItems, retailProducts } from "@/data/products"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const MAX_IMAGE_COUNT = 4

const categoryOptions = [
  "Grocery",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Electronics",
  "Personal Care",
] as const

const vendorOptions = [
  "Fresh Mart",
  "Green Harvest",
  "Urban Pantry",
  "Tech Gadgets",
  "Purely Clean",
] as const

const statusColorMap = {
  active: {
    heading: "text-slate-900",
    helper: "text-slate-500",
  },
  inactive: {
    heading: "text-slate-500",
    helper: "text-slate-500",
  },
} as const

const imageFileSchema = z.custom<File>(
  (value) => value instanceof File,
  "Only valid image files are allowed"
)

const addProductSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand / manufacturer is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  isActive: z.boolean(),
  category: z.string().min(1, "Category is required"),
  vendor: z.string().min(1, "Seller / vendor is required"),
  tags: z.string().optional(),
  images: z
    .array(imageFileSchema)
    .max(
      MAX_IMAGE_COUNT,
      `You can upload up to ${MAX_IMAGE_COUNT} images only`
    ),
  basePrice: z.number().min(0, "Base price cannot be negative"),
  compareAtPrice: z.number().min(0, "Compare at price cannot be negative"),
  costPerItem: z.number().min(0, "Cost per item cannot be negative"),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
  lowStockThreshold: z
    .number()
    .int()
    .min(0, "Low stock threshold cannot be negative"),
})

type AddProductFormValues = z.infer<typeof addProductSchema>

const defaultValues: AddProductFormValues = {
  productName: "",
  brand: "",
  sku: "",
  description: "",
  isActive: true,
  category: "Grocery",
  vendor: "",
  tags: "",
  images: [],
  basePrice: 0,
  compareAtPrice: 0,
  costPerItem: 0,
  stockQuantity: 0,
  lowStockThreshold: 20,
}

interface CurrencyFieldProps {
  id: keyof AddProductFormValues
  label: string
  helperText?: string
  value: number
  error?: string
  onChange: (value: number) => void
}

function CurrencyField({
  id,
  label,
  helperText,
  value,
  error,
  onChange,
}: CurrencyFieldProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value)
    onChange(Number.isNaN(nextValue) ? 0 : nextValue)
  }

  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-sm text-slate-900">
        {label}
      </FieldLabel>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500">
          $
        </span>
        <Input
          id={id}
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={handleChange}
          className="h-9 bg-slate-50 pl-8 text-sm"
          aria-invalid={Boolean(error)}
        />
      </div>
      {helperText && (
        <FieldDescription className="mt-1 text-xs text-slate-500">
          {helperText}
        </FieldDescription>
      )}
      <FieldError
        errors={error ? [{ message: error }] : undefined}
        className="mt-1"
      />
    </Field>
  )
}

export default function EditProductPage() {
  const navigate = useNavigate()
  const { productId } = useParams<{ productId: string }>()

  const product = useMemo(() => {
    if (!productId) return undefined
    const combined = [...retailProducts, ...menuItems]
    return combined.find((item) => item.id === productId)
  }, [productId])

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!product) return

    form.reset({
      ...defaultValues,
      productName: product.name,
      brand: product.brand ?? "",
      sku: product.sku ?? product.id,
      description: product.description ?? "",
      tags: product.tags?.join(", ") ?? "",
      category: product.category,
      vendor: product.vendor,
      basePrice: product.price,
      compareAtPrice: product.compareAtPrice ?? 0,
      costPerItem: product.costPerItem ?? 0,
      stockQuantity: product.stockQuantity ?? 0,
      lowStockThreshold: product.lowStockThreshold ?? 20,
      isActive: product.status === "Active",
    })
  }, [form, product])

  const isActive = useWatch({
    control: form.control,
    name: "isActive",
  })

  const uploadedImages = useWatch({
    control: form.control,
    name: "images",
    defaultValue: [],
  })

  const basePrice = useWatch({
    control: form.control,
    name: "basePrice",
  })

  const compareAtPrice = useWatch({
    control: form.control,
    name: "compareAtPrice",
  })

  const costPerItem = useWatch({
    control: form.control,
    name: "costPerItem",
  })

  const stockQuantity = useWatch({
    control: form.control,
    name: "stockQuantity",
  })

  const lowStockThreshold = useWatch({
    control: form.control,
    name: "lowStockThreshold",
  })

  const category = useWatch({
    control: form.control,
    name: "category",
  })

  const vendor = useWatch({
    control: form.control,
    name: "vendor",
  })

  const statusTone = isActive ? statusColorMap.active : statusColorMap.inactive

  const imageSlots = useMemo(() => {
    const existingImages = product?.imageUrls ?? []
    const combined = [...uploadedImages, ...existingImages].slice(
      0,
      MAX_IMAGE_COUNT
    )

    return Array.from({ length: MAX_IMAGE_COUNT }, (_, index) => {
      return combined[index]
    })
  }, [product?.imageUrls, uploadedImages])

  function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])

    if (!files.length) {
      return
    }

    const validFiles = files.filter((file) => {
      return (
        file.size <= MAX_IMAGE_SIZE &&
        ["image/svg+xml", "image/png", "image/jpeg", "image/gif"].includes(
          file.type
        )
      )
    })

    const nextFiles = [...uploadedImages, ...validFiles].slice(
      0,
      MAX_IMAGE_COUNT
    )

    form.setValue("images", nextFiles, {
      shouldDirty: true,
      shouldValidate: true,
    })

    if (validFiles.length !== files.length) {
      form.setError("images", {
        type: "manual",
        message: "Only SVG, PNG, JPG, or GIF files under 5MB are allowed",
      })
      return
    }

    form.clearErrors("images")
  }

  function handleDiscard() {
    form.reset(defaultValues)
    navigate("/products")
  }

  function onSubmit(values: AddProductFormValues) {
    form.reset(defaultValues)
    navigate("/products")
    void values
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-6xl pb-8">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 sm:px-5">
          <p className="text-base font-semibold text-slate-900">
            Product not found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            The product you are trying to edit does not exist.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline" className="h-9">
              <Link to="/products">Back to products</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-8">
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="mt-0.5 rounded-full text-slate-700"
            >
              <Link to="/products" aria-label="Back to products">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl leading-tight font-semibold text-[#0F172B]">
                  Edit Product
                </h1>
                <Badge variant="outline" className="text-xs">
                  {product.id.toUpperCase()}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                Update details for {product.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              className="h-9 px-4 text-sm"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button
              type="submit"
              form="edit-product-form"
              className="h-9 gap-1.5 px-4 text-sm"
            >
              <Save className="size-3.5" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <form
        id="edit-product-form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]"
      >
        <div className="space-y-4">
          <Card className="rounded-2xl border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Product Information
              </CardTitle>
              <FieldDescription className="mt-1 text-sm text-slate-500">
                Basic details about the product.
              </FieldDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel
                  htmlFor="productName"
                  className="text-sm text-slate-900"
                >
                  Product Name
                </FieldLabel>
                <Input
                  id="productName"
                  placeholder="e.g. Premium Organic Bananas"
                  className="h-9 bg-slate-50 text-sm"
                  aria-invalid={Boolean(form.formState.errors.productName)}
                  {...form.register("productName")}
                />
                <FieldError
                  errors={[form.formState.errors.productName]}
                  className="mt-1"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel
                    htmlFor="brand"
                    className="text-sm text-slate-900"
                  >
                    Brand / Manufacturer
                  </FieldLabel>
                  <Input
                    id="brand"
                    placeholder="e.g. Dole"
                    className="h-9 bg-slate-50 text-sm"
                    aria-invalid={Boolean(form.formState.errors.brand)}
                    {...form.register("brand")}
                  />
                  <FieldError
                    errors={[form.formState.errors.brand]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="sku" className="text-sm text-slate-900">
                    SKU
                  </FieldLabel>
                  <Input
                    id="sku"
                    placeholder="e.g. FRT-001-ORG"
                    className="h-9 bg-slate-50 text-sm"
                    aria-invalid={Boolean(form.formState.errors.sku)}
                    {...form.register("sku")}
                  />
                  <FieldError
                    errors={[form.formState.errors.sku]}
                    className="mt-1"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-sm text-slate-900"
                >
                  Description
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Describe the product features, benefits, and specifications..."
                  className="min-h-28 bg-slate-50 text-sm"
                  aria-invalid={Boolean(form.formState.errors.description)}
                  {...form.register("description")}
                />
                <FieldError
                  errors={[form.formState.errors.description]}
                  className="mt-1"
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Media
              </CardTitle>
              <FieldDescription className="mt-1 text-sm text-slate-500">
                High quality images increase conversion rates.
              </FieldDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <label
                  htmlFor="productImages"
                  className="group block cursor-pointer rounded-xl border-2 border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:border-slate-400"
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-slate-200 bg-white text-primary">
                    <Upload className="size-6" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-slate-900">
                    Click to upload images
                  </p>
                  <p className="mt-1.5 text-sm text-slate-500">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </label>
                <input
                  id="productImages"
                  type="file"
                  className="hidden"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  multiple
                  onChange={handleImagesChange}
                />
                <FieldError
                  errors={[form.formState.errors.images]}
                  className="mt-2"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {imageSlots.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-300",
                      image && "border-slate-300 text-slate-500"
                    )}
                  >
                    {image ? (
                      typeof image === "string" ? (
                        <img
                          src={image}
                          alt="Product"
                          className="h-full w-full rounded-xl object-cover"
                        />
                      ) : (
                        <p className="line-clamp-2 px-2 text-center text-xs text-slate-600">
                          {image.name}
                        </p>
                      )
                    ) : (
                      <ImagePlus className="size-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 px-5 pb-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <CurrencyField
                  id="basePrice"
                  label="Base Price"
                  value={basePrice ?? 0}
                  onChange={(value) =>
                    form.setValue("basePrice", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  error={form.formState.errors.basePrice?.message}
                />

                <CurrencyField
                  id="compareAtPrice"
                  label="Compare at Price"
                  helperText="To show a discount."
                  value={compareAtPrice ?? 0}
                  onChange={(value) =>
                    form.setValue("compareAtPrice", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  error={form.formState.errors.compareAtPrice?.message}
                />

                <CurrencyField
                  id="costPerItem"
                  label="Cost per Item"
                  helperText="Customers won't see this."
                  value={costPerItem ?? 0}
                  onChange={(value) =>
                    form.setValue("costPerItem", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  error={form.formState.errors.costPerItem?.message}
                />
              </div>

              <Separator className="bg-slate-200" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel
                    htmlFor="stockQuantity"
                    className="text-sm text-slate-900"
                  >
                    Stock Quantity
                  </FieldLabel>
                  <Input
                    id="stockQuantity"
                    type="number"
                    min="0"
                    value={stockQuantity ?? 0}
                    onChange={(event) => {
                      form.setValue(
                        "stockQuantity",
                        Number(event.target.value) || 0,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        }
                      )
                    }}
                    className="h-9 bg-slate-50 text-sm"
                    aria-invalid={Boolean(form.formState.errors.stockQuantity)}
                  />
                  <FieldError
                    errors={[form.formState.errors.stockQuantity]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="lowStockThreshold"
                    className="text-sm text-slate-900"
                  >
                    Low Stock Threshold
                  </FieldLabel>
                  <Input
                    id="lowStockThreshold"
                    type="number"
                    min="0"
                    value={lowStockThreshold ?? 0}
                    onChange={(event) => {
                      form.setValue(
                        "lowStockThreshold",
                        Number(event.target.value) || 0,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        }
                      )
                    }}
                    className="h-9 bg-slate-50 text-sm"
                    aria-invalid={Boolean(
                      form.formState.errors.lowStockThreshold
                    )}
                  />
                  <FieldError
                    errors={[form.formState.errors.lowStockThreshold]}
                    className="mt-1"
                  />
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-2xl border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 px-5 pb-5">
              <div className="flex items-center justify-between">
                <p
                  className={cn("text-base font-semibold", statusTone.heading)}
                >
                  Active
                </p>
                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) => {
                    form.setValue("isActive", checked, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                  aria-label="Product active status"
                />
              </div>
              <p className={cn("text-sm leading-5", statusTone.helper)}>
                {isActive
                  ? "Product will be visible to all customers immediately after saving."
                  : "Product will stay hidden until you mark it active."}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Organization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel
                  htmlFor="category"
                  className="text-sm text-slate-900"
                >
                  Category
                </FieldLabel>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    form.setValue("category", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                >
                  <SelectTrigger
                    id="category"
                    className="h-9 w-full bg-slate-50 text-sm"
                  >
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
                <FieldLabel htmlFor="vendor" className="text-sm text-slate-900">
                  Seller / Vendor
                </FieldLabel>
                <Select
                  value={vendor}
                  onValueChange={(value) => {
                    form.setValue("vendor", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                >
                  <SelectTrigger
                    id="vendor"
                    className="h-9 w-full bg-slate-50 text-sm"
                  >
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorOptions.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={[form.formState.errors.vendor]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="tags" className="text-sm text-slate-900">
                  Tags
                </FieldLabel>
                <Input
                  id="tags"
                  placeholder="e.g. Organic, Summer, New"
                  className="h-9 bg-slate-50 text-sm"
                  {...form.register("tags")}
                />
                <FieldDescription className="mt-1 text-xs text-slate-500">
                  Separate tags with commas.
                </FieldDescription>
              </Field>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
