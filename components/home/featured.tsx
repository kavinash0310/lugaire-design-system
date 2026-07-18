"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { getFeatured } from "@/lib/products"
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion"
import { Container } from "@/components/layout/container"
import { MagazineCard } from "@/components/product/magazine-card"

export function Featured() {
  const products = getFeatured()

  return (
    <section id="featured" className="bg-background py-20 sm:py-28">
      <Container size="wide" className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-eyebrow text-copper">Curated · Not catalogued</span>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-balance">
              Six signatures
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
            The homepage shows only what the house would put its name to first.
            The remaining twenty-four live in the shop.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              className={i % 3 === 1 ? "lg:mt-16" : ""}
            >
              <MagazineCard product={product} index={i} priority={i < 2} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center pt-4">
          <Link
            href="/shop"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-display text-2xl tracking-tight transition-colors hover:text-copper"
          >
            View all thirty pieces
            <ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
