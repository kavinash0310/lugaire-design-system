"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Heart, ShoppingBag, X } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/states"
import { toast } from "@/components/ui/toast"
import { WISHLIST_SEED } from "@/lib/mock/account"
import { getProduct, formatPrice, type Product } from "@/lib/products"

export default function WishlistPage() {
  const [ids, setIds] = React.useState<string[]>(WISHLIST_SEED)

  const items = ids
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p))

  function remove(id: string) {
    setIds((prev) => prev.filter((x) => x !== id))
    toast.success("Removed from wishlist")
  }

  function addToCart(name: string) {
    toast.success(`${name} added to cart`)
  }

  return (
    <div>
      <AccountHeading
        eyebrow="Saved"
        title="Wishlist"
        description="Pieces you're considering, kept in one quiet room."
      />

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any piece to save it here for later."
          action={<Button variant="copper" render={<Link href="/shop" />}>Browse the collection</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40">
                  <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={product.name} />
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
                  />
                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    aria-label="Remove from wishlist"
                    className="glass absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-border/60 text-foreground transition-transform hover:scale-110 active:scale-90"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-1 pt-4">
                  <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                    <span className="text-eyebrow text-copper">{product.category}</span>
                    <span className="font-mono text-xs text-muted-foreground">{formatPrice(product.price)}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug tracking-tight text-pretty">
                    <Link href={`/product/${product.id}`} className="transition-colors hover:text-copper">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground italic">{product.line}</p>
                  <Button size="sm" variant="outline" className="mt-3" onClick={() => addToCart(product.name)}>
                    <ShoppingBag className="size-3.5" />
                    Add to cart
                  </Button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
