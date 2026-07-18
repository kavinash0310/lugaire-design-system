'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { ease } from '@/lib/motion'
import { useMouseParallax } from '@/hooks/use-mouse-parallax'

export function Hero({ ready }: { ready: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const { x, y } = useMouseParallax()
  const imgX = useTransform(x, [-0.5, 0.5], [-22, 22])
  const imgXY = useTransform(y, [-0.5, 0.5], [-16, 16])
  const wordX = useTransform(x, [-0.5, 0.5], [14, -14])

  // Gate child animations until the loader has finished.
  const show = ready ? 'visible' : 'hidden'

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[#121110]">
      {/* Floating eyebrow — top left */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute left-6 top-28 z-20 md:left-10 md:top-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 1, ease: ease.luxe, delay: 0.2 }}
          className="max-w-[12rem] text-[0.7rem] uppercase leading-relaxed tracking-[0.3em] text-[#f5f2eb]/70"
        >
          Autumn / Winter
          <br />
          MMXXVI Collection
        </motion.p>
      </motion.div>

      {/* Floating index — top right */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute right-6 top-28 z-20 text-right md:right-10 md:top-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 1, ease: ease.luxe, delay: 0.3 }}
          className="text-[0.7rem] uppercase leading-relaxed tracking-[0.3em] text-[#f5f2eb]/70"
        >
          N° 001
          <br />
          Paris — Milan
        </motion.p>
      </motion.div>

      {/* Layered hero image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <motion.div
          style={{ x: imgX, translateY: imgXY }}
          className="relative h-[62vh] w-[74vw] max-w-[520px] will-change-transform sm:h-[68vh] md:h-[78vh] md:w-[42vw]"
        >
          <motion.div
            className="relative h-full w-full overflow-hidden"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={ready ? { clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ duration: 1.4, ease: ease.luxe, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.4 }}
              animate={ready ? { scale: 1 } : {}}
              transition={{ duration: 1.8, ease: ease.luxe, delay: 0.2 }}
            >
              <Image
                src="/editorial/hero.png"
                alt="LUGAIRE model wearing an oversized charcoal wool overcoat"
                fill
                priority
                sizes="(max-width: 768px) 74vw, 42vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-70" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Giant floating typography layered over the image */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
      >
        <motion.div style={{ x: wordX }} className="flex flex-col items-center leading-[0.82]">
          {['Luxury.', 'Minimal.', 'Timeless.'].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 1.1, ease: ease.luxe, delay: 0.5 + i * 0.13 }}
                className="block font-serif text-[19vw] font-light tracking-[-0.03em] text-[#f5f2eb] mix-blend-difference md:text-[13vw]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom meta row */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-8 z-30 mx-auto flex max-w-[88rem] items-end justify-between px-6 md:bottom-10 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 1, ease: ease.luxe, delay: 0.9 }}
          className="max-w-[16rem] text-[0.72rem] leading-relaxed tracking-[0.05em] text-[#f5f2eb]/70"
        >
          A wardrobe built to outlive the season. Considered garments, made without compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="hidden flex-col items-center gap-3 md:flex"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f5f2eb]/60">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-10 w-px bg-gradient-to-b from-[#b87333] to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
