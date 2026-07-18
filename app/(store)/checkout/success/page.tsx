import type { Metadata } from "next"
import Link from "next/link"
import { Check, Mail, Package, Truck } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/products"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your LUGAIRE order has been placed.",
}

const ORDER_NUMBER = "LG-10483"
const TOTAL = 2483

const NEXT = [
  { icon: Mail, title: "Confirmation sent", body: "A receipt is on its way to your inbox." },
  { icon: Package, title: "Packed with care", body: "Wrapped by hand in the atelier within 24 hours." },
  { icon: Truck, title: "Concierge delivery", body: "Tracking details follow once it ships." },
]

export default function PaymentSuccessPage() {
  return (
    <Container size="narrow" className="py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-success/12 text-success">
          <Check className="size-8" />
        </span>
        <p className="mt-6 text-eyebrow text-copper">Payment Confirmed</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-balance">
          Thank you for your order
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed text-pretty">
          Your order has been received and is now with our atelier. We&apos;ll be in touch with delivery details shortly.
        </p>

        <div className="mt-8 flex w-full max-w-sm items-center justify-between rounded-[var(--radius-xl)] border border-border bg-card px-6 py-4 text-left">
          <div>
            <p className="text-eyebrow text-muted-foreground">Order number</p>
            <p className="font-mono text-sm">{ORDER_NUMBER}</p>
          </div>
          <div className="text-right">
            <p className="text-eyebrow text-muted-foreground">Total paid</p>
            <p className="font-mono text-sm">{formatPrice(TOTAL)}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {NEXT.map((n) => (
          <div key={n.title} className="rounded-[var(--radius-xl)] border border-border bg-card p-5 text-center">
            <span className="mx-auto flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-secondary text-copper">
              <n.icon className="size-5" />
            </span>
            <p className="mt-3 text-sm font-medium">{n.title}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed text-pretty">{n.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="copper" size="lg" render={<Link href="/account/orders" />}>
          View my orders
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/shop" />}>
          Continue shopping
        </Button>
      </div>
    </Container>
  )
}
