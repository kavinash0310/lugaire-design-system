"use client"

import * as React from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { EmptyState } from "@/components/ui/states"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ADMIN_ORDERS } from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

const STATUSES = ["All statuses", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"]

export default function AdminOrdersPage() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState(STATUSES[0])

  const filtered = ADMIN_ORDERS.filter((o) => {
    const matchesQuery =
      o.number.toLowerCase().includes(query.toLowerCase()) ||
      o.customer.toLowerCase().includes(query.toLowerCase()) ||
      o.email.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === STATUSES[0] || o.status === status
    return matchesQuery && matchesStatus
  })

  return (
    <>
      <AdminPageHeader
        title="Orders"
        description="Every order placed with the house — track status, payment, and fulfilment."
        breadcrumbs={[{ label: "Sales" }, { label: "Orders" }]}
        action={<Button variant="outline" size="sm">Export</Button>}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by order, name, or email…" className="pl-9" aria-label="Search orders" />
        </div>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-52" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </div>

      <div className="rounded-[var(--radius-xl)] border border-border bg-card">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No orders found" description="Adjust your search or filters." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="pl-5">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-copper">
                      {o.number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-foreground">{o.customer}</span>
                      <span className="text-xs text-muted-foreground">{o.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.payment} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="pr-5 text-right tabular-nums">{formatPrice(o.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}
