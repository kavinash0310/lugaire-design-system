'use client'

import { motion, type Variants } from 'motion/react'
import * as React from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

type RevealProps = React.ComponentProps<typeof motion.div> & {
  variants?: Variants
  /** Render children with a staggered container instead of a single reveal. */
  stagger?: boolean | number
}

/**
 * Scroll-triggered reveal wrapper. Defaults to a fade-up.
 * Pass `stagger` to orchestrate children (each child should use `RevealItem`).
 */
export function Reveal({ variants, stagger, className, children, ...props }: RevealProps) {
  const resolved = stagger
    ? staggerContainer(typeof stagger === 'number' ? stagger : 0.08)
    : (variants ?? fadeUp)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={resolved}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  variants,
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & { variants?: Variants }) {
  return (
    <motion.div variants={variants ?? fadeUp} className={className} {...props}>
      {children}
    </motion.div>
  )
}
