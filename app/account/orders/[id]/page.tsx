import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, MapPin, Truck } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/status-badge"
import { getOrder } from "@/lib/mock/account"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "Order Details",
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrder(id)
  if (!order) notFound()

  const canTrack =
    order.status === "Shipped" ||
    order.status === "Out for delivery" ||
    order.status === "Confirmed" ||
    order.status === "Processing"

  return (
    <div>
      <Link
        href="/account/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </Link>

      <AccountHeading
        eyebrow={`Placed ${order.date}`}
        title={`Order ${order.number}`}
        action={<StatusBadge status={order.status} />}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        {/* Line items */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[var(--radius-2xl)] border border-border bg-card">
            <div className="border-b border-border p-6">
              <h2 className="font-display text-xl leading-tight tracking-tight">Items</h2>
            </div>
            <ul className="divide-y divide-border">
              {order.lines.map((line, i) => (
                <li key={i} className="flex items-center gap-4 p-6">
                  <Link
                    href={`/product/${line.productId}`}
                    className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary"
                  >
                    <Image src={line.image || "/placeholder.svg"} alt={line.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${line.productId}`} className="font-medium transition-colors hover:text-copper">
                      {line.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {line.color} · {line.size} · Qty {line.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm">{formatPrice(line.price * line.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline summary */}
          <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="mb-5 font-display text-xl leading-tight tracking-tight">Progress</h2>
            <ol className="flex flex-col gap-5">
              {order.tracking.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className={
                      step.done
                        ? "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-copper text-copper-foreground"
                        : "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground"
                    }
                  >
                    {step.done ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-3">
                      <p className={step.done ? "font-medium" : "font-medium text-muted-foreground"}>{step.label}</p>
                      <span className="text-xs text-muted-foreground">{step.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-5">
          <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-lg leading-tight tracking-tight">Summary</h2>
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-mono">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-mono">{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="font-mono">{formatPrice(order.tax)}</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-mono font-medium">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <p className="mb-3 flex items-center gap-2 text-eyebrow text-muted-foreground">
              <MapPin className="size-3.5" /> Shipping to
            </p>
            <p className="text-sm leading-relaxed text-pretty">{order.address}</p>
            <p className="mt-4 flex items-center gap-2 text-eyebrow text-muted-foreground">
              <Truck className="size-3.5" /> Courier
            </p>
            <p className="mt-2 text-sm">{order.courier}</p>
            <p className="font-mono text-xs text-muted-foreground">{order.trackingNumber}</p>
          </div>

          {canTrack && (
            <Button variant="copper" render={<Link href={`/account/orders/${order.id}/track`} />}>
              Track this order
            </Button>
          )}
        </aside>
      </div>
    </div>
  )
}
