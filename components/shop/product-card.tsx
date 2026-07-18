"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Heart, Maximize2, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { availabilityOf, formatPrice, type Product } from "@/lib/products"
import { fadeUp } from "@/lib/motion"
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

/**
 * Shop-only editorial product card. Framer Motion drives the entrance,
 * hover elevation, and image zoom / cross-fade. A control spread unfolds on
 * hover with colourways, Quick View, and Add to Bag; premium and stock
 * badges sit over the image.
 */
export function ProductCard({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  const { has, toggle } = useWishlist()
  const wished = has(product.id)
  const [hovered, setHovered] = React.useState(false)

  const availability = availabilityOf(product)
  const soldOut = availability === "Sold out"
  const lowStock = availability === "Low stock"

  const cover = product.images[0] || "/placeholder.svg"
  const alt = product.images[1] || cover

  function addToBag() {
    toast.success("Added to bag", {
      description: `${product.name} · ${product.colors[0]?.name ?? ""}`,
    })
  }

  return (
    <motion.article
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
      data-cursor="hover"
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? "var(--shadow-luxe-lg)"
            : "0 0 0 0 rgb(0 0 0 / 0)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40"
      >
        {/* Zoom wrapper */}
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={cover || "/placeholder.svg"}
            alt={product.name}
            fill
            priority={index < 3}
            sizes="(min-width:1280px) 24vw, (min-width:768px) 40vw, 90vw"
            className="object-cover"
          />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={alt || "/placeholder.svg"}
              alt=""
              aria-hidden
              fill
              sizes="(min-width:1280px) 24vw, (min-width:768px) 40vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Soft scrim for legibility on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141210]/45 via-transparent to-[#141210]/10"
        />

        {/* Top row — badges + wishlist */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
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

          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
            className="glass flex size-9 items-center justify-center rounded-full border border-border/60 text-foreground transition-transform hover:scale-110"
          >
            <Heart className={cn("size-4 transition-colors", wished && "fill-copper text-copper")} />
          </button>
        </div>

        {/* Index marker */}
        <span className="absolute bottom-4 left-4 font-mono text-xs text-primary-foreground mix-blend-difference">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Unfolding control spread */}
        <motion.div
          initial={false}
          animate={{
            y: hovered ? 0 : 14,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 bottom-0 p-4"
        >
          <div className="glass flex flex-col gap-2.5 rounded-[var(--radius-lg)] border border-border/60 p-3">
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
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
                <ShoppingBag className="size-3.5" />
                {soldOut ? "Sold out" : "Add to bag"}
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
        <h3 className="font-display text-xl leading-snug tracking-tight text-pretty">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground italic">{product.line}</p>
      </div>
    </motion.article>
  )
}
