'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { ease } from '@/lib/motion'

const STATS = [
  { v: '18.5', u: 'micron', l: 'Merino wool fineness' },
  { v: '3', u: 'weeks', l: 'To finish one coat' },
  { v: '100', u: 'percent', l: 'Natural fibres' },
]

export function PremiumFabric() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#121110] px-6 py-28 text-[#f5f2eb] md:px-10">
      {/* Background macro fabric */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <Image
          src="/editorial/fabric.png"
          alt="Macro detail of woven wool fabric"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#121110]/70" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[88rem]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-[#b87333]"
        >
          Premium Fabric
        </motion.p>

        <div className="max-w-4xl">
          {['Woven in', 'the mills of', 'Biella & Huddersfield.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: ease.luxe, delay: i * 0.1 }}
                className="block font-serif text-[9vw] font-light leading-[0.95] tracking-[-0.02em] md:text-[4.5rem]"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Stat row */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[#f5f2eb]/12 pt-12 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: ease.luxe, delay: i * 0.12 }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-6xl font-light text-[#f5f2eb] md:text-7xl">
                  {s.v}
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.25em] text-[#b87333]">
                  {s.u}
                </span>
              </div>
              <p className="mt-3 text-sm tracking-[0.02em] text-[#f5f2eb]/60">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
