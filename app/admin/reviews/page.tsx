"use client"

import * as React from "react"
import Image from "next/image"
import { Star, Check, X } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"
import { REVIEWS, type Review } from "@/lib/mock/admin"

const FILTERS = ["All", "Pending", "Approved", "Rejected"] as const
type Filter = (typeof FILTERS)[number]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-3.5", i < rating ? "fill-copper text-copper" : "text-border")}
        />
      ))}
    </span>
  )
}

export default function AdminReviewsPage() {
  const [filter, setFilter] = React.useState<Filter>("All")

  const filtered = REVIEWS.filter((r) => filter === "All" || r.status === filter)
  const pending = REVIEWS.filter((r) => r.status === "Pending").length

  function moderate(review: Review, decision: "approved" | "rejected") {
    toast.success(`Review by ${review.author} ${decision}`)
  }

  return (
    <>
      <AdminPageHeader
        title="Reviews"
        description="Moderate customer feedback before it appears on product pages."
        breadcrumbs={[{ label: "Marketing" }, { label: "Reviews" }]}
        action={
          pending > 0 ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-copper/12 px-3 py-1 text-xs font-medium text-copper">
              {pending} awaiting moderation
            </span>
          ) : undefined
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "copper" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:flex-row"
          >
            <span className="relative size-20 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-secondary">
              <Image src={r.image || "/placeholder.svg"} alt={r.product} fill sizes="80px" className="object-cover" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{r.product}</p>
                  <div className="flex items-center gap-3">
                    <Stars rating={r.rating} />
                    <h2 className="font-display text-lg leading-tight">{r.title}</h2>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{r.body}</p>
              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  By {r.author} · {r.date}
                </p>
                {r.status === "Pending" && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => moderate(r, "rejected")}>
                      <X className="size-4" />
                      Reject
                    </Button>
                    <Button variant="copper" size="sm" onClick={() => moderate(r, "approved")}>
                      <Check className="size-4" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
