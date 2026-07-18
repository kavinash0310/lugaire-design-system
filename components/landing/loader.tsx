'use client'

import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { ease } from '@/lib/motion'

export function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = React.useState(0)
  const [exiting, setExiting] = React.useState(false)

  React.useEffect(() => {
    const start = performance.now()
    const total = 1900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1)
      // Ease-out so the counter decelerates toward 100.
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        window.setTimeout(onDone, 900)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121110] text-[#f5f2eb]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: ease.luxe }}
        >
          {/* Brand mark */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: ease.luxe, delay: 0.1 }}
              className="block font-serif text-4xl font-light tracking-[0.35em] md:text-6xl"
            >
              LUGAIRE
            </motion.span>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-[0.7rem] uppercase tracking-[0.4em] text-[#a39c8e]"
          >
            Maison de Couture
          </motion.span>

          {/* Progress line */}
          <div className="mt-14 h-px w-56 overflow-hidden bg-[#f5f2eb]/15 md:w-72">
            <motion.div
              className="h-full bg-[#b87333]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: 'left' }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>

          <div className="mt-4 flex w-56 justify-between text-[0.7rem] tabular-nums tracking-[0.2em] text-[#a39c8e] md:w-72">
            <span>LOADING</span>
            <span>{String(count).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
