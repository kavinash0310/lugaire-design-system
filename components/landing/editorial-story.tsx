'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { ease } from '@/lib/motion'

export function EditorialStory() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="story" ref={ref} className="relative h-[130svh] w-full overflow-hidden bg-[#121110]">
      {/* Parallax full-bleed image */}
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <Image
          src="/editorial/story-wide.png"
          alt="Lone figure in a camel overcoat walking through a brutalist gallery"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#121110]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]/60" />
      </motion.div>

      {/* Sticky centered narrative */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-[#b87333]"
          >
            The Philosophy
          </motion.p>

          {['We do not', 'follow seasons.', 'We outlast them.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, ease: ease.luxe, delay: i * 0.12 }}
                className="block font-serif text-[10vw] font-light leading-[0.95] tracking-[-0.02em] text-[#f5f2eb] md:text-[5.5rem]"
              >
                {line}
              </motion.span>
            </span>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.75, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: ease.luxe }}
            className="mx-auto mt-10 max-w-md text-sm leading-relaxed tracking-[0.02em] text-[#f5f2eb]/75"
          >
            LUGAIRE was founded on a single conviction: that true luxury is quiet, and the finest
            garments are the ones you keep for a lifetime.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
