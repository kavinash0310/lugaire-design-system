"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/states"
import { toast } from "@/components/ui/toast"
import { CART_SEED } from "@/lib/mock/account"
import { getProduct, formatPrice, type Product } from "@/lib/products"

type Line = { key: string; product: Product; color: string; size: string; quantity: number }

function seedLines(): Line[] {
  return CART_SEED.map((c, i) => {
    const product = getProduct(c.productId)!
    return { key: `${c.productId}-${i}`, product, color: c.color, size: c.size, quantity: c.quantity }
  }).filter((l) => l.product)
}

const FREE_SHIPPING_THRESHOLD = 500

export default function CartPage() {
  const [lines, setLines] = React.useState<Line[]>(seedLines)
  const [promo, setPromo] = React.useState("")
  const [applied, setApplied] = React.useState(false)

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0)
  const discount = applied ? Math.round(subtotal * 0.15) : 0
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25
  const tax = Math.round((subtotal - discount) * 0.08)
  const total = subtotal - discount + shipping + tax

  function setQty(key: string, delta: number) {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l)),
    )
  }

  function remove(key: string) {
    setLines((prev) => prev.filter((l) => l.key !== key))
    toast.success("Removed from cart")
  }

  function applyPromo(e: React.FormEvent) {
    e.preventDefault()
    if (promo.trim().toUpperCase() === "ATELIER15") {
      setApplied(true)
      toast.success("Promo code applied — 15% off")
    } else {
      toast.error("That code isn't valid")
    }
  }

  return (
    <Container size="wide" className="py-10 md:py-14">
      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-6">
        <p className="text-eyebrow text-copper">Your Bag</p>
        <h1 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">Shopping Cart</h1>
      </div>

      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Pieces you add will collect here, ready for checkout."
          action={<Button variant="copper" render={<Link href="/shop" />}>Continue shopping</Button>}
        />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          {/* Lines */}
          <div>
            <ul className="flex flex-col divide-y divide-border rounded-[var(--radius-2xl)] border border-border bg-card">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li
                    key={l.key}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 p-5 sm:gap-6 sm:p-6"
                  >
                    <Link
                      href={`/product/${l.product.id}`}
                      className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary sm:w-28"
                    >
                      <Image src={l.product.images[0] || "/placeholder.svg"} alt={l.product.name} fill sizes="112px" className="object-cover" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-eyebrow text-copper">{l.product.category}</p>
                          <h3 className="mt-1 font-display text-lg leading-tight tracking-tight text-pretty">
                            <Link href={`/product/${l.product.id}`} className="transition-colors hover:text-copper">
                              {l.product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {l.color} · Size {l.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(l.key)}
                          aria-label="Remove item"
                          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                        <div className="inline-flex items-center rounded-[var(--radius-md)] border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(l.key, -1)}
                            aria-label="Decrease quantity"
                            className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                            disabled={l.quantity <= 1}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{l.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQty(l.key, 1)}
                            aria-label="Increase quantity"
                            className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <p className="font-mono text-sm">{formatPrice(l.product.price * l.quantity)}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-6">
              <Button variant="ghost" render={<Link href="/shop" />}>
                <ArrowRight className="size-4 rotate-180" />
                Continue shopping
              </Button>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[var(--radius-2xl)] border border-border bg-card p-6">
              <h2 className="font-display text-xl leading-tight tracking-tight">Order summary</h2>

              <form onSubmit={applyPromo} className="mt-5 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="outline">Apply</Button>
              </form>
              <p className="mt-2 text-xs text-muted-foreground">Try ATELIER15 for 15% off.</p>

              <dl className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-mono">{formatPrice(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <dt>Discount (ATELIER15)</dt>
                    <dd className="font-mono">-{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-mono">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated tax</dt>
                  <dd className="font-mono">{formatPrice(tax)}</dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-medium">Total</dt>
                  <dd className="font-mono font-medium">{formatPrice(total)}</dd>
                </div>
              </dl>

              {shipping > 0 && (
                <p className="mt-4 flex items-center gap-2 rounded-[var(--radius-md)] bg-secondary px-3 py-2.5 text-xs text-muted-foreground">
                  <Truck className="size-3.5 shrink-0 text-copper" />
                  {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for complimentary shipping.
                </p>
              )}

              <Button variant="copper" size="lg" className="mt-5 w-full" render={<Link href="/checkout" />}>
                Proceed to checkout
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </aside>
        </div>
      )}
    </Container>
  )
}
