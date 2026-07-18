'use client'

import { motion } from 'motion/react'
import { ImageReveal } from '@/components/motion/image-reveal'
import { TextReveal } from '@/components/motion/text-reveal'
import { ease, viewportOnce } from '@/lib/motion'

export function FeaturedCollection() {
  return (
    <section id="collection" className="relative bg-[#121110] px-6 py-28 text-[#f5f2eb] md:px-10 md:py-40">
      <div className="mx-auto max-w-[88rem]">
        {/* Section header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
              className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#b87333]"
            >
              Featured — 001
            </motion.p>
            <TextReveal
              as="h2"
              lines={['The Winter', 'Atelier']}
              className="font-serif text-[16vw] font-light leading-[0.85] tracking-[-0.03em] md:text-[7rem]"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: ease.luxe }}
            className="max-w-sm text-sm leading-relaxed tracking-[0.02em] text-[#f5f2eb]/70"
          >
            An edit of enduring silhouettes in wool, cashmere and horn. Each piece is cut for
            permanence, not the passing season — a study in restraint and material honesty.
          </motion.p>
        </div>

        {/* Asymmetric layered grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-7">
            <ImageReveal
              src="/editorial/collection-a.png"
              alt="Model in a bone-colored heavy knit roll-neck and wide trousers"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 58vw"
              parallax={40}
            />
            <div className="mt-5 flex items-baseline justify-between">
              <span className="font-serif text-lg italic text-[#f5f2eb]">The Roll-Neck Study</span>
              <span className="text-[0.72rem] uppercase tracking-[0.2em] text-[#f5f2eb]/50">
                ₹ 24,000
              </span>
            </div>
          </div>

          <div className="col-span-12 mt-0 md:col-span-5 md:mt-32">
            <ImageReveal
              src="/editorial/collection-b.png"
              alt="Detail of a structured double-breasted wool blazer"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 42vw"
              parallax={64}
            />
            <div className="mt-5 flex items-baseline justify-between">
              <span className="font-serif text-lg italic text-[#f5f2eb]">The Wool Blazer</span>
              <span className="text-[0.72rem] uppercase tracking-[0.2em] text-[#f5f2eb]/50">
                ₹ 38,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
