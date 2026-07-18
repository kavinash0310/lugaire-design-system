'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import * as React from 'react'
import { toast } from 'sonner'
import { ease, viewportOnce } from '@/lib/motion'

const PRODUCTS = [
  { name: 'The Overcoat', material: 'Charcoal virgin wool', price: '₹ 46,000', img: '/editorial/product-coat.png' },
  { name: 'The Cashmere Knit', material: 'Cream Mongolian cashmere', price: '₹ 28,000', img: '/editorial/product-knit.png' },
  { name: 'The Wide Trouser', material: 'Taupe wool flannel', price: '₹ 19,500', img: '/editorial/product-trouser.png' },
  { name: 'The Scarf', material: 'Copper brushed cashmere', price: '₹ 11,000', img: '/editorial/product-scarf.png' },
]

export function FeaturedProducts() {
  return (
    <section id="products" className="relative bg-[#0e0d0c] px-6 py-28 text-[#f5f2eb] md:px-10 md:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#b87333]"
          >
            Featured Pieces
          </motion.p>
          <h2 className="font-serif text-[12vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[5rem]">
            The essentials
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: ease.luxe, delay: (i % 4) * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1917]">
                <Image
                  src={p.img || '/placeholder.svg'}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                {/* Slide-up add to bag */}
                <div className="absolute inset-x-3 bottom-3 translate-y-[130%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  <button
                    onClick={() =>
                      toast.success('Added to your bag', {
                        description: `${p.name} — ${p.price}`,
                      })
                    }
                    className="w-full bg-[#f5f2eb] py-3 text-[0.7rem] uppercase tracking-[0.25em] text-[#1a1a1a] transition-colors hover:bg-[#b87333] hover:text-[#f5f2eb]"
                  >
                    Add to bag
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-light tracking-[-0.01em]">{p.name}</h3>
                  <p className="mt-1 text-[0.72rem] tracking-[0.02em] text-[#f5f2eb]/50">
                    {p.material}
                  </p>
                </div>
                <span className="whitespace-nowrap text-[0.8rem] tracking-[0.05em] text-[#f5f2eb]/80">
                  {p.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
