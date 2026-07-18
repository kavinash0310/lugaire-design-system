"use client"

import * as React from "react"
import Image from "next/image"
import { Heart, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Product } from "@/lib/products"
import { useWishlist } from "@/components/site/wishlist-provider"
import { QuickView } from "@/components/product/quick-view"
import { Button } from "@/components/ui/button"

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
  const cover = product.images[0] || "/placeholder.svg"
  const alt = product.images[1] || cover

  return (
    <article className="group relative flex flex-col" data-cursor="hover">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40">
        {/* Layered cross-fade images */}
        <Image
          src={cover || "/placeholder.svg"}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
        <Image
          src={alt || "/placeholder.svg"}
          alt=""
          aria-hidden
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
          className="object-cover opacity-0 transition-opacity duration-[700ms] ease-[var(--ease-luxe)] group-hover:opacity-100"
        />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="font-mono text-xs text-primary-foreground mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(product.id)}
            className="glass flex size-9 items-center justify-center rounded-full border border-border/60 text-foreground transition-transform hover:scale-110"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                wished && "fill-copper text-copper",
              )}
            />
          </button>
        </div>

        {/* Unfolding spread */}
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
          <div className="glass flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border/60 p-2.5">
            <div className="flex items-center gap-1.5 pl-1.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
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
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground italic">{product.line}</p>
      </div>
    </article>
  )
}
