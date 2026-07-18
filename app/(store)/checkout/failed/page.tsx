import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, CreditCard, HelpCircle } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Payment Failed",
  description: "We couldn't process your payment.",
}

const REASONS = [
  "The card details may have been entered incorrectly.",
  "Your bank may have declined the transaction.",
  "There may be insufficient funds available.",
]

export default function PaymentFailedPage() {
  return (
    <Container size="narrow" className="py-16 md:py-24">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-destructive/12 text-destructive">
          <AlertTriangle className="size-8" />
        </span>
        <p className="mt-6 text-eyebrow text-destructive">Payment Declined</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-balance">
          We couldn&apos;t process your payment
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed text-pretty">
          No charge has been made. Your cart is saved — you can review your details and try again.
        </p>
      </div>

      <div className="mt-10 rounded-[var(--radius-2xl)] border border-border bg-card p-6">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium">
          <HelpCircle className="size-4 text-copper" />
          A few things worth checking
        </p>
        <ul className="flex flex-col gap-2.5">
          {REASONS.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-copper" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="copper" size="lg" render={<Link href="/checkout" />}>
          <CreditCard className="size-4" />
          Try again
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/cart" />}>
          <ArrowLeft className="size-4" />
          Back to cart
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Still having trouble?{" "}
        <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
          Contact our client care team
        </Link>
        .
      </p>
    </Container>
  )
}
