import type { Metadata } from "next"
import Link from "next/link"
import { Package, RotateCcw } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/status-badge"
import { EmptyState } from "@/components/ui/states"
import { RETURNS } from "@/lib/mock/account"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Track your returns and request refunds.",
}

const STEPS = [
  { n: "01", title: "Request", body: "Select the order and item within 30 days of delivery." },
  { n: "02", title: "Pack", body: "Return pieces unworn, with tags, in the original packaging." },
  { n: "03", title: "Ship", body: "Use the complimentary prepaid concierge label we provide." },
  { n: "04", title: "Refund", body: "Issued to the original payment method within 5 business days." },
]

export default function ReturnsPage() {
  return (
    <div>
      <AccountHeading
        eyebrow="Aftercare"
        title="Returns & Refunds"
        description="Complimentary returns within 30 days, handled by the LUGAIRE concierge."
        action={
          <Button variant="copper" render={<Link href="/account/orders" />}>
            <RotateCcw className="size-4" />
            Start a return
          </Button>
        }
      />

      {/* How it works */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-[var(--radius-xl)] border border-border bg-card p-5">
            <p className="font-mono text-xs text-copper">{s.n}</p>
            <p className="mt-2 font-display text-lg leading-tight">{s.title}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed text-pretty">{s.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-display text-xl leading-tight tracking-tight">Your returns</h2>

      {RETURNS.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No returns in progress"
          description="Requests you start from an order will appear here."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {RETURNS.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-4 rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{r.item}</p>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Order {r.orderNumber} · {r.reason} · {r.date}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-eyebrow text-muted-foreground">Refund</p>
                  <p className="font-mono text-sm">{formatPrice(r.refund)}</p>
                </div>
                <Button size="sm" variant="outline">View details</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
