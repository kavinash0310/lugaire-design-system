"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CinematicHero() {
  const ref = React.useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])

  // Mouse-reactive depth — a slow, restrained parallax that gives the frame
  // a sense of physical space. Disabled entirely under reduced-motion.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const py = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })
  const imageX = useTransform(px, [-0.5, 0.5], ["-2.5%", "2.5%"])
  const imageY = useTransform(py, [-0.5, 0.5], ["-2%", "2%"])

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Parallax image plane — carries scroll scale + mouse depth. */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <motion.div
          style={reduceMotion ? undefined : { x: imageX, y: imageY }}
          className="absolute inset-[-4%]"
        >
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: "inset(14% 14% 14% 14%)", scale: 1.12 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
            }
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/editorial/hero-overcoat.png"
              alt="A model in an oversized heavyweight charcoal tee within a vast concrete gallery"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-eyebrow text-[#f5f2eb]/70"
          >
            Heavyweight Essentials · MMXXV
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="font-display text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-balance"
            >
              Weight You
              <br />
              Can Wear
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            className="max-w-md text-base leading-relaxed text-[#f5f2eb]/80 text-pretty sm:text-lg"
          >
            Oversized, heavyweight cotton cut to a clean architectural line.
            No noise — only the fall of the fabric and the weight in your hand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
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
