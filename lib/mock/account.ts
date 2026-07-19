/**
 * LUGAIRE — Customer account mock data.
 * Realistic sample data used across the customer-facing account, orders,
 * wishlist, and checkout experiences. Prices are in INR.
 */

import { PRODUCTS, type Product } from "@/lib/products"

export type OrderStatus =
  | "Processing"
  | "Confirmed"
  | "Shipped"
  | "Out for delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned"

export type OrderLine = {
  productId: string
  name: string
  image: string
  color: string
  size: string
  quantity: number
  price: number
}

export type TrackingStep = {
  label: string
  description: string
  date: string
  done: boolean
}

export type Order = {
  id: string
  number: string
  date: string
  status: OrderStatus
  lines: OrderLine[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  address: string
  courier: string
  trackingNumber: string
  estimatedDelivery: string
  tracking: TrackingStep[]
}

export type Address = {
  id: string
  label: string
  name: string
  line1: string
  line2?: string
  city: string
  region: string
  postal: string
  country: string
  phone: string
  isDefault: boolean
}

export type NotificationItem = {
  id: string
  title: string
  body: string
  time: string
  category: "Order" | "Promotion" | "Account" | "Wishlist"
  unread: boolean
}

export type CustomerProfile = {
  firstName: string
  lastName: string
  email: string
  phone: string
  since: string
  tier: string
  avatar: string
  points: number
}

const p = (id: string): Product => PRODUCTS.find((x) => x.id === id) ?? PRODUCTS[0]

export const CUSTOMER: CustomerProfile = {
  firstName: "Arjun",
  lastName: "Mehta",
  email: "arjun.mehta@example.com",
  phone: "+91 98450 55018",
  since: "March 2023",
  tier: "Inner Circle",
  avatar: "/editorial/hero-portrait.png",
  points: 2480,
}

function line(id: string, color: string, size: string, quantity: number): OrderLine {
  const prod = p(id)
  return {
    productId: prod.id,
    name: prod.name,
    image: prod.images[0],
    color,
    size,
    quantity,
    price: prod.price,
  }
}

export const ORDERS: Order[] = [
  {
    id: "ord-10482",
    number: "LG-10482",
    date: "May 28, 2025",
    status: "Out for delivery",
    lines: [line("essential-oversized-tee", "Charcoal Black", "L", 1), line("structured-long-sleeve", "Warm Ivory", "M", 1)],
    subtotal: 4498,
    shipping: 0,
    tax: 225,
    total: 4723,
    address: "42 Indiranagar 100ft Road, Bengaluru, KA 560038",
    courier: "LUGAIRE Express",
    trackingNumber: "LGX-88213401",
    estimatedDelivery: "May 31, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "May 28, 09:14", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "May 28, 09:20", done: true },
      { label: "Packed at studio", description: "Folded and wrapped at the studio.", date: "May 29, 14:02", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Express.", date: "May 30, 08:30", done: true },
      { label: "Out for delivery", description: "Arriving today before 6pm.", date: "May 31, 07:45", done: true },
      { label: "Delivered", description: "Signature on delivery.", date: "Expected May 31", done: false },
    ],
  },
  {
    id: "ord-10391",
    number: "LG-10391",
    date: "April 12, 2025",
    status: "Delivered",
    lines: [line("luxe-heavyweight-tee", "Navy Blue", "L", 1)],
    subtotal: 2999,
    shipping: 0,
    tax: 150,
    total: 3149,
    address: "42 Indiranagar 100ft Road, Bengaluru, KA 560038",
    courier: "LUGAIRE Express",
    trackingNumber: "LGX-77120992",
    estimatedDelivery: "April 16, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "Apr 12, 11:02", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "Apr 12, 11:08", done: true },
      { label: "Packed at studio", description: "Folded and wrapped at the studio.", date: "Apr 13, 10:20", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Express.", date: "Apr 14, 09:00", done: true },
      { label: "Delivered", description: "Left with the front desk.", date: "Apr 16, 15:40", done: true },
    ],
  },
  {
    id: "ord-10233",
    number: "LG-10233",
    date: "February 3, 2025",
    status: "Delivered",
    lines: [
      line("blank-heavyweight-tee", "Olive Green", "M", 2),
      line("core-boxy-tee", "Charcoal Black", "M", 1),
    ],
    subtotal: 6297,
    shipping: 0,
    tax: 315,
    total: 6612,
    address: "42 Indiranagar 100ft Road, Bengaluru, KA 560038",
    courier: "LUGAIRE Express",
    trackingNumber: "LGX-66031120",
    estimatedDelivery: "February 7, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "Feb 3, 16:22", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "Feb 3, 16:30", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Express.", date: "Feb 5, 09:10", done: true },
      { label: "Delivered", description: "Signature on delivery.", date: "Feb 7, 13:05", done: true },
    ],
  },
  {
    id: "ord-10118",
    number: "LG-10118",
    date: "December 19, 2024",
    status: "Returned",
    lines: [line("essential-hoodie", "Charcoal Black", "L", 1)],
    subtotal: 4299,
    shipping: 0,
    tax: 215,
    total: 4514,
    address: "42 Indiranagar 100ft Road, Bengaluru, KA 560038",
    courier: "LUGAIRE Express",
    trackingNumber: "LGX-55011876",
    estimatedDelivery: "December 23, 2024",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "Dec 19, 10:00", done: true },
      { label: "Delivered", description: "Signature on delivery.", date: "Dec 23, 12:00", done: true },
      { label: "Return requested", description: "Sizing exchange initiated.", date: "Dec 27, 09:30", done: true },
      { label: "Returned", description: "Refund issued to original method.", date: "Jan 2, 14:00", done: true },
    ],
  },
]

