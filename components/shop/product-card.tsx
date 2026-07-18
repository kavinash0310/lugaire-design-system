"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"
import { ArrowUpRight, Check, Heart, Maximize2, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { availabilityOf, formatPrice, type Product } from "@/lib/products"
import { useWishlist } from "@/components/site/wishlist-provider"
import { QuickView } from "@/components/product/quick-view"
import { toast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const BADGE_VARIANT = {
  New: "copper",
  Bestseller: "default",
  Limited: "outline",
} as const

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Shop-only editorial product card.
 *
 * Preserves the existing card philosophy — full editorial photography,
 * minimal text, copper highlights — and elevates it with a multi-image hover
 * sequence, a subtle glass reflection sweep, a mouse-following "view" tag, and
 * animated add-to-bag / wishlist gestures. The `variant` prop lets the catalog
 * render feature (large) and standard cards from the same component.
 */
export function ProductCard({
  product,
  index,
  variant = "standard",
}: {
  product: Product
  index: number
  variant?: "feature" | "standard"
}) {
  const { has, toggle } = useWishlist()
  const wished = has(product.id)
  const [hovered, setHovered] = React.useState(false)
  const [frame, setFrame] = React.useState(0)
  const [added, setAdded] = React.useState(false)

  const availability = availabilityOf(product)
  const soldOut = availability === "Sold out"
  const lowStock = availability === "Low stock"
  const isFeature = variant === "feature"

  const images = product.images.length ? product.images : ["/placeholder.svg"]

  // Cycle through the product's photography while hovered — a slow, premium
  // image sequence rather than a single cross-fade.
  React.useEffect(() => {
    if (!hovered || images.length < 2) return
    const id = window.setInterval(
      () => setFrame((f) => (f + 1) % images.length),
      1100,
    )
    return () => window.clearInterval(id)
  }, [hovered, images.length])

  React.useEffect(() => {
    if (!hovered) setFrame(0)
  }, [hovered])

  // Reset the transient "added" confirmation.
  React.useEffect(() => {
    if (!added) return
    const id = window.setTimeout(() => setAdded(false), 1800)
    return () => window.clearTimeout(id)
  }, [added])

  // Mouse-follow preview tag — driven by motion values so it never re-renders.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 350, damping: 30, mass: 0.6 })

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  function addToBag() {
    setAdded(true)
    toast.success("Added to bag", {
      description: `${product.name} · ${product.colors[0]?.name ?? ""}`,
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={onMove}
      className="group relative flex flex-col"
      data-cursor="hover"
    >
      <motion.div
        animate={{
          boxShadow: hovered ? "var(--shadow-luxe-xl)" : "0 0 0 0 rgb(0 0 0 / 0)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40",
          isFeature ? "aspect-[4/5]" : "aspect-[3/4]",
        )}
      >
        {/* Zoom wrapper */}
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0"
        >
          {/* Persistent cover — guarantees no flash and a stable LCP element */}
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            priority={index < 3}
            sizes={
              isFeature
                ? "(min-width:1024px) 58vw, (min-width:640px) 46vw, 92vw"
                : "(min-width:1024px) 42vw, (min-width:640px) 46vw, 92vw"
            }
            className="object-cover"
          />

          {/* Sequenced frames cross-fade above the cover on hover */}
          <AnimatePresence>
            {frame > 0 && (
              <motion.div
                key={frame}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={images[frame] || "/placeholder.svg"}
                  alt=""
                  aria-hidden
                  fill
                  sizes={
                    isFeature
                      ? "(min-width:1024px) 58vw, 92vw"
                      : "(min-width:1024px) 42vw, 92vw"
                  }
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle glass reflection sweep on hover */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ x: hovered ? "180%" : "-180%" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="pointer-events-none absolute inset-y-0 -inset-x-1/2 z-10"
          style={{
            background:
              "linear-gradient(105deg, transparent 38%, rgba(245,242,235,0.14) 50%, transparent 62%)",
          }}
        />

        {/* Legibility scrim on hover */}
        <motion.div
          aria-hidden
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141210]/55 via-transparent to-[#141210]/10"
        />

        {/* Image-sequence progress ticks */}
        {images.length > 1 && (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute right-4 top-4 z-20 flex gap-1"
          >
            {images.map((img, i) => (
              <span
                key={img + i}
                className={cn(
                  "h-0.5 w-4 rounded-full transition-colors duration-500",
                  i === frame ? "bg-[#f5f2eb]" : "bg-[#f5f2eb]/35",
                )}
              />
            ))}
          </motion.div>
        )}

        {/* Top row — badges + wishlist */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
          <div className="flex flex-col items-start gap-1.5">
            {product.badge && (
              <Badge
                variant={BADGE_VARIANT[product.badge]}
                size="sm"
                className="uppercase tracking-[0.16em]"
              >
                {product.badge}
              </Badge>
            )}
            {soldOut ? (
              <Badge variant="destructive" size="sm" className="uppercase tracking-[0.16em]">
                Sold out
              </Badge>
            ) : lowStock ? (
              <Badge variant="muted" size="sm" className="uppercase tracking-[0.16em]">
                {product.stock} left
              </Badge>
            ) : null}
          </div>

          <motion.button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
            whileTap={{ scale: 0.82 }}
            className="glass flex size-9 items-center justify-center rounded-full border border-border/60 text-foreground"
          >
            <motion.span
              key={String(wished)}
              initial={{ scale: wished ? 0.4 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              <Heart className={cn("size-4 transition-colors", wished && "fill-copper text-copper")} />
            </motion.span>
          </motion.button>
        </div>

        {/* Index marker */}
        <span className="absolute bottom-4 left-4 z-20 font-mono text-xs text-[#f5f2eb] mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Mouse-follow preview tag */}
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="pointer-events-none absolute left-0 top-0 z-20 -ml-9 -mt-9"
        >
          <span className="glass flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-foreground">
            View
            <ArrowUpRight className="size-3" />
          </span>
        </motion.div>

        {/* Unfolding control spread */}
        <motion.div
          initial={false}
          animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-x-0 bottom-0 z-20 p-4"
        >
          <div className="glass flex flex-col gap-2.5 rounded-[var(--radius-lg)] border border-border/60 p-3">
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              <span className="ml-auto text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {product.colors.length} colours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <QuickView product={product}>
                <Button size="sm" variant="outline" className="flex-1">
                  <Maximize2 className="size-3.5" />
                  Quick view
                </Button>
              </QuickView>
              <Button
                size="sm"
                variant="copper"
                className="flex-1"
                disabled={soldOut}
                onClick={addToBag}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="size-3.5" />
                      Added
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-1.5"
                    >
                      <ShoppingBag className="size-3.5" />
                      {soldOut ? "Sold out" : "Add to bag"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Masthead-style meta */}
      <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
          <span className="text-eyebrow text-copper">{product.category}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <h3
          className={cn(
            "font-display leading-snug tracking-tight text-pretty",
            isFeature ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground italic">{product.line}</p>
      </div>
    </motion.article>
  )
}
