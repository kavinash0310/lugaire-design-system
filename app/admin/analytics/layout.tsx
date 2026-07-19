"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdminPageHeader } from "@/components/admin/page-header"
import { cn } from "@/lib/utils"

const TABS = [
  { label: "Sales", href: "/admin/analytics/sales" },
  { label: "Orders", href: "/admin/analytics/orders" },
  { label: "Products", href: "/admin/analytics/products" },
  { label: "Customers", href: "/admin/analytics/customers" },
]

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AdminPageHeader
        title="Analytics"
        description="Performance across sales, orders, catalog, and clientele."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Analytics" }]}
      />

      <div className="mb-6 flex flex-wrap gap-1 border-b border-border">
        {TABS.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-copper text-copper"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      {children}
    </>
  )
}
