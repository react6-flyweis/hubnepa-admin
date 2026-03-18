import type { Product } from "@/types/product"

export const retailProducts: Product[] = [
  {
    id: "PRD-001",
    sku: "FRT-001-ORG",
    name: "Organic Bananas",
    brand: "Dole",
    description:
      "Fresh organic bananas sourced from sustainable farms. Perfect for snacking or baking.",
    tags: ["Organic", "Fresh", "Best Seller"],
    imageUrls: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80",
    ],
    category: "Fruits",
    vendor: "Fresh Mart",
    price: 4.99,
    compareAtPrice: 5.99,
    costPerItem: 2.5,
    stockQuantity: 150,
    lowStockThreshold: 20,
    status: "Active",
  },
  {
    id: "prod-2",
    name: "Wireless Headphones",
    category: "Electronics",
    vendor: "Tech Gadgets",
    price: 59.99,
    status: "Active",
  },
  {
    id: "prod-3",
    name: "Almond Milk",
    category: "Dairy",
    vendor: "Fresh Mart",
    price: 3.5,
    status: "Out of Stock",
  },
  {
    id: "prod-4",
    name: "Handcrafted Soap",
    category: "Personal Care",
    vendor: "Purely Clean",
    price: 6.5,
    status: "Active",
  },
]

export const menuItems: Product[] = [
  {
    id: "menu-1",
    name: "Classic Burger",
    category: "Main",
    vendor: "Grill House",
    price: 9.99,
    status: "Active",
  },
  {
    id: "menu-2",
    name: "Caesar Salad",
    category: "Salads",
    vendor: "Green Bowl",
    price: 7.5,
    status: "Active",
  },
  {
    id: "menu-3",
    name: "Spicy Ramen",
    category: "Noodles",
    vendor: "Noodle Bar",
    price: 12.99,
    status: "Discontinued",
  },
  {
    id: "menu-4",
    name: "Mango Smoothie",
    category: "Beverages",
    vendor: "Juice Hub",
    price: 4.25,
    status: "Active",
  },
]
