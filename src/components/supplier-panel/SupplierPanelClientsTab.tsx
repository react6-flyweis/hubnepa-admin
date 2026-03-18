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

type ClientStatus = "active" | "inactive" | "onboarding"

interface Client {
  name: string
  totalSpend: string
  orders: number
  status: ClientStatus
}

const clients: Client[] = [
  {
    name: "Urban Mart",
    totalSpend: "$45,680",
    orders: 128,
    status: "active",
  },
  {
    name: "Mega Store",
    totalSpend: "$38,920",
    orders: 95,
    status: "active",
  },
  {
    name: "Quick Shop",
    totalSpend: "$29,340",
    orders: 76,
    status: "active",
  },
  {
    name: "Fresh Market",
    totalSpend: "$52,100",
    orders: 142,
    status: "active",
  },
]

const statusAppearanceMap: Record<ClientStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  onboarding: "bg-amber-100 text-amber-700",
  inactive: "bg-slate-100 text-slate-700",
}

const statusLabelMap: Record<ClientStatus, string> = {
  active: "Active",
  onboarding: "Onboarding",
  inactive: "Inactive",
}

export function SupplierPanelClientsTab() {
  return (
    <TabsContent value="clients" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Clients
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.name}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.totalSpend}</TableCell>
                  <TableCell>{client.orders}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusAppearanceMap[client.status]
                      )}
                    >
                      {statusLabelMap[client.status]}
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
