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

type ProductStatus = "in-stock" | "low-stock" | "out-of-stock"

interface Product {
  sku: string
  name: string
  stock: number
  price: string
  status: ProductStatus
}

const products: Product[] = [
  {
    sku: "PRD-001",
    name: "Organic Tomatoes (Bulk)",
    stock: 450,
    price: "$2.50/kg",
    status: "in-stock",
  },
  {
    sku: "PRD-002",
    name: "Fresh Lettuce (Crates)",
    stock: 180,
    price: "$1.80/kg",
    status: "in-stock",
  },
  {
    sku: "PRD-003",
    name: "Premium Olive Oil",
    stock: 25,
    price: "$15.00/L",
    status: "low-stock",
  },
  {
    sku: "PRD-004",
    name: "Bulk Rice Bags",
    stock: 320,
    price: "$3.20/kg",
    status: "in-stock",
  },
]

const statusAppearanceMap: Record<ProductStatus, string> = {
  "in-stock": "bg-emerald-100 text-emerald-700",
  "low-stock": "bg-amber-100 text-amber-700",
  "out-of-stock": "bg-red-100 text-red-700",
}

const statusLabelMap: Record<ProductStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
}

export function SupplierPanelProductCatalogTab() {
  return (
    <TabsContent value="product-catalog" className="mt-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Product Catalog
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
