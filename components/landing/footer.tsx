'use client'

import { motion } from 'motion/react'
import { viewportOnce } from '@/lib/motion'

const COLUMNS = [
  {
    title: 'Maison',
    links: ['The House', 'Craftsmanship', 'Sustainability', 'Careers'],
  },
  {
    title: 'Shop',
    links: ['Outerwear', 'Knitwear', 'Tailoring', 'Accessories'],
  },
  {
    title: 'Client Care',
    links: ['Shipping', 'Returns', 'Alterations', 'Contact'],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0a09] px-6 pb-10 pt-24 text-[#f5f2eb] md:px-10">
      <div className="mx-auto max-w-[88rem]">
        {/* Top: columns */}
        <div className="grid grid-cols-2 gap-10 border-b border-[#f5f2eb]/10 pb-20 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="max-w-xs text-sm leading-relaxed text-[#f5f2eb]/60">
              Considered garments, made without compromise. A wardrobe built to outlive the season.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-[0.7rem] uppercase tracking-[0.25em] text-[#b87333]">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm tracking-[0.02em] text-[#f5f2eb]/70 transition-colors hover:text-[#f5f2eb]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="py-16"
        >
          <h2 className="text-center font-serif text-[22vw] font-light leading-[0.8] tracking-[0.02em] text-[#f5f2eb] md:text-[16vw]">
            LUGAIRE
          </h2>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#f5f2eb]/10 pt-8 text-[0.7rem] uppercase tracking-[0.2em] text-[#f5f2eb]/50 md:flex-row">
          <span>© MMXXVI LUGAIRE — All rights reserved</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#f5f2eb]">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-[#f5f2eb]">
              Pinterest
            </a>
            <a href="#" className="transition-colors hover:text-[#f5f2eb]">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
