"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"

const ERAS = [
  {
    year: "2018",
    title: "First Cut",
    body: "The house opens with a single garment — the No. 1 overcoat — sold from a workshop of four.",
    image: "/editorial/hero-overcoat.png",
  },
  {
    year: "2021",
    title: "The Core",
    body: "A permanent line is codified: cashmere, wool, poplin. Pieces designed never to be discontinued.",
    image: "/editorial/look-knit.png",
  },
  {
    year: "2023",
    title: "The Atelier",
    body: "Made-to-measure tailoring is introduced. Half-canvassed suiting, one tailor per garment.",
    image: "/editorial/look-suit.png",
  },
  {
    year: "2025",
    title: "Autumn Cycle",
    body: "The current chapter — leather, shearling, and the return of the belted trench.",
    image: "/editorial/campaign-wide.png",
  },
]

export function Timeline() {
  const [active, setActive] = React.useState(ERAS.length - 1)
  const era = ERAS[active]

  return (
    <section id="timeline" className="border-t border-border bg-secondary/30 py-20 sm:py-28">
      <Container size="wide" className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-eyebrow text-copper">A House in Time</span>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-tight text-balance">
            Seven years, no shortcuts
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Visual */}
          <div className="grain relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-2xl)] border border-border shadow-[var(--shadow-luxe-lg)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={era.image || "/placeholder.svg"}
                  alt={`${era.year} — ${era.title}`}
                  fill
                  sizes="(min-width:1024px) 55vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <span className="font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-none text-[#f5f2eb]">
                    {era.year}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text + rail */}
          <div className="flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[9rem] flex-col gap-3"
              >
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {era.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                  {era.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex items-center justify-between border-t border-border pt-6">
              <div className="absolute left-0 top-6 h-px w-full bg-border" />
              {ERAS.map((e, i) => (
                <button
                  key={e.year}
                  type="button"
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  aria-pressed={i === active}
                  className="group relative -mt-6 flex flex-col items-center gap-3 pt-6"
                >
                  <span
                    className={cn(
                      "size-3 rounded-full border-2 transition-all",
                      i === active
                        ? "scale-125 border-copper bg-copper"
                        : "border-muted-foreground bg-background group-hover:border-copper",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-xs transition-colors",
                      i === active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {e.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
