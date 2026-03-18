export type ProductStatus = "Active" | "Out of Stock" | "Discontinued"

export interface Product {
  id: string
  sku?: string
  name: string
  brand?: string
  description?: string
  tags?: string[]
  imageUrls?: string[]
  category: string
  vendor: string
  price: number
  compareAtPrice?: number
  costPerItem?: number
  stockQuantity?: number
  lowStockThreshold?: number
  status: ProductStatus
}
