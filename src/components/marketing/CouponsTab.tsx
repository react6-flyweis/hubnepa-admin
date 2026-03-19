import { Copy, Percent, Plus, Tag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Coupon = {
  id: string
  title: string
  validUntil: string
  code: string
  uses: string
  discountLabel: string
}

const coupons: Coupon[] = [
  {
    id: "coupon_001",
    title: "New User Welcome",
    validUntil: "2024-12-31",
    code: "SUMMER24",
    uses: "1.2k Uses",
    discountLabel: "20% OFF",
  },
  {
    id: "coupon_002",
    title: "Free Delivery Weekend",
    validUntil: "2024-05-12",
    code: "SUMMER24",
    uses: "2.1k Uses",
    discountLabel: "20% OFF",
  },
]

function CouponCard({ coupon }: { coupon: Coupon }) {
  return (
    <Card className="gap-0 rounded-xl border border-slate-200 bg-white py-0 shadow-none ring-0">
      <div className="rounded-t-xl bg-emerald-50/60 px-3 py-3 pt-10">
        <div className="flex items-start gap-2.5">
          <div className="flex size-12 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-600 shadow-sm">
            <Percent className="size-6" />
          </div>

          <div>
            <h3 className="text-xl leading-tight font-semibold text-slate-900">
              {coupon.title}
            </h3>
            <p className="mt-0.5 text-sm text-slate-500">Valid until</p>
            <p className="text-base text-slate-600">{coupon.validUntil}</p>
          </div>
        </div>
      </div>

      <div className="relative border-y border-slate-200 px-3 py-2.5">
        <span className="absolute top-1/2 left-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100" />
        <span className="absolute top-1/2 right-0 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-slate-500">Code:</p>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/80 px-3 text-base font-semibold text-slate-700"
            aria-label={`Copy code ${coupon.code}`}
          >
            {coupon.code}
            <Copy className="size-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="space-y-3 px-3 py-3">
        <div className="flex items-center justify-between">
          <p className="text-lg text-slate-500">{coupon.uses}</p>
          <p className="text-lg font-semibold text-emerald-600">
            {coupon.discountLabel}
          </p>
        </div>

        <div className="h-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 flex-1 rounded-lg border-slate-200 bg-slate-50 text-sm text-slate-900 hover:bg-slate-100"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-10 text-slate-400 hover:bg-transparent hover:text-rose-500"
            aria-label="Delete coupon"
          >
            <Trash2 className="size-5" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

function CreateCouponCard() {
  return (
    <button
      type="button"
      className="flex min-h-64 flex-col items-center justify-center rounded-xl border-2 border-slate-300 bg-white/70 px-3 text-center text-slate-400 transition hover:border-slate-400 hover:text-slate-500"
    >
      <Tag className="size-12" />
      <span className="mt-3 text-lg font-medium">Create New Coupon</span>
    </button>
  )
}

export function CouponsTab() {
  return (
    <Card className="rounded-xl border border-slate-300 p-3 ring-0 sm:p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Active Coupons
          </h2>
          <p className="text-sm text-slate-500">
            Discount codes currently in circulation
          </p>
        </div>

        <Button
          variant="outline"
          className="h-9 self-start rounded-lg border-slate-200 bg-slate-100 px-3 text-sm font-medium text-slate-900 hover:bg-slate-200"
        >
          <Plus className="size-4" />
          Create Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
        <CreateCouponCard />
      </div>
    </Card>
  )
}
