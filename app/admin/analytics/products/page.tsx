"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, Boxes, Star, AlertTriangle } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { RankedBars, DonutChart } from "@/components/admin/charts"
import {
  ADMIN_PRODUCTS,
  TOP_PRODUCTS,
  CATEGORY_SALES,
  formatCompact,
} from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

export default function ProductsAnalyticsPage() {
  const totalStock = ADMIN_PRODUCTS.reduce((s, p) => s + p.stock, 0)
  const lowStock = ADMIN_PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 10).length
  const active = ADMIN_PRODUCTS.filter((p) => p.status === "Active").length

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active products" value={active.toLocaleString()} icon={Package} hint={`${ADMIN_PRODUCTS.length} total`} />
        <StatCard label="Units in stock" value={totalStock.toLocaleString()} icon={Boxes} />
        <StatCard label="Best seller" value={TOP_PRODUCTS[0]?.sales.toLocaleString() ?? "0"} icon={Star} hint="units sold" />
        <StatCard label="Low stock" value={lowStock.toLocaleString()} icon={AlertTriangle} hint="need restock" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-6 font-display text-lg leading-tight">Top sellers by units</h2>
          <RankedBars data={TOP_PRODUCTS.map((p) => ({ label: p.name, value: p.sales }))} />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg leading-tight">Revenue by category</h2>
          <DonutChart
            data={CATEGORY_SALES.map((c) => ({ label: c.name, value: c.value }))}
            format={(n) => formatCompact(n)}
          />
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
        <h2 className="mb-5 font-display text-lg leading-tight">Top products</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_PRODUCTS.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3 transition-colors hover:bg-secondary"
            >
              <span className="relative size-12 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="48px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{p.name}</span>
                <span className="text-xs text-muted-foreground">
                  {p.sales} sold · {formatPrice(p.price)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
