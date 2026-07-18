"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bell, Gift, Package, ShieldCheck, Heart } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/states"
import { cn } from "@/lib/utils"
import { NOTIFICATIONS, type NotificationItem } from "@/lib/mock/account"

const ICONS = {
  Order: Package,
  Promotion: Gift,
  Account: ShieldCheck,
  Wishlist: Heart,
} as const

export default function NotificationsPage() {
  const [items, setItems] = React.useState<NotificationItem[]>(NOTIFICATIONS)
  const unread = items.filter((n) => n.unread).length

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  function toggle(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)))
  }

  return (
    <div>
      <AccountHeading
        eyebrow="Inbox"
        title="Notifications"
        description="Order updates, previews, and account activity."
        action={
          unread > 0 ? (
            <Button variant="outline" onClick={markAllRead}>
              Mark all read
            </Button>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up" description="New notifications will appear here." />
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="text-sm text-muted-foreground">
              {unread > 0 ? `${unread} unread` : "All read"}
            </p>
          </div>
          <ul className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {items.map((n) => {
                const Icon = ICONS[n.category]
                return (
                  <motion.li
                    key={n.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(n.id)}
                      className={cn(
                        "flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-secondary/50",
                        n.unread && "bg-copper/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)]",
                          n.unread ? "bg-copper/12 text-copper" : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={cn("text-sm", n.unread ? "font-medium" : "font-medium text-muted-foreground")}>
                            {n.title}
                          </p>
                          <Badge variant={n.unread ? "copper" : "muted"} size="sm">
                            {n.category}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground text-pretty">{n.body}</p>
                        <p className="mt-1.5 text-xs text-muted-foreground">{n.time}</p>
                      </div>
                      {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-copper" aria-hidden />}
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </div>
  )
}
