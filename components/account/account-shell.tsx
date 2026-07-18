"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { Avatar } from "@/components/ui/avatar"
import { CUSTOMER } from "@/lib/mock/account"

const NAV = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Returns & Refunds", href: "/account/returns", icon: RotateCcw },
  { label: "Notifications", href: "/account/notifications", icon: Bell },
  { label: "Profile", href: "/account/profile", icon: User },
]

function isActive(pathname: string, href: string): boolean {
  if (href === "/account") return pathname === "/account"
  return pathname.startsWith(href)
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <Container size="wide" className="py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-border bg-card p-4">
            <Avatar src={CUSTOMER.avatar} name={`${CUSTOMER.firstName} ${CUSTOMER.lastName}`} size={44} />
            <div className="min-w-0">
              <p className="truncate font-medium">
                {CUSTOMER.firstName} {CUSTOMER.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{CUSTOMER.tier}</p>
            </div>
          </div>

          <nav
            className="mt-4 flex gap-1 overflow-x-auto no-scrollbar lg:flex-col"
            aria-label="Account"
          >
            {NAV.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/login"
              className="flex items-center gap-3 whitespace-nowrap rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <LogOut className="size-4 shrink-0" />
              Sign out
            </Link>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  )
}

/** Reusable heading for account content areas. */
export function AccountHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-2">
        {eyebrow && <p className="text-eyebrow text-copper">{eyebrow}</p>}
        <h1 className="font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
