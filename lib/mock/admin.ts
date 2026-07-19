/**
 * LUGAIRE — Admin console mock data.
 * Realistic sample records powering the admin dashboard, catalog, inventory,
 * orders, customers, marketing, and analytics screens.
 */

import { PRODUCTS } from "@/lib/products"

export type AdminOrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded"

export type AdminProduct = {
  id: string
  name: string
  sku: string
  category: string
  collection: string
  price: number
  stock: number
  status: "Active" | "Draft" | "Archived"
  image: string
  sales: number
}

export const ADMIN_PRODUCTS: AdminProduct[] = PRODUCTS.map((prod, i) => ({
  id: prod.id,
  name: prod.name,
  sku: prod.sku,
  category: prod.category,
  collection: prod.collection,
  price: prod.price,
  stock: [42, 8, 120, 4, 64, 0, 31, 96, 17, 53][i % 10],
  status: i % 11 === 4 ? "Draft" : i % 13 === 7 ? "Archived" : "Active",
  image: prod.images[0],
  sales: [312, 148, 620, 84, 233, 512, 61, 402, 190, 77][i % 10],
}))

export function getAdminProduct(id: string): AdminProduct | undefined {
  return ADMIN_PRODUCTS.find((p) => p.id === id)
}

export type Category = {
  id: string
  name: string
  slug: string
  products: number
  description: string
}

export const CATEGORIES: Category[] = [
  { id: "c1", name: "T-Shirts", slug: "t-shirts", products: 22, description: "Oversized, heavyweight combed-cotton tees." },
  { id: "c2", name: "Long Sleeves", slug: "long-sleeves", products: 2, description: "Boxy, ribbed-cuff heavyweight long sleeves." },
  { id: "c3", name: "Sweatshirts", slug: "sweatshirts", products: 3, description: "French terry crewnecks, brushed and boxy." },
  { id: "c4", name: "Hoodies", slug: "hoodies", products: 3, description: "Heavyweight brushed-fleece oversized hoodies." },
]

export type Collection = {
  id: string
  name: string
  season: string
  pieces: number
  status: "Live" | "Scheduled" | "Archived"
  image: string
}

export const COLLECTIONS: Collection[] = [
  { id: "col1", name: "Minimal", season: "Permanent", pieces: 10, status: "Live", image: "/editorial/campaign-wide.png" },
  { id: "col2", name: "Typography", season: "Permanent", pieces: 8, status: "Live", image: "/editorial/look-knit.png" },
  { id: "col3", name: "Luxury Essentials", season: "Permanent", pieces: 5, status: "Live", image: "/editorial/look-suit.png" },
  { id: "col4", name: "Streetwear", season: "SS25", pieces: 5, status: "Live", image: "/editorial/look-coat.png" },
  { id: "col5", name: "Signature Series", season: "Drop 01", pieces: 2, status: "Scheduled", image: "/editorial/look-leather.png" },
]

export type AdminOrder = {
  id: string
  number: string
  customer: string
  email: string
  date: string
  items: number
  total: number
  status: AdminOrderStatus
  payment: "Paid" | "Pending" | "Refunded"
  fulfillment: "Unfulfilled" | "Fulfilled" | "Partial"
}

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: "o1", number: "LG-10482", customer: "Arjun Mehta", email: "arjun.m@example.com", date: "May 28, 2025", items: 2, total: 4198, status: "Shipped", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o2", number: "LG-10481", customer: "Ananya Rao", email: "ananya.r@example.com", date: "May 28, 2025", items: 1, total: 1999, status: "Processing", payment: "Paid", fulfillment: "Unfulfilled" },
  { id: "o3", number: "LG-10480", customer: "Kabir Sharma", email: "kabir.s@example.com", date: "May 27, 2025", items: 3, total: 6597, status: "Pending", payment: "Pending", fulfillment: "Unfulfilled" },
  { id: "o4", number: "LG-10479", customer: "Mei Lin", email: "mei.lin@example.com", date: "May 27, 2025", items: 1, total: 2999, status: "Delivered", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o5", number: "LG-10478", customer: "Rafael Costa", email: "rafael.c@example.com", date: "May 26, 2025", items: 2, total: 4298, status: "Delivered", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o6", number: "LG-10477", customer: "Priya Nair", email: "priya.n@example.com", date: "May 26, 2025", items: 1, total: 4999, status: "Refunded", payment: "Refunded", fulfillment: "Fulfilled" },
  { id: "o7", number: "LG-10476", customer: "Thomas Wright", email: "thomas.w@example.com", date: "May 25, 2025", items: 4, total: 8996, status: "Shipped", payment: "Paid", fulfillment: "Partial" },
  { id: "o8", number: "LG-10475", customer: "Sofia Rossi", email: "sofia.r@example.com", date: "May 25, 2025", items: 1, total: 1799, status: "Cancelled", payment: "Refunded", fulfillment: "Unfulfilled" },
]

