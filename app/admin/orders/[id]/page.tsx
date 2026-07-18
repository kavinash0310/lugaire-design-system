import { notFound } from "next/navigation"
import Link from "next/link"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { OrderStatusControl } from "@/components/admin/order-actions"
import { getAdminOrder, ADMIN_PRODUCTS } from "@/lib/mock/admin"
import { formatPrice } from "@/lib/products"

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getAdminOrder(id)
  if (!order) notFound()

  // Derive a plausible line-item breakdown from the catalog.
  const lineItems = ADMIN_PRODUCTS.slice(0, order.items).map((p, i) => ({
    ...p,
    qty: 1,
    size: ["48", "M", "L", "50"][i % 4],
  }))
  const subtotal = lineItems.reduce((sum, li) => sum + li.price * li.qty, 0)
  const shipping = order.total > subtotal ? order.total - subtotal : 0

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title={order.number}
        description={`Placed ${order.date} · ${order.customer}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: order.number },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Line items */}
          <div className="rounded-[var(--radius-xl)] border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-display text-lg leading-tight">Items</h2>
            </div>
            <ul className="divide-y divide-border">
              {lineItems.map((li) => (
                <li key={li.id} className="flex items-center gap-4 px-6 py-4">
                  <img
                    src={li.image || "/placeholder.svg"}
                    alt={li.name}
                    className="h-16 w-14 rounded-[var(--radius-md)] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{li.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {li.sku} · Size {li.size} · Qty {li.qty}
                    </p>
                  </div>
                  <p className="text-sm tabular-nums">{formatPrice(li.price * li.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 border-t border-border px-6 py-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="tabular-nums">{shipping ? formatPrice(shipping) : "Complimentary"}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-medium">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-lg leading-tight">Timeline</h2>
            <ol className="flex flex-col gap-4">
              {[
                { label: "Order placed", time: order.date, done: true },
                { label: "Payment confirmed", time: order.date, done: order.payment === "Paid" },
                { label: "Fulfillment prepared", time: "—", done: order.fulfillment !== "Unfulfilled" },
                { label: "Shipped", time: "—", done: order.status === "Shipped" || order.status === "Delivered" },
                { label: "Delivered", time: "—", done: order.status === "Delivered" },
              ].map((step) => (
                <li key={step.label} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      step.done ? "bg-[var(--copper)]" : "bg-border"
                    }`}
                  />
                  <div className="flex flex-1 items-baseline justify-between">
                    <span className={`text-sm ${step.done ? "" : "text-muted-foreground"}`}>{step.label}</span>
                    <span className="text-xs text-muted-foreground">{step.time}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <OrderStatusControl initial={order.status} />

          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-lg leading-tight">Customer</h2>
            <p className="text-sm font-medium">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Payment</dt>
                <dd><StatusBadge status={order.payment} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Fulfillment</dt>
                <dd><StatusBadge status={order.fulfillment} /></dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
            <h2 className="mb-3 font-display text-lg leading-tight">Actions</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/admin/orders/shipping" className="text-[var(--copper)] underline-offset-4 hover:underline">
                Create shipping label
              </Link>
              <Link href="/admin/orders/returns" className="text-[var(--copper)] underline-offset-4 hover:underline">
                Process a return
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
