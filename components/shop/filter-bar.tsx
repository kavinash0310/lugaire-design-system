"use client"

import { AnimatePresence, motion } from "motion/react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  CATEGORIES,
  COLORS,
  FABRICS,
  formatPrice,
  PRICE_BOUNDS,
  SIZES,
  type Availability,
  type Category,
  type Fabric,
  type Size,
} from "@/lib/products"
import { cn } from "@/lib/utils"

const AVAILABILITY: Availability[] = ["In stock", "Low stock", "Sold out"]
const EASE = [0.16, 1, 0.3, 1] as const

export type SortKey = "curated" | "newest" | "price-asc" | "price-desc"

const SORTS: { key: SortKey; label: string }[] = [
  { key: "curated", label: "Curated" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price · Low to high" },
  { key: "price-desc", label: "Price · High to low" },
]

type FilterBarProps = {
  query: string
  setQuery: (v: string) => void
  sort: SortKey
  setSort: (v: SortKey) => void
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
  count: number
  activeCount: number
  expanded: boolean
  setExpanded: (v: boolean) => void
  onReset: () => void
}

/**
 * Apple-style shop filter system. A slim, glass, sticky rail carries search,
 * the primary category pills and sort; a "Refine" toggle reveals an animated
 * panel with fabric, colour, size, price and availability. Everything animates
 * with the house's premium easing.
 */
export function FilterBar(props: FilterBarProps) {
  const {
    query,
    setQuery,
    sort,
    setSort,
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
    count,
    activeCount,
    expanded,
    setExpanded,
    onReset,
  } = props

  const priceActive = minPrice > PRICE_BOUNDS.min || maxPrice < PRICE_BOUNDS.max

  return (
    <div className="sticky top-[60px] z-30 -mx-5 mb-12 border-b border-border/60 glass px-5 py-4 md:-mx-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4">
        {/* Primary rail */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the house"
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-border bg-card/60 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring"
            />
          </div>

          {/* Category pills */}
          <div className="no-scrollbar -mx-1 flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto px-1">
            <Pill active={categories.length === 0} onClick={onReset}>
              All
            </Pill>
            {CATEGORIES.map((cat) => (
              <Pill
                key={cat}
                active={categories.includes(cat)}
                onClick={() => onToggleCategory(cat)}
              >
                {cat}
              </Pill>
            ))}
          </div>

          {/* Sort + Refine — separated group */}
          <div className="flex shrink-0 items-center gap-3 border-border/60 lg:ml-1 lg:border-l lg:pl-4">
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="hidden lg:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-full border border-border bg-card/60 px-3.5 text-xs tracking-normal text-foreground outline-none transition-colors focus-visible:border-ring"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Refine toggle */}
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className={cn(
                "flex h-10 items-center gap-2 rounded-full border px-4 text-[11px] uppercase tracking-[0.18em] transition-colors",
                expanded || activeCount > 0
                  ? "border-copper text-copper"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              <SlidersHorizontal className="size-3.5" />
              Refine
              {activeCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-copper text-[0.6rem] text-copper-foreground">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable panel */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-8 border-t border-border/60 pt-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Fabric */}
                <Group label="Fabric">
                  <div className="flex flex-wrap gap-1.5">
                    {FABRICS.map((f) => (
                      <Pill
                        key={f}
                        active={fabrics.includes(f)}
                        onClick={() => onToggleFabric(f)}
                      >
                        {f}
                      </Pill>
                    ))}
                  </div>
                </Group>

                {/* Colour */}
                <Group label="Colour">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {COLORS.map((color) => {
                      const active = colors.includes(color.name)
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => onToggleColor(color.name)}
                          aria-label={color.name}
                          aria-pressed={active}
                          title={color.name}
                          className={cn(
                            "size-7 rounded-full border transition-transform duration-[var(--duration-fast)]",
                            active
                              ? "scale-110 border-copper ring-2 ring-copper/40 ring-offset-2 ring-offset-background"
                              : "border-border/70 hover:scale-105",
                          )}
                          style={{ backgroundColor: color.hex }}
                        />
                      )
                    })}
                  </div>
                </Group>

                {/* Size */}
                <Group label="Size">
                  <div className="flex flex-wrap gap-1.5">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => onToggleSize(s)}
                        aria-pressed={sizes.includes(s)}
                        className={cn(
                          "flex h-9 min-w-10 items-center justify-center rounded-full border px-2.5 text-xs transition-colors",
                          sizes.includes(s)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Group>

                {/* Availability */}
                <Group label="Availability">
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABILITY.map((a) => (
                      <Pill
                        key={a}
                        active={availability.includes(a)}
                        onClick={() => onToggleAvailability(a)}
                      >
                        {a}
                      </Pill>
                    ))}
                  </div>
                </Group>

                {/* Price — spans full width beneath */}
                <div className="md:col-span-2 lg:col-span-4">
                  <Group label="Price">
                    <div className="flex max-w-xl flex-col gap-3">
                      <div className="flex items-center justify-between text-xs tabular-nums text-foreground">
                        <span>{formatPrice(minPrice)}</span>
                        <span className="text-muted-foreground">
                          {priceActive ? "Filtered range" : "Full range"}
                        </span>
                        <span>{formatPrice(maxPrice)}</span>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <input
                          type="range"
                          aria-label="Minimum price"
                          min={PRICE_BOUNDS.min}
                          max={PRICE_BOUNDS.max}
                          step={20}
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice(Math.min(Number(e.target.value), maxPrice - 20))
                          }
                          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-copper"
                        />
                        <input
                          type="range"
                          aria-label="Maximum price"
                          min={PRICE_BOUNDS.min}
                          max={PRICE_BOUNDS.max}
                          step={20}
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice(Math.max(Number(e.target.value), minPrice + 20))
                          }
                          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-copper"
                        />
                      </div>
                    </div>
                  </Group>
                </div>
              </div>

              {/* Panel footer */}
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {count} {count === 1 ? "piece" : "pieces"}
                </span>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-copper transition-opacity hover:opacity-70"
                  >
                    <X className="size-3" />
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}

function Pill({
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
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-[var(--duration-fast)]",
        active
          ? "border-copper bg-copper/10 text-copper"
          : "border-border/60 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