export function getAdminOrder(id: string): AdminOrder | undefined {
  return ADMIN_ORDERS.find((o) => o.id === id || o.number.toLowerCase() === id.toLowerCase())
}

export type Customer = {
  id: string
  name: string
  email: string
  location: string
  orders: number
  spent: number
  since: string
  tier: "Guest" | "Member" | "Inner Circle"
  avatar: string
}

export const CUSTOMERS: Customer[] = [
  { id: "cu1", name: "Arjun Mehta", email: "arjun.m@example.com", location: "Bengaluru, IN", orders: 12, spent: 38420, since: "Mar 2023", tier: "Inner Circle", avatar: "/editorial/hero-portrait.png" },
  { id: "cu2", name: "Ananya Rao", email: "ananya.r@example.com", location: "Delhi, IN", orders: 7, spent: 16240, since: "Jul 2023", tier: "Member", avatar: "/editorial/look-knit.png" },
  { id: "cu3", name: "Kabir Sharma", email: "kabir.s@example.com", location: "Mumbai, IN", orders: 21, spent: 64110, since: "Jan 2022", tier: "Inner Circle", avatar: "/editorial/look-suit.png" },
  { id: "cu4", name: "Mei Lin", email: "mei.lin@example.com", location: "Singapore, SG", orders: 4, spent: 9980, since: "Nov 2024", tier: "Member", avatar: "/editorial/look-shirt.png" },
  { id: "cu5", name: "Rafael Costa", email: "rafael.c@example.com", location: "Lisbon, PT", orders: 2, spent: 3900, since: "Feb 2025", tier: "Guest", avatar: "/editorial/look-leather.png" },
  { id: "cu6", name: "Priya Nair", email: "priya.n@example.com", location: "Chennai, IN", orders: 9, spent: 22750, since: "May 2023", tier: "Inner Circle", avatar: "/editorial/look-trouser.png" },
]

export function getCustomer(id: string): Customer | undefined {
  return CUSTOMERS.find((c) => c.id === id)
}

export type Coupon = {
  id: string
  code: string
  type: "Percentage" | "Fixed" | "Free shipping"
  value: number
  used: number
  limit: number
  status: "Active" | "Scheduled" | "Expired"
  expires: string
}

export const COUPONS: Coupon[] = [
  { id: "cp1", code: "MINIMAL15", type: "Percentage", value: 15, used: 214, limit: 500, status: "Active", expires: "Jun 30, 2025" },
  { id: "cp2", code: "WELCOME500", type: "Fixed", value: 500, used: 1032, limit: 2000, status: "Active", expires: "Dec 31, 2025" },
  { id: "cp3", code: "SHIPFREE", type: "Free shipping", value: 0, used: 640, limit: 1000, status: "Active", expires: "Jul 15, 2025" },
  { id: "cp4", code: "DROP25", type: "Percentage", value: 25, used: 0, limit: 300, status: "Scheduled", expires: "Nov 1, 2025" },
  { id: "cp5", code: "FIRSTTEE10", type: "Percentage", value: 10, used: 480, limit: 480, status: "Expired", expires: "Apr 1, 2025" },
]

export type Review = {
  id: string
  product: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  status: "Pending" | "Approved" | "Rejected"
  image: string
}

