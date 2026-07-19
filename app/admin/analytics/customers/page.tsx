"use client"

import { Users, UserPlus, Repeat, Wallet } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { GroupedBarChart, DonutChart } from "@/components/admin/charts"
import { CUSTOMER_GROWTH, CUSTOMERS, ADMIN_STATS, formatCompact } from "@/lib/mock/admin"

export default function CustomersAnalyticsPage() {
  const tierCounts = CUSTOMERS.reduce<Record<string, number>>((acc, c) => {
    acc[c.tier] = (acc[c.tier] ?? 0) + 1
    return acc
  }, {})
  const tierData = Object.entries(tierCounts).map(([label, value]) => ({ label, value }))
  const totalSpent = CUSTOMERS.reduce((s, c) => s + c.spent, 0)
  const avgLtv = Math.round(totalSpent / CUSTOMERS.length)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value={ADMIN_STATS.customers.toLocaleString()} change={ADMIN_STATS.customersChange} icon={Users} hint="vs. last month" />
        <StatCard label="New this month" value="402" change={12.8} icon={UserPlus} hint="vs. last month" />
        <StatCard label="Returning rate" value="63%" change={3.4} icon={Repeat} hint="vs. last month" />
        <StatCard label="Avg. lifetime value" value={formatCompact(avgLtv)} change={5.1} icon={Wallet} hint="vs. last month" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-0.5">
            <h2 className="font-display text-lg leading-tight">New vs. returning</h2>
            <p className="text-sm text-muted-foreground">Customer acquisition by month</p>
          </div>
          <GroupedBarChart
            data={CUSTOMER_GROWTH.map((c) => ({ month: c.month, new: c.new, returning: c.returning }))}
            keys={[
              { key: "new", label: "New" },
              { key: "returning", label: "Returning" },
            ]}
          />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Membership tiers</h2>
          <DonutChart data={tierData} format="plain" />
        </div>
      </div>
    </div>
  )
}
