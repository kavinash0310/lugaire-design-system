'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ease, viewportOnce } from '@/lib/motion'

const POSTS = [
  '/editorial/insta-a.png',
  '/editorial/collection-b.png',
  '/editorial/craft.png',
  '/editorial/cat-knitwear.png',
  '/editorial/insta-b.png',
  '/editorial/collection-a.png',
]

export function Instagram() {
  return (
    <section id="instagram" className="relative bg-[#0e0d0c] px-6 py-28 text-[#f5f2eb] md:px-10 md:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-14 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#b87333]"
          >
            The Journal
          </motion.p>
          <h2 className="font-serif text-[11vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[4.5rem]">
            @lugaire
          </h2>
          <p className="mt-5 text-sm tracking-[0.02em] text-[#f5f2eb]/60">
            Follow the house — behind the atelier doors.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {POSTS.map((src, i) => (
            <motion.a
              key={src + i}
              href="#"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: ease.luxe, delay: (i % 6) * 0.07 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={src || '/placeholder.svg'}
                alt="LUGAIRE journal post"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#121110]/0 transition-colors duration-500 group-hover:bg-[#121110]/50">
                <span className="text-[0.7rem] uppercase tracking-[0.25em] text-[#f5f2eb] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