export const REVIEWS: Review[] = [
  { id: "rv1", product: "Essential Oversized Tee", author: "Kabir S.", rating: 5, title: "The weight is unreal", body: "The 240 GSM fabric and oversized fit are unlike any tee I own. Worth every rupee.", date: "May 24, 2025", status: "Pending", image: "/editorial/look-coat.png" },
  { id: "rv2", product: "Essential Hoodie", author: "Mei L.", rating: 4, title: "Beautifully heavy", body: "Softens more with each wash. Runs true for the oversized cut.", date: "May 22, 2025", status: "Pending", image: "/editorial/look-knit.png" },
  { id: "rv3", product: "Luxe Heavyweight Tee", author: "Rafael C.", rating: 5, title: "Premium blank done right", body: "The garment dye and boxy fit are exactly as described. Flawless.", date: "May 20, 2025", status: "Approved", image: "/editorial/look-suit.png" },
  { id: "rv4", product: "Urban Boxy Hoodie", author: "Sofia R.", rating: 2, title: "Sizing was off", body: "Lovely fleece but the cropped fit ran short for me.", date: "May 18, 2025", status: "Rejected", image: "/editorial/look-leather.png" },
  { id: "rv5", product: "Serif Wordmark Tee", author: "Thomas W.", rating: 5, title: "Perfect graphic", body: "The tonal back print is subtle and premium. Ordered two more.", date: "May 16, 2025", status: "Approved", image: "/editorial/look-trouser.png" },
]

export type MediaAsset = {
  id: string
  name: string
  src: string
  type: "Image"
  size: string
  dimensions: string
  uploaded: string
}

export const MEDIA: MediaAsset[] = [
  { id: "m1", name: "hero-overcoat.png", src: "/editorial/hero-overcoat.png", type: "Image", size: "2.4 MB", dimensions: "2400×3000", uploaded: "May 2025" },
  { id: "m2", name: "hero-portrait.png", src: "/editorial/hero-portrait.png", type: "Image", size: "1.9 MB", dimensions: "2000×2600", uploaded: "May 2025" },
  { id: "m3", name: "campaign-wide.png", src: "/editorial/campaign-wide.png", type: "Image", size: "3.1 MB", dimensions: "3200×1800", uploaded: "Apr 2025" },
  { id: "m4", name: "look-coat.png", src: "/editorial/look-coat.png", type: "Image", size: "1.7 MB", dimensions: "1800×2400", uploaded: "Apr 2025" },
  { id: "m5", name: "look-knit.png", src: "/editorial/look-knit.png", type: "Image", size: "1.6 MB", dimensions: "1800×2400", uploaded: "Apr 2025" },
  { id: "m6", name: "look-suit.png", src: "/editorial/look-suit.png", type: "Image", size: "1.8 MB", dimensions: "1800×2400", uploaded: "Apr 2025" },
  { id: "m7", name: "look-shirt.png", src: "/editorial/look-shirt.png", type: "Image", size: "1.4 MB", dimensions: "1800×2400", uploaded: "Mar 2025" },
  { id: "m8", name: "look-leather.png", src: "/editorial/look-leather.png", type: "Image", size: "1.9 MB", dimensions: "1800×2400", uploaded: "Mar 2025" },
  { id: "m9", name: "fabric-wool.png", src: "/editorial/fabric-wool.png", type: "Image", size: "1.2 MB", dimensions: "1600×1600", uploaded: "Mar 2025" },
  { id: "m10", name: "fabric-cashmere.png", src: "/editorial/fabric-cashmere.png", type: "Image", size: "1.1 MB", dimensions: "1600×1600", uploaded: "Mar 2025" },
  { id: "m11", name: "fabric-leather.png", src: "/editorial/fabric-leather.png", type: "Image", size: "1.3 MB", dimensions: "1600×1600", uploaded: "Feb 2025" },
  { id: "m12", name: "look-trouser.png", src: "/editorial/look-trouser.png", type: "Image", size: "1.5 MB", dimensions: "1800×2400", uploaded: "Feb 2025" },
]

export type Banner = {
  id: string
  title: string
  subtitle: string
  image: string
  placement: "Homepage Hero" | "Shop Header" | "Promo Strip"
  status: "Live" | "Scheduled" | "Draft"
  starts: string
  ends: string
}

