import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "About",
  description: "The house of LUGAIRE — restraint, permanence, and craft.",
}

const PILLARS = [
  { title: "Restraint", body: "We remove before we add. No logo, no season stamp — only proportion, weight, and line." },
  { title: "Permanence", body: "Every piece is conceived to outlast trend, and to be worn rather than preserved." },
  { title: "Craft", body: "Made by hand, in small ateliers, from cloth we mill with partners of decades." },
]

const NUMBERS = [
  { value: "2016", label: "Founded in Paris" },
  { value: "40h", label: "Per tailored jacket" },
  { value: "6", label: "Mills, all in Europe" },
  { value: "100%", label: "Traceable materials" },
]

export default function AboutPage() {
  return (
    <>
      <InfoHero
        eyebrow="The House"
        title="A quiet kind of luxury"
        description="LUGAIRE is a house of menswear built on three convictions — restraint, permanence, and craft. We make considered clothing designed to endure, and to be kept close to those who wear it."
      />

      {/* Manifesto image + text */}
      <Container size="default" className="py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-secondary">
            <Image src="/editorial/hero-portrait.png" alt="LUGAIRE atelier portrait" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
          </Reveal>
          <Reveal className="flex flex-col gap-5">
            <p className="text-eyebrow text-copper">Our Intent</p>
            <h2 className="font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
              Clothing that answers to nothing but the body and the light.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              We began with a single overcoat and a refusal to compromise. A decade on, the house remains small
              by design — each cycle a tightly edited set of pieces, each piece the result of a long conversation
              between cloth, cut, and the person who will wear it.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              We do not chase the calendar. We build a permanent wardrobe, then add to it slowly, only when a
              piece earns its place.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Pillars */}
      <div className="border-y border-border bg-secondary/40">
        <Container size="default" className="py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} className="flex flex-col gap-3">
                <span className="font-mono text-sm text-copper">0{i + 1}</span>
                <h3 className="font-display text-2xl leading-tight tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Numbers */}
      <Container size="default" className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className="flex flex-col gap-1">
              <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">{n.value}</p>
              <p className="text-sm text-muted-foreground">{n.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <div className="border-t border-border">
        <Container size="default" className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
            Considered luxury, built to endure.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="copper" size="lg" render={<Link href="/shop" />}>
              Explore the collection
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/contact" />}>
              Contact the house
            </Button>
          </div>
        </Container>
      </div>
    </>
  )
}
