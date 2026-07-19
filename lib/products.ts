/**
 * LUGAIRE catalog data layer.
 * A premium minimalist streetwear label — oversized, heavyweight, timeless.
 * A curated house of 30 pieces across tees, long sleeves, sweatshirts and
 * hoodies. Supports an arbitrary number of images per product, 5 colorways,
 * and 6 sizes. The homepage surfaces only the six "signature" pieces; the Shop
 * page exposes the full catalog.
 */

export type Category = "T-Shirts" | "Long Sleeves" | "Sweatshirts" | "Hoodies"

export type Collection =
  | "Minimal"
  | "Typography"
  | "Luxury Essentials"
  | "Streetwear"
  | "Signature Series"

export type ColorOption = {
  name: string
  hex: string
}

export const COLORS: ColorOption[] = [
  { name: "Charcoal Black", hex: "#1f1e1c" },
  { name: "Warm Ivory", hex: "#e9e1d1" },
  { name: "Stone Grey", hex: "#9d968a" },
  { name: "Olive Green", hex: "#565b45" },
  { name: "Navy Blue", hex: "#232b3b" },
]

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const
export type Size = (typeof SIZES)[number]

export const CATEGORIES: Category[] = [
  "T-Shirts",
  "Long Sleeves",
  "Sweatshirts",
  "Hoodies",
]

export const COLLECTIONS: Collection[] = [
  "Minimal",
  "Typography",
  "Luxury Essentials",
  "Streetwear",
  "Signature Series",
]

/** Shared editorial image pool — premium oversized streetwear photography. */
const IMG = {
  heroFront: "/editorial/hero-overcoat.png",
  portrait: "/editorial/hero-portrait.png",
  campaign: "/editorial/campaign-wide.png",
  heavyTee: "/editorial/look-coat.png",
  hoodie: "/editorial/look-knit.png",
  sweat: "/editorial/look-suit.png",
  tee: "/editorial/look-shirt.png",
  layered: "/editorial/look-leather.png",
  relaxed: "/editorial/look-trouser.png",
  fabricCotton: "/editorial/fabric-wool.png",
  fabricTerry: "/editorial/fabric-cashmere.png",
  fabricLabel: "/editorial/fabric-leather.png",
} as const

export type Product = {
  id: string
  sku: string
  name: string
  category: Category
  collection: Collection
  price: number
  /** Short editorial tagline shown on the magazine card. */
  line: string
  /** Long-form house note for quick view. */
  note: string
  material: string
  colors: ColorOption[]
  sizes: Size[]
  /** Arbitrary number of images — first is the cover. */
  images: string[]
  featured?: boolean
  /** Season index used by the interactive timeline. */
  year: number
}

const c = (...names: string[]) => COLORS.filter((x) => names.includes(x.name))
const allSizes = [...SIZES]
/** Every LUGAIRE tee ships in the full five-colour range. */
const allColors = [...COLORS]

/** Standard house fabric copy, reused for consistency across the tee line. */
const COTTON = "220 GSM combed & compact cotton"
const HEAVY = "240 GSM heavyweight cotton"
const TERRY = "340 GSM French terry"
const FLEECE = "400 GSM brushed fleece"

