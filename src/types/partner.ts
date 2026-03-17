export type PartnerStatus = "Active" | "Pending" | "Suspended" | "Inactive"
export type PartnerVerification = "Verified" | "Pending Review" | "Rejected"
export type PartnerType = "restaurant" | "retailer"
export type StoreStatus = "Open Now" | "Closed"
export type PartnerDocumentFileType = "PDF" | "Image"
export type PartnerDocumentPreview = "calculator" | "paperwork"

export interface PartnerOrder {
  id: string
  items: number
  amount: number
  status: "Delivered" | "Cancelled" | "Pending"
  time: string
}

export interface PartnerDocument {
  id: string
  partnerId: string
  title: string
  fileType: PartnerDocumentFileType
  fileSize: string
  submittedAt: string
  status: PartnerVerification
  preview: PartnerDocumentPreview
}

export interface Partner {
  id: string
  businessName: string
  owner: string
  category: string
  status: PartnerStatus
  verification: PartnerVerification
  type: PartnerType
  avatarColor?: string
  // Detail fields
  email?: string
  phone?: string
  address?: string
  joinDate?: string
  totalOrders?: number
  totalRevenue?: number
  rating?: number
  outlets?: number
  commissionRate?: number
  currentPlan?: string
  nextPayout?: string
  storeStatus?: StoreStatus
  lastActive?: string
  performance?: {
    orderAcceptance: number
    onTimeDelivery: number
    customerSatisfaction: number
  }
  recentOrders?: PartnerOrder[]
}
