'use client'

import { motion } from 'motion/react'
import { ImageReveal } from '@/components/motion/image-reveal'
import { TextReveal } from '@/components/motion/text-reveal'
import { ease, viewportOnce } from '@/lib/motion'

const NOTES = [
  { n: '01', t: 'Hand-finished seams', d: 'Every edge closed by hand across forty-two individual operations.' },
  { n: '02', t: 'Full-canvas construction', d: 'A floating horsehair canvas that moulds to the body over years of wear.' },
  { n: '03', t: 'Natural horn & corozo', d: 'Buttons cut from horn and tagua nut, never plastic — each one unique.' },
]

export function Craftsmanship() {
  return (
    <section id="craft" className="relative bg-[#0e0d0c] px-6 py-28 text-[#f5f2eb] md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[88rem] grid-cols-12 items-center gap-10 md:gap-16">
        {/* Macro image */}
        <div className="col-span-12 md:col-span-6">
          <ImageReveal
            src="/editorial/craft.png"
            alt="Tailor hand-stitching a wool lapel"
            className="aspect-[4/3] w-full"
            sizes="(max-width: 768px) 100vw, 44vw"
            parallax={30}
          />
        </div>

        {/* Text column */}
        <div className="col-span-12 md:col-span-6 md:pl-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#b87333]"
          >
            Craftsmanship
          </motion.p>

          <TextReveal
            as="h2"
            lines={['Made slowly,', 'made once.']}
            className="mb-8 font-serif text-[13vw] font-light leading-[0.9] tracking-[-0.03em] md:text-[4.5rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: ease.luxe }}
            className="mb-12 max-w-md text-sm leading-relaxed text-[#f5f2eb]/70"
          >
            A single overcoat passes through the hands of eleven artisans over three weeks. We
            measure our work in hours, not units.
          </motion.p>

          <ul className="space-y-8">
            {NOTES.map((note, i) => (
              <motion.li
                key={note.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: ease.luxe, delay: i * 0.1 }}
                className="flex gap-6 border-t border-[#f5f2eb]/12 pt-6"
              >
                <span className="font-mono text-xs text-[#b87333]">{note.n}</span>
                <div>
                  <h3 className="font-serif text-xl italic">{note.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#f5f2eb]/60">{note.d}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
