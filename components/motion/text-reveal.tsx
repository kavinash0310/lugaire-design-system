'use client'

import { motion } from 'motion/react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ease, viewportOnce } from '@/lib/motion'

type TextRevealProps = {
  /** The full string; each line is animated behind an overflow mask. */
  lines: string[]
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  delay?: number
  stagger?: number
  once?: boolean
}

/**
 * Masked line-by-line reveal. Each line rises from beneath an overflow-hidden
 * clip, the signature luxury-magazine headline entrance.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  as = 'div',
  delay = 0,
  stagger = 0.09,
  once = true,
}: TextRevealProps) {
  const Wrapper = motion[as]

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { once: false, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={lines.join(' ')}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden>
          <motion.span
            className={cn('block will-change-transform', lineClassName)}
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: { duration: 0.9, ease: ease.luxe },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  )
}
