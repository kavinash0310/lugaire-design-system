"use client"

import * as React from "react"
import Image from "next/image"
import { Search, Minus, Plus, Boxes, AlertTriangle, XCircle } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatCard } from "@/components/admin/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ADMIN_PRODUCTS } from "@/lib/mock/admin"

const LOW = 10

function level(stock: number) {
  if (stock === 0) return { label: "Out of stock", variant: "destructive" as const }
  if (stock <= LOW) return { label: "Low", variant: "copper" as const }
  return { label: "In stock", variant: "success" as const }
}

export default function InventoryPage() {
  const [stocks, setStocks] = React.useState<Record<string, number>>(
    Object.fromEntries(ADMIN_PRODUCTS.map((p) => [p.id, p.stock])),
  )
  const [query, setQuery] = React.useState("")

  const adjust = (id: string, delta: number) =>
    setStocks((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) + delta) }))

  const list = ADMIN_PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()),
  )

  const totalUnits = Object.values(stocks).reduce((a, b) => a + b, 0)
  const lowCount = Object.values(stocks).filter((s) => s > 0 && s <= LOW).length
  const outCount = Object.values(stocks).filter((s) => s === 0).length

  return (
    <>
      <AdminPageHeader
        title="Stock management"
        description="Track and adjust availability across the catalogue in real time."
        breadcrumbs={[{ label: "Inventory" }, { label: "Stock Management" }]}
        action={<Button variant="outline" size="sm" onClick={() => toast.success("Inventory exported")}>Export CSV</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Units on hand" value={totalUnits.toLocaleString()} icon={Boxes} hint="across all pieces" />
        <StatCard label="Low stock" value={String(lowCount)} icon={AlertTriangle} hint={`at or below ${LOW} units`} />
        <StatCard label="Out of stock" value={String(outCount)} icon={XCircle} hint="needs restocking" />
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search inventory…" className="pl-9" aria-label="Search inventory" />
      </div>

      <div className="rounded-[var(--radius-xl)] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((p) => {
              const stock = stocks[p.id] ?? 0
              const lvl = level(stock)
              return (
                <TableRow key={p.id}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                        <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.sku}</TableCell>
                  <TableCell>
                    <Badge variant={lvl.variant} className="gap-1.5">
                      <span className="size-1.5 rounded-full bg-current opacity-70" />
                      {lvl.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon-sm" aria-label="Decrease stock" onClick={() => adjust(p.id, -1)}>
                        <Minus className="size-4" />
                      </Button>
                      <span className="w-10 text-center tabular-nums font-medium">{stock}</span>
                      <Button variant="outline" size="icon-sm" aria-label="Increase stock" onClick={() => adjust(p.id, 1)}>
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
