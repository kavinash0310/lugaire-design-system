"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Boxes,
  ChevronLeft,
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  Layers,
  Menu,
  MessageSquareText,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type NavItem = { label: string; href: string; icon: React.ElementType }
type NavGroup = { title: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Collections", href: "/admin/collections", icon: Layers },
    ],
  },
  {
    title: "Inventory",
    items: [
      { label: "Stock Management", href: "/admin/inventory", icon: Boxes },
      { label: "Low Stock", href: "/admin/inventory/low-stock", icon: Bell },
      { label: "Variants", href: "/admin/inventory/variants", icon: Layers },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { label: "Shipping", href: "/admin/orders/shipping", icon: Package },
      { label: "Returns", href: "/admin/orders/returns", icon: MessageSquareText },
      { label: "Customers", href: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Coupons", href: "/admin/coupons", icon: Tag },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Banners", href: "/admin/banners", icon: ImageIcon },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Analytics", href: "/admin/analytics/sales", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings/general", icon: Settings },
    ],
  },
]

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin"
  if (href.startsWith("/admin/analytics")) return pathname.startsWith("/admin/analytics")
  if (href.startsWith("/admin/settings")) return pathname.startsWith("/admin/settings")
  return pathname === href || pathname.startsWith(href + "/")
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-6" aria-label="Admin">
      {NAV.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {group.title}
          </p>
          {group.items.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-copper/12 font-medium text-copper"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="font-display text-lg font-semibold uppercase tracking-[0.2em]">
            Lugaire
          </Link>
          <span className="ml-2 rounded-full bg-copper/12 px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider text-copper">
            Admin
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>
        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to store
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border glass px-4 sm:px-6">
          <Drawer>
            <DrawerTrigger
              render={<Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </DrawerTrigger>
            <DrawerContent side="left">
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <NavLinks />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders, products, customers…" className="pl-9" aria-label="Search" />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <Button variant="ghost" size="icon-sm" aria-label="Notifications" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-1 top-1 size-1.5 rounded-full bg-copper" />
            </Button>
            <Avatar src="/editorial/hero-portrait.png" name="Admin" size={32} className="ml-1" />
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}
