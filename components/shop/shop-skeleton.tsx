"use client"

import { cn } from "@/lib/utils"

/**
 * Luxury shimmer surface — a slow copper-tinted sweep across a muted panel.
 * Mirrors the editorial grid's alternating spans so the loading state keeps
 * the same rhythm as the resolved catalogue.
 */
function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-secondary/50", className)}>
      <div
        className="absolute inset-0 animate-[shimmer_1.8s_var(--ease-in-out-soft)_infinite] bg-[length:200%_100%]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 20%, color-mix(in oklab, var(--copper) 14%, transparent) 50%, transparent 80%)",
        }}
      />
    </div>
  )
}

function SkeletonCard({ feature = false }: { feature?: boolean }) {
  return (
    <div className="flex flex-col">
      <Shimmer
        className={cn(
          "rounded-[var(--radius-xl)] border border-border",
          feature ? "aspect-[4/5]" : "aspect-[3/4]",
        )}
      />
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <Shimmer className="h-2.5 w-20 rounded-full" />
          <Shimmer className="h-2.5 w-12 rounded-full" />
        </div>
        <Shimmer className="mt-1 h-5 w-2/3 rounded-full" />
        <Shimmer className="h-3 w-1/2 rounded-full" />
      </div>
    </div>
  )
}

/** Editorial skeleton grid matching the [7,5] · [5,7] · [6,6] span cadence. */
export function ShopSkeleton() {
  const spans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
    "lg:col-span-6",
    "lg:col-span-6",
  ]
  return (
    <div className="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-6 lg:gap-y-16">
      {spans.map((span, i) => (
        <div key={i} className={cn("col-span-12 sm:col-span-6", span)}>
          <SkeletonCard feature={i === 0 || i === 3} />
        </div>
      ))}
    </div>
  )
}
