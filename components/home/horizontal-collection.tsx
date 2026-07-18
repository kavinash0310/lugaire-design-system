"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const SLIDES = [
  {
    tag: "01 — Outerwear",
    title: "The Column",
    body: "Coats cut as single unbroken lines. Weight, drape, and shadow.",
    image: "/editorial/look-coat.png",
  },
  {
    tag: "02 — Tailoring",
    title: "The Atelier",
    body: "Half-canvassed suiting, built by a single hand over forty hours.",
    image: "/editorial/look-suit.png",
  },
  {
    tag: "03 — Leather",
    title: "The Patina",
    body: "Vegetable-tanned hides that record the years they are worn.",
    image: "/editorial/look-leather.png",
  },
  {
    tag: "04 — Knitwear",
    title: "The Core",
    body: "Grade-A cashmere and undyed wool. The permanent wardrobe.",
    image: "/editorial/look-knit.png",
  },
]

export function HorizontalCollection() {
  const ref = React.useRef<HTMLElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [distance, setDistance] = React.useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - track.clientWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <section
      id="collections"
      ref={ref}
      className="relative h-[360vh] bg-secondary/30"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-10">
        <div className="mx-auto mb-8 flex w-full max-w-[88rem] items-end justify-between gap-4 px-5 sm:px-8">
          <div className="flex flex-col gap-2">
            <span className="text-eyebrow text-copper">The Collections</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-tight">
              Drag through the house
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-muted-foreground sm:block">
            Scroll to traverse →
          </span>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 px-5 sm:px-8 lg:gap-8"
        >
          {SLIDES.map((s, i) => (
            <article
              key={s.title}
              data-cursor="hover"
              className="group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden rounded-[var(--radius-2xl)] border border-border shadow-[var(--shadow-luxe-lg)] sm:w-[52vw] lg:w-[36vw]"
            >
              <Image
                src={s.image || "/placeholder.svg"}
                alt={s.title}
                fill
                sizes="(min-width:1024px) 36vw, (min-width:640px) 52vw, 78vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-[#f5f2eb] sm:p-8">
                <span className="text-eyebrow text-[#f5f2eb]/70">{s.tag}</span>
                <h3 className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
                  {s.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-[#f5f2eb]/80 text-pretty">
                  {s.body}
                </p>
              </div>
            </article>
          ))}

          {/* Closing CTA panel */}
          <article className="flex aspect-[3/4] w-[78vw] shrink-0 flex-col justify-center gap-6 rounded-[var(--radius-2xl)] border border-border bg-primary p-8 text-primary-foreground sm:w-[52vw] lg:w-[30vw]">
            <span className="text-eyebrow text-copper">Thirty pieces</span>
            <h3 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight text-balance">
              See the full house
            </h3>
            <p className="text-sm leading-relaxed text-primary-foreground/70 text-pretty">
              The complete catalogue — filters, colourways, and the archive —
              awaits in the shop.
            </p>
            <Button variant="copper" size="lg" render={<Link href="/shop" />}>
              Enter the shop
              <ArrowRight className="size-4" />
            </Button>
          </article>
        </motion.div>
      </div>
    </section>
  )
}
