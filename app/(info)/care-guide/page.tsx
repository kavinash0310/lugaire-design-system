import type { Metadata } from "next"
import Link from "next/link"
import { Droplets, Sun, Wind, Sparkles, type LucideIcon } from "lucide-react"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Care Guide",
  description: "How to keep each piece at its best — heavyweight cotton, French terry, fleece, and printed graphics, cared for well.",
}

const PRINCIPLES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Wind, title: "Rest between wears", body: "Give natural fibres a day to recover. Rest returns their shape and shakes out creases without a press." },
  { icon: Sun, title: "Keep from light", body: "Store away from direct sunlight, which fades dye and weakens fibre over time." },
  { icon: Droplets, title: "Clean sparingly", body: "The less you wash, the longer a garment lasts. Spot-clean first; launder only when truly needed." },
  { icon: Sparkles, title: "Store with room", body: "Use broad hangers and give pieces space to breathe. Never crowd a wardrobe." },
]

const GUIDES = [
  {
    fabric: "Heavyweight Cotton Tees",
    steps: [
      "Machine wash cold on a gentle cycle, turned inside out, with like colours.",
      "Use a mild detergent and skip the fabric softener — it coats the fibres and dulls the hand.",
      "Line dry in shade, or tumble on low and remove while slightly damp to protect the shape.",
      "Cool iron on the reverse if needed; never iron directly over a print.",
    ],
  },
  {
    fabric: "French Terry & Fleece",
    steps: [
      "Wash cold, inside out, and fasten any drawcords to keep them from tangling.",
      "Wash with similar weights to avoid pilling against rougher fabrics.",
      "Reshape by hand and lay flat or line dry; high heat can shrink and stiffen the loopback.",
      "Steam rather than press to lift creases from the body and hood.",
    ],
  },
  {
    fabric: "Printed Graphics",
    steps: [
      "Always turn the garment inside out before washing to shield the print.",
      "Wash cold and avoid soaking; prolonged water contact can lift ink over time.",
      "Never tumble on high heat — warmth is the fastest way to crack a print.",
      "Iron only on the reverse, keeping the plate clear of the printed area.",
    ],
  },
  {
    fabric: "Colour & Longevity",
    steps: [
      "Wash garment-dyed and washed pieces separately for the first few cycles.",
      "Keep washes cold and infrequent — the less you wash, the longer the colour lasts.",
      "Dry away from direct sunlight, which fades dye faster than any detergent.",
      "Fold heavyweight pieces rather than hanging to avoid shoulder marks and stretch.",
    ],
  },
]

export default function CareGuidePage() {
  return (
    <>
      <InfoHero
        eyebrow="The House"
        title="Care guide"
        description="A garment made to endure asks for a little care in return. Kept well, every LUGAIRE piece is built to be worn for years, not seasons."
      />

      {/* Principles */}
      <div className="border-b border-border bg-secondary/40">
        <Container size="default" className="py-14 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <Reveal key={p.title} className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-copper/12 text-copper">
                  <p.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg leading-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* Per-fabric guides */}
      <Container size="default" className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {GUIDES.map((g) => (
            <Reveal
              key={g.fabric}
              className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-7"
            >
              <h2 className="font-display text-2xl leading-tight tracking-tight">{g.fabric}</h2>
              <ol className="flex flex-col gap-4">
                {g.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-copper">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{s}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-border bg-secondary/40 p-8">
          <h2 className="font-display text-2xl leading-tight tracking-tight">A stubborn mark?</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Before attempting anything at home, write to us. The atelier can advise on your specific piece and cloth.
          </p>
          <Link href="/contact" className="mt-1 text-sm font-medium text-copper hover:text-copper/80">
            Ask the atelier →
          </Link>
        </div>
      </Container>
    </>
  )
}
