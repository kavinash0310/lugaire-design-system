/**
 * LUGAIRE — Customer account mock data.
 * Realistic sample data used across the customer-facing account, orders,
 * wishlist, and checkout experiences. Prices are in USD.
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
  firstName: "Julian",
  lastName: "Vasquez",
  email: "julian.vasquez@example.com",
  phone: "+1 (415) 555-0189",
  since: "March 2023",
  tier: "Atelier Circle",
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
    lines: [line("the-overcoat-no-4", "Onyx", "L", 1), line("merino-turtleneck", "Bone", "M", 1)],
    subtotal: 1860,
    shipping: 0,
    tax: 149,
    total: 2009,
    address: "128 Sansome Street, San Francisco, CA 94104",
    courier: "LUGAIRE Concierge",
    trackingNumber: "LGX-88213401",
    estimatedDelivery: "May 31, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "May 28, 09:14", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "May 28, 09:20", done: true },
      { label: "Packed at atelier", description: "Wrapped in the Paris workshop.", date: "May 29, 14:02", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Concierge.", date: "May 30, 08:30", done: true },
      { label: "Out for delivery", description: "Arriving today before 6pm.", date: "May 31, 07:45", done: true },
      { label: "Delivered", description: "Signature on delivery.", date: "Expected May 31", done: false },
    ],
  },
  {
    id: "ord-10391",
    number: "LG-10391",
    date: "April 12, 2025",
    status: "Delivered",
    lines: [line("double-breasted-suit", "Slate", "L", 1)],
    subtotal: 2280,
    shipping: 0,
    tax: 182,
    total: 2462,
    address: "128 Sansome Street, San Francisco, CA 94104",
    courier: "LUGAIRE Concierge",
    trackingNumber: "LGX-77120992",
    estimatedDelivery: "April 16, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "Apr 12, 11:02", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "Apr 12, 11:08", done: true },
      { label: "Packed at atelier", description: "Wrapped in the Paris workshop.", date: "Apr 13, 10:20", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Concierge.", date: "Apr 14, 09:00", done: true },
      { label: "Delivered", description: "Left with the concierge desk.", date: "Apr 16, 15:40", done: true },
    ],
  },
  {
    id: "ord-10233",
    number: "LG-10233",
    date: "February 3, 2025",
    status: "Delivered",
    lines: [
      line("atelier-cashmere-rollneck", "Camel", "M", 2),
      line("pleated-wide-trouser", "Onyx", "M", 1),
    ],
    subtotal: 1720,
    shipping: 0,
    tax: 138,
    total: 1858,
    address: "128 Sansome Street, San Francisco, CA 94104",
    courier: "LUGAIRE Concierge",
    trackingNumber: "LGX-66031120",
    estimatedDelivery: "February 7, 2025",
    tracking: [
      { label: "Order placed", description: "We received your order.", date: "Feb 3, 16:22", done: true },
      { label: "Confirmed", description: "Payment authorised and confirmed.", date: "Feb 3, 16:30", done: true },
      { label: "Shipped", description: "Handed to LUGAIRE Concierge.", date: "Feb 5, 09:10", done: true },
      { label: "Delivered", description: "Signature on delivery.", date: "Feb 7, 13:05", done: true },
    ],
  },
  {
    id: "ord-10118",
    number: "LG-10118",
    date: "December 19, 2024",
    status: "Returned",
    lines: [line("cognac-leather-blouson", "Cognac", "L", 1)],
    subtotal: 1950,
    shipping: 0,
    tax: 156,
    total: 2106,
    address: "128 Sansome Street, San Francisco, CA 94104",
    courier: "LUGAIRE Concierge",
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
    name: "Julian Vasquez",
    line1: "128 Sansome Street",
    line2: "Apt 24B",
    city: "San Francisco",
    region: "CA",
    postal: "94104",
    country: "United States",
    phone: "+1 (415) 555-0189",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Studio",
    name: "Julian Vasquez",
    line1: "500 Treat Avenue",
    line2: "Floor 3",
    city: "San Francisco",
    region: "CA",
    postal: "94110",
    country: "United States",
    phone: "+1 (415) 555-0142",
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
    item: "Cognac Leather Blouson",
    reason: "Sizing exchange",
    status: "Refunded",
    date: "Jan 2, 2025",
    refund: 2106,
  },
  {
    id: "ret-2190",
    orderNumber: "LG-10233",
    item: "Pleated Wide Trouser",
    reason: "Changed mind",
    status: "In transit",
    date: "Feb 12, 2025",
    refund: 480,
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
    body: "The Shearling Flight Jacket has only 2 left in Cognac.",
    time: "6h ago",
    category: "Wishlist",
    unread: true,
  },
  {
    id: "n3",
    title: "Private preview — Winter Cycle",
    body: "As an Atelier Circle member, preview the collection early.",
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
  "shearling-flight-jacket",
  "three-piece-suit",
  "cashmere-hoodie",
  "field-parka",
]

/** Default cart seed for the demo experience. */
export type CartItem = {
  productId: string
  color: string
  size: string
  quantity: number
}

export const CART_SEED: CartItem[] = [
  { productId: "the-belted-trench", color: "Camel", size: "L", quantity: 1 },
  { productId: "merino-turtleneck", color: "Onyx", size: "M", quantity: 2 },
]
