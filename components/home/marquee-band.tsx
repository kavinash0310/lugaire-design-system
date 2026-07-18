"use client"

import { Marquee } from "@/components/site/marquee"

const WORDS = [
  "Considered",
  "Permanent",
  "Tactile",
  "Restrained",
  "Enduring",
  "Crafted",
]

export function MarqueeBand() {
  return (
    <section
      aria-hidden
      className="border-y border-border bg-primary py-6 text-primary-foreground sm:py-8"
    >
      <Marquee>
        {WORDS.map((w, i) => (
          <div key={w + i} className="flex items-center">
            <span className="font-display px-8 text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-none tracking-tight">
              {w}
            </span>
            <span className="size-2 rounded-full bg-copper" />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
