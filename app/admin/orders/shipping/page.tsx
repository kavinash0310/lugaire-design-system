import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { ADMIN_ORDERS } from "@/lib/mock/admin"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const CARRIERS = ["DHL Express", "FedEx Priority", "UPS Worldwide", "Royal Mail"]

export default function AdminShippingPage() {
  const shippable = ADMIN_ORDERS.filter(
    (o) => o.payment === "Paid" && o.status !== "Cancelled" && o.status !== "Refunded",
  )

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Shipping"
        description="Prepare labels and track fulfillment across active orders."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Shipping" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Awaiting label", value: shippable.filter((o) => o.fulfillment === "Unfulfilled").length },
          { label: "In transit", value: shippable.filter((o) => o.status === "Shipped").length },
          { label: "Delivered", value: shippable.filter((o) => o.status === "Delivered").length },
        ].map((s) => (
          <div key={s.label} className="rounded-[var(--radius-xl)] border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shippable.map((o, i) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.number}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell className="text-muted-foreground">{CARRIERS[i % CARRIERS.length]}</TableCell>
                <TableCell><StatusBadge status={o.fulfillment} /></TableCell>
                <TableCell className="text-right"><StatusBadge status={o.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
