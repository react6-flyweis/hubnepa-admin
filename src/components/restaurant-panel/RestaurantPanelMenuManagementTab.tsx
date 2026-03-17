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

interface MenuItem {
  id: string
  name: string
  category: string
  price: string
  status: "available" | "out_of_stock" | "seasonal"
}

const menuItems: MenuItem[] = [
  {
    id: "MI-001",
    name: "Pasta Carbonara",
    category: "Main Course",
    price: "$15.99",
    status: "available",
  },
  {
    id: "MI-002",
    name: "Margherita Pizza",
    category: "Main Course",
    price: "$12.99",
    status: "available",
  },
  {
    id: "MI-003",
    name: "Caesar Salad",
    category: "Appetizer",
    price: "$8.99",
    status: "available",
  },
  {
    id: "MI-004",
    name: "Grilled Salmon",
    category: "Main Course",
    price: "$22.99",
    status: "out_of_stock",
  },
  {
    id: "MI-005",
    name: "Pumpkin Spice Latte",
    category: "Drinks",
    price: "$6.49",
    status: "seasonal",
  },
]

const statusColorMap: Record<MenuItem["status"], string> = {
  available: "bg-emerald-100 text-emerald-700",
  out_of_stock: "bg-red-100 text-red-700",
  seasonal: "bg-amber-100 text-amber-700",
}

const statusLabelMap: Record<MenuItem["status"], string> = {
  available: "Available",
  out_of_stock: "Out of Stock",
  seasonal: "Seasonal",
}

export function RestaurantPanelMenuManagementTab() {
  return (
    <TabsContent value="menu-management" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Menu Management
            </CardTitle>
            <p className="text-sm text-slate-500">
              Manage your restaurant menu items and inventory status.
            </p>
          </div>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <Table>
            <TableHeader className="text-muted-foreground">
              <TableRow>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Item Name
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Price
                </TableHead>
                <TableHead className="text-xs font-semibold tracking-wide uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {item.category}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {item.price}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "h-7 rounded-full px-3 text-xs font-semibold",
                        statusColorMap[item.status]
                      )}
                    >
                      {statusLabelMap[item.status]}
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
