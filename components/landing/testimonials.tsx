'use client'

import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { ease } from '@/lib/motion'

const QUOTES = [
  {
    quote:
      'LUGAIRE understands that the finest luxury is the kind you never have to announce. The construction is simply without peer.',
    author: 'Vogue Hommes',
  },
  {
    quote:
      'A house that treats restraint as a discipline. I have worn the overcoat for three winters and it looks better than the day it arrived.',
    author: 'Aarav Mehta, Collector',
  },
  {
    quote:
      'The most quietly confident menswear coming out of the subcontinent today. Timeless in the truest sense of the word.',
    author: 'The Business of Fashion',
  },
]

export function Testimonials() {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#121110] px-6 py-32 text-[#f5f2eb] md:px-10 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 block font-serif text-7xl leading-none text-[#b87333] md:text-8xl"
          aria-hidden
        >
          &ldquo;
        </motion.span>

        <div className="relative min-h-[16rem] md:min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: ease.luxe }}
              className="absolute inset-0"
            >
              <p className="font-serif text-2xl font-light italic leading-[1.35] tracking-[-0.01em] text-[#f5f2eb] md:text-4xl">
                {QUOTES[index].quote}
              </p>
              <footer className="mt-8 text-[0.72rem] uppercase tracking-[0.3em] text-[#f5f2eb]/50">
                {QUOTES[index].author}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="h-px w-10 overflow-hidden bg-[#f5f2eb]/20"
            >
              <span
                className={`block h-full bg-[#b87333] transition-transform duration-500 ${
                  i === index ? 'translate-x-0' : '-translate-x-full'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