export const BANNERS: Banner[] = [
  { id: "b1", title: "The Minimal Collection", subtitle: "Heavyweight oversized tees, in one quiet room.", image: "/editorial/campaign-wide.png", placement: "Homepage Hero", status: "Live", starts: "May 1, 2025", ends: "Aug 31, 2025" },
  { id: "b2", title: "Luxury Essentials, restocked", subtitle: "The heaviest tees we cut, back in every size.", image: "/editorial/look-knit.png", placement: "Shop Header", status: "Live", starts: "May 10, 2025", ends: "Jun 30, 2025" },
  { id: "b3", title: "Complimentary shipping", subtitle: "On all orders above ₹2,999.", image: "/editorial/look-suit.png", placement: "Promo Strip", status: "Scheduled", starts: "Jun 1, 2025", ends: "Jun 15, 2025" },
  { id: "b4", title: "Signature Series preview", subtitle: "An early look for the Inner Circle.", image: "/editorial/look-coat.png", placement: "Homepage Hero", status: "Draft", starts: "Nov 1, 2025", ends: "Dec 31, 2025" },
]

/* ── Dashboard + analytics figures ──────────────────────────────────────── */

export const ADMIN_STATS = {
  revenue: 3486200,
  revenueChange: 12.4,
  orders: 1284,
  ordersChange: 8.1,
  customers: 3921,
  customersChange: 5.6,
  aov: 2716,
  aovChange: -2.3,
}

export const REVENUE_SERIES = [
  { month: "Jan", revenue: 259000, orders: 96 },
  { month: "Feb", revenue: 291000, orders: 108 },
  { month: "Mar", revenue: 380000, orders: 141 },
  { month: "Apr", revenue: 348000, orders: 129 },
  { month: "May", revenue: 453000, orders: 168 },
  { month: "Jun", revenue: 410000, orders: 152 },
  { month: "Jul", revenue: 483000, orders: 179 },
  { month: "Aug", revenue: 434000, orders: 161 },
  { month: "Sep", revenue: 515000, orders: 191 },
  { month: "Oct", revenue: 550000, orders: 204 },
  { month: "Nov", revenue: 626000, orders: 232 },
  { month: "Dec", revenue: 723000, orders: 268 },
]

export const CATEGORY_SALES = [
  { name: "T-Shirts", value: 2384000 },
  { name: "Hoodies", value: 618000 },
  { name: "Sweatshirts", value: 342000 },
  { name: "Long Sleeves", value: 142000 },
]

export const TOP_PRODUCTS = ADMIN_PRODUCTS.slice()
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5)

export const CUSTOMER_GROWTH = [
  { month: "Jan", new: 210, returning: 480 },
  { month: "Feb", new: 245, returning: 512 },
  { month: "Mar", new: 320, returning: 560 },
  { month: "Apr", new: 288, returning: 598 },
  { month: "May", new: 356, returning: 641 },
  { month: "Jun", new: 402, returning: 690 },
]

export type AdminRole = "Owner" | "Manager" | "Editor" | "Support"

export type AdminUser = {
  id: string
  name: string
  email: string
  role: AdminRole
  status: "Active" | "Invited" | "Suspended"
  lastActive: string
  avatar: string
}

export const ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Eleanor Voss", email: "eleanor@lugaire.com", role: "Owner", status: "Active", lastActive: "2 min ago", avatar: "/editorial/hero-portrait.png" },
  { id: "u2", name: "Marcus Chen", email: "marcus@lugaire.com", role: "Manager", status: "Active", lastActive: "1 hr ago", avatar: "/editorial/look-suit.png" },
  { id: "u3", name: "Isabelle Fournier", email: "isabelle@lugaire.com", role: "Editor", status: "Active", lastActive: "Yesterday", avatar: "/editorial/look-knit.png" },
  { id: "u4", name: "Dev Patel", email: "dev@lugaire.com", role: "Support", status: "Invited", lastActive: "—", avatar: "/editorial/look-shirt.png" },
  { id: "u5", name: "Greta Lindqvist", email: "greta@lugaire.com", role: "Editor", status: "Suspended", lastActive: "3 weeks ago", avatar: "/editorial/look-trouser.png" },
]

export const ADMIN_ROLES: { role: AdminRole; description: string; permissions: string[] }[] = [
  { role: "Owner", description: "Full access to every setting, including billing and users.", permissions: ["All catalog", "All orders", "Settings", "Users & billing"] },
  { role: "Manager", description: "Manage catalog, orders, and marketing. No billing access.", permissions: ["All catalog", "All orders", "Marketing"] },
  { role: "Editor", description: "Create and edit products, collections, and content.", permissions: ["Catalog", "Media", "Reviews"] },
  { role: "Support", description: "View orders and assist customers. Read-only catalog.", permissions: ["View orders", "View customers"] },
]

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}
