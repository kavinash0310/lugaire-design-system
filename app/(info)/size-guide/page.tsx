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
  description: "House measurements for tees, long sleeves, sweatshirts, and hoodies — cut oversized, laid flat.",
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const

type Chart = { rows: { label: string; values: number[] }[]; note: string }

const CHARTS: { title: string; caption: string; chart: Chart }[] = [
  {
    title: "T-Shirts",
    caption: "Oversized tees, measured flat. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest (flat)", values: [54, 56, 58, 61, 64, 67] },
        { label: "Length", values: [68, 70, 72, 74, 76, 78] },
        { label: "Shoulder", values: [52, 54, 56, 58, 60, 62] },
        { label: "Sleeve", values: [22, 23, 24, 25, 26, 27] },
      ],
      note: "Drop-shoulder oversized cut; chest measured flat across the fullest point.",
    },
  },
  {
    title: "Long Sleeves",
    caption: "Boxy heavyweight long sleeves. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest (flat)", values: [55, 57, 59, 62, 65, 68] },
        { label: "Length", values: [69, 71, 73, 75, 77, 79] },
        { label: "Shoulder", values: [53, 55, 57, 59, 61, 63] },
        { label: "Sleeve", values: [60, 61, 62, 63, 64, 65] },
      ],
      note: "Boxy body with ribbed cuffs; sleeve measured from the shoulder seam.",
    },
  },
  {
    title: "Sweatshirts",
    caption: "French terry crewnecks. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest (flat)", values: [57, 59, 61, 64, 67, 70] },
        { label: "Length", values: [68, 70, 72, 74, 76, 78] },
        { label: "Shoulder", values: [55, 57, 59, 61, 63, 65] },
        { label: "Sleeve", values: [60, 61, 62, 63, 64, 65] },
      ],
      note: "Boxy, structured fit; relaxes marginally with wear and washing.",
    },
  },
  {
    title: "Hoodies",
    caption: "Brushed-fleece oversized hoodies. Measurements in centimetres.",
    chart: {
      rows: [
        { label: "Chest (flat)", values: [59, 61, 63, 66, 69, 72] },
        { label: "Length", values: [69, 71, 73, 75, 77, 79] },
        { label: "Shoulder", values: [56, 58, 60, 62, 64, 66] },
        { label: "Sleeve", values: [61, 62, 63, 64, 65, 66] },
      ],
      note: "Heavyweight oversized cut; add a size for a boxier, cropped look.",
    },
  },
]

const HOW_TO = [
  { label: "Chest", body: "Lay the garment flat and measure straight across from underarm to underarm." },
  { label: "Length", body: "Measure from the highest point of the shoulder, beside the collar, down to the hem." },
  { label: "Shoulder", body: "Measure flat across the back, from the outer edge of one shoulder seam to the other." },
  { label: "Sleeve", body: "Measure from the shoulder seam along the top of the sleeve to the cuff edge." },
]

export default function SizeGuidePage() {
  return (
    <>
      <InfoHero
        eyebrow="Client Care"
        title="Size guide"
        description="Every piece is cut oversized by design. Take your usual size for the intended relaxed fit, or size up for a boxier, more dramatic silhouette."
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
            The truest way to find your fit is to lay a piece you already love flat, measure it, and compare it
            to the charts above. All measurements are taken flat, in centimetres.
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
