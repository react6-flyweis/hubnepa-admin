import { Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type CommissionStatus = "Collected" | "Pending"

interface CommissionItem {
  id: string
  partner: string
  sourceOrder: string
  orderValue: number
  rate: string
  status: CommissionStatus
  feeAmount: number
}

const commissionItems: CommissionItem[] = [
  {
    id: "COM-4421",
    partner: "Spicy Kitchen",
    sourceOrder: "ORD-9921",
    orderValue: 125,
    rate: "15%",
    status: "Collected",
    feeAmount: 18.75,
  },
  {
    id: "COM-4422",
    partner: "Fresh Mart",
    sourceOrder: "ORD-9922",
    orderValue: 85,
    rate: "10%",
    status: "Collected",
    feeAmount: 8.5,
  },
  {
    id: "COM-4423",
    partner: "Tech Gadgets",
    sourceOrder: "ORD-9923",
    orderValue: 450,
    rate: "8%",
    status: "Pending",
    feeAmount: 36,
  },
  {
    id: "COM-4424",
    partner: "Burger King Clone",
    sourceOrder: "ORD-9924",
    orderValue: 65.5,
    rate: "15%",
    status: "Collected",
    feeAmount: 9.82,
  },
  {
    id: "COM-4425",
    partner: "Pizza Hut Clone",
    sourceOrder: "ORD-9925",
    orderValue: 92,
    rate: "15%",
    status: "Pending",
    feeAmount: 13.8,
  },
]

const commissionStatusColorMap: Record<CommissionStatus, string> = {
  Collected: "border-emerald-200 bg-emerald-100 text-emerald-700",
  Pending: "border-amber-200 bg-amber-100 text-amber-700",
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatFeeCurrency(amount: number) {
  return `+$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function splitSourceOrder(orderId: string) {
  const [prefix, suffix] = orderId.split("-")

  return {
    prefix,
    suffix,
  }
}

export default function FinanceCommissionsTab() {
  return (
    <Card className="rounded-2xl border border-slate-200 py-0 shadow-sm">
      <CardContent className="space-y-3 p-0">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            Platform Commissions
          </h2>

          <Button
            variant="outline"
            size="lg"
            className="h-9 gap-2 border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-slate-50 [&_tr]:border-slate-200">
            <TableRow className="hover:bg-slate-50">
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Commission ID
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Partner
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Source Order
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Order Value
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Rate
              </TableHead>
              <TableHead className="px-4 py-2.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Status
              </TableHead>
              <TableHead className="px-4 py-2.5 text-right text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                Fee Amount
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="[&_tr]:border-slate-200 [&_tr:last-child]:border-b">
            {commissionItems.map((item) => {
              const sourceOrderParts = splitSourceOrder(item.sourceOrder)

              return (
                <TableRow key={item.id} className="hover:bg-slate-50">
                  <TableCell className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-500">
                    {item.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-slate-900">
                    <p className="font-semibold text-slate-800">
                      {item.partner}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-normal text-blue-500">
                    <p className="font-medium">{sourceOrderParts.prefix}-</p>
                    <p className="font-medium">{sourceOrderParts.suffix}</p>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-lg font-medium text-slate-500">
                    {formatCurrency(item.orderValue)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-lg font-medium text-slate-500">
                    {item.rate}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "h-6 rounded-full border px-2.5 text-xs font-semibold",
                        commissionStatusColorMap[item.status]
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right text-2xl font-semibold text-emerald-700">
                    {formatFeeCurrency(item.feeAmount)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
