"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import type { StoryBlock } from "@/lib/product-details"

/**
 * Editorial storytelling — alternating full-bleed imagery and quiet type.
 * Each panel drifts with a gentle scroll parallax and reveals on entry.
 */
export function ProductStory({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <section aria-label="The story" className="flex flex-col">
      {blocks.map((block, i) => (
        <StoryPanel key={block.heading} block={block} flip={i % 2 === 1} index={i} />
      ))}
    </section>
  )
}

function StoryPanel({
  block,
  flip,
  index,
}: {
  block: StoryBlock
  flip: boolean
  index: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:gap-14 md:py-20"
    >
      {/* Image */}
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] border border-border md:aspect-[5/6]",
          flip && "md:order-2",
        )}
      >
        <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
          <Image
            src={block.image || "/placeholder.svg"}
            alt={block.heading}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn("flex flex-col gap-5", flip && "md:order-1")}
      >
        <span className="text-eyebrow text-copper">
          {String(index + 1).padStart(2, "0")} — {block.eyebrow}
        </span>
        <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-balance md:text-4xl lg:text-5xl">
          {block.heading}
        </h2>
        <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          {block.body}
        </p>
      </motion.div>
    </div>
  )
}
