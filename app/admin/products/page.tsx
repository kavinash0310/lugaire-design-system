"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Pencil } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { EmptyState } from "@/components/ui/states"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ADMIN_PRODUCTS } from "@/lib/mock/admin"
import { CATEGORIES, formatPrice } from "@/lib/products"

const STATUSES = ["All statuses", "Active", "Draft", "Archived"]

export default function AdminProductsPage() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState(STATUSES[0])
  const [category, setCategory] = React.useState("All categories")

  const filtered = ADMIN_PRODUCTS.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === STATUSES[0] || p.status === status
    const matchesCategory = category === "All categories" || p.category === category
    return matchesQuery && matchesStatus && matchesCategory
  })

  return (
    <>
      <AdminPageHeader
        title="Products"
        description="The full catalogue of the house — manage pieces, pricing, and availability."
        breadcrumbs={[{ label: "Catalog" }, { label: "Products" }]}
        action={
          <Button variant="copper" size="sm" render={<Link href="/admin/products/new" />}>
            <Plus className="size-4" />
            Add product
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU…"
            className="pl-9"
            aria-label="Search products"
          />
        </div>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="sm:w-48" aria-label="Filter by category">
          <option>All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No products found" description="Adjust your search or filters to find what you're looking for." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                        <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="44px" className="object-cover" />
                      </span>
                      <Link href={`/admin/products/${p.id}`} className="font-medium hover:text-copper">
                        {p.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.sku}</TableCell>
                  <TableCell className="text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatPrice(p.price)}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className={p.stock === 0 ? "text-destructive" : p.stock <= 8 ? "text-copper" : "text-muted-foreground"}>
                      {p.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <Button variant="ghost" size="icon-sm" aria-label={`Edit ${p.name}`} render={<Link href={`/admin/products/${p.id}`} />}>
                      <Pencil className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
