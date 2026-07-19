import type { Transition, Variants } from 'motion/react'

/**
 * LUGAIRE motion system.
 * Premium, restrained easing. All timing mirrors the CSS animation tokens
 * defined in globals.css so JS and CSS animations feel identical.
 */

export const ease = {
  luxe: [0.16, 1, 0.3, 1] as const,
  outSoft: [0.22, 1, 0.36, 1] as const,
  inOutSoft: [0.65, 0, 0.35, 1] as const,
}

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
}

export const transition = {
  base: { duration: duration.base, ease: ease.luxe } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.luxe } satisfies Transition,
  spring: { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 } satisfies Transition,
}

/** Simple fade + rise, ideal for section entrances. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.base,
  },
}

/** Larger, slower rise for hero-scale headlines and editorial blocks. */
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: ease.luxe },
  },
}

/** Cinematic mask reveal — content wipes up from behind a clip edge. */
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 28 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: 1.05, ease: ease.luxe },
  },
}

/** Progressive image reveal — soft blur + scale settle. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: ease.luxe },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.base },
}

/** Parent container that staggers its children on reveal. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

/** Overlay + panel choreography for modals and drawers. */
export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.outSoft } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.inOutSoft } },
}

/** Shared viewport config so scroll reveals stay consistent site-wide. */
export const viewportOnce = { once: true, amount: 0.25 } as const
