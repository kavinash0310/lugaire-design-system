import { Badge, type BadgeProps } from "@/components/ui/badge"

type Variant = NonNullable<BadgeProps["variant"]>

const MAP: Record<string, Variant> = {
  // positive / complete
  Active: "success",
  Live: "success",
  Delivered: "success",
  Paid: "success",
  Fulfilled: "success",
  Approved: "success",
  Refunded: "muted",
  // in progress
  Processing: "copper",
  Shipped: "copper",
  "Out for delivery": "copper",
  Confirmed: "copper",
  "In transit": "copper",
  Partial: "copper",
  Scheduled: "copper",
  // pending / neutral
  Pending: "outline",
  Requested: "outline",
  Draft: "muted",
  Guest: "muted",
  Member: "outline",
  "Atelier Circle": "copper",
  Unfulfilled: "outline",
  // negative
  Cancelled: "destructive",
  Declined: "destructive",
  Rejected: "destructive",
  Returned: "destructive",
  Expired: "muted",
  Archived: "muted",
}

export function StatusBadge({ status }: { status: string }) {
  const variant = MAP[status] ?? "secondary"
  return (
    <Badge variant={variant} className="gap-1.5">
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  )
}
