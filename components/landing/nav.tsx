'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import * as React from 'react'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'Story', href: '#story' },
  { label: 'Craft', href: '#craft' },
  { label: 'Shop', href: '#products' },
  { label: 'Journal', href: '#instagram' },
]

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 40)
    if (menuOpen) return
    // Hide when scrolling down past the hero, reveal when scrolling up.
    if (latest > prev && latest > 160) setHidden(true)
    else setHidden(false)
  })

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: ready && !hidden ? 0 : -120 }}
        transition={{ duration: 0.6, ease: ease.luxe }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled
            ? 'border-b border-[#f5f2eb]/10 bg-[#121110]/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className="font-serif text-xl font-light tracking-[0.3em] text-[#f5f2eb] md:text-2xl"
          >
            LUGAIRE
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[0.72rem] uppercase tracking-[0.25em] text-[#f5f2eb]/70 transition-colors hover:text-[#f5f2eb]"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#b87333] transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <button className="hidden text-[0.72rem] uppercase tracking-[0.25em] text-[#f5f2eb]/70 transition-colors hover:text-[#f5f2eb] md:inline">
              Bag (0)
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[5px] md:hidden"
              aria-label="Open menu"
            >
              <span className="h-px w-6 bg-[#f5f2eb]" />
              <span className="h-px w-6 bg-[#f5f2eb]" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#121110] px-6 py-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.luxe }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.3em] text-[#f5f2eb]">LUGAIRE</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[0.72rem] uppercase tracking-[0.25em] text-[#f5f2eb]/70"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-8">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: ease.luxe, delay: 0.1 + i * 0.06 }}
                    className="block font-serif text-4xl font-light text-[#f5f2eb]"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
