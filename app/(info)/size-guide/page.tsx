import type { Metadata } from "next"
import Link from "next/link"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Size Guide",
  description: "House measurements for outerwear, tailoring, shirting, knitwear, and trousers.",
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const

type Chart = { rows: { label: string; values: number[] }[]; note: string }

const CHARTS: { title: string; caption: string; chart: Chart }[] = [
  {
    title: "Outerwear & Tailoring",
    caption: "Coats, jackets, suits, and blazers. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest", values: [96, 100, 104, 110, 116, 122] },
        { label: "Waist", values: [80, 84, 88, 94, 100, 106] },
        { label: "Shoulder", values: [44, 45, 46, 47.5, 49, 50.5] },
        { label: "Length", values: [72, 74, 76, 78, 80, 82] },
        { label: "Sleeve", values: [63, 64, 65, 66, 67, 68] },
      ],
      note: "Half-canvas tailoring; chest measured across the fullest point.",
    },
  },
  {
    title: "Shirting",
    caption: "Dress shirts, oxfords, and overshirts. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest", values: [98, 102, 106, 112, 118, 124] },
        { label: "Neck", values: [37, 38, 39.5, 41, 42.5, 44] },
        { label: "Length", values: [74, 76, 78, 80, 82, 84] },
        { label: "Sleeve", values: [62, 63.5, 65, 66.5, 68, 69.5] },
      ],
      note: "Considered regular fit; sits close without constraint.",
    },
  },
  {
    title: "Knitwear",
    caption: "Cashmere, merino, and lambswool. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest", values: [94, 98, 104, 110, 116, 122] },
        { label: "Length", values: [66, 68, 70, 72, 74, 76] },
        { label: "Sleeve", values: [61, 62.5, 64, 65.5, 67, 68.5] },
      ],
      note: "Fully-fashioned; softens and relaxes marginally with wear.",
    },
  },
  {
    title: "Trousers",
    caption: "By waist size. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Waist", values: [76, 80, 84, 90, 96, 102] },
        { label: "Hip", values: [96, 100, 104, 110, 116, 122] },
        { label: "Inseam", values: [82, 82, 84, 84, 86, 86] },
        { label: "Leg opening", values: [38, 39, 40, 42, 44, 46] },
      ],
      note: "High-rise cut; inseam can be tailored on request.",
    },
  },
]

const HOW_TO = [
  { label: "Chest", body: "Measure around the fullest part of the chest, keeping the tape level and under the arms." },
  { label: "Waist", body: "Measure around the natural waistline, at the narrowest point, without pulling tight." },
  { label: "Shoulder", body: "Measure across the back, from the outer edge of one shoulder seam to the other." },
  { label: "Sleeve", body: "Measure from the shoulder seam, along a slightly bent arm, to the wrist bone." },
]

export default function SizeGuidePage() {
  return (
    <>
      <InfoHero
        eyebrow="Client Care"
        title="Size guide"
        description="Every piece is cut to a considered, true-to-size fit. If you sit between sizes, the house recommends sizing up for a softer line."
      />

      <Container size="default" className="py-14 md:py-16">
        <div className="flex flex-col gap-14">
          {CHARTS.map((c) => (
            <Reveal key={c.title} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-2xl leading-tight tracking-tight">{c.title}</h2>
                <p className="text-sm text-muted-foreground">{c.caption}</p>
              </div>
              <div className="rounded-[var(--radius-xl)] border border-border bg-card p-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-28">Measurement</TableHead>
                      {SIZES.map((s) => (
                        <TableHead key={s} className="text-center">
                          {s}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {c.chart.rows.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell className="font-medium">{row.label}</TableCell>
                        {row.values.map((v, i) => (
                          <TableCell key={i} className="text-center tabular-nums text-muted-foreground">
                            {v}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground">{c.chart.note}</p>
            </Reveal>
          ))}
        </div>

        {/* How to measure */}
        <div className="mt-16 border-t border-border pt-14">
          <p className="text-eyebrow text-copper">The method</p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">How to measure</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            For the truest result, take your measurements over a light garment, using a soft tape and, where
            possible, the help of another pair of hands.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {HOW_TO.map((h, i) => (
              <div key={h.label} className="flex flex-col gap-2">
                <span className="font-mono text-sm text-copper">0{i + 1}</span>
                <h3 className="font-display text-xl leading-tight">{h.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{h.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-border bg-secondary/40 p-8">
          <h2 className="font-display text-2xl leading-tight tracking-tight">Still between sizes?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Our atelier reads every message personally and will recommend a fit for your measurements.
          </p>
          <Link href="/contact" className="mt-1 text-sm font-medium text-copper hover:text-copper/80">
            Ask the atelier →
          </Link>
        </div>
      </Container>
    </>
  )
}
