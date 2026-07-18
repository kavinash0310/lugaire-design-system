"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Review } from "@/lib/product-details"
import { ratingSummary } from "@/lib/product-details"

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i <= Math.round(value) ? "fill-copper text-copper" : "fill-transparent text-border",
          )}
        />
      ))}
    </span>
  )
}

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  const { total, avg, distribution } = ratingSummary(reviews)

  return (
    <section aria-label="Reviews" className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-eyebrow text-copper">Worn & Reviewed</span>
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
          What the house hears back.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
        {/* Summary */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-end gap-3">
            <span className="font-display text-6xl leading-none">{avg.toFixed(1)}</span>
            <div className="flex flex-col gap-1 pb-1">
              <Stars value={avg} />
              <span className="text-xs text-muted-foreground">{total} reviews</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {distribution.map((row) => (
              <div key={row.star} className="flex items-center gap-3">
                <span className="w-3 text-xs tabular-nums text-muted-foreground">{row.star}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-copper"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: total ? row.count / total : 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
                <span className="w-4 text-right text-xs tabular-nums text-muted-foreground">
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-6">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 border-b border-border pb-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.location}</span>
                </div>
                <Stars value={review.rating} />
              </div>
              <h3 className="font-display text-lg leading-snug">{review.title}</h3>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                {review.body}
              </p>
              {review.photo && (
                <div className="relative mt-1 aspect-[3/2] w-40 overflow-hidden rounded-[var(--radius-lg)] border border-border">
                  <Image
                    src={review.photo || "/placeholder.svg"}
                    alt={`Photo from ${review.name}'s review`}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] hover:scale-105"
                  />
                </div>
              )}
              {review.verified && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-copper">
                  Verified purchase
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
