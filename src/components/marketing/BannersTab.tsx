import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const banners = [
  {
    id: 1,
    title: "Main Hero Slider 1",
    tag: "Home",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  },
  {
    id: 2,
    title: "Restaurant Discovery",
    tag: "Restaurants",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  {
    id: 3,
    title: "Grocery Promo",
    tag: "Marketplace",
    status: "Inactive",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  },
]

export function BannersTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="relative h-36 w-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="size-full object-cover"
            />
            <Badge
              className={`absolute top-2 right-2 border-transparent ${
                banner.status === "Active"
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-500 text-white hover:bg-slate-600"
              }`}
            >
              {banner.status}
            </Badge>
          </div>
          <div className="p-4">
            <div className="w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {banner.tag}
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">
              {banner.title}
            </h3>
          </div>
        </div>
      ))}

      <button className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
          <Plus className="size-5 text-slate-400" />
        </div>
        <span className="mt-3 text-sm font-medium text-slate-500">
          Add New Banner
        </span>
      </button>
    </div>
  )
}
