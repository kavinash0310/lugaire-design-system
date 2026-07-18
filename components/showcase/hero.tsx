"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fadeUp, staggerContainer, transition } from "@/lib/motion"

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.1)}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" size="default">
                <span className="size-1.5 rounded-full bg-copper" />
                The LUGAIRE Design System
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-balance"
            >
              Considered luxury, built to endure.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-lg text-muted-foreground leading-relaxed text-pretty"
            >
              A complete foundation of tokens, typography, and components for a
              modern luxury house — restrained, tactile, and unmistakably
              premium.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Button variant="copper" size="lg" render={<a href="#components" />}>
                Explore components
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" render={<a href="#foundations" />}>
                View foundations
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition.slow}
            className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-3xl)] border border-border shadow-[var(--shadow-luxe-xl)]"
          >
            <Image
              src="/hero-atelier.png"
              alt="Model wearing a tailored charcoal overcoat in a minimal atelier"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-primary/60 to-transparent p-6">
              <div className="flex flex-col text-primary-foreground">
                <span className="text-eyebrow opacity-80">Autumn Collection</span>
                <span className="font-display text-lg">The Overcoat, No. 4</span>
              </div>
              <Badge variant="copper">New</Badge>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export { Hero }
