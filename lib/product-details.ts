/**
 * Editorial detail layer for the Product Detail Page.
 *
 * The core catalog in `lib/products.ts` stays intentionally lean. This module
 * DERIVES the richer, boutique-style specifications (GSM, fit, neck, sleeve,
 * origin, wash care) and the editorial gallery labelling from the existing
 * product fields — deterministically, so a given SKU always resolves to the
 * same details. Nothing here mutates the catalog.
 */

import type { Category, Product } from "@/lib/products"

/* ── Deterministic helpers ────────────────────────────────────────────── */

function hash(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

function pick<T>(input: string, list: readonly T[]): T {
  return list[hash(input) % list.length]
}

/* ── Gallery labelling ────────────────────────────────────────────────── */

export type GalleryShot = { src: string; label: string }

const SHOT_SEQUENCE = [
  "Front",
  "Lifestyle",
  "Fabric Detail",
  "Model",
  "Back",
  "Side",
  "Close-Up",
] as const

/** Labels each available image with an editorial shot name. */
export function galleryShots(product: Product): GalleryShot[] {
  return product.images.map((src, i) => ({
    src,
    label: SHOT_SEQUENCE[i] ?? "Detail",
  }))
}

/* ── Specification sheet ──────────────────────────────────────────────── */

export type Spec = { label: string; value: string }

const GSM: Record<Category, string> = {
  Outerwear: "480 GSM",
  Knitwear: "320 GSM · 12-gauge",
  Tailoring: "260 GSM",
  Shirting: "140 GSM",
  Trousers: "300 GSM",
  Leather: "1.2 mm full-grain",
}

const FIT: Record<Category, string> = {
  Outerwear: "Relaxed, column silhouette",
  Knitwear: "True to size, fully-fashioned",
  Tailoring: "Tailored, half-canvas",
  Shirting: "Considered regular fit",
  Trousers: "High-rise, tapered leg",
  Leather: "Close, second-skin fit",
}

const NECK: Record<Category, string> = {
  Outerwear: "Notch lapel collar",
  Knitwear: "Ribbed roll-neck",
  Tailoring: "Peak lapel",
  Shirting: "Cutaway collar",
  Trousers: "—",
  Leather: "Stand collar",
}

const SLEEVE: Record<Category, string> = {
  Outerwear: "Full-length, set-in",
  Knitwear: "Saddle shoulder, long",
  Tailoring: "Working four-button cuff",
  Shirting: "Long, single-button cuff",
  Trousers: "—",
  Leather: "Ribbed-cuff, long",
}

const ORIGINS = [
  "Made in Italy",
  "Made in England",
  "Made in Scotland",
  "Made in Portugal",
  "Made in Japan",
] as const

const WASH = [
  "Dry clean only. Rest between wears.",
  "Hand wash cold. Dry flat, away from light.",
  "Specialist clean. Store on a broad hanger.",
  "Cool iron. Never tumble dry.",
] as const

/** Fabric family inferred from the material description. */
function fabricType(material: string): string {
  const m = material.toLowerCase()
  if (m.includes("cashmere")) return "Brushed cashmere"
  if (m.includes("wool")) return "Woven / knitted wool"
  if (m.includes("linen")) return "Garment-washed linen"
  if (m.includes("cotton") || m.includes("poplin") || m.includes("oxford"))
    return "Long-staple cotton"
  if (m.includes("leather") || m.includes("suede") || m.includes("calfskin") || m.includes("lambskin"))
    return "Aniline-finished hide"
  if (m.includes("shearling")) return "Whole-hide shearling"
  return "House-milled cloth"
}

/**
 * The full specification sheet for a product. Rows with an em-dash value
 * (e.g. neck/sleeve on trousers) are filtered out so the sheet stays honest.
 */
export function specSheet(product: Product): Spec[] {
  const rows: Spec[] = [
    { label: "Material", value: product.material },
    { label: "Fabric", value: fabricType(product.material) },
    { label: "Weight", value: GSM[product.category] },
    { label: "Fit", value: FIT[product.category] },
    { label: "Neck", value: NECK[product.category] },
    { label: "Sleeve", value: SLEEVE[product.category] },
    { label: "Origin", value: pick(product.sku, ORIGINS) },
    { label: "Care", value: pick(product.name, WASH) },
  ]
  return rows.filter((r) => r.value !== "—")
}

/* ── Sizing & availability ────────────────────────────────────────────── */

/**
 * Deterministic stock signal per size so the page can show "Low stock" /
 * "Sold out" states without a backend. Most sizes are in stock.
 */
export function sizeAvailability(product: Product): Record<string, "in" | "low" | "out"> {
  const map: Record<string, "in" | "low" | "out"> = {}
  product.sizes.forEach((s, i) => {
    const roll = hash(`${product.sku}-${s}`) % 10
    if (roll === 0 && i !== 0) map[s] = "out"
    else if (roll <= 2) map[s] = "low"
    else map[s] = "in"
  })
  return map
}

/* ── Estimated delivery window ────────────────────────────────────────── */

export function deliveryWindow(): string {
  const start = new Date()
  start.setDate(start.getDate() + 2)
  const end = new Date()
  end.setDate(end.getDate() + 5)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  return `${fmt(start)} – ${fmt(end)}`
}

/* ── Editorial storytelling blocks ────────────────────────────────────── */

export type StoryBlock = {
  eyebrow: string
  heading: string
  body: string
  image: string
}

/**
 * Builds three long-form editorial sections from the product's own images and
 * material story. Falls back gracefully when fewer images are available.
 */
export function storyBlocks(product: Product): StoryBlock[] {
  const imgs = product.images
  const weight = GSM[product.category]
  const blocks: StoryBlock[] = [
    {
      eyebrow: "The Material",
      heading: `Crafted from ${weight} ${product.material.toLowerCase()}.`,
      body: product.note,
      image: imgs[imgs.length - 1] ?? imgs[0],
    },
    {
      eyebrow: "The Intent",
      heading: "Built for everyday luxury.",
      body: `${product.line} A piece conceived to be worn, not preserved — one that earns its character across seasons rather than losing it.`,
      image: imgs[1] ?? imgs[0],
    },
    {
      eyebrow: "The Line",
      heading: "Designed with timeless proportions.",
      body: `Cut in the ${product.collection} line, the ${product.name} answers to nothing but the body and the light. No logo, no season stamp — only proportion, weight, and restraint.`,
      image: imgs[0],
    },
  ]
  return blocks
}

/* ── Reviews (curated, deterministic) ─────────────────────────────────── */

export type Review = {
  name: string
  location: string
  rating: number
  title: string
  body: string
  photo?: string
  verified: boolean
}

const REVIEWER_POOL: Omit<Review, "photo">[] = [
  {
    name: "Julian M.",
    location: "Copenhagen",
    rating: 5,
    title: "Weight you can feel",
    body: "The drape is extraordinary. It hangs like nothing else I own and only looks better with wear.",
    verified: true,
  },
  {
    name: "Andre L.",
    location: "Milan",
    rating: 5,
    title: "The last one I'll buy",
    body: "I've stopped looking. The construction is honest and the proportions are exactly right.",
    verified: true,
  },
  {
    name: "Kenji T.",
    location: "Tokyo",
    rating: 4,
    title: "Quietly perfect",
    body: "Understated in the best way. Sizing ran true; I took my usual and it fell beautifully.",
    verified: true,
  },
  {
    name: "Sébastien R.",
    location: "Paris",
    rating: 5,
    title: "Investment, not purchase",
    body: "Expensive, yes — but the cost fades and the object remains. This is how clothing should be made.",
    verified: true,
  },
  {
    name: "Marcus D.",
    location: "New York",
    rating: 5,
    title: "Impeccable",
    body: "Photographs do not do the finishing justice. Every seam is considered.",
    verified: true,
  },
]

export function reviewsFor(product: Product): Review[] {
  const offset = hash(product.sku) % REVIEWER_POOL.length
  const ordered = [
    ...REVIEWER_POOL.slice(offset),
    ...REVIEWER_POOL.slice(0, offset),
  ]
  // Attach a couple of "photo reviews" using the product's own imagery.
  return ordered.map((r, i) => ({
    ...r,
    photo: i < 2 ? product.images[(i + 1) % product.images.length] : undefined,
  }))
}

export function ratingSummary(reviews: Review[]) {
  const total = reviews.length
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / total
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))
  return { total, avg, distribution }
}
