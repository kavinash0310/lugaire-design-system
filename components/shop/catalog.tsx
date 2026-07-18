"use client"

import { useMemo, useState, type ReactNode } from "react"
import { motion } from "motion/react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  availabilityOf,
  CATEGORIES,
  COLORS,
  FABRICS,
  formatPrice,
  PRICE_BOUNDS,
  PRODUCTS,
  SIZES,
  type Availability,
  type Category,
  type Fabric,
  type Size,
} from "@/lib/products"
import { staggerContainer } from "@/lib/motion"
import { ProductCard } from "@/components/shop/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

type SortKey = "curated" | "newest" | "price-asc" | "price-desc"

const SORTS: { key: SortKey; label: string }[] = [
  { key: "curated", label: "Curated" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price · Low to high" },
  { key: "price-desc", label: "Price · High to low" },
]

const AVAILABILITY: Availability[] = ["In stock", "Low stock", "Sold out"]

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
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false
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

  const panel = (
    <FilterPanel
      query={query}
      setQuery={setQuery}
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
      activeCount={activeCount}
      onReset={reset}
    />
  )

  // Key the grid on the filter signature so the stagger replays on change.
  const signature = `${sort}-${filtered.length}-${activeCount}`

  return (
    <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[92px] max-h-[calc(100vh-112px)] overflow-y-auto no-scrollbar pr-1">
          {panel}
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Toolbar */}
        <div className="sticky top-[68px] z-30 -mx-5 mb-8 flex items-center justify-between gap-4 border-b border-border/60 glass px-5 py-4 md:-mx-10 md:px-10 lg:mx-0 lg:rounded-[var(--radius-lg)] lg:border lg:px-5">
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Drawer>
              <DrawerTrigger
                render={
                  <Button variant="outline" size="sm" className="lg:hidden" aria-label="Open filters" />
                }
              >
                <SlidersHorizontal className="size-4" />
                Filters
                {activeCount > 0 && (
                  <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-copper text-[0.6rem] text-copper-foreground">
                    {activeCount}
                  </span>
                )}
              </DrawerTrigger>
              <DrawerContent side="left" className="w-[min(88vw,360px)]">
                <DrawerHeader>
                  <DrawerTitle>Refine</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>{panel}</DrawerBody>
              </DrawerContent>
            </Drawer>

            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Sort */}
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 rounded-[var(--radius-sm)] border border-border bg-card px-2.5 text-xs tracking-normal text-foreground outline-none transition-colors focus-visible:border-ring"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-32 text-center">
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
          </div>
        ) : (
          <motion.div
            key={signature}
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ── Filter panel ─────────────────────────────────────────────────────── */

function FilterPanel(props: {
  query: string
  setQuery: (v: string) => void
  categories: Category[]
  onToggleCategory: (v: Category) => void
  fabrics: Fabric[]
  onToggleFabric: (v: Fabric) => void
  colors: string[]
  onToggleColor: (v: string) => void
  sizes: Size[]
  onToggleSize: (v: Size) => void
  availability: Availability[]
  onToggleAvailability: (v: Availability) => void
  minPrice: number
  maxPrice: number
  setMinPrice: (v: number) => void
  setMaxPrice: (v: number) => void
  activeCount: number
  onReset: () => void
}) {
  const {
    query,
    setQuery,
    categories,
    onToggleCategory,
    fabrics,
    onToggleFabric,
    colors,
    onToggleColor,
    sizes,
    onToggleSize,
    availability,
    onToggleAvailability,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    activeCount,
    onReset,
  } = props

  return (
    <div className="flex flex-col gap-7">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the house"
          aria-label="Search products"
          className="pl-10"
        />
      </div>

      {/* Header + clear */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-eyebrow text-copper">Refine</span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3" />
            Clear {activeCount}
          </button>
        )}
      </div>

      {/* Category */}
      <FilterGroup label="Category">
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <CheckRow
              key={cat}
              label={cat}
              checked={categories.includes(cat)}
              onClick={() => onToggleCategory(cat)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Fabric */}
      <FilterGroup label="Fabric">
        <div className="flex flex-wrap gap-1.5">
          {FABRICS.map((f) => (
            <Chip key={f} active={fabrics.includes(f)} onClick={() => onToggleFabric(f)}>
              {f}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      {/* Colour */}
      <FilterGroup label="Colour">
        <div className="flex flex-wrap items-center gap-2.5">
          {COLORS.map((c) => {
            const active = colors.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onToggleColor(c.name)}
                aria-label={c.name}
                aria-pressed={active}
                title={c.name}
                className={cn(
                  "size-7 rounded-full border transition-transform duration-[var(--duration-fast)]",
                  active
                    ? "border-copper scale-110 ring-2 ring-copper/40 ring-offset-2 ring-offset-background"
                    : "border-border/70 hover:scale-105",
                )}
                style={{ backgroundColor: c.hex }}
              />
            )
          })}
        </div>
      </FilterGroup>

      {/* Size */}
      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onToggleSize(s)}
              aria-pressed={sizes.includes(s)}
              className={cn(
                "flex h-9 min-w-10 items-center justify-center rounded-[var(--radius-sm)] border px-2.5 text-xs transition-colors",
                sizes.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup label="Price">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs tabular-nums text-foreground">
            <span>{formatPrice(minPrice)}</span>
            <span className="text-muted-foreground">—</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Min
              <input
                type="range"
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={20}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 20))
                }
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-copper"
              />
            </label>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Max
              <input
                type="range"
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={20}
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 20))
                }
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-copper"
              />
            </label>
          </div>
        </div>
      </FilterGroup>

      {/* Availability */}
      <FilterGroup label="Availability">
        <div className="flex flex-col gap-1.5">
          {AVAILABILITY.map((a) => (
            <CheckRow
              key={a}
              label={a}
              checked={availability.includes(a)}
              onClick={() => onToggleAvailability(a)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  )
}

function FilterGroup({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}

function CheckRow({
  label,
  checked,
  onClick,
}: {
  label: string
  checked: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className="group flex items-center gap-2.5 text-left"
    >
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-[4px] border transition-colors",
          checked ? "border-copper bg-copper" : "border-border group-hover:border-foreground",
        )}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="size-2.5 text-copper-foreground" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={cn(
          "text-sm transition-colors",
          checked ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {label}
      </span>
    </button>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-[var(--duration-fast)]",
        active
          ? "border-copper text-copper"
          : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
