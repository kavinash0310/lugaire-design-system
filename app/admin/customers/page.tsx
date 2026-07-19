"use client"

import * as React from "react"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { CUSTOMERS } from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Search } from "lucide-react"

export default function AdminCustomersPage() {
  const [query, setQuery] = React.useState("")

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Customers"
        description="The people behind the orders — membership tier, lifetime value, and history."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Customers" }]}
      />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search customers"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Lifetime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className="cursor-pointer">
                <TableCell>
                  <Link href={`/admin/customers/${c.id}`} className="flex items-center gap-3">
                    <Avatar src={c.avatar} name={c.name} size={36} />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.email}</span>
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{c.location}</TableCell>
                <TableCell><StatusBadge status={c.tier} /></TableCell>
                <TableCell className="text-right tabular-nums">{c.orders}</TableCell>
                <TableCell className="text-right tabular-nums">{formatPrice(c.spent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
