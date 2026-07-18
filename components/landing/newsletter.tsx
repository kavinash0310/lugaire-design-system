'use client'

import { motion } from 'motion/react'
import * as React from 'react'
import { toast } from 'sonner'
import { ease, viewportOnce } from '@/lib/motion'

export function Newsletter() {
  const [email, setEmail] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    // Simulated subscribe.
    window.setTimeout(() => {
      setSubmitting(false)
      setEmail('')
      toast.success('Welcome to the house', {
        description: 'You are on the list for private previews.',
      })
    }, 900)
  }

  return (
    <section id="newsletter" className="relative overflow-hidden bg-[#121110] px-6 py-32 text-[#f5f2eb] md:px-10 md:py-48">
      {/* Soft copper glow accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b87333]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-8 text-[0.7rem] uppercase tracking-[0.4em] text-[#b87333]"
        >
          Private Client List
        </motion.p>

        {['Be the first', 'to see what comes next.'].map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: ease.luxe, delay: i * 0.12 }}
              className="block font-serif text-[10vw] font-light leading-[0.95] tracking-[-0.02em] md:text-[4.5rem]"
            >
              {line}
            </motion.span>
          </span>
        ))}

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.3, ease: ease.luxe }}
          className="mx-auto mt-12 flex max-w-md items-center gap-0 border-b border-[#f5f2eb]/25 pb-2 focus-within:border-[#b87333]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="w-full bg-transparent py-2 text-sm tracking-[0.05em] text-[#f5f2eb] placeholder:text-[#f5f2eb]/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.25em] text-[#f5f2eb] transition-colors hover:text-[#b87333] disabled:opacity-50"
          >
            {submitting ? 'Joining…' : 'Subscribe'}
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-[0.7rem] tracking-[0.05em] text-[#f5f2eb]/50"
        >
          No noise. Only invitations, previews and the occasional letter.
        </motion.p>
      </div>
    </section>
  )
}
