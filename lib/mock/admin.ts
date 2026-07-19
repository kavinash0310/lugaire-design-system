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
  { id: "c1", name: "Outerwear", slug: "outerwear", products: 8, description: "Coats, trenches, parkas and topcoats." },
  { id: "c2", name: "Knitwear", slug: "knitwear", products: 6, description: "Cashmere, merino, and lambswool." },
  { id: "c3", name: "Tailoring", slug: "tailoring", products: 4, description: "Suits, blazers, and formal jackets." },
  { id: "c4", name: "Shirting", slug: "shirting", products: 6, description: "Dress shirts, oxfords, and overshirts." },
  { id: "c5", name: "Trousers", slug: "trousers", products: 4, description: "Pleated, tapered, and five-pocket cuts." },
  { id: "c6", name: "Leather", slug: "leather", products: 4, description: "Blousons, bikers, and shearling." },
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
  { id: "col1", name: "Autumn Cycle", season: "AW25", pieces: 14, status: "Live", image: "/editorial/campaign-wide.png" },
  { id: "col2", name: "The Core", season: "Permanent", pieces: 12, status: "Live", image: "/editorial/look-knit.png" },
  { id: "col3", name: "Atelier", season: "AW25", pieces: 4, status: "Live", image: "/editorial/look-suit.png" },
  { id: "col4", name: "Winter Cycle", season: "AW25", pieces: 9, status: "Scheduled", image: "/editorial/look-coat.png" },
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
  { id: "o1", number: "LG-10482", customer: "Julian Vasquez", email: "julian.v@example.com", date: "May 28, 2025", items: 2, total: 2009, status: "Shipped", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o2", number: "LG-10481", customer: "Amara Okonkwo", email: "amara.o@example.com", date: "May 28, 2025", items: 1, total: 620, status: "Processing", payment: "Paid", fulfillment: "Unfulfilled" },
  { id: "o3", number: "LG-10480", customer: "Henrik Sørensen", email: "henrik.s@example.com", date: "May 27, 2025", items: 3, total: 3410, status: "Pending", payment: "Pending", fulfillment: "Unfulfilled" },
  { id: "o4", number: "LG-10479", customer: "Mei Lin", email: "mei.lin@example.com", date: "May 27, 2025", items: 1, total: 1480, status: "Delivered", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o5", number: "LG-10478", customer: "Rafael Costa", email: "rafael.c@example.com", date: "May 26, 2025", items: 2, total: 900, status: "Delivered", payment: "Paid", fulfillment: "Fulfilled" },
  { id: "o6", number: "LG-10477", customer: "Priya Nair", email: "priya.n@example.com", date: "May 26, 2025", items: 1, total: 2280, status: "Refunded", payment: "Refunded", fulfillment: "Fulfilled" },
  { id: "o7", number: "LG-10476", customer: "Thomas Wright", email: "thomas.w@example.com", date: "May 25, 2025", items: 4, total: 4120, status: "Shipped", payment: "Paid", fulfillment: "Partial" },
  { id: "o8", number: "LG-10475", customer: "Sofia Rossi", email: "sofia.r@example.com", date: "May 25, 2025", items: 1, total: 380, status: "Cancelled", payment: "Refunded", fulfillment: "Unfulfilled" },
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
  tier: "Guest" | "Member" | "Atelier Circle"
  avatar: string
}

export const CUSTOMERS: Customer[] = [
  { id: "cu1", name: "Julian Vasquez", email: "julian.v@example.com", location: "San Francisco, US", orders: 12, spent: 18420, since: "Mar 2023", tier: "Atelier Circle", avatar: "/editorial/hero-portrait.png" },
  { id: "cu2", name: "Amara Okonkwo", email: "amara.o@example.com", location: "London, UK", orders: 7, spent: 6240, since: "Jul 2023", tier: "Member", avatar: "/editorial/look-knit.png" },
  { id: "cu3", name: "Henrik Sørensen", email: "henrik.s@example.com", location: "Copenhagen, DK", orders: 21, spent: 34110, since: "Jan 2022", tier: "Atelier Circle", avatar: "/editorial/look-suit.png" },
  { id: "cu4", name: "Mei Lin", email: "mei.lin@example.com", location: "Singapore, SG", orders: 4, spent: 3980, since: "Nov 2024", tier: "Member", avatar: "/editorial/look-shirt.png" },
  { id: "cu5", name: "Rafael Costa", email: "rafael.c@example.com", location: "Lisbon, PT", orders: 2, spent: 900, since: "Feb 2025", tier: "Guest", avatar: "/editorial/look-leather.png" },
  { id: "cu6", name: "Priya Nair", email: "priya.n@example.com", location: "Mumbai, IN", orders: 9, spent: 12750, since: "May 2023", tier: "Atelier Circle", avatar: "/editorial/look-trouser.png" },
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
  { id: "cp1", code: "ATELIER15", type: "Percentage", value: 15, used: 214, limit: 500, status: "Active", expires: "Jun 30, 2025" },
  { id: "cp2", code: "WELCOME50", type: "Fixed", value: 50, used: 1032, limit: 2000, status: "Active", expires: "Dec 31, 2025" },
  { id: "cp3", code: "SHIPFREE", type: "Free shipping", value: 0, used: 640, limit: 1000, status: "Active", expires: "Jul 15, 2025" },
  { id: "cp4", code: "WINTER25", type: "Percentage", value: 25, used: 0, limit: 300, status: "Scheduled", expires: "Nov 1, 2025" },
  { id: "cp5", code: "SPRING10", type: "Percentage", value: 10, used: 480, limit: 480, status: "Expired", expires: "Apr 1, 2025" },
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
  { id: "rv1", product: "The Overcoat, No. 4", author: "Henrik S.", rating: 5, title: "A generational piece", body: "The weight and drape are unlike anything I own. Worth every cent.", date: "May 24, 2025", status: "Pending", image: "/editorial/look-coat.png" },
  { id: "rv2", product: "Atelier Cashmere Roll-Neck", author: "Mei L.", rating: 4, title: "Beautifully soft", body: "Softens more with each wear. Runs slightly large.", date: "May 22, 2025", status: "Pending", image: "/editorial/look-knit.png" },
  { id: "rv3", product: "Double-Breasted Suit", author: "Rafael C.", rating: 5, title: "Impeccable tailoring", body: "The roped shoulder is exactly as described. Flawless.", date: "May 20, 2025", status: "Approved", image: "/editorial/look-suit.png" },
  { id: "rv4", product: "Cognac Leather Blouson", author: "Sofia R.", rating: 2, title: "Sizing was off", body: "Lovely leather but the fit ran small for me.", date: "May 18, 2025", status: "Rejected", image: "/editorial/look-leather.png" },
  { id: "rv5", product: "Pleated Wide Trouser", author: "Thomas W.", rating: 5, title: "Perfect line", body: "The break over the shoe is exactly right. Ordered two more.", date: "May 16, 2025", status: "Approved", image: "/editorial/look-trouser.png" },
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
  { id: "b1", title: "Autumn Cycle", subtitle: "The new outerwear, in one quiet room.", image: "/editorial/campaign-wide.png", placement: "Homepage Hero", status: "Live", starts: "May 1, 2025", ends: "Aug 31, 2025" },
  { id: "b2", title: "The Core, restocked", subtitle: "Permanent pieces, back in every size.", image: "/editorial/look-knit.png", placement: "Shop Header", status: "Live", starts: "May 10, 2025", ends: "Jun 30, 2025" },
  { id: "b3", title: "Complimentary shipping", subtitle: "On all orders through the season.", image: "/editorial/look-suit.png", placement: "Promo Strip", status: "Scheduled", starts: "Jun 1, 2025", ends: "Jun 15, 2025" },
  { id: "b4", title: "Winter Cycle preview", subtitle: "An early look for the Atelier Circle.", image: "/editorial/look-coat.png", placement: "Homepage Hero", status: "Draft", starts: "Nov 1, 2025", ends: "Dec 31, 2025" },
]

/* ── Dashboard + analytics figures ──────────────────────────────────────── */

export const ADMIN_STATS = {
  revenue: 486210,
  revenueChange: 12.4,
  orders: 1284,
  ordersChange: 8.1,
  customers: 3921,
  customersChange: 5.6,
  aov: 379,
  aovChange: -2.3,
}

export const REVENUE_SERIES = [
  { month: "Jan", revenue: 38200, orders: 96 },
  { month: "Feb", revenue: 41500, orders: 108 },
  { month: "Mar", revenue: 52800, orders: 141 },
  { month: "Apr", revenue: 48900, orders: 129 },
  { month: "May", revenue: 61200, orders: 168 },
  { month: "Jun", revenue: 57400, orders: 152 },
  { month: "Jul", revenue: 64800, orders: 179 },
  { month: "Aug", revenue: 59100, orders: 161 },
  { month: "Sep", revenue: 68300, orders: 191 },
  { month: "Oct", revenue: 72900, orders: 204 },
  { month: "Nov", revenue: 81600, orders: 232 },
  { month: "Dec", revenue: 94200, orders: 268 },
]

export const CATEGORY_SALES = [
  { name: "Outerwear", value: 182400 },
  { name: "Tailoring", value: 124600 },
  { name: "Knitwear", value: 86200 },
  { name: "Leather", value: 61800 },
  { name: "Shirting", value: 21300 },
  { name: "Trousers", value: 9900 },
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}
