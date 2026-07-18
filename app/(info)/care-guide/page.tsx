import type { Metadata } from "next"
import Link from "next/link"
import { Droplets, Sun, Wind, Sparkles, type LucideIcon } from "lucide-react"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Care Guide",
  description: "How to keep each cloth at its best — wool, cashmere, leather, and cotton, cared for well.",
}

const PRINCIPLES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Wind, title: "Rest between wears", body: "Give natural fibres a day to recover. Rest returns their shape and shakes out creases without a press." },
  { icon: Sun, title: "Keep from light", body: "Store away from direct sunlight, which fades dye and weakens fibre over time." },
  { icon: Droplets, title: "Clean sparingly", body: "The less you wash, the longer a garment lasts. Spot-clean first; launder only when truly needed." },
  { icon: Sparkles, title: "Store with room", body: "Use broad hangers and give pieces space to breathe. Never crowd a wardrobe." },
]

const GUIDES = [
  {
    fabric: "Wool & Tailoring",
    steps: [
      "Brush gently with a soft garment brush after wearing, following the grain of the cloth.",
      "Hang on a broad, shaped hanger and rest for a day between wears.",
      "Steam to release creases rather than pressing directly with a hot iron.",
      "Dry clean only when necessary — over-cleaning strips the natural lanolin.",
    ],
  },
  {
    fabric: "Cashmere & Knitwear",
    steps: [
      "Hand wash in cool water with a gentle wool detergent, or use a specialist cashmere cycle.",
      "Never wring. Press water out gently and reshape by hand.",
      "Dry flat, away from heat and light, to preserve the fibre and shape.",
      "De-pill with a cashmere comb as needed; fold rather than hang to avoid shoulder marks.",
    ],
  },
  {
    fabric: "Leather & Suede",
    steps: [
      "Wipe with a soft, dry cloth after wear to lift surface dust.",
      "Allow to dry naturally if caught in rain — never near direct heat.",
      "Condition leather once or twice a year with a natural balm to nourish the hide.",
      "Brush suede with a dedicated brush; store on a shaped hanger, away from light.",
    ],
  },
  {
    fabric: "Cotton & Linen",
    steps: [
      "Machine wash cool on a gentle cycle, turned inside out, with like colours.",
      "Wash linen separately at first; it may release a little colour and lint.",
      "Line dry where possible, or tumble on low and remove while slightly damp.",
      "Cool iron while damp for a crisp finish, or embrace linen's natural crease.",
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
