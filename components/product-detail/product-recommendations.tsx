"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { formatPrice, getProduct, PRODUCTS, type Product } from "@/lib/products"
import { MagazineCard } from "@/components/product/magazine-card"
import { useRecentlyViewed } from "@/lib/use-recently-viewed"

export function ProductRecommendations({ product }: { product: Product }) {
  const history = useRecentlyViewed(product.id)

  const related = React.useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category,
    )
    const sameCollection = PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        p.collection === product.collection &&
        p.category !== product.category,
    )
    return [...sameCategory, ...sameCollection].slice(0, 3)
  }, [product])

  const completeTheLook = React.useMemo(() => {
    const seen = new Set<string>([product.category])
    const picks: Product[] = []
    for (const p of PRODUCTS) {
      if (p.id === product.id) continue
      if (seen.has(p.category)) continue
      seen.add(p.category)
      picks.push(p)
      if (picks.length === 4) break
    }
    return picks
  }, [product])

  const recentlyViewed = React.useMemo(
    () => history.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p)),
    [history],
  )

  return (
    <div className="flex flex-col gap-20">
      {/* Related */}
      {related.length > 0 && (
        <section aria-label="You may also like" className="flex flex-col gap-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-eyebrow text-copper">In the same hand</span>
              <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                You may also like.
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:inline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <MagazineCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Complete the look */}
      {completeTheLook.length > 0 && (
        <Rail
          eyebrow="Styled together"
          title="Complete the look."
          products={completeTheLook}
        />
      )}

      {/* Recently viewed */}
      {recentlyViewed.length > 0 && (
        <Rail
          eyebrow="Where you've been"
          title="Recently viewed."
          products={recentlyViewed}
        />
      )}
    </div>
  )
}

function Rail({
  eyebrow,
  title,
  products,
}: {
  eyebrow: string
  title: string
  products: Product[]
}) {
  return (
    <section aria-label={title} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-eyebrow text-copper">{eyebrow}</span>
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:px-0">
        {products.map((p, i) => (
          <MiniCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function MiniCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="w-[68vw] shrink-0 snap-start sm:w-64"
    >
      <Link href={`/product/${product.id}`} className="group flex flex-col gap-3" data-cursor="hover">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-secondary/40">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 256px, 68vw"
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
          />
        </div>
        <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
          <span className="text-eyebrow text-copper">{product.category}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
        <h3 className="font-display text-lg leading-snug tracking-tight">{product.name}</h3>
      </Link>
    </motion.div>
  )
}
