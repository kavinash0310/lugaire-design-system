"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type">
>(({ className, ...props }, ref) => {
  return (
    <span className="relative inline-flex">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "peer size-5 shrink-0 cursor-pointer appearance-none rounded-[var(--radius-sm)] border border-input bg-card outline-none transition-colors duration-[var(--duration-fast)]",
          "checked:border-copper checked:bg-copper",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 text-copper-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
    </span>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
