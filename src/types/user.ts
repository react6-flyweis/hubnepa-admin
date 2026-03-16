export type UserStatus = "Active" | "Blocked" | "Suspended"

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  joined: string
  totalSpent: string
  totalOrders: number
}
