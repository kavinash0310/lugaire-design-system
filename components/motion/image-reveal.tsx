'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'

type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** Vertical scroll-parallax strength in pixels (0 disables). */
  parallax?: number
  /** Extra scale applied to the image so parallax never exposes edges. */
  overscan?: number
}

/**
 * Curtain image reveal: a clip-path wipes upward on scroll-in while the inner
 * image scales down from a slight zoom. Optional scroll parallax drifts the
 * image as the section moves through the viewport.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  priority = false,
  parallax = 0,
  overscan = 1.12,
}: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax])

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: ease.luxe }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: parallax ? (y as MotionValue<number>) : 0 }}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: ease.luxe }}
      >
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imgClassName)}
          style={{ scale: overscan }}
        />
      </motion.div>
    </motion.div>
  )
}
