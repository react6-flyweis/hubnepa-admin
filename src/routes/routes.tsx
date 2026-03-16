import { lazy } from "react"
import type { RouteObject } from "react-router"

const LoginPage = lazy(() => import("@/pages/LoginPage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage.tsx"))

import DashLayout from "@/components/layouts/DashLayout"
import { NotFound } from "@/pages/NotFoundPage"

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashLayout />, // layout will render nested pages via <Outlet />
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // global 404 (optional)
  { path: "*", element: <NotFound /> },
]
