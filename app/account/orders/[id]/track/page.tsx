import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, MapPin, Package, Truck } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { StatusBadge } from "@/components/admin/status-badge"
import { getOrder } from "@/lib/mock/account"

export const metadata: Metadata = {
  title: "Track Order",
}

export default async function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrder(id)
  if (!order) notFound()

  const completed = order.tracking.filter((s) => s.done).length
  const progress = Math.round((completed / order.tracking.length) * 100)

  return (
    <div>
      <Link
        href={`/account/orders/${order.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to order
      </Link>

      <AccountHeading
        eyebrow={`Order ${order.number}`}
        title="Track your order"
        description={`Estimated delivery ${order.estimatedDelivery}`}
        action={<StatusBadge status={order.status} />}
      />

      {/* Courier card */}
      <div className="mb-8 flex flex-col gap-6 rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-copper/12 text-copper">
            <Truck className="size-6" />
          </span>
          <div>
            <p className="text-eyebrow text-muted-foreground">Courier</p>
            <p className="font-medium">{order.courier}</p>
            <p className="font-mono text-xs text-muted-foreground">{order.trackingNumber}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="flex size-12 items-center justify-center rounded-[var(--radius-lg)] bg-secondary text-muted-foreground">
            <MapPin className="size-6" />
          </span>
          <div className="max-w-xs">
            <p className="text-eyebrow text-muted-foreground">Delivering to</p>
            <p className="text-sm leading-relaxed text-pretty">{order.address}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{progress}% complete</span>
          <span>{order.estimatedDelivery}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-copper transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Vertical timeline */}
      <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:p-8">
        <ol className="relative flex flex-col gap-8">
          <span className="absolute bottom-2 left-[13px] top-2 w-px bg-border" aria-hidden />
          {order.tracking.map((step, i) => (
            <li key={i} className="relative flex gap-5">
              <span
                className={
                  step.done
                    ? "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-copper text-copper-foreground ring-4 ring-card"
                    : "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground ring-4 ring-card"
                }
              >
                {step.done ? <Check className="size-4" /> : <Package className="size-3.5" />}
              </span>
              <div className="flex flex-col pt-0.5">
                <div className="flex flex-wrap items-center gap-x-3">
                  <p className={step.done ? "font-display text-lg leading-tight" : "font-display text-lg leading-tight text-muted-foreground"}>
                    {step.label}
                  </p>
                  <span className="text-xs text-muted-foreground">{step.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
