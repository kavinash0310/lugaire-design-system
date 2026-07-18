'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { ease, viewportOnce } from '@/lib/motion'

const COLLECTIONS = [
  { name: 'Outerwear', count: '12 pieces', img: '/editorial/cat-outerwear.png' },
  { name: 'Knitwear', count: '18 pieces', img: '/editorial/cat-knitwear.png' },
  { name: 'Tailoring', count: '09 pieces', img: '/editorial/cat-tailoring.png' },
]

export function Collections() {
  return (
    <section className="relative bg-[#121110] px-6 py-28 text-[#f5f2eb] md:px-10 md:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
              className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#b87333]"
            >
              The Collections
            </motion.p>
            <h2 className="font-serif text-[13vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[5rem]">
              Explore the house
            </h2>
          </div>
          <span className="hidden text-[0.72rem] uppercase tracking-[0.2em] text-[#f5f2eb]/50 md:inline">
            View all →
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {COLLECTIONS.map((c, i) => (
            <motion.a
              key={c.name}
              href="#products"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: ease.luxe, delay: i * 0.12 }}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <Image
                src={c.img || '/placeholder.svg'}
                alt={`${c.name} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/10 to-transparent transition-opacity duration-700 group-hover:from-[#121110]/90" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                <div>
                  <span className="mb-2 block text-[0.7rem] uppercase tracking-[0.25em] text-[#f5f2eb]/60">
                    {c.count}
                  </span>
                  <h3 className="font-serif text-3xl font-light tracking-[-0.01em] md:text-4xl">
                    {c.name}
                  </h3>
                </div>
                <span className="mb-2 flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full border border-[#f5f2eb]/40 text-lg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#b87333] group-hover:bg-[#b87333] group-hover:opacity-100">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
