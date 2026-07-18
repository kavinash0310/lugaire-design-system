import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/status-badge"
import { EmptyState } from "@/components/ui/states"
import { ORDERS } from "@/lib/mock/account"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and review your LUGAIRE orders.",
}

export default function OrdersPage() {
  return (
    <div>
      <AccountHeading
        eyebrow="History"
        title="My Orders"
        description="Every piece you've brought into the wardrobe, and where it is now."
      />

      {ORDERS.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="When you place an order, it will appear here for tracking and returns."
          action={<Button variant="copper" render={<Link href="/shop" />}>Explore the collection</Button>}
        />
      ) : (
        <div className="flex flex-col gap-5">
          {ORDERS.map((order) => (
            <div
              key={order.id}
              className="overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/40 px-6 py-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">Order</p>
                    <p className="font-mono text-sm">{order.number}</p>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">Placed</p>
                    <p className="text-sm">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">Total</p>
                    <p className="font-mono text-sm">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="flex flex-wrap gap-4">
                  {order.lines.map((line, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                        <Image src={line.image || "/placeholder.svg"} alt={line.name} fill sizes="64px" className="object-cover" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{line.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {line.color} · {line.size} · Qty {line.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                  <Button size="sm" variant="outline" render={<Link href={`/account/orders/${order.id}`} />}>
                    Order details
                  </Button>
                  {(order.status === "Shipped" || order.status === "Out for delivery" || order.status === "Confirmed" || order.status === "Processing") && (
                    <Button size="sm" variant="copper" render={<Link href={`/account/orders/${order.id}/track`} />}>
                      Track order
                      <ArrowRight className="size-3.5" />
                    </Button>
                  )}
                  {order.status === "Delivered" && (
                    <Button size="sm" variant="ghost" render={<Link href="/account/returns" />}>
                      Start a return
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
