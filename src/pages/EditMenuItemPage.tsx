import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Clock3, Flame, ImageUp, Plus, Save } from "lucide-react"
import { useEffect, useMemo, type ChangeEvent } from "react"
import { useForm, useWatch } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router"
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { menuItems } from "@/data/products"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const restaurantOptions = [
  "Himalayan Kitchen",
  "Everest Bites",
  "Kathmandu Grill",
  "Urban Spice House",
] as const

const menuCategoryOptions = [
  "Main Course",
  "Starters",
  "Snacks",
  "Beverages",
  "Desserts",
] as const

const spicinessOptions = ["None", "Mild", "Medium", "Hot"] as const

const dietaryTagOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Halal",
] as const

const imageFileSchema = z.custom<File>(
  (value) => value instanceof File,
  "Only valid image files are allowed"
)

const editMenuItemSchema = z.object({
  dishName: z.string().min(1, "Dish name is required"),
  description: z
    .string()
    .min(8, "Description must be at least 8 characters")
    .max(300, "Description can be up to 300 characters"),
  ingredients: z.string().min(1, "Ingredients list is required"),
  restaurant: z.string().min(1, "Restaurant is required"),
  menuCategory: z.string().min(1, "Menu category is required"),
  availableForOrder: z.boolean(),
  servingBreakfast: z.boolean(),
  servingLunch: z.boolean(),
  servingDinner: z.boolean(),
  prepTimeMins: z.number().int().min(1, "Prep time must be at least 1 minute"),
  calories: z.number().int().min(0, "Calories cannot be negative"),
  spiciness: z.string().min(1, "Spiciness is required"),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  isGlutenFree: z.boolean(),
  isHalal: z.boolean(),
  basePrice: z.number().min(0, "Base price cannot be negative"),
  photo: imageFileSchema.optional(),
})

type EditMenuItemFormValues = z.infer<typeof editMenuItemSchema>

type DietaryTagFieldName =
  | "isVegetarian"
  | "isVegan"
  | "isGlutenFree"
  | "isHalal"

const dietaryTagFieldMap: Record<
  (typeof dietaryTagOptions)[number],
  DietaryTagFieldName
> = {
  Vegetarian: "isVegetarian",
  Vegan: "isVegan",
  "Gluten Free": "isGlutenFree",
  Halal: "isHalal",
}

const defaultValues: EditMenuItemFormValues = {
  dishName: "",
  description: "",
  ingredients: "",
  restaurant: "",
  menuCategory: "Main Course",
  availableForOrder: true,
  servingBreakfast: true,
  servingLunch: true,
  servingDinner: true,
  prepTimeMins: 15,
  calories: 650,
  spiciness: "None",
  isVegetarian: false,
  isVegan: false,
  isGlutenFree: false,
  isHalal: false,
  basePrice: 0,
  photo: undefined,
}

