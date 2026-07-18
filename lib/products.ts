/**
 * LUGAIRE catalog data layer.
 * A curated house of 30 pieces. Supports an arbitrary number of images per
 * product, up to 5 colorways, and 6 sizes. The homepage surfaces only the six
 * "signature" pieces; the Shop page exposes the full catalog with fabric,
 * colour, size, price, and availability filtering.
 */

export type Category =
  | "Outerwear"
  | "Knitwear"
  | "Tailoring"
  | "Shirting"
  | "Trousers"
  | "Leather"

export type Collection = "Autumn Cycle" | "The Core" | "Atelier"

export type Fabric =
  | "Wool"
  | "Cashmere"
  | "Cotton"
  | "Linen"
  | "Leather"
  | "Technical"

export type Badge = "New" | "Bestseller" | "Limited"

export type ColorOption = {
  name: string
  hex: string
}

export const COLORS: ColorOption[] = [
  { name: "Onyx", hex: "#1a1a1a" },
  { name: "Bone", hex: "#e8e1d3" },
  { name: "Camel", hex: "#b08d57" },
  { name: "Cognac", hex: "#7a4a2b" },
  { name: "Slate", hex: "#4b5058" },
]

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const
export type Size = (typeof SIZES)[number]

export const CATEGORIES: Category[] = [
  "Outerwear",
  "Knitwear",
  "Tailoring",
  "Shirting",
  "Trousers",
  "Leather",
]

export const COLLECTIONS: Collection[] = ["Autumn Cycle", "The Core", "Atelier"]

export const FABRICS: Fabric[] = [
  "Wool",
  "Cashmere",
  "Cotton",
  "Linen",
  "Leather",
  "Technical",
]

export type Availability = "In stock" | "Low stock" | "Sold out"

/** Threshold below which a piece is flagged as low stock. */
export const LOW_STOCK_THRESHOLD = 6

export function availabilityOf(product: Product): Availability {
  if (product.stock <= 0) return "Sold out"
  if (product.stock < LOW_STOCK_THRESHOLD) return "Low stock"
  return "In stock"
}

/** Shared editorial image pool. */
const IMG = {
  overcoat: "/editorial/hero-overcoat.png",
  portrait: "/editorial/hero-portrait.png",
  campaign: "/editorial/campaign-wide.png",
  coat: "/editorial/look-coat.png",
  knit: "/editorial/look-knit.png",
  suit: "/editorial/look-suit.png",
  shirt: "/editorial/look-shirt.png",
  leather: "/editorial/look-leather.png",
  trouser: "/editorial/look-trouser.png",
  fabricWool: "/editorial/fabric-wool.png",
  fabricCashmere: "/editorial/fabric-cashmere.png",
  fabricLeather: "/editorial/fabric-leather.png",
} as const

export type Product = {
  id: string
  sku: string
  name: string
  category: Category
  collection: Collection
  fabric: Fabric
  price: number
  /** Short editorial tagline shown on the magazine card. */
  line: string
  /** Long-form atelier note for quick view. */
  note: string
  material: string
  colors: ColorOption[]
  sizes: Size[]
  /** Units on hand. Drives the availability filter and stock badges. */
  stock: number
  /** Optional premium merchandising badge. */
  badge?: Badge
  /** Arbitrary number of images — first is the cover. */
  images: string[]
  featured?: boolean
  /** Season index used by the interactive timeline. */
  year: number
}

const c = (...names: string[]) => COLORS.filter((x) => names.includes(x.name))
/** Every colourway — used across the non-signature catalogue. */
const all = [...COLORS]
const allSizes = [...SIZES]

