'use client'

import { useMotionValue, useSpring, type MotionValue } from 'motion/react'
import * as React from 'react'

type ParallaxReturn = {
  /** Normalized pointer offset from viewport center, range roughly -0.5..0.5 */
  x: MotionValue<number>
  y: MotionValue<number>
}

/**
 * Tracks the pointer position across the viewport and exposes smoothed
 * motion values. Multiply by a strength factor in each layer for depth.
 */
export function useMouseParallax(stiffness = 60, damping = 20): ParallaxReturn {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness, damping, mass: 0.6 })
  const y = useSpring(rawY, { stiffness, damping, mass: 0.6 })

  React.useEffect(() => {
    // Skip on touch / coarse pointers — parallax should be desktop-only.
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [rawX, rawY])

  return { x, y }
}
