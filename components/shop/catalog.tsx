"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import {
  availabilityOf,
  formatPrice,
  PRICE_BOUNDS,
  PRODUCTS,
  type Availability,
  type Category,
  type Fabric,
  type Product,
  type Size,
} from "@/lib/products"
import { ProductCard } from "@/components/shop/product-card"
import { ShopSkeleton } from "@/components/shop/shop-skeleton"
import { FilterBar, type SortKey } from "@/components/shop/filter-bar"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/** Editorial span cadence — a repeating six-slot magazine rhythm. */
const SPAN_CYCLE = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
]
const OFFSET_CYCLE = ["", "lg:mt-16", "", "", "lg:mt-24", ""]
const FEATURE_SLOTS = new Set([0, 3])

/** Large-typography interstitials woven between product spreads. */
const INTERSTITIALS = [
  {
    kicker: "The House",
    title: "Cut once. Worn for decades.",
    body: "Every piece is drawn to a single silhouette and made to outlast the season that named it.",
  },
  {
    kicker: "On Cloth",
    title: "Fewer things, made properly.",
    body: "Mills chosen for temperament, not volume. Wool that remembers its shape; leather that keeps your years.",
  },
]
/** Product positions after which an interstitial is inserted. */
const BREAK_AT = [6, 15]

function toggleIn<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((x) => x !== value) : [...set, value]
}

export function Catalog() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("curated")
  const [categories, setCategories] = useState<Category[]>([])
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])
  const [minPrice, setMinPrice] = useState(PRICE_BOUNDS.min)
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = PRODUCTS.filter((p) => {
      if (q) {
        const haystack =
          `${p.name} ${p.material} ${p.sku} ${p.category} ${p.fabric} ${p.line}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (categories.length && !categories.includes(p.category)) return false
      if (fabrics.length && !fabrics.includes(p.fabric)) return false
      if (colors.length && !p.colors.some((cc) => colors.includes(cc.name))) return false
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false
      if (availability.length && !availability.includes(availabilityOf(p))) return false
      if (p.price < minPrice || p.price > maxPrice) return false
      return true
    })

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price)
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price)
      case "newest":
        return [...list].sort((a, b) => b.year - a.year)
      default:
        return list
    }
  }, [query, sort, categories, fabrics, colors, sizes, availability, minPrice, maxPrice])

  const activeCount =
    categories.length +
    fabrics.length +
    colors.length +
    sizes.length +
    availability.length +
    (query.trim() ? 1 : 0) +
    (minPrice > PRICE_BOUNDS.min || maxPrice < PRICE_BOUNDS.max ? 1 : 0)

  // Luxury loading beat when structural filters change (not on every keystroke).
  const loadSignature = JSON.stringify([
    sort,
    categories,
    fabrics,
    colors,
    sizes,
    availability,
    minPrice,
    maxPrice,
  ])
  useEffect(() => {
    setLoading(true)
    const id = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(id)
  }, [loadSignature])

  function reset() {
    setQuery("")
    setCategories([])
    setFabrics([])
    setColors([])
    setSizes([])
    setAvailability([])
    setMinPrice(PRICE_BOUNDS.min)
    setMaxPrice(PRICE_BOUNDS.max)
  }

  // Build the render sequence: products in an editorial cadence with
  // interstitials woven in. Slot index resets after each interstitial so the
  // large/small rhythm realigns beneath every statement.
  const blocks = useMemo(() => {
    const out: Array<
      | { kind: "product"; product: Product; index: number; slot: number }
      | { kind: "interstitial"; data: (typeof INTERSTITIALS)[number]; key: string }
    > = []
    let slot = 0
    let breakCount = 0
    filtered.forEach((product, i) => {
      if (BREAK_AT.includes(i) && breakCount < INTERSTITIALS.length) {
        out.push({
          kind: "interstitial",
          data: INTERSTITIALS[breakCount],
          key: `int-${breakCount}`,
        })
        breakCount += 1
        slot = 0
      }
      out.push({ kind: "product", product, index: i, slot })
      slot += 1
    })
    return out
  }, [filtered])

  return (
    <div className="w-full">
      <FilterBar
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        categories={categories}
        onToggleCategory={(v) => setCategories((s) => toggleIn(s, v))}
        fabrics={fabrics}
        onToggleFabric={(v) => setFabrics((s) => toggleIn(s, v))}
        colors={colors}
        onToggleColor={(v) => setColors((s) => toggleIn(s, v))}
        sizes={sizes}
        onToggleSize={(v) => setSizes((s) => toggleIn(s, v))}
        availability={availability}
        onToggleAvailability={(v) => setAvailability((s) => toggleIn(s, v))}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        count={filtered.length}
        activeCount={activeCount}
        expanded={expanded}
        setExpanded={setExpanded}
        onReset={reset}
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        {loading ? (
          <ShopSkeleton />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-32 text-center">
            <p className="font-serif text-3xl text-foreground">Nothing matches, yet.</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Ease your filters to reveal more of the house. Every piece is made to be found.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 text-[11px] uppercase tracking-[0.2em] text-copper transition-opacity hover:opacity-70"
            >
              Reset the room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-6 lg:gap-y-16">
            {blocks.map((block) =>
              block.kind === "interstitial" ? (
                <Interstitial key={block.key} data={block.data} />
              ) : (
                <div
                  key={block.product.id}
                  className={cn(
                    "col-span-12 sm:col-span-6",
                    SPAN_CYCLE[block.slot % SPAN_CYCLE.length],
                    OFFSET_CYCLE[block.slot % OFFSET_CYCLE.length],
                  )}
                >
                  <ProductCard
                    product={block.product}
                    index={block.index}
                    variant={FEATURE_SLOTS.has(block.slot % SPAN_CYCLE.length) ? "feature" : "standard"}
                  />
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Interstitial({ data }: { data: (typeof INTERSTITIALS)[number] }) {
  return (
    <section className="col-span-12 py-10 md:py-16">
      <div className="grain relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-secondary/40 px-6 py-16 md:px-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="text-eyebrow text-copper">{data.kicker}</span>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
            {data.title}
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {data.body}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
