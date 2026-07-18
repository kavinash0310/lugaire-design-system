"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/products"
import {
  specSheet,
  sizeAvailability,
  deliveryWindow,
} from "@/lib/product-details"
import { useWishlist } from "@/components/site/wishlist-provider"
import { toast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SizeGuide } from "@/components/product-detail/size-guide"

export function ProductPurchase({
  product,
  color,
  onColorChange,
  size,
  onSizeChange,
}: {
  product: Product
  color: string
  onColorChange: (c: string) => void
  size: string | null
  onSizeChange: (s: string) => void
}) {
  const [qty, setQty] = React.useState(1)
  const [added, setAdded] = React.useState(false)
  const { has, toggle } = useWishlist()
  const wished = has(product.id)

  const specs = React.useMemo(() => specSheet(product), [product])
  const availability = React.useMemo(() => sizeAvailability(product), [product])
  const delivery = React.useMemo(() => deliveryWindow(), [])

  function requireSize(): boolean {
    if (!size) {
      toast.error("Select a size", {
        description: "Choose a size to continue.",
      })
      return false
    }
    return true
  }

  function addToBag() {
    if (!requireSize()) return
    setAdded(true)
    toast.success("Added to bag", {
      description: `${product.name} · ${color} · Size ${size} · Qty ${qty}`,
    })
    window.setTimeout(() => setAdded(false), 1900)
  }

  function buyNow() {
    if (!requireSize()) return
    toast.success("Proceeding to checkout", {
      description: `${product.name} · ${color} · Size ${size}`,
    })
  }

  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" size="sm">
            {product.collection}
          </Badge>
          <span className="font-mono text-[0.7rem] text-muted-foreground">
            {product.sku}
          </span>
        </div>
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
          {product.name}
        </h1>
        <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground italic">
          {product.line}
        </p>
        <p className="mt-1 text-2xl tabular-nums">{formatPrice(product.price)}</p>
      </div>

      <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        {product.note}
      </p>

      {/* Colour */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-eyebrow text-muted-foreground">Colour</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={color}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.24 }}
              className="text-sm"
            >
              {color}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2.5">
          {product.colors.map((c) => (
            <motion.button
              key={c.name}
              type="button"
              onClick={() => onColorChange(c.name)}
              aria-label={c.name}
              aria-pressed={color === c.name}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "size-9 rounded-full border transition-shadow duration-[var(--duration-base)]",
                color === c.name
                  ? "ring-2 ring-copper ring-offset-2 ring-offset-background"
                  : "ring-0",
              )}
              style={{ backgroundColor: c.hex, borderColor: "var(--border)" }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-eyebrow text-muted-foreground">Size</span>
          <SizeGuide sizes={product.sizes} highlight={size}>
            <button
              type="button"
              className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Size guide
            </button>
          </SizeGuide>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => {
            const stock = availability[s]
            const soldOut = stock === "out"
            return (
              <motion.button
                key={s}
                type="button"
                disabled={soldOut}
                onClick={() => onSizeChange(s)}
                aria-pressed={size === s}
                whileTap={soldOut ? undefined : { scale: 0.94 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex h-11 min-w-12 items-center justify-center rounded-[var(--radius-md)] border px-3.5 text-sm transition-colors duration-[var(--duration-base)] ease-[var(--ease-luxe)]",
                  soldOut &&
                    "cursor-not-allowed border-border/60 text-muted-foreground/40 line-through",
                  !soldOut && size === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : !soldOut &&
                        "border-border text-foreground hover:border-foreground",
                )}
              >
                {s}
                {stock === "low" && (
                  <span
                    className="absolute -right-1 -top-1 size-2 rounded-full bg-copper"
                    aria-hidden
                  />
                )}
              </motion.button>
            )
          })}
        </div>
        <AnimatePresence mode="wait">
          {size && availability[size] === "low" && (
            <motion.p
              key={`low-${size}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-copper"
            >
              Low stock in {size} — only a few remain.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Quantity + actions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-[var(--radius-md)] border border-border">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground active:scale-90"
            >
              <Minus className="size-4" />
            </button>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={qty}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="w-9 text-center text-sm tabular-nums"
              >
                {qty}
              </motion.span>
            </AnimatePresence>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground active:scale-90"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <Button
            variant="copper"
            className="h-11 flex-1 overflow-hidden"
            onClick={addToBag}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2"
                >
                  <Check className="size-4" />
                  Added to bag
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="size-4" />
                  Add to bag
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-11"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
          >
            <motion.span
              animate={wished ? { scale: [1, 1.4, 0.92, 1] } : { scale: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Heart className={cn("size-4", wished && "fill-copper text-copper")} />
            </motion.span>
          </Button>
        </div>

        <Button variant="primary" className="h-11 w-full" onClick={buyNow}>
          Buy now
        </Button>
      </div>

      {/* Assurances */}
      <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-card/50 p-4">
        <Assurance icon={<Truck className="size-4" />} title="Estimated delivery">
          Complimentary express shipping · arrives {delivery}
        </Assurance>
        <Assurance icon={<RotateCcw className="size-4" />} title="30-day returns">
          Free returns and exchanges, collected from your door.
        </Assurance>
        <Assurance icon={<ShieldCheck className="size-4" />} title="The house guarantee">
          Lifetime repairs on every seam we sew.
        </Assurance>
      </div>

      {/* Specification sheet */}
      <div className="flex flex-col gap-1 border-t border-border pt-6">
        <span className="text-eyebrow mb-2 text-muted-foreground">Specifications</span>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-4 border-b border-border/50 py-2.5"
            >
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="text-right text-sm text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function Assurance({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-copper">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm text-foreground">{title}</span>
        <span className="text-xs leading-relaxed text-muted-foreground">{children}</span>
      </div>
    </div>
  )
}
