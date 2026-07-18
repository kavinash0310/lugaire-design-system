"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  CATEGORIES,
  COLLECTIONS,
  COLORS,
  PRICE_BOUNDS,
  PRODUCTS,
  formatPrice,
  type Category,
  type Collection,
  type Product,
} from "@/lib/products"
import { MagazineCard } from "@/components/product/magazine-card"
import { QuickView } from "@/components/product/quick-view"
import { cn } from "@/lib/utils"

type SortKey = "curated" | "price-asc" | "price-desc" | "newest"

const SORTS: { key: SortKey; label: string }[] = [
  { key: "curated", label: "Curated" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price · Low" },
  { key: "price-desc", label: "Price · High" },
]

const PAGE_SIZE = 9

export function Catalog() {
  const [category, setCategory] = useState<Category | "All">("All")
  const [collection, setCollection] = useState<Collection | "All">("All")
  const [color, setColor] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max)
  const [sort, setSort] = useState<SortKey>("curated")
  const [count, setCount] = useState(PAGE_SIZE)
  const [active, setActive] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false
      if (collection !== "All" && p.collection !== collection) return false
      if (color && !p.colors.some((c) => c.name === color)) return false
      if (p.price > maxPrice) return false
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
  }, [category, collection, color, maxPrice, sort])

  // Reset visible count whenever the filter set changes.
  useEffect(() => {
    setCount(PAGE_SIZE)
  }, [category, collection, color, maxPrice, sort])

  const visible = filtered.slice(0, count)
  const hasMore = count < filtered.length

  // Infinite pagination via IntersectionObserver.
  const sentinel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hasMore) return
    const node = sentinel.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => Math.min(c + PAGE_SIZE, filtered.length))
        }
      },
      { rootMargin: "600px 0px" },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [hasMore, filtered.length])

  // Signature that changes whenever the result set changes, so the grid can
  // gracefully cross-fade between filtered states.
  const filterSignature = `${category}-${collection}-${color ?? "any"}-${maxPrice}-${sort}`

  const activeFilters =
    (category !== "All" ? 1 : 0) +
    (collection !== "All" ? 1 : 0) +
    (color ? 1 : 0) +
    (maxPrice < PRICE_BOUNDS.max ? 1 : 0)

  function reset() {
    setCategory("All")
    setCollection("All")
    setColor(null)
    setMaxPrice(PRICE_BOUNDS.max)
    setSort("curated")
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
      {/* Filter rail */}
      <div className="sticky top-[68px] z-30 -mx-5 mb-10 border-b border-border/60 glass px-5 py-4 md:-mx-10 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={category === "All"} onClick={() => setCategory("All")}>
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Collection */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Line
                </span>
                <div className="flex gap-1.5">
                  <MiniChip active={collection === "All"} onClick={() => setCollection("All")}>
                    All
                  </MiniChip>
                  {COLLECTIONS.map((c) => (
                    <MiniChip key={c} active={collection === c} onClick={() => setCollection(c)}>
                      {c}
                    </MiniChip>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Colour
                </span>
                <div className="flex gap-1.5">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(color === c.name ? null : c.name)}
                      aria-label={c.name}
                      aria-pressed={color === c.name}
                      className={cn(
                        "h-5 w-5 rounded-full border transition-transform duration-[var(--duration-fast)]",
                        color === c.name
                          ? "border-copper scale-110 ring-1 ring-copper/40"
                          : "border-border/70 hover:scale-105",
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Price */}
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Up to
                <input
                  type="range"
                  min={PRICE_BOUNDS.min}
                  max={PRICE_BOUNDS.max}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-border accent-copper"
                />
                <span className="tabular-nums text-foreground">{formatPrice(maxPrice)}</span>
              </label>

              {/* Sort */}
              <div className="flex gap-1.5">
                {SORTS.map((s) => (
                  <MiniChip key={s.key} active={sort === s.key} onClick={() => setSort(s.key)}>
                    {s.label}
                  </MiniChip>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={filtered.length}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="tabular-nums"
              >
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {activeFilters > 0 && (
                <motion.button
                  type="button"
                  onClick={reset}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-copper transition-opacity hover:opacity-70"
                >
                  Clear {activeFilters} {activeFilters === 1 ? "filter" : "filters"}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3 py-32 text-center"
        >
          <p className="font-serif text-2xl text-foreground">Nothing matches, yet.</p>
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
        </motion.div>
      ) : (
        <motion.div
          key={filterSignature}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <MagazineCard key={p.id} product={p} index={i} onQuickView={() => setActive(p)} />
          ))}
        </motion.div>
      )}

      {hasMore && (
        <div ref={sentinel} className="flex justify-center py-16">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
            className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Revealing more
          </motion.span>
        </div>
      )}

      <QuickView product={active} onClose={() => setActive(null)} />
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-[var(--duration-fast)]",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function MiniChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] transition-colors duration-[var(--duration-fast)]",
        active
          ? "border-copper text-copper"
          : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
