import * as React from "react"
import { AlertTriangle, Inbox, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface StateProps extends React.ComponentProps<"div"> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

/** Empty state — shown when a collection has no items yet. */
function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  ...props
}: StateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border border-dashed border-border px-6 py-14 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-lg leading-tight text-balance">{title}</p>
        {description && (
          <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

/** Error state — shown when a request or action fails. */
function ErrorState({
  icon: Icon = AlertTriangle,
  title,
  description,
  action,
  className,
  ...props
}: StateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-xl)] border border-destructive/25 bg-destructive/[0.04] px-6 py-14 text-center",
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/12 text-destructive">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-lg leading-tight text-balance">{title}</p>
        {description && (
          <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

/** Loading state — inline spinner with a label. */
function LoadingState({
  label = "Loading…",
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-14 text-center",
        className,
      )}
      role="status"
      {...props}
    >
      <Spinner className="size-6 text-copper" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export { EmptyState, ErrorState, LoadingState }
