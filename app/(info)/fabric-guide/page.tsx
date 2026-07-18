import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Fabric Guide",
  description: "The cloths of the house — wool, cashmere, leather, cotton, and linen, and how each behaves.",
}

const FABRICS = [
  {
    name: "Virgin & Double-Faced Wool",
    image: "/editorial/fabric-wool.png",
    origin: "Milled in Italy & England",
    body: "The backbone of the house. We work with virgin and double-faced wools for their weight, memory, and drape — cloths that hold a line without stiffness and warm without bulk. Naturally breathable and resilient, wool sheds creases with rest.",
    traits: ["Temperature-regulating", "Naturally water-resistant", "Holds shape", "Ages gracefully"],
  },
  {
    name: "Grade-A Cashmere",
    image: "/editorial/fabric-cashmere.png",
    origin: "Mongolian fibre, knitted in Scotland",
    body: "Sourced from the finest, longest fibres and washed in spring water, our cashmere softens with every wear rather than pilling. Fully-fashioned and knitted in a single piece to eliminate seams, it is warmth made weightless.",
    traits: ["Exceptionally soft", "Lightweight warmth", "Softens with wear", "Fully-fashioned"],
  },
  {
    name: "Vegetable-Tanned Leather",
    image: "/editorial/fabric-leather.png",
    origin: "Tanned in Italy",
    body: "Aniline-dyed lambskin and calfskin, tanned slowly with natural agents. Left largely unfinished so the hide breathes and develops a personal patina over years, not seasons. Every piece becomes uniquely yours.",
    traits: ["Develops patina", "Full-grain hide", "Breathable", "Generational wear"],
  },
  {
    name: "Long-Staple Cotton & Linen",
    image: "/editorial/look-shirt.png",
    origin: "Woven in Portugal & Japan",
    body: "Two-ply Egyptian poplin, washed oxford, and garment-washed European linen. Long-staple fibres give a smoother, stronger, more lustrous cloth that launders well and only improves with use. Linen creases — beautifully, intentionally.",
    traits: ["Breathable", "Long-staple fibre", "Launders well", "Lived-in character"],
  },
]

export default function FabricGuidePage() {
  return (
    <>
      <InfoHero
        eyebrow="The Cloth"
        title="Fabric guide"
        description="We mill our cloth with partners of decades. Understanding a fabric is the first step to keeping it — here is how each behaves, and why we chose it."
      />

      <Container size="default" className="py-14 md:py-16">
        <div className="flex flex-col gap-16 md:gap-24">
          {FABRICS.map((f, i) => (
            <Reveal key={f.name}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-secondary">
                  <Image
                    src={f.image || "/placeholder.svg"}
                    alt={f.name}
                    fill
                    sizes="(min-width:1024px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-eyebrow text-copper">{f.origin}</p>
                  <h2 className="font-display text-3xl leading-tight tracking-tight text-balance">{f.name}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{f.body}</p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                    {f.traits.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="size-1.5 rounded-full bg-copper" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-border bg-secondary/40 p-8">
          <h2 className="font-display text-2xl leading-tight tracking-tight">Caring for your cloth</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Every fabric asks for a slightly different hand. Our Care Guide details how to keep each at its best.
          </p>
          <Link href="/care-guide" className="mt-1 text-sm font-medium text-copper hover:text-copper/80">
            Read the Care Guide →
          </Link>
        </div>
      </Container>
    </>
  )
}
