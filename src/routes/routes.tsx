import { lazy } from "react"
import type { RouteObject } from "react-router"

const LoginPage = lazy(() => import("@/pages/LoginPage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage.tsx"))

const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"))
const SystemHealthPage = lazy(() => import("@/pages/SystemHealthPage"))
const UserManagementPage = lazy(() => import("@/pages/UserManagementPage"))
const OrderManagementPage = lazy(() => import("@/pages/OrderManagementPage"))
const OrderHistoryPage = lazy(() => import("@/pages/OrderHistoryPage"))
const PaymentHistoryPage = lazy(() => import("@/pages/PaymentHistoryPage"))
const DeliveryLogsPage = lazy(() => import("@/pages/DeliveryLogsPage"))
const FeedbackComplaintsPage = lazy(
  () => import("@/pages/FeedbackComplaintsPage")
)
const FinanceSettlementsPage = lazy(
  () => import("@/pages/FinanceSettlementsPage")
)
const AccessControlPage = lazy(() => import("@/pages/AccessControlPage"))
const ManagePermissionsPage = lazy(
  () => import("@/pages/ManagePermissionsPage")
)
const PartnerManagementPage = lazy(
  () => import("@/pages/PartnerManagementPage")
)
const AddPartnerPage = lazy(() => import("@/pages/AddPartnerPage"))
const PartnerDetailsPage = lazy(() => import("@/pages/PartnerDetailsPage"))
const RestaurantPanelPage = lazy(() => import("@/pages/RestaurantPanelPage"))
const RetailerPanelPage = lazy(() => import("@/pages/RetailerPanelPage"))
const SupplierPanelPage = lazy(() => import("@/pages/SupplierPanelPage"))
const ProductFoodPage = lazy(() => import("@/pages/ProductFoodPage"))
const SalesAnalyticsPage = lazy(() => import("@/pages/SalesAnalyticsPage"))
const MarketingContentPage = lazy(() => import("@/pages/MarketingContentPage"))
const AddProductPage = lazy(() => import("@/pages/AddProductPage"))
const AddMenuItemPage = lazy(() => import("@/pages/AddMenuItemPage"))
const EditMenuItemPage = lazy(() => import("@/pages/EditMenuItemPage"))
const EditProductPage = lazy(() => import("@/pages/EditProductPage"))
const PartnerVerificationDocumentsPage = lazy(
  () => import("@/pages/PartnerVerificationDocumentsPage")
)
const PartnerSettingsPage = lazy(() => import("@/pages/PartnerSettingsPage"))
const PlatformSettingsPage = lazy(() => import("@/pages/PlatformSettingsPage"))

import DashLayout from "@/components/layouts/DashLayout"
import { NotFound } from "@/pages/NotFoundPage"

export const Routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashLayout />, // layout will render nested pages via <Outlet />
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "orders", element: <OrderManagementPage /> },
      { path: "feedback", element: <FeedbackComplaintsPage /> },
      { path: "finance", element: <FinanceSettlementsPage /> },
      { path: "access-control", element: <AccessControlPage /> },
      { path: "dashboard/settings", element: <PlatformSettingsPage /> },
      { path: "order-history", element: <OrderHistoryPage /> },
      { path: "users/:userId/order-history", element: <OrderHistoryPage /> },
      { path: "payments", element: <PaymentHistoryPage /> },
      { path: "users/:userId/payments", element: <PaymentHistoryPage /> },
      { path: "users/:userId/delivery-logs", element: <DeliveryLogsPage /> },
      {
        path: "users/:userId/permissions",
        element: <ManagePermissionsPage />,
      },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "system-health", element: <SystemHealthPage /> },
      { path: "partners", element: <PartnerManagementPage /> },
      { path: "restaurants", element: <RestaurantPanelPage /> },
      { path: "retailers", element: <RetailerPanelPage /> },
      { path: "products", element: <ProductFoodPage /> },
      { path: "analytics", element: <SalesAnalyticsPage /> },
      { path: "marketing", element: <MarketingContentPage /> },
      { path: "products/new", element: <AddProductPage /> },
      { path: "products/menu/new", element: <AddMenuItemPage /> },
      { path: "products/menu/:menuItemId/edit", element: <EditMenuItemPage /> },
      { path: "products/:productId/edit", element: <EditProductPage /> },
      { path: "suppliers", element: <SupplierPanelPage /> },
      { path: "partners/new", element: <AddPartnerPage /> },
      { path: "partners/:partnerId", element: <PartnerDetailsPage /> },
      {
        path: "partners/:partnerId/settings",
        element: <PartnerSettingsPage />,
      },
      {
        path: "partners/:partnerId/verification-documents",
        element: <PartnerVerificationDocumentsPage />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  // global 404 (optional)
  { path: "*", element: <NotFound /> },
]
