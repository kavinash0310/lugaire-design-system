"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input, Field, Label } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { CART_SEED } from "@/lib/mock/account"
import { getProduct, formatPrice } from "@/lib/products"

const COUNTRIES = ["United States", "United Kingdom", "France", "Italy", "Japan", "Singapore"]

const DELIVERY = [
  { id: "concierge", label: "LUGAIRE Concierge", note: "2–3 business days · signature required", price: 0 },
  { id: "express", label: "Express", note: "Next business day", price: 40 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [delivery, setDelivery] = React.useState("concierge")
  const [card, setCard] = React.useState("")

  const lines = CART_SEED.map((c) => ({ ...c, product: getProduct(c.productId)! })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0)
  const shippingCost = DELIVERY.find((d) => d.id === delivery)?.price ?? 0
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shippingCost + tax

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Simulated gateway: a card starting with 4000 is declined (test convention).
      if (card.replace(/\s/g, "").startsWith("4000")) {
        router.push("/checkout/failed")
      } else {
        router.push("/checkout/success")
      }
    }, 1200)
  }

  return (
    <Container size="wide" className="py-10 md:py-14">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to cart
      </Link>

      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-6">
        <p className="text-eyebrow text-copper">Secure Checkout</p>
        <h1 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">Checkout</h1>
      </div>

      <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-8">
          {/* Contact */}
          <section className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="mb-5 font-display text-xl leading-tight tracking-tight">Contact</h2>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </Field>
          </section>

          {/* Shipping */}
          <section className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="mb-5 font-display text-xl leading-tight tracking-tight">Shipping address</h2>
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <Label htmlFor="first">First name</Label>
                  <Input id="first" autoComplete="given-name" required />
                </Field>
                <Field>
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" autoComplete="family-name" required />
                </Field>
              </div>
              <Field>
                <Label htmlFor="addr">Address</Label>
                <Input id="addr" autoComplete="address-line1" required />
              </Field>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" autoComplete="address-level2" required />
                </Field>
                <Field>
                  <Label htmlFor="postal">Postal code</Label>
                  <Input id="postal" autoComplete="postal-code" required />
                </Field>
                <Field>
                  <Label htmlFor="country">Country</Label>
                  <Select id="country" defaultValue="United States">
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="mb-5 font-display text-xl leading-tight tracking-tight">Delivery method</h2>
            <div className="flex flex-col gap-3">
              {DELIVERY.map((d) => (
                <label
                  key={d.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-[var(--radius-lg)] border p-4 transition-colors",
                    delivery === d.id ? "border-copper bg-copper/[0.04]" : "border-border hover:border-foreground/30",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full border",
                        delivery === d.id ? "border-copper" : "border-muted-foreground",
                      )}
                    >
                      {delivery === d.id && <span className="size-2 rounded-full bg-copper" />}
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{d.label}</span>
                      <span className="block text-xs text-muted-foreground">{d.note}</span>
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="delivery"
                    value={d.id}
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                    className="sr-only"
                  />
                  <span className="font-mono text-sm">{d.price === 0 ? "Free" : formatPrice(d.price)}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl leading-tight tracking-tight">Payment</h2>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Encrypted
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <Field>
                <Label htmlFor="card">Card number</Label>
                <div className="relative">
                  <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="card"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    autoComplete="cc-number"
                    className="pl-10"
                    required
                  />
                </div>
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <Label htmlFor="exp">Expiry</Label>
                  <Input id="exp" placeholder="MM / YY" autoComplete="cc-exp" required />
                </Field>
                <Field>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" inputMode="numeric" placeholder="123" autoComplete="cc-csc" required />
                </Field>
              </div>
              <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Checkbox defaultChecked /> Save this card for future purchases
              </label>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
            <h2 className="font-display text-xl leading-tight tracking-tight">Your order</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {lines.map((l, i) => (
                <li key={i} className="flex gap-3">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
                    <Image src={l.product.images[0] || "/placeholder.svg"} alt={l.product.name} fill sizes="64px" className="object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                      {l.quantity}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.color} · {l.size}
                    </p>
                  </div>
                  <p className="font-mono text-sm">{formatPrice(l.product.price * l.quantity)}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-mono">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-mono">{shippingCost === 0 ? "Complimentary" : formatPrice(shippingCost)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="font-mono">{formatPrice(tax)}</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-mono font-medium">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Button type="submit" variant="copper" size="lg" className="mt-5 w-full" disabled={loading}>
              {loading ? <Spinner className="text-copper-foreground" /> : `Pay ${formatPrice(total)}`}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" /> 30-day returns · Secure payment
            </p>
          </div>
        </aside>
      </form>
    </Container>
  )
}
