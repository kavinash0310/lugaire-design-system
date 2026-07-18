"use client"

import { ShoppingBag, Clock, PackageCheck, RotateCcw } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { GroupedBarChart, DonutChart } from "@/components/admin/charts"
import { REVENUE_SERIES, ADMIN_ORDERS } from "@/lib/mock/admin"

export default function OrdersAnalyticsPage() {
  const statusCounts = ADMIN_ORDERS.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, {})
  const statusData = Object.entries(statusCounts).map(([label, value]) => ({ label, value }))

  const fulfilled = ADMIN_ORDERS.filter((o) => o.fulfillment === "Fulfilled").length
  const refunded = ADMIN_ORDERS.filter((o) => o.payment === "Refunded").length

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value="1,284" change={8.1} icon={ShoppingBag} hint="vs. last month" />
        <StatCard label="Avg. fulfillment" value="1.8 days" change={-6.2} icon={Clock} hint="faster" />
        <StatCard label="Fulfillment rate" value="94%" change={2.1} icon={PackageCheck} hint="vs. last month" />
        <StatCard label="Return rate" value="4.6%" change={-1.3} icon={RotateCcw} hint="lower" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-0.5">
            <h2 className="font-display text-lg leading-tight">Order volume</h2>
            <p className="text-sm text-muted-foreground">Orders placed each month</p>
          </div>
          <GroupedBarChart
            data={REVENUE_SERIES.map((r) => ({ month: r.month, orders: r.orders }))}
            keys={[{ key: "orders", label: "Orders" }]}
          />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Status breakdown</h2>
          <DonutChart data={statusData} format={(n) => String(n)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <p className="text-eyebrow text-muted-foreground">Fulfilled in sample</p>
          <p className="font-display text-3xl leading-none">{fulfilled} / {ADMIN_ORDERS.length}</p>
          <p className="text-sm text-muted-foreground">Orders marked fulfilled in the current view.</p>
        </div>
        <div className="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <p className="text-eyebrow text-muted-foreground">Refunded in sample</p>
          <p className="font-display text-3xl leading-none">{refunded} / {ADMIN_ORDERS.length}</p>
          <p className="text-sm text-muted-foreground">Orders with a refunded payment status.</p>
        </div>
      </div>
    </div>
  )
}
