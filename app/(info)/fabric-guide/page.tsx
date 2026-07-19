import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Fabric Guide",
  description: "The cloths of the house — combed cotton, heavyweight jersey, French terry, and brushed fleece, and how each behaves.",
}

const FABRICS = [
  {
    name: "220 GSM Combed & Compact Cotton",
    image: "/editorial/fabric-wool.png",
    origin: "Knitted & finished in India",
    body: "The everyday base of the house. Long-staple cotton, combed to remove short fibres and compacted for a dense, smooth surface. Bio-washed to a broken-in hand from the first wear, it holds its shape through years of laundering without thinning.",
    traits: ["Breathable", "Pre-shrunk", "Softens with wear", "Holds its shape"],
  },
  {
    name: "240 GSM Heavyweight Jersey",
    image: "/editorial/fabric-cashmere.png",
    origin: "Garment-dyed in India",
    body: "A dense single-jersey knit that gives our oversized tees their weight and fall. Garment-dyed for depth of colour that fades slowly and beautifully, with reinforced shoulder seams and a ribbed collar built to keep its line.",
    traits: ["Substantial weight", "Structured drape", "Deep, lasting colour", "Reinforced seams"],
  },
  {
    name: "340–400 GSM French Terry & Fleece",
    image: "/editorial/fabric-leather.png",
    origin: "Loopback & brushed, made in India",
    body: "The warmth of the house. French terry for sweatshirts and brushed heavyweight fleece for hoodies — structured on the outside, soft against the skin within. Boxy, weighty, and made to be lived in.",
    traits: ["Brushed interior", "Boxy structure", "Warm without bulk", "Everyday durability"],
  },
  {
    name: "230 GSM Pima Cotton Blend",
    image: "/editorial/look-shirt.png",
    origin: "Long-staple Pima, finished in India",
    body: "Our most refined base. A Pima-blend jersey with a subtle sheen and an exceptional drape — smoother and more lustrous than standard cotton, it reads closer to knitwear than a basic tee. Understated, and quietly rich.",
    traits: ["Silken hand", "Subtle sheen", "Superior drape", "Resists pilling"],
  },
]

export default function FabricGuidePage() {
  return (
    <>
      <InfoHero
        eyebrow="The Cloth"
        title="Fabric guide"
        description="Every LUGAIRE piece begins with the cloth. Understanding a fabric is the first step to keeping it — here is how each behaves, and why we chose it."
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
