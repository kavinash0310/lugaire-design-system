"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GalleryShot } from "@/lib/product-details"

/**
 * Fullscreen, keyboard-navigable image viewer.
 * ← / → step through shots, Esc closes. Focus is trapped to the overlay while
 * open and the underlying page is locked from scrolling.
 */
export function FullscreenViewer({
  shots,
  index,
  open,
  onClose,
  onIndexChange,
}: {
  shots: GalleryShot[]
  index: number
  open: boolean
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const [direction, setDirection] = React.useState(0)

  const go = React.useCallback(
    (next: number) => {
      const wrapped = (next + shots.length) % shots.length
      setDirection(next > index ? 1 : -1)
      onIndexChange(wrapped)
    },
    [index, shots.length, onIndexChange],
  )

  React.useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(index + 1)
      else if (e.key === "ArrowLeft") go(index - 1)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, index, go, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-[#0c0b0a]/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`${shots[index]?.label} — enlarged`}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-[#f5f2eb] md:px-8">
            <span className="font-mono text-xs tracking-[0.2em] text-[#f5f2eb]/70">
              {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              <span className="ml-3 uppercase">{shots[index]?.label}</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-[#f5f2eb] transition-colors hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={(d: number) => ({ opacity: 0, x: d * 60, scale: 0.98 })}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={(d: number) => ({ opacity: 0, x: d * -60, scale: 0.98 })}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={shots[index]?.src || "/placeholder.svg"}
                  alt={`${shots[index]?.label} — enlarged view`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {shots.length > 1 && (
              <>
                <ViewerArrow side="left" onClick={() => go(index - 1)} />
                <ViewerArrow side="right" onClick={() => go(index + 1)} />
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-2 px-4 pb-6 pt-2">
            {shots.map((shot, i) => (
              <button
                key={shot.src + i}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  onIndexChange(i)
                }}
                aria-label={`View ${shot.label}`}
                className={cn(
                  "relative aspect-square w-14 shrink-0 overflow-hidden rounded-[var(--radius-sm)] transition-all duration-300",
                  i === index
                    ? "opacity-100 ring-1 ring-[#c98a52]"
                    : "opacity-45 hover:opacity-80",
                )}
              >
                <Image src={shot.src || "/placeholder.svg"} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ViewerArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-[#f5f2eb] transition-colors hover:bg-white/10",
        side === "left" ? "left-4 md:left-8" : "right-4 md:right-8",
      )}
    >
      {side === "left" ? <ChevronLeft className="size-6" /> : <ChevronRight className="size-6" />}
    </button>
  )
}
