import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Mail, MapPin, CalendarDays, ShoppingBag, Wallet, Repeat, ArrowRight } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatCard } from "@/components/admin/stat-card"
import { StatusBadge } from "@/components/admin/status-badge"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCustomer, ADMIN_ORDERS, CUSTOMERS } from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

export function generateStaticParams() {
  return CUSTOMERS.map((c) => ({ id: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const customer = getCustomer(id)
  return { title: customer ? `${customer.name} — Customers` : "Customer" }
}

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = getCustomer(id)
  if (!customer) notFound()

  const orders = ADMIN_ORDERS.filter((o) => o.email === customer.email)
  const aov = customer.orders > 0 ? Math.round(customer.spent / customer.orders) : 0

  return (
    <>
      <AdminPageHeader
        title={customer.name}
        description={`Member since ${customer.since} · ${customer.location}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: customer.name },
        ]}
        action={
          <Button variant="outline" size="sm" render={<Link href={`mailto:${customer.email}`} />}>
            <Mail className="size-4" />
            Email customer
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <Avatar src={customer.avatar} name={customer.name} size={64} />
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl leading-tight">{customer.name}</h2>
              <StatusBadge status={customer.tier} />
            </div>
          </div>
          <dl className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <dd className="truncate">{customer.email}</dd>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <dd>{customer.location}</dd>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
              <dd>Customer since {customer.since}</dd>
            </div>
          </dl>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
          <StatCard label="Lifetime value" value={formatPrice(customer.spent)} icon={Wallet} />
          <StatCard label="Total orders" value={customer.orders.toLocaleString()} icon={ShoppingBag} />
          <StatCard label="Avg. order value" value={formatPrice(aov)} icon={Repeat} />
        </div>
      </div>

      {/* Order history */}
      <div className="mt-6 rounded-[var(--radius-xl)] border border-border bg-card">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-display text-lg leading-tight">Order history</h2>
            <p className="text-sm text-muted-foreground">
              {orders.length > 0 ? `${orders.length} recent order${orders.length > 1 ? "s" : ""}` : "No recent orders on file"}
            </p>
          </div>
          <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm text-copper hover:text-copper/80">
            All orders
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="pl-6">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-copper">
                      {o.number}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{o.items}</TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="pr-6 text-right tabular-nums">{formatPrice(o.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="px-6 pb-6 text-sm text-muted-foreground">This customer has no orders in the current period.</p>
        )}
      </div>
    </>
  )
}
