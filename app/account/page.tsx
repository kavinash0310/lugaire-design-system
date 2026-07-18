import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, MapPin, Package, RotateCcw, Sparkles } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/status-badge"
import { CUSTOMER, ORDERS, RETURNS, WISHLIST_SEED } from "@/lib/mock/account"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your LUGAIRE account overview.",
}

const QUICK = [
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Returns", href: "/account/returns", icon: RotateCcw },
]

export default function AccountDashboardPage() {
  const recent = ORDERS.slice(0, 3)
  const activeReturns = RETURNS.filter((r) => r.status !== "Refunded" && r.status !== "Declined").length

  const stats = [
    { label: "Total orders", value: String(ORDERS.length) },
    { label: "Saved pieces", value: String(WISHLIST_SEED.length) },
    { label: "Active returns", value: String(activeReturns) },
    { label: "Circle points", value: CUSTOMER.points.toLocaleString() },
  ]

  return (
    <div>
      <AccountHeading
        eyebrow="Your Account"
        title={`Good to see you, ${CUSTOMER.firstName}`}
        description={`Member since ${CUSTOMER.since} · ${CUSTOMER.tier}`}
      />

      {/* Membership banner */}
      <div className="grain relative mb-8 overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-[#141210] text-[#f5f2eb]">
        <Image
          src="/editorial/campaign-wide.png"
          alt=""
          aria-hidden
          fill
          sizes="(min-width:1024px) 60vw, 100vw"
          className="object-cover opacity-30"
        />
        <div className="relative flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-end">
          <div className="max-w-md">
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#c98a52]">
              <Sparkles className="size-3.5" /> {CUSTOMER.tier}
            </p>
            <p className="font-serif text-2xl leading-tight text-balance">
              {CUSTOMER.points.toLocaleString()} points toward your next atelier reward.
            </p>
          </div>
          <Button variant="copper" render={<Link href="/shop" />}>
            Shop the collection
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-luxe-xs)]"
          >
            <p className="text-eyebrow text-muted-foreground">{s.label}</p>
            <p className="font-display text-3xl leading-none tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {QUICK.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="group flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-border bg-card p-5 transition-colors hover:border-copper/40"
          >
            <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-secondary text-copper transition-colors group-hover:bg-copper/12">
              <q.icon className="size-5" />
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium">
              {q.label}
              <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-[var(--radius-2xl)] border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-display text-xl leading-tight tracking-tight">Recent orders</h2>
          <Link href="/account/orders" className="text-sm text-copper transition-opacity hover:opacity-80">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recent.map((order) => (
            <li key={order.id}>
              <Link
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-4 p-5 transition-colors hover:bg-secondary/50"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                  <Image
                    src={order.lines[0].image || "/placeholder.svg"}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{order.number}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {order.date} · {order.lines.length} {order.lines.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-sm">{formatPrice(order.total)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
