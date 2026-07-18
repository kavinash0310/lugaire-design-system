import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { AlertTriangle } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/states"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ADMIN_PRODUCTS } from "@/lib/mock/admin"

export const metadata: Metadata = { title: "Low Stock" }

const LOW = 10

export default function LowStockPage() {
  const low = ADMIN_PRODUCTS.filter((p) => p.stock <= LOW).sort((a, b) => a.stock - b.stock)

  return (
    <>
      <AdminPageHeader
        title="Low stock"
        description={`Pieces at or below ${LOW} units — replenish before they sell through.`}
        breadcrumbs={[{ label: "Inventory" }, { label: "Low Stock" }]}
      />

      {low.length === 0 ? (
        <EmptyState icon={AlertTriangle} title="Everything is well stocked" description="No pieces are currently below the low-stock threshold." />
      ) : (
        <div className="rounded-[var(--radius-xl)] border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Units left</TableHead>
                <TableHead className="pr-5 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {low.map((p) => (
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
                  <TableCell className="text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={p.stock === 0 ? "destructive" : "copper"} className="tabular-nums">
                      {p.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <Button variant="outline" size="sm" render={<Link href={`/admin/products/${p.id}`} />}>
                      Restock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