export const PRODUCTS: Product[] = [
  {
    id: "the-overcoat-no-4",
    sku: "LG-OC-004",
    name: "The Overcoat, No. 4",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 1480,
    line: "A monolith of double-faced wool.",
    note: "Cut from a single length of double-faced Italian wool, the No. 4 falls in an unbroken column from shoulder to hem. No lining, no compromise — only the quiet authority of weight and drape.",
    material: "Double-faced virgin wool",
    colors: c("Onyx", "Camel", "Slate"),
    sizes: allSizes,
    stock: 8,
    badge: "Bestseller",
    images: [IMG.overcoat, IMG.coat, IMG.fabricWool, IMG.campaign],
    featured: true,
    year: 2025,
  },
  {
    id: "atelier-cashmere-rollneck",
    sku: "LG-KN-011",
    name: "Atelier Cashmere Roll-Neck",
    category: "Knitwear",
    collection: "The Core",
    fabric: "Cashmere",
    price: 620,
    line: "Grade-A Mongolian cashmere, fully-fashioned.",
    note: "Knitted in a single piece to eliminate seams, then washed in spring water for a hand that softens with every wear. A permanent fixture of the house.",
    material: "12-gauge Mongolian cashmere",
    colors: c("Bone", "Onyx", "Camel"),
    sizes: allSizes,
    stock: 22,
    badge: "Bestseller",
    images: [IMG.portrait, IMG.knit, IMG.fabricCashmere],
    featured: true,
    year: 2025,
  },
  {
    id: "the-belted-trench",
    sku: "LG-OC-021",
    name: "The Belted Trench",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Cotton",
    price: 1690,
    line: "Weatherproofed cotton gabardine.",
    note: "A study in restraint — the storm flap, the D-ring belt, the ten-button storm closure, all rendered in a water-repellent gabardine milled in the north of England.",
    material: "Cotton gabardine",
    colors: c("Camel", "Bone", "Slate"),
    sizes: allSizes,
    stock: 5,
    badge: "New",
    images: [IMG.coat, IMG.campaign, IMG.fabricWool],
    featured: true,
    year: 2025,
  },
  {
    id: "double-breasted-suit",
    sku: "LG-TL-007",
    name: "The Double-Breasted Suit",
    category: "Tailoring",
    collection: "Atelier",
    fabric: "Wool",
    price: 2280,
    line: "Half-canvassed, roped shoulder.",
    note: "Constructed over forty hours by a single tailor. A 6x2 button stance, a softly roped shoulder, and a full working cuff. Trousers cut with a single reverse pleat.",
    material: "Super 120s wool",
    colors: c("Onyx", "Slate", "Camel"),
    sizes: allSizes,
    stock: 3,
    badge: "Limited",
    images: [IMG.suit, IMG.portrait, IMG.fabricWool, IMG.campaign],
    featured: true,
    year: 2025,
  },
  {
    id: "cognac-leather-blouson",
    sku: "LG-LR-015",
    name: "Cognac Leather Blouson",
    category: "Leather",
    collection: "Autumn Cycle",
    fabric: "Leather",
    price: 1950,
    line: "Vegetable-tanned lambskin.",
    note: "Aniline-dyed lambskin that develops a personal patina over years, not seasons. Ribbed hem and cuffs, a single interior pocket, nothing more.",
    material: "Vegetable-tanned lambskin",
    colors: c("Cognac", "Onyx"),
    sizes: allSizes,
    stock: 6,
    badge: "New",
    images: [IMG.leather, IMG.fabricLeather, IMG.portrait],
    featured: true,
    year: 2025,
  },
  {
    id: "pleated-wide-trouser",
    sku: "LG-TR-030",
    name: "Pleated Wide Trouser",
    category: "Trousers",
    collection: "The Core",
    fabric: "Wool",
    price: 480,
    line: "A generous, architectural leg.",
    note: "Double forward pleats break over the shoe in a clean, uninterrupted line. Cut high on the waist and finished with a hand-set waistband curtain.",
    material: "Tropical wool",
    colors: c("Onyx", "Bone", "Slate", "Camel"),
    sizes: allSizes,
    stock: 18,
    badge: "Bestseller",
    images: [IMG.trouser, IMG.fabricWool, IMG.campaign],
    featured: true,
    year: 2025,
  },
  // ── Remainder of the catalog ─────────────────────────────────────────────
  {
    id: "raglan-topcoat",
    sku: "LG-OC-018",
    name: "Raglan Topcoat",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 1580,
    line: "A softer shoulder, an easier line.",
    note: "The raglan sleeve dissolves the shoulder seam for a relaxed, enveloping silhouette. Milled melton wool, bluesign-certified.",
    material: "Melton wool",
    colors: all,
    sizes: allSizes,
    stock: 11,
    badge: "New",
    images: [IMG.coat, IMG.overcoat, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "fisherman-rib-knit",
    sku: "LG-KN-024",
    name: "Fisherman Rib Knit",
    category: "Knitwear",
    collection: "The Core",
    fabric: "Wool",
    price: 540,
    line: "Chunky, honest, and warm.",
    note: "A dense fisherman's rib in undyed lambswool, the way the coast intended. Saddle shoulders and a high funnel neck.",
    material: "British lambswool",
    colors: all,
    sizes: allSizes,
    stock: 14,
    images: [IMG.knit, IMG.fabricCashmere, IMG.portrait],
    year: 2024,
  },
  {
    id: "linen-camp-shirt",
    sku: "LG-SH-002",
    name: "Linen Camp Shirt",
    category: "Shirting",
    collection: "The Core",
    fabric: "Linen",
    price: 320,
    line: "Airy, unlined, effortless.",
    note: "A relaxed camp collar cut from garment-washed European linen. It creases — beautifully, intentionally.",
    material: "European linen",
    colors: all,
    sizes: allSizes,
    stock: 27,
    badge: "Bestseller",
    images: [IMG.shirt, IMG.portrait],
    year: 2024,
  },
  {
    id: "single-breasted-blazer",
    sku: "LG-TL-013",
    name: "Single-Breasted Blazer",
    category: "Tailoring",
    collection: "Atelier",
    fabric: "Wool",
    price: 1680,
    line: "The unstructured everyday jacket.",
    note: "A deconstructed, half-lined blazer with patch pockets and a natural shoulder. Tailored to wear like a cardigan.",
    material: "Wool-hopsack",
    colors: all,
    sizes: allSizes,
    stock: 9,
    images: [IMG.suit, IMG.fabricWool, IMG.campaign],
    year: 2025,
  },
  {
    id: "shearling-flight-jacket",
    sku: "LG-LR-009",
    name: "Shearling Flight Jacket",
    category: "Leather",
    collection: "Autumn Cycle",
    fabric: "Leather",
    price: 3200,
    line: "Merino shearling, whole hide.",
    note: "Cut from a single Spanish merino hide, the shearling turned in at collar and cuff. Substantial, generational outerwear.",
    material: "Merino shearling",
    colors: c("Cognac", "Camel", "Onyx"),
    sizes: allSizes,
    stock: 2,
    badge: "Limited",
    images: [IMG.leather, IMG.fabricLeather, IMG.campaign],
    year: 2025,
  },
  {
    id: "carrot-fit-trouser",
    sku: "LG-TR-016",
    name: "Carrot-Fit Trouser",
    category: "Trousers",
    collection: "The Core",
    fabric: "Cotton",
    price: 420,
    line: "Roomy at the hip, tapered clean.",
    note: "A single reverse pleat gives room through the seat before tapering to a cropped, tailored ankle.",
    material: "Cotton twill",
    colors: all,
    sizes: allSizes,
    stock: 21,
    images: [IMG.trouser, IMG.fabricWool],
    year: 2024,
  },
  {
    id: "quilted-liner-jacket",
    sku: "LG-OC-026",
    name: "Quilted Liner Jacket",
    category: "Outerwear",
    collection: "The Core",
    fabric: "Technical",
    price: 690,
    line: "The layer beneath the layer.",
    note: "A diamond-quilted liner that stands alone or zips beneath the topcoat. Recycled down fill, matte shell.",
    material: "Recycled down / nylon",
    colors: all,
    sizes: allSizes,
    stock: 16,
    badge: "New",
    images: [IMG.coat, IMG.fabricWool, IMG.portrait],
    year: 2024,
  },
  {
    id: "cable-crew-knit",
    sku: "LG-KN-031",
    name: "Aran Cable Crew",
    category: "Knitwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 580,
    line: "Hand-framed cable stitch.",
    note: "Traditional Aran cabling worked in a heavy undyed wool, framed by hand in a small Donegal mill.",
    material: "Donegal wool",
    colors: c("Bone", "Camel", "Slate"),
    sizes: allSizes,
    stock: 4,
    badge: "Limited",
    images: [IMG.knit, IMG.fabricCashmere],
    year: 2025,
  },
  {
    id: "poplin-dress-shirt",
    sku: "LG-SH-005",
    name: "Poplin Dress Shirt",
    category: "Shirting",
    collection: "The Core",
    fabric: "Cotton",
    price: 280,
    line: "Two-ply Egyptian poplin.",
    note: "A cutaway collar and mother-of-pearl buttons on a crisp two-ply poplin. The foundation of the wardrobe.",
    material: "Egyptian cotton poplin",
    colors: all,
    sizes: allSizes,
    stock: 34,
    badge: "Bestseller",
    images: [IMG.shirt, IMG.portrait],
    year: 2024,
  },
  {
    id: "three-piece-suit",
    sku: "LG-TL-022",
    name: "Three-Piece Flannel Suit",
    category: "Tailoring",
    collection: "Atelier",
    fabric: "Wool",
    price: 2680,
    line: "Winter flannel, waistcoat included.",
    note: "A brushed flannel three-piece with a six-button waistcoat. Cut for the depth of winter and the weight of occasion.",
    material: "Brushed wool flannel",
    colors: c("Slate", "Onyx", "Camel"),
    sizes: allSizes,
    stock: 0,
    images: [IMG.suit, IMG.fabricWool, IMG.campaign],
    year: 2025,
  },
  {
    id: "biker-jacket",
    sku: "LG-LR-028",
    name: "Minimal Biker Jacket",
    category: "Leather",
    collection: "The Core",
    fabric: "Leather",
    price: 1780,
    line: "The asymmetry, quieted.",
    note: "The biker archetype stripped of hardware — a single clean zip, matte calfskin, and a close, tailored fit.",
    material: "Matte calfskin",
    colors: c("Onyx", "Cognac", "Slate"),
    sizes: allSizes,
    stock: 7,
    images: [IMG.leather, IMG.fabricLeather, IMG.portrait],
    year: 2024,
  },
  {
    id: "drawstring-trouser",
    sku: "LG-TR-034",
    name: "Drawstring Trouser",
    category: "Trousers",
    collection: "The Core",
    fabric: "Wool",
    price: 360,
    line: "Tailored ease, elastic waist.",
    note: "The comfort of a drawstring rendered in a crisp, pressed wool. Weekend and boardroom in one line.",
    material: "Wool-blend twill",
    colors: all,
    sizes: allSizes,
    stock: 25,
    images: [IMG.trouser, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "chore-overshirt",
    sku: "LG-SH-019",
    name: "Chore Overshirt",
    category: "Shirting",
    collection: "Autumn Cycle",
    fabric: "Cotton",
    price: 440,
    line: "A shirt with a coat's ambition.",
    note: "Triple-needle construction, three patch pockets, and a heavyweight moleskin that softens into a second skin.",
    material: "Cotton moleskin",
    colors: all,
    sizes: allSizes,
    stock: 13,
    badge: "New",
    images: [IMG.shirt, IMG.coat, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "merino-turtleneck",
    sku: "LG-KN-036",
    name: "Fine Merino Turtleneck",
    category: "Knitwear",
    collection: "The Core",
    fabric: "Wool",
    price: 380,
    line: "A second skin in 18.5 micron.",
    note: "An ultra-fine merino turtleneck engineered to sit beneath tailoring without bulk. Temperature-regulating, endlessly layered.",
    material: "Extra-fine merino",
    colors: all,
    sizes: allSizes,
    stock: 29,
    badge: "Bestseller",
    images: [IMG.portrait, IMG.knit, IMG.fabricCashmere],
    year: 2024,
  },
  {
    id: "field-parka",
    sku: "LG-OC-038",
    name: "Field Parka",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Cotton",
    price: 1240,
    line: "Utility, tailored down.",
    note: "A refined take on the military parka — waxed cotton shell, bellows pockets, and a detachable drawcord hood.",
    material: "Waxed cotton",
    colors: all,
    sizes: allSizes,
    stock: 10,
    badge: "New",
    images: [IMG.coat, IMG.campaign, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "oxford-shirt",
    sku: "LG-SH-041",
    name: "Button-Down Oxford",
    category: "Shirting",
    collection: "The Core",
    fabric: "Cotton",
    price: 240,
    line: "The everyday, perfected.",
    note: "A soft-roll button-down collar on a washed oxford cloth. Unlined collar, box pleat, split back yoke.",
    material: "Washed oxford cotton",
    colors: all,
    sizes: allSizes,
    stock: 41,
    badge: "Bestseller",
    images: [IMG.shirt, IMG.portrait],
    year: 2024,
  },
  {
    id: "peacoat",
    sku: "LG-OC-043",
    name: "Melton Peacoat",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 1320,
    line: "Naval heritage, house proportion.",
    note: "A double-breasted peacoat in 32oz melton, anchor buttons swapped for smoked horn. Built to break the wind.",
    material: "32oz melton wool",
    colors: c("Onyx", "Slate", "Camel"),
    sizes: allSizes,
    stock: 5,
    images: [IMG.coat, IMG.overcoat, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "suede-bomber",
    sku: "LG-LR-045",
    name: "Suede Bomber",
    category: "Leather",
    collection: "The Core",
    fabric: "Leather",
    price: 1650,
    line: "Goat suede, feather-light.",
    note: "A blouson in buttery goat suede with a ribbed collar. The most relaxed thing in the leather wardrobe.",
    material: "Goat suede",
    colors: c("Camel", "Cognac", "Slate"),
    sizes: allSizes,
    stock: 8,
    images: [IMG.leather, IMG.fabricLeather, IMG.portrait],
    year: 2024,
  },
  {
    id: "five-pocket-trouser",
    sku: "LG-TR-047",
    name: "Wool Five-Pocket",
    category: "Trousers",
    collection: "The Core",
    fabric: "Wool",
    price: 460,
    line: "The five-pocket, elevated.",
    note: "The familiar five-pocket cut translated into a stretch wool for the comfort of denim with the polish of tailoring.",
    material: "Stretch wool",
    colors: all,
    sizes: allSizes,
    stock: 19,
    images: [IMG.trouser, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "cardigan-coat",
    sku: "LG-KN-049",
    name: "Cardigan Coat",
    category: "Knitwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 780,
    line: "A knit with outerwear intent.",
    note: "A shawl-collar cardigan knitted at coat length and coat weight. Leather-shanked buttons, deep patch pockets.",
    material: "Lambswool-alpaca",
    colors: c("Camel", "Slate", "Onyx"),
    sizes: allSizes,
    stock: 4,
    badge: "Limited",
    images: [IMG.knit, IMG.coat, IMG.fabricCashmere],
    year: 2025,
  },
  {
    id: "tuxedo-jacket",
    sku: "LG-TL-051",
    name: "Shawl Tuxedo Jacket",
    category: "Tailoring",
    collection: "Atelier",
    fabric: "Wool",
    price: 2480,
    line: "Grosgrain shawl, midnight blue.",
    note: "A midnight-blue dinner jacket — darker than black under light — with a silk grosgrain shawl lapel and a single covered button.",
    material: "Wool-mohair barathea",
    colors: c("Onyx", "Slate"),
    sizes: allSizes,
    stock: 3,
    badge: "Limited",
    images: [IMG.suit, IMG.portrait, IMG.campaign],
    year: 2025,
  },
  {
    id: "flannel-overshirt",
    sku: "LG-SH-053",
    name: "Brushed Flannel Overshirt",
    category: "Shirting",
    collection: "Autumn Cycle",
    fabric: "Cotton",
    price: 360,
    line: "Weekend flannel, considered.",
    note: "A double-brushed flannel overshirt in a tonal check, cut long enough to layer and soft enough to sleep in.",
    material: "Brushed cotton flannel",
    colors: c("Camel", "Slate", "Cognac"),
    sizes: allSizes,
    stock: 17,
    images: [IMG.shirt, IMG.knit, IMG.fabricWool],
    year: 2024,
  },
  {
    id: "duffle-coat",
    sku: "LG-OC-055",
    name: "Toggle Duffle Coat",
    category: "Outerwear",
    collection: "Autumn Cycle",
    fabric: "Wool",
    price: 1420,
    line: "Horn toggles, jute rope.",
    note: "The duffle in a dense boiled wool, with buffalo-horn toggles and a generous hood that actually fits over a scarf.",
    material: "Boiled wool",
    colors: c("Camel", "Onyx", "Slate"),
    sizes: allSizes,
    stock: 6,
    images: [IMG.coat, IMG.campaign, IMG.fabricWool],
    year: 2025,
  },
  {
    id: "cashmere-hoodie",
    sku: "LG-KN-057",
    name: "Cashmere Hoodie",
    category: "Knitwear",
    collection: "The Core",
    fabric: "Cashmere",
    price: 720,
    line: "The hoodie, in cashmere.",
    note: "Loungewear reconsidered — a full-fashioned hoodie in mid-weight cashmere. Quiet luxury for the hours off-duty.",
    material: "Mid-weight cashmere",
    colors: all,
    sizes: allSizes,
    stock: 12,
    badge: "New",
    images: [IMG.knit, IMG.portrait, IMG.fabricCashmere],
    year: 2024,
  },
]

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
}
