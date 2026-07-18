"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

const CHAPTERS = [
  {
    n: "I",
    kicker: "The Cloth",
    title: "It begins as weight",
    body: "Every garment starts as a bolt of cloth chosen for its hand and its future — how it will drape in a year, how it will soften in ten. Weight before shape.",
    image: "/editorial/fabric-wool.png",
  },
  {
    n: "II",
    kicker: "The Fibre",
    title: "Softness, earned",
    body: "Grade-A cashmere and undyed lambswool are washed in spring water, never chemically accelerated. The result is a softness that deepens rather than fades.",
    image: "/editorial/fabric-cashmere.png",
  },
  {
    n: "III",
    kicker: "The Patina",
    title: "A life, recorded",
    body: "Vegetable-tanned leathers are left to record their wearer — a map of years drawn in copper light. Nothing here is finished the day you buy it.",
    image: "/editorial/fabric-leather.png",
  },
]

function ChapterImage({
  src,
  alt,
  opacity,
  scale,
}: {
  src: string
  alt: string
  opacity: MotionValue<number>
  scale: MotionValue<number>
}) {
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image src={src || "/placeholder.svg"} alt={alt} fill sizes="50vw" className="object-cover" />
    </motion.div>
  )
}

export function StorySection() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Three crossfading fabric frames.
  const o1 = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0])
  const o2 = useTransform(scrollYProgress, [0.3, 0.45, 0.62, 0.72], [0, 1, 1, 0])
  const o3 = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1])
  const s1 = useTransform(scrollYProgress, [0, 0.4], [1.05, 1.15])
  const s2 = useTransform(scrollYProgress, [0.3, 0.72], [1.05, 1.15])
  const s3 = useTransform(scrollYProgress, [0.66, 1], [1.05, 1.15])

  return (
    <section id="story" ref={ref} className="relative bg-background">
      <div className="relative h-[300vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            {/* Sticky fabric stack */}
            <div className="grain relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-2xl)] border border-border shadow-[var(--shadow-luxe-xl)] lg:order-none">
              <ChapterImage src={CHAPTERS[0].image} alt="Macro of herringbone wool" opacity={o1} scale={s1} />
              <ChapterImage src={CHAPTERS[1].image} alt="Macro of cashmere knit" opacity={o2} scale={s2} />
              <ChapterImage src={CHAPTERS[2].image} alt="Macro of full-grain leather" opacity={o3} scale={s3} />
            </div>

            {/* Chapters */}
            <div className="relative flex flex-col">
              {CHAPTERS.map((c, i) => (
                <Chapter
                  key={c.n}
                  chapter={c}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Chapter({
  chapter,
  index,
  progress,
}: {
  chapter: (typeof CHAPTERS)[number]
  index: number
  progress: MotionValue<number>
}) {
  const start = index / CHAPTERS.length
  const end = (index + 1) / CHAPTERS.length
  const mid = (start + end) / 2
  const opacity = useTransform(
    progress,
    [start - 0.04, mid - 0.08, mid + 0.08, end - 0.02],
    [0.25, 1, 1, 0.25],
  )
  const y = useTransform(progress, [start, end], [24, -24])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center gap-4"
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-copper text-2xl">{chapter.n}</span>
        <span className="text-eyebrow text-muted-foreground">{chapter.kicker}</span>
      </div>
      <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1] tracking-tight text-balance">
        {chapter.title}
      </h2>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
        {chapter.body}
      </p>
    </motion.div>
  )
}
