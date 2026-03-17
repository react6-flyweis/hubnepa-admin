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

interface InventoryCard {
  title: string
  description: string
}

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: string
  status: "good" | "low" | "out"
}

const inventoryCards: InventoryCard[] = [
  {
    title: "Raw Items",
    description: "Manage raw ingredients",
  },
  {
    title: "Cooked Items",
    description: "Track prepared dishes",
  },
  {
    title: "Beverage Management",
    description: "Drinks inventory",
  },
  {
    title: "Recipe Costing",
    description: "Calculate dish costs",
  },
]

const inventoryItems: InventoryItem[] = [
  {
    id: "II-001",
    name: "Tomatoes",
    category: "Raw",
    quantity: "45 kg",
    status: "good",
  },
  {
    id: "II-002",
    name: "Pasta",
    category: "Raw",
    quantity: "12 kg",
    status: "low",
  },
  {
    id: "II-003",
    name: "Olive Oil",
    category: "Raw",
    quantity: "8 L",
    status: "good",
  },
  {
    id: "II-004",
    name: "Fresh Basil",
    category: "Raw",
    quantity: "3 kg",
    status: "low",
  },
]

const statusColorMap: Record<InventoryItem["status"], string> = {
  good: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  out: "bg-red-100 text-red-700",
}

const statusLabelMap: Record<InventoryItem["status"], string> = {
  good: "Good",
  low: "Low Stock",
  out: "Out of Stock",
}

export function RestaurantPanelInventoryRecipesTab() {
  return (
    <TabsContent value="inventory-recipes" className="mt-0">
      <Card className="rounded-2xl border-slate-200 bg-white ring-0">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-2xl font-semibold text-slate-900">
              Inventory & Recipes
            </CardTitle>
            <p className="text-sm text-slate-500">
              Monitor your inventory levels and recipe costing at a glance.
            </p>
          </div>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inventoryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-lg font-semibold text-slate-900">
              Current Inventory Status
            </p>
            <Table>
              <TableHeader className="">
                <TableRow>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Item Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Category
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Quantity
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wide uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-slate-900">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {item.quantity}
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
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
