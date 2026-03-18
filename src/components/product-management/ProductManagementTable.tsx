import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

import type { Product, ProductStatus } from "@/types/product"

const statusColorMap: Record<ProductStatus, string> = {
  Active: "border-emerald-500 bg-emerald-50 text-emerald-600",
  "Out of Stock": "border-red-400 bg-red-50 text-red-600",
  Discontinued: "border-gray-400 bg-gray-50 text-gray-500",
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

interface ProductManagementTableProps {
  items: Product[]
  vendorLabel?: string
  emptyStateMessage?: string
  getEditUrl?: (item: Product) => string
}

export function ProductManagementTable({
  items,
  vendorLabel = "Vendor / Restaurant",
  emptyStateMessage = "No products found.",
  getEditUrl,
}: ProductManagementTableProps) {
  return (
    <Table>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Item Name
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Category
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            {vendorLabel}
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Price
          </TableHead>
          <TableHead className="text-xs font-semibold tracking-wide uppercase">
            Status
          </TableHead>
          <TableHead className="text-right text-xs font-semibold tracking-wide uppercase">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="py-10 text-center text-muted-foreground"
            >
              {emptyStateMessage}
            </TableCell>
          </TableRow>
        )}
        {items.map((item) => {
          const editUrl = getEditUrl
            ? getEditUrl(item)
            : `/products/${item.id}/edit`

          return (
            <TableRow key={item.id}>
              <TableCell>
                <Link to={editUrl} className="block">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.id}</div>
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.category}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.vendor}
              </TableCell>
              <TableCell className="font-semibold">
                {priceFormatter.format(item.price)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("font-medium", statusColorMap[item.status])}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-3xs">
                    <DropdownMenuItem asChild>
                      <Link to={editUrl}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
