import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowRight } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatCard } from "@/components/admin/stat-card"
import { StatusBadge } from "@/components/admin/status-badge"
import { AreaChart, DonutChart, RankedBars } from "@/components/admin/charts"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ADMIN_STATS,
  REVENUE_SERIES,
  CATEGORY_SALES,
  TOP_PRODUCTS,
  ADMIN_ORDERS,
  formatCompact,
} from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = { title: "Dashboard" }

export default function AdminDashboardPage() {
  const recent = ADMIN_ORDERS.slice(0, 6)

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="A considered overview of the house — revenue, orders, and the pieces moving now."
        action={
          <Button variant="outline" size="sm" render={<Link href="/admin/analytics/sales" />}>
            View analytics
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatCompact(ADMIN_STATS.revenue)} change={ADMIN_STATS.revenueChange} icon={DollarSign} hint="vs. last month" />
        <StatCard label="Orders" value={ADMIN_STATS.orders.toLocaleString()} change={ADMIN_STATS.ordersChange} icon={ShoppingBag} hint="vs. last month" />
        <StatCard label="Customers" value={ADMIN_STATS.customers.toLocaleString()} change={ADMIN_STATS.customersChange} icon={Users} hint="vs. last month" />
        <StatCard label="Avg. order value" value={formatPrice(ADMIN_STATS.aov)} change={ADMIN_STATS.aovChange} icon={TrendingUp} hint="vs. last month" />
      </div>

      {/* Revenue + category split */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg leading-tight">Revenue</h2>
              <p className="text-sm text-muted-foreground">Trailing twelve months</p>
            </div>
          </div>
          <AreaChart
            data={REVENUE_SERIES.map((r) => ({ label: r.month, value: r.revenue }))}
            format="compact"
          />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Sales by category</h2>
          <DonutChart
            data={CATEGORY_SALES.map((c) => ({ label: c.name, value: c.value }))}
            format="compact"
          />
        </div>
      </div>

      {/* Recent orders + top products */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="font-display text-lg leading-tight">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-copper hover:text-copper/80">
              View all
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="pl-6">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-copper">
                      {o.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{o.customer}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="pr-6 text-right tabular-nums">{formatPrice(o.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Top products</h2>
          <div className="flex flex-col gap-4">
            {TOP_PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}`}
                className="flex items-center gap-3 rounded-[var(--radius-md)] p-2 transition-colors hover:bg-secondary"
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                  <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="44px" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.sales} sold</span>
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">{formatPrice(p.price)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category revenue bars */}
      <div className="mt-6 rounded-[var(--radius-xl)] border border-border bg-card p-6">
        <h2 className="mb-6 font-display text-lg leading-tight">Category performance</h2>
        <RankedBars
          data={CATEGORY_SALES.map((c) => ({ label: c.name, value: c.value }))}
          format="compact"
        />
      </div>
    </>
  )
}