export const PRODUCTS: Product[] = [
  /* ── Minimal Collection (10) ─────────────────────────────────────────── */
  {
    id: "essential-oversized-tee",
    sku: "LG-TS-001",
    name: "Essential Oversized Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 1999,
    line: "The blank canvas, perfected.",
    note: "A heavyweight oversized tee cut with a clean drop shoulder and a boxy, elongated body. No branding on the front — only the weight of the cloth and the fall of the fabric. Bio-washed for a broken-in hand from the first wear.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heroFront, IMG.heavyTee, IMG.fabricCotton, IMG.campaign],
    featured: true,
    year: 2025,
  },
  {
    id: "blank-heavyweight-tee",
    sku: "LG-TS-002",
    name: "Blank Heavyweight Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 2199,
    line: "240 GSM of quiet confidence.",
    note: "Knitted from a dense single-jersey and garment-dyed for depth, this is the tee that anchors the wardrobe. Reinforced shoulder seams and a ribbed collar that holds its shape through years of wear.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.portrait, IMG.tee, IMG.fabricCotton],
    featured: true,
    year: 2025,
  },
  {
    id: "core-boxy-tee",
    sku: "LG-TS-003",
    name: "Core Boxy Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 1899,
    line: "A wider body, an easier line.",
    note: "The core of the house — a boxy, relaxed tee with a slightly cropped length made to sit clean over relaxed trousers. Combed cotton, pre-shrunk, reactive-dyed.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.relaxed, IMG.fabricCotton],
    year: 2025,
  },
  {
    id: "minimal-pocket-tee",
    sku: "LG-TS-004",
    name: "Minimal Pocket Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 2099,
    line: "One pocket. Nothing else.",
    note: "A single tonal chest pocket is the only detail on this otherwise unbroken oversized tee. Precision-stitched, bio-washed, and built to soften without losing its structure.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.relaxed, IMG.tee, IMG.fabricCotton],
    year: 2024,
  },
  {
    id: "clean-crew-tee",
    sku: "LG-TS-005",
    name: "Clean Crew Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 1899,
    line: "The everyday, in five tones.",
    note: "A true-to-the-house crew in a mid-weight combed cotton. Cut with a relaxed drop shoulder that reads clean under any layer. The uniform piece.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.portrait],
    year: 2024,
  },
  {
    id: "everyday-relaxed-tee",
    sku: "LG-TS-006",
    name: "Everyday Relaxed Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 1799,
    line: "Relaxed fit, considered cut.",
    note: "A softer, lighter take on the oversized silhouette for the warmer months. Single jersey knit, bio-washed to a lived-in softness, and reactive-dyed for a colour that lasts.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.relaxed, IMG.campaign],
    year: 2024,
  },
  {
    id: "structured-long-sleeve",
    sku: "LG-LS-007",
    name: "Structured Long Sleeve",
    category: "Long Sleeves",
    collection: "Minimal",
    price: 2499,
    line: "The long sleeve, boxed and clean.",
    note: "A heavyweight long sleeve with ribbed cuffs and a boxy, oversized body. The layering foundation of the collection — worn alone or beneath a hoodie.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.portrait, IMG.fabricCotton],
    featured: true,
    year: 2025,
  },
  {
    id: "minimal-terry-sweatshirt",
    sku: "LG-SW-008",
    name: "Minimal French Terry Sweatshirt",
    category: "Sweatshirts",
    collection: "Minimal",
    price: 3299,
    line: "French terry, stripped back.",
    note: "A premium French terry crewneck with a boxy fit and clean raglan lines. Brushed on the inside for softness, structured on the outside for shape.",
    material: TERRY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.sweat, IMG.fabricTerry, IMG.campaign],
    year: 2025,
  },
  {
    id: "essential-hoodie",
    sku: "LG-HD-009",
    name: "Essential Hoodie",
    category: "Hoodies",
    collection: "Minimal",
    price: 4299,
    line: "Heavyweight, hooded, honest.",
    note: "A 400 GSM brushed-fleece hoodie with a double-layer hood, ribbed cuffs, and a boxy oversized body. The weight you feel the moment you pull it on.",
    material: FLEECE,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.hoodie, IMG.fabricTerry, IMG.portrait],
    featured: true,
    year: 2025,
  },
  {
    id: "biowashed-boxy-tee",
    sku: "LG-TS-010",
    name: "Bio-Washed Boxy Tee",
    category: "T-Shirts",
    collection: "Minimal",
    price: 1999,
    line: "Washed soft, built to last.",
    note: "An enzyme bio-wash gives this boxy tee a supple, pre-worn feel while the compact cotton holds its shape. The most-reached-for piece in the drawer.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.fabricCotton],
    year: 2024,
  },

  /* ── Typography Collection (8) ───────────────────────────────────────── */
  {
    id: "serif-wordmark-tee",
    sku: "LG-TS-011",
    name: "Serif Wordmark Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2299,
    line: "The house name, set in serif.",
    note: "A restrained serif wordmark printed small at the chest and echoed across the back. Typography-driven, never loud — a graphic that reads as texture from across the room.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.portrait, IMG.heavyTee, IMG.fabricCotton],
    featured: true,
    year: 2025,
  },
  {
    id: "vertical-type-tee",
    sku: "LG-TS-012",
    name: "Vertical Type Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2199,
    line: "Type that runs the spine.",
    note: "A single column of condensed type runs vertically down the back, mirroring the seam. An architectural, editorial approach to the graphic tee.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heavyTee, IMG.tee],
    year: 2025,
  },
  {
    id: "japanese-script-tee",
    sku: "LG-TS-013",
    name: "Japanese Script Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2399,
    line: "Original brush-set characters.",
    note: "An original, hand-drawn brush script inspired by Japanese type traditions — abstract, calligraphic, and entirely our own. Printed tonal on tonal for a subtle, premium finish.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.campaign, IMG.fabricCotton],
    year: 2025,
  },
  {
    id: "manifesto-backprint-tee",
    sku: "LG-TS-014",
    name: "Manifesto Back-Print Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2299,
    line: "A statement, worn quietly.",
    note: "The house manifesto set in a small justified block across the upper back. A wearable piece of editorial — read closely, felt from afar.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.heavyTee],
    year: 2024,
  },
  {
    id: "wordmark-long-sleeve",
    sku: "LG-LS-015",
    name: "Wordmark Long Sleeve",
    category: "Long Sleeves",
    collection: "Typography",
    price: 2699,
    line: "Type down the sleeve.",
    note: "A boxy heavyweight long sleeve carrying a single line of type along the forearm. Minimal front, considered back, ribbed cuffs.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.portrait],
    year: 2025,
  },
  {
    id: "type-study-sweatshirt",
    sku: "LG-SW-016",
    name: "Type Study Sweatshirt",
    category: "Sweatshirts",
    collection: "Typography",
    price: 3499,
    line: "Letterforms as landscape.",
    note: "An oversized French terry crew with an enlarged, cropped letterform printed as an abstract composition. Type treated as architecture, not slogan.",
    material: TERRY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.sweat, IMG.fabricTerry],
    year: 2025,
  },
  {
    id: "emblem-type-tee",
    sku: "LG-TS-017",
    name: "Emblem Type Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2199,
    line: "A small mark, a large presence.",
    note: "A monogram emblem set in a tight lockup at the left chest. The whole graphic lives in a two-inch square — everything else is left clean.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.portrait],
    year: 2024,
  },
  {
    id: "kanji-minimal-tee",
    sku: "LG-TS-018",
    name: "Kanji Minimal Tee",
    category: "T-Shirts",
    collection: "Typography",
    price: 2399,
    line: "Original glyph, tonal print.",
    note: "An original glyph drawn in the spirit of East-Asian type, printed tone-on-tone at the back yoke. Graphic in intent, minimal in execution.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heavyTee, IMG.campaign],
    year: 2025,
  },

  /* ── Luxury Essentials (5) ───────────────────────────────────────────── */
  {
    id: "luxe-heavyweight-tee",
    sku: "LG-TS-019",
    name: "Luxe Heavyweight Tee",
    category: "T-Shirts",
    collection: "Luxury Essentials",
    price: 2999,
    line: "The finest tee the house cuts.",
    note: "Our heaviest, most refined single-jersey — 240 GSM of long-staple combed cotton, garment-dyed and pre-shrunk. A tee that feels closer to knitwear than a basic.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heroFront, IMG.fabricCotton, IMG.portrait, IMG.campaign],
    featured: true,
    year: 2025,
  },
  {
    id: "premium-pima-tee",
    sku: "LG-TS-020",
    name: "Premium Pima Tee",
    category: "T-Shirts",
    collection: "Luxury Essentials",
    price: 2799,
    line: "Pima cotton, silken hand.",
    note: "A luxuriously smooth Pima-blend oversized tee with a subtle sheen and an exceptional drape. Understated luxury for the everyday.",
    material: "230 GSM Pima cotton blend",
    colors: allColors,
    sizes: allSizes,
    images: [IMG.portrait, IMG.tee, IMG.fabricCotton],
    year: 2025,
  },
  {
    id: "garment-dyed-heavy-tee",
    sku: "LG-TS-021",
    name: "Garment-Dyed Heavy Tee",
    category: "T-Shirts",
    collection: "Luxury Essentials",
    price: 2899,
    line: "Colour with real depth.",
    note: "Dyed as a finished garment for a saturated, dimensional colour that fades beautifully with time. Heavyweight, boxy, and quietly rich.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heavyTee, IMG.fabricCotton],
    year: 2024,
  },
  {
    id: "luxe-terry-hoodie",
    sku: "LG-HD-022",
    name: "Luxe French Terry Hoodie",
    category: "Hoodies",
    collection: "Luxury Essentials",
    price: 4999,
    line: "The hoodie, elevated.",
    note: "A heavyweight French terry hoodie with a clean-set double hood, matte tonal drawcords, and an oversized architectural fit. Loungewear reconsidered as luxury.",
    material: "420 GSM heavyweight French terry",
    colors: allColors,
    sizes: allSizes,
    images: [IMG.hoodie, IMG.fabricTerry, IMG.campaign],
    year: 2025,
  },
  {
    id: "elevated-boxy-sweatshirt",
    sku: "LG-SW-023",
    name: "Elevated Boxy Sweatshirt",
    category: "Sweatshirts",
    collection: "Luxury Essentials",
    price: 3799,
    line: "Structure meets softness.",
    note: "A premium loopback terry crew with a structured boxy shoulder and a brushed interior. The kind of piece that reads expensive without a single logo.",
    material: "380 GSM loopback terry",
    colors: allColors,
    sizes: allSizes,
    images: [IMG.sweat, IMG.fabricTerry, IMG.portrait],
    year: 2024,
  },

  /* ── Streetwear Collection (5) ───────────────────────────────────────── */
  {
    id: "street-oversized-tee",
    sku: "LG-TS-024",
    name: "Street Oversized Tee",
    category: "T-Shirts",
    collection: "Streetwear",
    price: 2299,
    line: "Built for concrete and light.",
    note: "An extra-long, extra-wide oversized tee with a heavy drop shoulder. The definitive streetwear silhouette, cut in premium compact cotton.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.campaign, IMG.fabricCotton],
    year: 2025,
  },
  {
    id: "layered-graphic-tee",
    sku: "LG-TS-025",
    name: "Layered Graphic Tee",
    category: "T-Shirts",
    collection: "Streetwear",
    price: 2499,
    line: "Abstract geometry, tonal ink.",
    note: "A restrained abstract geometric composition printed in tonal ink across the front. Streetwear energy with the volume turned down.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.tee, IMG.layered],
    year: 2025,
  },
  {
    id: "urban-boxy-hoodie",
    sku: "LG-HD-026",
    name: "Urban Boxy Hoodie",
    category: "Hoodies",
    collection: "Streetwear",
    price: 4499,
    line: "The street uniform, heavyweight.",
    note: "A boxy, cropped-length hoodie in brushed heavyweight fleece with a deep hood and kangaroo pocket. Made for layering over the oversized tees.",
    material: FLEECE,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.hoodie, IMG.campaign, IMG.fabricTerry],
    year: 2025,
  },
  {
    id: "dropshoulder-street-tee",
    sku: "LG-TS-027",
    name: "Drop-Shoulder Street Tee",
    category: "T-Shirts",
    collection: "Streetwear",
    price: 2199,
    line: "Shoulders low, presence high.",
    note: "An exaggerated drop shoulder and a relaxed, elongated body define this everyday street tee. Compact cotton, bio-washed, reactive-dyed.",
    material: COTTON,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.relaxed, IMG.layered],
    year: 2024,
  },
  {
    id: "concrete-washed-tee",
    sku: "LG-TS-028",
    name: "Concrete Washed Tee",
    category: "T-Shirts",
    collection: "Streetwear",
    price: 2399,
    line: "A washed, weathered finish.",
    note: "A special acid-free wash gives this heavyweight tee a soft, concrete-toned patina from the first wear. Each piece finishes with a subtly unique hand.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.fabricCotton, IMG.campaign],
    year: 2025,
  },

  /* ── Signature Series — original graphic art (2) ─────────────────────── */
  {
    id: "ronin-signature-tee",
    sku: "LG-TS-029",
    name: "Ronin — Signature Tee",
    category: "T-Shirts",
    collection: "Signature Series",
    price: 3199,
    line: "Original ink-brush artwork.",
    note: "An original, hand-illustrated lone-figure composition drawn in a single ink-brush gesture — inspired by the spirit of the wandering ronin, entirely our own creation. A collectible back print, kept intentionally minimal at the front.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.heavyTee, IMG.campaign, IMG.fabricCotton, IMG.portrait],
    year: 2025,
  },
  {
    id: "kage-shadow-tee",
    sku: "LG-TS-030",
    name: "Kage — Shadow Series Tee",
    category: "T-Shirts",
    collection: "Signature Series",
    price: 3299,
    line: "An original shadow study.",
    note: "'Kage' — an original anime-inspired shadow study drawn in-house, printed as a large tonal graphic that reveals itself only in the right light. Not based on any existing character; wholly LUGAIRE.",
    material: HEAVY,
    colors: allColors,
    sizes: allSizes,
    images: [IMG.layered, IMG.heavyTee, IMG.campaign],
    year: 2025,
  },
]

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
}
