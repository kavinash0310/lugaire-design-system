"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/**
 * Ambient copper light that trails the cursor, plus a small precise ring.
 * Fine-pointer only, and respects reduced-motion. Purely decorative.
 */
export function AmbientCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const [active, setActive] = React.useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const glowX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 })
  const ringX = useSpring(x, { stiffness: 500, damping: 34 })
  const ringY = useSpring(y, { stiffness: 500, damping: 34 })

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduce.matches) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      setActive(
        !!el?.closest("a, button, [role='button'], [data-cursor='hover']"),
      )
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        className="absolute -ml-[18rem] -mt-[18rem] h-[36rem] w-[36rem] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--copper) 22%, transparent) 0%, transparent 62%)",
        }}
        animate={{ opacity: active ? 0.9 : 0.55 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute rounded-full border border-copper/70"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          marginLeft: active ? -23 : -13,
          marginTop: active ? -23 : -13,
          opacity: active ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </div>
  )
}
