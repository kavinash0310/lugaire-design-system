"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { viewportOnce } from "@/lib/motion"
import { Button } from "@/components/ui/button"

export function Manifesto() {
  return (
    <section
      id="atelier"
      className="relative grid min-h-[90svh] grid-cols-1 overflow-hidden lg:grid-cols-2"
    >
      {/* Text half — slides from left */}
      <motion.div
        initial={{ x: "-6%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center gap-8 bg-primary px-6 py-20 text-primary-foreground sm:px-12 lg:px-16"
      >
        <span className="text-eyebrow text-copper">The Promise</span>
        <blockquote className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-balance">
          {"\u201C"}We do not release seasons. We release things that outlive them.{"\u201D"}
        </blockquote>
        <p className="max-w-md text-base leading-relaxed text-primary-foreground/70 text-pretty">
          Buy once, keep for a decade. Every LUGAIRE piece is repairable in our
          atelier for the life of the garment — because permanence is the only
          luxury that matters.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="copper" size="lg" render={<Link href="/shop" />}>
            Shop the house
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            render={<a href="#top" />}
          >
            Back to top
          </Button>
        </div>
      </motion.div>

      {/* Image half — slides from right */}
      <motion.div
        initial={{ x: "6%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="grain relative min-h-[50svh] overflow-hidden"
      >
        <Image
          src="/editorial/hero-portrait.png"
          alt="Portrait of a model in a cream cashmere roll-neck"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/40 to-transparent" />
      </motion.div>
    </section>
  )
}
