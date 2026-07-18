"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ADMIN_PRODUCTS } from "@/lib/mock/admin"
import { getProduct } from "@/lib/products"

/** Deterministic per-variant stock so the grid is stable between renders. */
function variantStock(sku: string, color: string, size: string): number {
  let h = 0
  const s = `${sku}-${color}-${size}`
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return Math.abs(h) % 24
}

export default function VariantsPage() {
  const [selectedId, setSelectedId] = React.useState(ADMIN_PRODUCTS[0].id)
  const admin = ADMIN_PRODUCTS.find((p) => p.id === selectedId)!
  const product = getProduct(selectedId)

  const colors = product?.colors ?? []
  const sizes = product?.sizes ?? []

  return (
    <>
      <AdminPageHeader
        title="Variant management"
        description="Manage stock at the size and colourway level for each piece."
        breadcrumbs={[{ label: "Inventory" }, { label: "Variants" }]}
        action={<Button variant="copper" size="sm" onClick={() => toast.success("Variants saved")}>Save changes</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        {/* Product picker */}
        <aside className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-card p-2">
          {ADMIN_PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] p-2 text-left transition-colors",
                p.id === selectedId ? "bg-copper/12" : "hover:bg-secondary",
              )}
            >
              <span className="relative size-10 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="40px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={cn("truncate text-sm", p.id === selectedId ? "font-medium text-copper" : "text-foreground")}>
                  {p.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>
              </span>
            </button>
          ))}
        </aside>

        {/* Variant grid */}
        <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="font-display text-lg leading-tight">{admin.name}</h2>
            <Badge variant="muted" className="font-mono">{admin.sku}</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colourway</TableHead>
                {sizes.map((s) => (
                  <TableHead key={s} className="text-center">{s}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {colors.map((color) => (
                <TableRow key={color.name}>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span className="size-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </span>
                  </TableCell>
                  {sizes.map((size) => {
                    const stock = variantStock(admin.sku, color.name, size)
                    return (
                      <TableCell key={size} className="text-center">
                        <span
                          className={cn(
                            "inline-flex min-w-8 justify-center rounded-[var(--radius-sm)] px-2 py-1 text-sm tabular-nums",
                            stock === 0
                              ? "bg-destructive/12 text-destructive"
                              : stock <= 5
                                ? "bg-copper/12 text-copper"
                                : "bg-secondary text-muted-foreground",
                          )}
                        >
                          {stock}
                        </span>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-4 text-xs text-muted-foreground">
            {colors.length} colourways × {sizes.length} sizes · {colors.length * sizes.length} variants
          </p>
        </div>
      </div>
    </>
  )
}
