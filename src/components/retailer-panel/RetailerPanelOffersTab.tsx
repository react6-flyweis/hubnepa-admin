import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type OfferStatus = "active" | "paused" | "expired"

interface OfferItem {
  code: string
  discount: string
  used: number
  limit: number
  status: OfferStatus
}

const offers: OfferItem[] = [
  { code: "SAVE20", discount: "20%", used: 45, limit: 100, status: "active" },
  { code: "SUMMER10", discount: "10%", used: 89, limit: 100, status: "active" },
  { code: "WELCOME", discount: "$5", used: 156, limit: 200, status: "active" },
]

const statusAppearanceMap: Record<OfferStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  expired: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<OfferStatus, string> = {
  active: "Active",
  paused: "Paused",
  expired: "Expired",
}

export function RetailerPanelOffersTab() {
  return (
    <TabsContent value="offers" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Offers & Coupons
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Used / Limit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <TableRow key={offer.code}>
                  <TableCell className="font-medium">{offer.code}</TableCell>
                  <TableCell className="text-slate-500">
                    {offer.discount}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {offer.used} / {offer.limit}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusAppearanceMap[offer.status]
                      )}
                    >
                      {statusLabelMap[offer.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