export default function EditMenuItemPage() {
  const navigate = useNavigate()
  const { menuItemId } = useParams<{ menuItemId: string }>()

  const menuItem = useMemo(() => {
    if (!menuItemId) return undefined
    return menuItems.find((item) => item.id === menuItemId)
  }, [menuItemId])

  const form = useForm<EditMenuItemFormValues>({
    resolver: zodResolver(editMenuItemSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!menuItem) return

    form.reset({
      ...defaultValues,
      dishName: menuItem.name,
      description: menuItem.description ?? "",
      ingredients: "",
      restaurant: menuItem.vendor,
      menuCategory: menuItem.category,
      availableForOrder: menuItem.status === "Active",
      basePrice: menuItem.price,
    })
  }, [form, menuItem])

  useEffect(() => {
    if (menuItemId && !menuItem) {
      navigate("/products", { replace: true })
    }
  }, [menuItem, menuItemId, navigate])

  const selectedPhoto = useWatch({
    control: form.control,
    name: "photo",
  })

  const prepTimeMins = useWatch({
    control: form.control,
    name: "prepTimeMins",
  })

  const calories = useWatch({
    control: form.control,
    name: "calories",
  })

  const basePrice = useWatch({
    control: form.control,
    name: "basePrice",
  })

  const restaurant = useWatch({
    control: form.control,
    name: "restaurant",
  })

  const menuCategory = useWatch({
    control: form.control,
    name: "menuCategory",
  })

  const spiciness = useWatch({
    control: form.control,
    name: "spiciness",
  })

  const availableForOrder = useWatch({
    control: form.control,
    name: "availableForOrder",
  })

  function handleDiscard() {
    form.reset(defaultValues)
    navigate("/products")
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      form.setValue("photo", undefined, {
        shouldDirty: true,
        shouldValidate: true,
      })
      return
    }

    const isValidType = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ].includes(file.type)

    if (!isValidType || file.size > MAX_IMAGE_SIZE) {
      form.setError("photo", {
        type: "manual",
        message: "Only SVG, PNG, JPG, or GIF files under 5MB are allowed",
      })
      return
    }

    form.setValue("photo", file, {
      shouldDirty: true,
      shouldValidate: true,
    })
    form.clearErrors("photo")
  }

  function onSubmit(values: EditMenuItemFormValues) {
    form.reset(defaultValues)
    navigate("/products")
    void values
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
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl leading-tight font-semibold text-[#0F172B]">
                  Edit Menu Item
                </h1>
                {menuItem && (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
                    {menuItem.id}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-muted-foreground">
                Update menu details for {form.watch("dishName") || "..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              className="h-9 px-4"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button
              type="submit"
              form="edit-menu-item-form"
              className="h-9 gap-1.5 bg-[#EB5B00] px-4 text-white hover:bg-[#cf4f00]"
            >
              <Save className="size-3.5" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <form
        id="edit-menu-item-form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]"
      >
        <div className="space-y-4">
          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Dish Information
              </CardTitle>
              <FieldDescription>
                Basic details about the menu item.
              </FieldDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel htmlFor="dishName">Dish Name</FieldLabel>
                <Input
                  id="dishName"
                  placeholder="e.g. Signature Truffle Burger"
                  className="h-10 bg-slate-50"
                  aria-invalid={Boolean(form.formState.errors.dishName)}
                  {...form.register("dishName")}
                />
                <FieldError
                  errors={[form.formState.errors.dishName]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Describe the taste, texture, and key ingredients..."
                  className="min-h-28 bg-slate-50"
                  aria-invalid={Boolean(form.formState.errors.description)}
                  {...form.register("description")}
                />
                <FieldError
                  errors={[form.formState.errors.description]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="ingredients">Ingredients List</FieldLabel>
                <Input
                  id="ingredients"
                  placeholder="e.g. Beef patty, truffle aioli, brioche bun, arugula..."
                  className="h-10 bg-slate-50"
                  aria-invalid={Boolean(form.formState.errors.ingredients)}
                  {...form.register("ingredients")}
                />
                <FieldDescription>Separated by commas.</FieldDescription>
                <FieldError
                  errors={[form.formState.errors.ingredients]}
                  className="mt-1"
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Preparation & Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Field>
                  <FieldLabel htmlFor="prepTimeMins">
                    Prep Time (mins)
                  </FieldLabel>
                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="prepTimeMins"
                      type="number"
                      min="1"
                      value={prepTimeMins ?? 1}
                      onChange={(event) => {
                        form.setValue(
                          "prepTimeMins",
                          Number(event.target.value) || 1,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        )
                      }}
                      className="h-9 bg-slate-50 pl-9"
                      aria-invalid={Boolean(form.formState.errors.prepTimeMins)}
                    />
                  </div>
                  <FieldError
                    errors={[form.formState.errors.prepTimeMins]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="calories">Calories (kcal)</FieldLabel>
                  <div className="relative">
                    <Flame className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="calories"
                      type="number"
                      min="0"
                      value={calories ?? 0}
                      onChange={(event) => {
                        form.setValue(
                          "calories",
                          Number(event.target.value) || 0,
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        )
                      }}
                      className="h-9 bg-slate-50 pl-9"
                      aria-invalid={Boolean(form.formState.errors.calories)}
                    />
                  </div>
                  <FieldError
                    errors={[form.formState.errors.calories]}
                    className="mt-1"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="spiciness">Spiciness</FieldLabel>
                  <Select
                    value={spiciness}
                    onValueChange={(value) => {
                      form.setValue("spiciness", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }}
                  >
                    <SelectTrigger id="spiciness" className="h-9 bg-slate-50">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {spicinessOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={[form.formState.errors.spiciness]}
                    className="mt-1"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel>Dietary Tags</FieldLabel>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {dietaryTagOptions.map((tag) => {
                    const fieldName = dietaryTagFieldMap[tag]
                    return (
                      <label
                        key={tag}
                        className="inline-flex items-center gap-2 text-slate-700"
                      >
                        <input
                          type="checkbox"
                          className="size-4 rounded border-slate-300 text-[#E17100] focus:ring-[#E17100]"
                          checked={Boolean(form.watch(fieldName))}
                          onChange={(event) => {
                            form.setValue(fieldName, event.target.checked, {
                              shouldDirty: true,
                            })
                          }}
                        />
                        {tag}
                      </label>
                    )
                  })}
                </div>
              </Field>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Pricing & Variations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel htmlFor="basePrice">Base Price</FieldLabel>
                <div className="relative max-w-[18rem]">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={basePrice ?? 0}
                    onChange={(event) => {
                      form.setValue(
                        "basePrice",
                        Number(event.target.value) || 0,
                        {
                          shouldDirty: true,
                          shouldValidate: true,
                        }
                      )
                    }}
                    className="h-9 bg-slate-50 pl-8"
                    aria-invalid={Boolean(form.formState.errors.basePrice)}
                  />
                </div>
                <FieldError
                  errors={[form.formState.errors.basePrice]}
                  className="mt-1"
                />
              </Field>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg leading-none font-semibold text-[#111827]">
                    Add-ons / Modifiers
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-8 gap-1.5 px-3"
                  >
                    <Plus className="size-3.5" />
                    Add Group
                  </Button>
                </div>
                <div className="mt-6 rounded-md border border-dashed border-slate-200 bg-white py-6 text-center text-muted-foreground">
                  No modifier groups added yet.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Restaurant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <Field>
                <FieldLabel htmlFor="restaurant">Select Restaurant</FieldLabel>
                <Select
                  value={restaurant}
                  onValueChange={(value) => {
                    form.setValue("restaurant", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                >
                  <SelectTrigger id="restaurant" className="h-10 bg-slate-50">
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurantOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={[form.formState.errors.restaurant]}
                  className="mt-1"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="menuCategory">Menu Category</FieldLabel>
                <Select
                  value={menuCategory}
                  onValueChange={(value) => {
                    form.setValue("menuCategory", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }}
                >
                  <SelectTrigger id="menuCategory" className="h-10 bg-slate-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuCategoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={[form.formState.errors.menuCategory]}
                  className="mt-1"
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900">
                  Available for Order
                </p>
                <Switch
                  checked={availableForOrder}
                  onCheckedChange={(checked) => {
                    form.setValue("availableForOrder", Boolean(checked), {
                      shouldDirty: true,
                    })
                  }}
                />
              </div>

              <div className="h-px w-full bg-slate-200" />

              <Field>
                <FieldLabel>Serving Times</FieldLabel>
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-slate-300 text-[#E17100] focus:ring-[#E17100]"
                      checked={Boolean(form.watch("servingBreakfast"))}
                      onChange={(event) => {
                        form.setValue(
                          "servingBreakfast",
                          event.target.checked,
                          {
                            shouldDirty: true,
                          }
                        )
                      }}
                    />
                    Breakfast
                  </label>

                  <label className="inline-flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-slate-300 text-[#E17100] focus:ring-[#E17100]"
                      checked={Boolean(form.watch("servingLunch"))}
                      onChange={(event) => {
                        form.setValue("servingLunch", event.target.checked, {
                          shouldDirty: true,
                        })
                      }}
                    />
                    Lunch
                  </label>

                  <label className="inline-flex items-center gap-2 text-slate-700">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-slate-300 text-[#E17100] focus:ring-[#E17100]"
                      checked={Boolean(form.watch("servingDinner"))}
                      onChange={(event) => {
                        form.setValue("servingDinner", event.target.checked, {
                          shouldDirty: true,
                        })
                      }}
                    />
                    Dinner
                  </label>
                </div>
              </Field>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white py-0">
            <CardHeader className="px-5 pt-5 pb-2">
              <CardTitle className="font-display text-xl leading-none font-semibold text-[#111827]">
                Dish Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <Field>
                <label
                  htmlFor="dishPhoto"
                  className={cn(
                    "block cursor-pointer rounded-lg border border-slate-300 bg-slate-50 p-6 text-center transition-colors hover:border-slate-400",
                    form.formState.errors.photo && "border-destructive"
                  )}
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-muted-foreground">
                    <ImageUp className="size-6" />
                  </div>
                  <p className="mt-3 font-medium text-slate-700">
                    Upload Photo
                  </p>
                  {selectedPhoto && (
                    <p className="mt-1 text-muted-foreground">
                      {selectedPhoto.name}
                    </p>
                  )}
                </label>
                <input
                  id="dishPhoto"
                  type="file"
                  className="hidden"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  onChange={handlePhotoChange}
                />
                <FieldError
                  errors={[form.formState.errors.photo]}
                  className="mt-2"
                />
              </Field>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
