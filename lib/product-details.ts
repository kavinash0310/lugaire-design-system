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
  "T-Shirts": "220 GSM · Single Jersey",
  "Long Sleeves": "240 GSM · Single Jersey",
  Sweatshirts: "340 GSM · French Terry",
  Hoodies: "400 GSM · Brushed Fleece",
}

const FIT: Record<Category, string> = {
  "T-Shirts": "Oversized, drop-shoulder",
  "Long Sleeves": "Relaxed, boxy",
  Sweatshirts: "Oversized, boxy",
  Hoodies: "Oversized, heavyweight",
}

const NECK: Record<Category, string> = {
  "T-Shirts": "Ribbed crew neck",
  "Long Sleeves": "Ribbed crew neck",
  Sweatshirts: "Ribbed crew neck",
  Hoodies: "Double-layer hood",
}

const SLEEVE: Record<Category, string> = {
  "T-Shirts": "Short, drop-shoulder",
  "Long Sleeves": "Long, ribbed cuff",
  Sweatshirts: "Long, ribbed cuff",
  Hoodies: "Long, ribbed cuff",
}

const ORIGINS = [
  "Made in India",
  "Knit & cut in Tiruppur",
  "Milled & sewn in India",
  "Reactive-dyed in India",
] as const

const WASH = [
  "Machine wash cold, inside out. Tumble dry low.",
  "Wash cold with like colours. Do not bleach.",
  "Cold wash, inside out. Cool iron if needed.",
  "Pre-shrunk. Machine wash cold, hang to dry.",
] as const

/** Fabric family inferred from the material description. */
function fabricType(material: string): string {
  const m = material.toLowerCase()
  if (m.includes("fleece")) return "Brushed heavyweight fleece"
  if (m.includes("terry")) return "Loopback French terry"
  if (m.includes("pima")) return "Long-staple Pima cotton"
  if (m.includes("cotton")) return "Combed & compact cotton"
  return "Single jersey knit"
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
  const blocks: StoryBlock[] = [
    {
      eyebrow: "The Fabric",
      heading: `Cut from ${product.material.toLowerCase()}.`,
      body: product.note,
      image: imgs[imgs.length - 1] ?? imgs[0],
    },
    {
      eyebrow: "The Fit",
      heading: "Built for the oversized silhouette.",
      body: `${product.line} A premium heavyweight piece conceived to be worn every day — bio-washed, pre-shrunk, and made to soften into a second skin rather than wear thin.`,
      image: imgs[1] ?? imgs[0],
    },
    {
      eyebrow: "The Line",
      heading: "Minimal branding, considered proportion.",
      body: `Part of the ${product.collection} line, the ${product.name} answers to nothing but the body and the light. No loud prints, no fake logos — only proportion, weight, and restraint.`,
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
    name: "Arjun M.",
    location: "Bengaluru",
    rating: 5,
    title: "The weight is unreal",
    body: "You feel the 240 GSM the second you put it on. The oversized fit falls perfectly and it only gets softer with every wash.",
    verified: true,
  },
  {
    name: "Kabir S.",
    location: "Mumbai",
    rating: 5,
    title: "My new everyday tee",
    body: "Boxy, heavyweight, zero logos on the front. Exactly the premium blank I'd been looking for. Sizing is true for the oversized cut.",
    verified: true,
  },
  {
    name: "Kenji T.",
    location: "Tokyo",
    rating: 4,
    title: "Quietly perfect",
    body: "Understated in the best way. The drop shoulder sits right and the fabric feels premium. Took my usual size and it fell beautifully.",
    verified: true,
  },
  {
    name: "Léo R.",
    location: "Paris",
    rating: 5,
    title: "Streetwear, done right",
    body: "The bio-washed hand and the clean cut make it feel far more expensive than it is. This is how a heavyweight tee should be made.",
    verified: true,
  },
  {
    name: "Marcus D.",
    location: "New York",
    rating: 5,
    title: "Impeccable finish",
    body: "Photos don't do the fabric justice. Dense, structured, and the ribbed collar holds its shape. Every seam is considered.",
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
