import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

const zoneData = [
  { label: "Zone A - Refrigerated", value: "85% Full" },
  { label: "Zone B - Dry Goods", value: "62% Full" },
  { label: "Zone C - Frozen", value: "45% Full" },
]

const stockMovementData = [
  { label: "Incoming Today", value: "45 items" },
  { label: "Outgoing Today", value: "62 items" },
  { label: "Adjustments Pending", value: "8 items" },
]

export function SupplierPanelWarehouseTab() {
  return (
    <TabsContent value="warehouse" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Warehouse Inventory
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Zone Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {zoneData.map((zone) => (
                  <div
                    key={zone.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-slate-600">{zone.label}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {zone.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Stock Movement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stockMovementData.map((movement) => (
                  <div
                    key={movement.label}
                    className="flex items-baseline justify-between"
                  >
                    <span className="text-sm text-slate-600">
                      {movement.label}:
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {movement.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
