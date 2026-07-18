"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled,
  "aria-label": ariaLabel,
  id,
}: {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
  "aria-label"?: string
  id?: string
}) {
  const isControlled = checked !== undefined
  const [internal, setInternal] = React.useState(defaultChecked ?? false)
  const value = isControlled ? checked : internal

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={value}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        if (!isControlled) setInternal((v) => !v)
        onCheckedChange?.(!value)
      }}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-[var(--duration-fast)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        value ? "bg-copper" : "bg-muted",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-5 rounded-full bg-card shadow-[var(--shadow-luxe-sm)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
          value ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

export { Switch }
