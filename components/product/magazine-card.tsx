"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Heart, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/products"
import { useWishlist } from "@/components/site/wishlist-provider"
import { QuickView } from "@/components/product/quick-view"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Editorial "magazine" product card. On hover the cover cross-fades to a
 * second frame, the image scales, and a spread of controls unfolds from the
 * base — colour swatches, price, and a Quick View trigger.
 */
export function MagazineCard({
  product,
  index,
  priority,
}: {
  product: Product
  index: number
  priority?: boolean
}) {
  const { has, toggle } = useWishlist()
  const wished = has(product.id)
  const [loaded, setLoaded] = React.useState(false)
  const cover = product.images[0] || "/placeholder.svg"
  const alt = product.images[1] || cover

  return (
    <motion.article
      className="group relative flex flex-col"
      data-cursor="hover"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 9) * 0.06,
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40">
        {/* Loading skeleton — fades away once the cover has decoded */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Skeleton className="h-full w-full rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layered cross-fade images */}
        <Image
          src={cover || "/placeholder.svg"}
          alt={product.name}
          fill
          priority={priority}
          onLoad={() => setLoaded(true)}
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
          className={cn(
            "object-cover transition-[transform,filter,opacity] duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]",
            loaded ? "blur-0 opacity-100" : "scale-[1.04] opacity-0 blur-md",
          )}
        />
        <Image
          src={alt || "/placeholder.svg"}
          alt=""
          aria-hidden
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
          className="object-cover opacity-0 transition-opacity duration-[700ms] ease-[var(--ease-luxe)] group-hover:opacity-100"
        />

        {/* Full-frame link into the product detail page. Sits above the
            imagery but below the interactive controls (z-20) so the wishlist
            and quick-view actions remain clickable. */}
        <Link
          href={`/product/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-[15]"
        />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
          <span className="font-mono text-xs text-primary-foreground mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
            className="glass flex size-9 items-center justify-center rounded-full border border-border/60 text-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-luxe)] hover:scale-110 active:scale-90"
          >
            <motion.span
              animate={
                wished
                  ? { scale: [1, 1.4, 0.92, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Heart
                className={cn(
                  "size-4 transition-colors duration-[var(--duration-base)]",
                  wished && "fill-copper text-copper",
                )}
              />
            </motion.span>
          </button>
        </div>

        {/* Unfolding spread */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-3 p-4 opacity-0 blur-[2px] transition-all duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0">
          <div className="glass flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border/60 p-2.5">
            <div className="flex items-center gap-1.5 pl-1.5">
              {product.colors.map((c, ci) => (
                <motion.span
                  key={c.name}
                  title={c.name}
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 * ci,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>
            <QuickView product={product}>
              <Button size="sm" variant="copper">
                <Maximize2 className="size-3.5" />
                Quick view
              </Button>
            </QuickView>
          </div>
        </div>
      </div>

      {/* Masthead-style meta */}
      <div className="flex flex-col gap-1 pt-4">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
          <span className="text-eyebrow text-copper">{product.category}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <h3 className="font-display text-xl leading-snug tracking-tight text-pretty">
          <Link
            href={`/product/${product.id}`}
            className="transition-colors duration-[var(--duration-base)] hover:text-copper"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground italic">{product.line}</p>
      </div>
    </motion.article>
  )
}