export function getOrder(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id || o.number.toLowerCase() === id.toLowerCase())
}

export const ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Arjun Mehta",
    line1: "42 Indiranagar 100ft Road",
    line2: "Apt 24B",
    city: "Bengaluru",
    region: "KA",
    postal: "560038",
    country: "India",
    phone: "+91 98450 55018",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Studio",
    name: "Arjun Mehta",
    line1: "12 Church Street",
    line2: "Floor 3",
    city: "Bengaluru",
    region: "KA",
    postal: "560001",
    country: "India",
    phone: "+91 98450 55142",
    isDefault: false,
  },
]

export type ReturnRequest = {
  id: string
  orderNumber: string
  item: string
  reason: string
  status: "Requested" | "Approved" | "In transit" | "Refunded" | "Declined"
  date: string
  refund: number
}

export const RETURNS: ReturnRequest[] = [
  {
    id: "ret-2201",
    orderNumber: "LG-10118",
    item: "Essential Hoodie",
    reason: "Sizing exchange",
    status: "Refunded",
    date: "Jan 2, 2025",
    refund: 4514,
  },
  {
    id: "ret-2190",
    orderNumber: "LG-10233",
    item: "Core Boxy Tee",
    reason: "Changed mind",
    status: "In transit",
    date: "Feb 12, 2025",
    refund: 1899,
  },
]

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Your order is out for delivery",
    body: "Order LG-10482 arrives today before 6pm.",
    time: "2h ago",
    category: "Order",
    unread: true,
  },
  {
    id: "n2",
    title: "A wishlist piece is low in stock",
    body: "The Urban Boxy Hoodie has only 2 left in Charcoal Black.",
    time: "6h ago",
    category: "Wishlist",
    unread: true,
  },
  {
    id: "n3",
    title: "Private preview — Signature Series",
    body: "As an Inner Circle member, preview the drop early.",
    time: "Yesterday",
    category: "Promotion",
    unread: false,
  },
  {
    id: "n4",
    title: "Password updated",
    body: "Your account password was changed successfully.",
    time: "3 days ago",
    category: "Account",
    unread: false,
  },
]

/** Default wishlist seed (product ids) for the demo experience. */
export const WISHLIST_SEED = [
  "urban-boxy-hoodie",
  "ronin-signature-tee",
  "luxe-terry-hoodie",
  "serif-wordmark-tee",
]

/** Default cart seed for the demo experience. */
export type CartItem = {
  productId: string
  color: string
  size: string
  quantity: number
}

export const CART_SEED: CartItem[] = [
  { productId: "street-oversized-tee", color: "Olive Green", size: "L", quantity: 1 },
  { productId: "blank-heavyweight-tee", color: "Charcoal Black", size: "M", quantity: 2 },
]
