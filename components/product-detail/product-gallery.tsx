"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { Expand } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import type { GalleryShot } from "@/lib/product-details"
import { FullscreenViewer } from "@/components/product-detail/fullscreen-viewer"

/**
 * Editorial gallery: a large hero frame with a subtle scroll parallax, a
 * vertical thumbnail rail, color-linked cross-fades, and a fullscreen viewer.
 * The active image is lifted to the parent so the purchase panel and color
 * swatches can drive it.
 */
export function ProductGallery({
  shots,
  productName,
  activeIndex,
  onActiveIndexChange,
  colorKey,
}: {
  shots: GalleryShot[]
  productName: string
  activeIndex: number
  onActiveIndexChange: (i: number) => void
  /** Changing this (a colour name) re-triggers the frame transition. */
  colorKey: string
}) {
  const [direction, setDirection] = React.useState(1)
  const [loaded, setLoaded] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)

  const frameRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  })
  // Gentle parallax drift on the hero image as the page scrolls.
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  function select(i: number) {
    setDirection(i > activeIndex ? 1 : -1)
    onActiveIndexChange(i)
  }

  const active = shots[activeIndex]

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start lg:gap-5">
      {/* Hero frame */}
      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full flex-1 overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-secondary/40"
      >
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Skeleton className="h-full w-full rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`${activeIndex}-${colorKey}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, scale: 1.06, x: d * 40 }),
              center: { opacity: 1, scale: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, scale: 1.02, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div style={{ y: parallax, scale: parallaxScale }} className="absolute inset-[-6%]">
              <Image
                src={active?.src || "/placeholder.svg"}
                alt={`${productName} — ${active?.label ?? "view"}`}
                fill
                priority
                onLoad={() => setLoaded(true)}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Shot label */}
        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={active?.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-full border border-border/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground"
            >
              {active?.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Expand */}
        <button
          type="button"
          onClick={() => setFullscreen(true)}
          aria-label="Open fullscreen viewer"
          className="glass absolute bottom-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-transform duration-[var(--duration-fast)] hover:scale-110 active:scale-90"
        >
          <Expand className="size-4" />
        </button>

        <span className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[10px] tracking-[0.2em] text-primary-foreground mix-blend-difference">
          {String(activeIndex + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </span>
      </div>

      {/* Thumbnail rail */}
      <div className="flex gap-3 lg:flex-col">
        {shots.map((shot, i) => (
          <motion.button
            key={shot.src + i}
            type="button"
            onClick={() => select(i)}
            aria-label={`View ${shot.label}`}
            aria-pressed={i === activeIndex}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "group relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-[var(--radius-md)] border transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] lg:w-20",
              i === activeIndex
                ? "border-copper ring-1 ring-copper"
                : "border-border opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={shot.src || "/placeholder.svg"}
              alt=""
              fill
              sizes="80px"
              className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-110"
            />
          </motion.button>
        ))}
      </div>

      <FullscreenViewer
        shots={shots}
        index={activeIndex}
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        onIndexChange={onActiveIndexChange}
      />
    </div>
  )
}
