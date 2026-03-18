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

type ShipmentStatus = "in-transit" | "loading" | "delivered"

interface Shipment {
  shipmentId: string
  destination: string
  driver: string
  status: ShipmentStatus
}

const shipments: Shipment[] = [
  {
    shipmentId: "SHP-789",
    destination: "Urban Mart - Downtown",
    driver: "John Davis",
    status: "in-transit",
  },
  {
    shipmentId: "SHP-788",
    destination: "Mega Store - North",
    driver: "Sarah Wilson",
    status: "loading",
  },
  {
    shipmentId: "SHP-787",
    destination: "Quick Shop - East",
    driver: "Mike Johnson",
    status: "delivered",
  },
]

const statusAppearanceMap: Record<ShipmentStatus, string> = {
  "in-transit": "bg-sky-100 text-sky-700",
  loading: "bg-amber-100 text-amber-700",
  delivered: "bg-emerald-100 text-emerald-700",
}

const statusLabelMap: Record<ShipmentStatus, string> = {
  "in-transit": "in-transit",
  loading: "loading",
  delivered: "delivered",
}

export function SupplierPanelLogisticsTab() {
  return (
    <TabsContent value="logistics" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Logistics & Fleet
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.shipmentId}>
                  <TableCell className="font-medium">
                    {shipment.shipmentId}
                  </TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>{shipment.driver}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusAppearanceMap[shipment.status]
                      )}
                    >
                      {statusLabelMap[shipment.status]}
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
