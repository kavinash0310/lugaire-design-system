"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Infinite CSS marquee. Duplicates its children once so the track can loop
 * seamlessly with a -50% translate. Pauses on hover.
 */
export function Marquee({
  children,
  reverse,
  className,
  itemClassName,
}: {
  children: React.ReactNode
  reverse?: boolean
  className?: string
  itemClassName?: string
}) {
  const [paused, setPaused] = React.useState(false)

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn(
          "flex min-w-max shrink-0 items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          paused && "marquee-paused",
          itemClassName,
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
