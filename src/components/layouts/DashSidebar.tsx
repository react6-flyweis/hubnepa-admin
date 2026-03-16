import { NavLink } from "react-router"
import {
  LogOut,
  X,
  LayoutDashboard,
  ShieldAlert,
  Users,
  Store,
  Megaphone,
  ShieldCheck,
  ForkKnifeCrossed,
  ShoppingBag,
  FileText,
  Wallet,
  BarChart3,
  Activity,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export default function DashSidebar() {
  const { toggleSidebar } = useSidebar()

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/", end: true },
    { label: "User Management", icon: Users, to: "/users" },
    { label: "Partner Management", icon: Store, to: "/partners" },
    { label: "Restaurant Panel", icon: ForkKnifeCrossed, to: "/restaurants" },
    { label: "Retailer Panel", icon: Store, to: "/retailers" },
    { label: "Supplier Panel", icon: ForkKnifeCrossed, to: "/suppliers" },
    { label: "Product & Food", icon: ShoppingBag, to: "/products" },
    { label: "Order Management", icon: FileText, to: "/orders" },
    { label: "Feedback & Complaints", icon: Wallet, to: "/feedback" },
    { label: "Finance & Settlements", icon: Wallet, to: "/finance" },
    { label: "Sales & Analytics", icon: BarChart3, to: "/analytics" },
    { label: "Marketing & Content", icon: Megaphone, to: "/marketing" },
    { label: "Access Control", icon: ShieldCheck, to: "/access-control" },
    { label: "System Health", icon: Activity, to: "/dashboard/system-health" },
  ]

  return (
    <Sidebar className="bg-white text-gray-800">
      <SidebarHeader className="flex flex-row items-center justify-between bg-[#020618] py-5 text-white">
        <div className="flex items-end gap-2">
          <ShieldAlert className="h-6 w-6 text-secondary" />
          <span className="text-xl font-semibold">Hubnepa</span>
          <span className="font-semibold text-secondary">Admin</span>
        </div>
        <button onClick={toggleSidebar} aria-label="Close sidebar">
          <X className="h-4 w-4" />
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menu.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink to={item.to} className="w-full" end={item.end}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        isActive={isActive}
                        className="h-10 text-white capitalize"
                      >
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto bg-[#020618]">
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              className="flex w-full items-center gap-2 px-2 py-1 text-red-600 hover:bg-red-100"
              onClick={() => {
                // TODO: wire up real sign‑out logic
                console.log("sign out")
              }}
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
