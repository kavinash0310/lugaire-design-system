import * as React from "react"
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  hint,
}: {
  label: string
  value: string
  change?: number
  icon?: LucideIcon
  hint?: string
}) {
  const positive = (change ?? 0) >= 0
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-luxe-xs)]">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-secondary text-muted-foreground">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="font-display text-3xl leading-none tracking-tight">{value}</p>
      <div className="flex items-center gap-2">
        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              positive ? "text-success" : "text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(change)}%
          </span>
        )}
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    </div>
  )
}
