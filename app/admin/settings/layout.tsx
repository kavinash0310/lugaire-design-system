"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdminPageHeader } from "@/components/admin/page-header"
import { cn } from "@/lib/utils"

const TABS = [
  { label: "General", href: "/admin/settings/general" },
  { label: "Branding", href: "/admin/settings/branding" },
  { label: "Shipping", href: "/admin/settings/shipping" },
  { label: "Payment", href: "/admin/settings/payment" },
  { label: "Tax", href: "/admin/settings/tax" },
  { label: "Users & Roles", href: "/admin/settings/users" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AdminPageHeader
        title="Settings"
        description="Configure the storefront, brand, logistics, and team access."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
      />

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
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

      <div className="max-w-3xl">{children}</div>
    </>
  )
}
