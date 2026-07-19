"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formatCompact } from "@/lib/mock/admin"

/* Serializable format descriptor so charts can be used from Server Components. */
export type NumberFormat = "compact" | "plain"

function fmt(n: number, f: NumberFormat = "plain"): string {
  return f === "compact" ? formatCompact(n) : String(n)
}

/* ──────────────────────────────────────────────────────────────────────────
   Lightweight, dependency-free charts rendered as SVG. Tuned to the LUGAIRE
   palette (copper accent on a neutral field) and used across admin analytics.
   ────────────────────────────────────────────────────────────────────────── */

const COPPER = "var(--color-copper)"
const MUTED = "var(--color-muted-foreground)"
const BORDER = "var(--color-border)"

function niceMax(value: number): number {
  if (value <= 0) return 10
  const pow = Math.pow(10, Math.floor(Math.log10(value)))
  const scaled = value / pow
  const step = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10
  return step * pow
}

/* ── Area / line chart ──────────────────────────────────────────────────── */

export function AreaChart({
  data,
  height = 240,
  format = "plain",
  className,
}: {
  data: { label: string; value: number }[]
  height?: number
  format?: NumberFormat
  className?: string
}) {
  const W = 720
  const H = height
  const padX = 8
  const padY = 16
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const stepX = (W - padX * 2) / (data.length - 1)
  const y = (v: number) => padY + (1 - v / max) * (H - padY * 2)
  const points = data.map((d, i) => [padX + i * stepX, y(d.value)] as const)

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")
  const areaPath = `${linePath} L${points[points.length - 1][0]},${H - padY} L${padX},${H - padY} Z`
  const gridlines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Area chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COPPER} stopOpacity="0.22" />
            <stop offset="100%" stopColor={COPPER} stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridlines.map((g) => (
          <line
            key={g}
            x1={padX}
            x2={W - padX}
            y1={padY + g * (H - padY * 2)}
            y2={padY + g * (H - padY * 2)}
            stroke={BORDER}
            strokeWidth="1"
          />
        ))}
        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" stroke={COPPER} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="var(--color-card)" stroke={COPPER} strokeWidth="2" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
      <div className="sr-only">
        {data.map((d) => (
          <span key={d.label}>
            {d.label}: {fmt(d.value, format)}.{" "}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Bar chart ──────────────────────────────────────────────────────────── */

export function BarChart({
  data,
  height = 240,
  format = "plain",
  className,
}: {
  data: { label: string; value: number }[]
  height?: number
  format?: NumberFormat
  className?: string
}) {
  const max = niceMax(Math.max(...data.map((d) => d.value)))
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-[var(--radius-sm)] bg-copper/80 transition-all duration-[var(--duration-base)] ease-[var(--ease-luxe)] group-hover:bg-copper"
                style={{ height: `${(d.value / max) * 100}%` }}
                title={`${d.label}: ${fmt(d.value, format)}`}
              />
            </div>
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Grouped bar chart (two series) ─────────────────────────────────────── */

export function GroupedBarChart({
  data,
  keys,
  colors = [COPPER, MUTED],
  height = 240,
  className,
}: {
  data: Record<string, number | string>[]
  keys: { key: string; label: string }[]
  colors?: string[]
  height?: number
  className?: string
}) {
  const max = niceMax(
    Math.max(...data.flatMap((d) => keys.map((k) => Number(d[k.key])))),
  )
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              {keys.map((k, ki) => (
                <div
                  key={k.key}
                  className="w-full max-w-4 rounded-t-[var(--radius-sm)] transition-all duration-[var(--duration-base)]"
                  style={{ height: `${(Number(d[k.key]) / max) * 100}%`, backgroundColor: colors[ki % colors.length] }}
                  title={`${k.label}: ${d[k.key]}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{String(d.label ?? d.month ?? "")}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-5">
        {keys.map((k, ki) => (
          <span key={k.key} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: colors[ki % colors.length] }} />
            {k.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Horizontal ranked bars ─────────────────────────────────────────────── */

export function RankedBars({
  data,
  format = "plain",
  className,
}: {
  data: { label: string; value: number }[]
  format?: NumberFormat
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">{d.label}</span>
            <span className="tabular-nums text-muted-foreground">{fmt(d.value, format)}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-copper transition-all duration-[var(--duration-slow)] ease-[var(--ease-luxe)]"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Donut chart ────────────────────────────���───────────────────────────── */

const DONUT_COLORS = [
  "var(--color-copper)",
  "color-mix(in oklab, var(--color-copper) 70%, var(--color-background))",
  "color-mix(in oklab, var(--color-copper) 45%, var(--color-background))",
  "var(--color-muted-foreground)",
  "color-mix(in oklab, var(--color-muted-foreground) 60%, var(--color-background))",
  "color-mix(in oklab, var(--color-muted-foreground) 35%, var(--color-background))",
]

export function DonutChart({
  data,
  format = "plain",
  className,
}: {
  data: { label: string; value: number }[]
  format?: NumberFormat
  className?: string
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const R = 60
  const C = 2 * Math.PI * R
  let offset = 0

  return (
    <div className={cn("flex flex-col items-center gap-6 sm:flex-row sm:gap-8", className)}>
      <div className="relative shrink-0">
        <svg viewBox="0 0 160 160" className="size-40 -rotate-90">
          {data.map((d, i) => {
            const frac = d.value / total
            const dash = frac * C
            const seg = (
              <circle
                key={d.label}
                cx="80"
                cy="80"
                r={R}
                fill="none"
                stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
                strokeWidth="20"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += dash
            return seg
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl leading-none tracking-tight">{fmt(total, format)}</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2.5">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
              />
              <span className="text-foreground">{d.label}</span>
            </span>
            <span className="tabular-nums text-muted-foreground">{fmt(d.value, format)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
