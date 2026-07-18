"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CinematicHero() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src="/editorial/hero-overcoat.png"
          alt="A model in a tailored charcoal overcoat within a vast concrete gallery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/25 to-[#0d0c0b]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/70 via-transparent to-transparent" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full w-full max-w-[88rem] flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20"
      >
        <div className="flex flex-col gap-6 text-[#f5f2eb]">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-eyebrow text-[#f5f2eb]/70"
          >
            Autumn Cycle · MMXXV
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-balance"
            >
              The Weight
              <br />
              of Restraint
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="max-w-md text-base leading-relaxed text-[#f5f2eb]/80 text-pretty sm:text-lg"
          >
            A house built on permanence, not seasons. Move slowly — every piece
            asks to be studied before it is worn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button variant="copper" size="lg" render={<Link href="/shop" />}>
              Enter the shop
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#f5f2eb]/30 bg-transparent text-[#f5f2eb] hover:bg-[#f5f2eb]/10"
              render={<a href="#story" />}
            >
              The philosophy
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#story"
        style={{ opacity: fade }}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#f5f2eb]/70 md:flex"
      >
        <span className="text-eyebrow">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
