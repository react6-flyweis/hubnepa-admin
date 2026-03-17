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

type ProductStatus = "in-stock" | "low-stock"

interface Product {
  sku: string
  name: string
  stock: number
  price: string
  status: ProductStatus
}

const products: Product[] = [
  {
    sku: "RTL-001",
    name: "Fresh Apples",
    stock: 120,
    price: "$3.99",
    status: "in-stock",
  },
  {
    sku: "RTL-002",
    name: "Organic Milk",
    stock: 45,
    price: "$5.49",
    status: "in-stock",
  },
  {
    sku: "RTL-003",
    name: "Whole Wheat Bread",
    stock: 15,
    price: "$4.29",
    status: "low-stock",
  },
  {
    sku: "RTL-004",
    name: "Orange Juice",
    stock: 68,
    price: "$6.99",
    status: "in-stock",
  },
]

const statusAppearanceMap: Record<ProductStatus, string> = {
  "in-stock": "bg-emerald-100 text-emerald-700",
  "low-stock": "bg-red-100 text-red-700",
}

const statusLabelMap: Record<ProductStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
}

export function RetailerPanelProductsTab() {
  return (
    <TabsContent value="products" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Product Inventory
          </CardTitle>
          <Badge className="h-7 rounded-full bg-sky-100 px-3 text-xs text-sky-700">
            View Only - Admin Access
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.sku}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 text-xs",
                        statusAppearanceMap[product.status]
                      )}
                    >
                      {statusLabelMap[product.status]}
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
