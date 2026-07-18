"use client"

import * as React from "react"

/**
 * Ambient copper light that trails the cursor, plus a small precise ring.
 * Fine-pointer only, respects reduced-motion, purely decorative.
 *
 * Driven entirely by a manual rAF lerp writing directly to the DOM — we
 * deliberately avoid Motion springs / `animate` here because accelerating a
 * spring into the Web Animations API can emit non-monotonic keyframe offsets.
 */
export function AmbientCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const glowRef = React.useRef<HTMLDivElement>(null)
  const ringRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduce.matches) return
    setEnabled(true)

    // Target (pointer) and current (eased) positions.
    const target = { x: -400, y: -400 }
    const glow = { x: -400, y: -400 }
    const ring = { x: -400, y: -400 }
    let active = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = e.target as HTMLElement | null
      active = !!el?.closest(
        "a, button, [role='button'], [data-cursor='hover']",
      )
    }

    const tick = () => {
      glow.x += (target.x - glow.x) * 0.12
      glow.y += (target.y - glow.y) * 0.12
      ring.x += (target.x - ring.x) * 0.35
      ring.y += (target.y - ring.y) * 0.35

      const g = glowRef.current
      const r = ringRef.current
      if (g) {
        g.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`
        g.style.opacity = active ? "0.9" : "0.55"
      }
      if (r) {
        const size = active ? 46 : 26
        r.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
        r.style.width = `${size}px`
        r.style.height = `${size}px`
        r.style.opacity = active ? "1" : "0.5"
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -ml-[18rem] -mt-[18rem] h-[36rem] w-[36rem] rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--copper) 22%, transparent) 0%, transparent 62%)",
        }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-copper/70 opacity-0 transition-[width,height,opacity] duration-300 ease-out will-change-transform"
        style={{ width: 26, height: 26 }}
      />
    </div>
  )
}
