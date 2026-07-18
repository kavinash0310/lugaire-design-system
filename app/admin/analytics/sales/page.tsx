"use client"

import { DollarSign, ShoppingBag, TrendingUp, Percent } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { AreaChart, DonutChart, RankedBars } from "@/components/admin/charts"
import {
  ADMIN_STATS,
  REVENUE_SERIES,
  CATEGORY_SALES,
  formatCompact,
} from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

export default function SalesAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatCompact(ADMIN_STATS.revenue)} change={ADMIN_STATS.revenueChange} icon={DollarSign} hint="vs. last month" />
        <StatCard label="Orders" value={ADMIN_STATS.orders.toLocaleString()} change={ADMIN_STATS.ordersChange} icon={ShoppingBag} hint="vs. last month" />
        <StatCard label="Avg. order value" value={formatPrice(ADMIN_STATS.aov)} change={ADMIN_STATS.aovChange} icon={TrendingUp} hint="vs. last month" />
        <StatCard label="Conversion" value="3.8%" change={0.4} icon={Percent} hint="vs. last month" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-0.5">
            <h2 className="font-display text-lg leading-tight">Revenue over time</h2>
            <p className="text-sm text-muted-foreground">Trailing twelve months</p>
          </div>
          <AreaChart
            data={REVENUE_SERIES.map((r) => ({ label: r.month, value: r.revenue }))}
            format="compact"
          />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Revenue by category</h2>
          <DonutChart
            data={CATEGORY_SALES.map((c) => ({ label: c.name, value: c.value }))}
            format="compact"
          />
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
        <h2 className="mb-6 font-display text-lg leading-tight">Category performance</h2>
        <RankedBars
          data={CATEGORY_SALES.map((c) => ({ label: c.name, value: c.value }))}
          format="compact"
        />
      </div>
    </div>
  )
}
