"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "@/components/theme-provider"

export function Toaster() {
  const { theme } = useTheme()

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!bg-card !text-card-foreground !border-border !rounded-[var(--radius)] !shadow-lg !font-sans",
          title: "!font-medium",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground",
          cancelButton: "!bg-muted !text-muted-foreground",
          error: "!border-destructive/40",
          success: "!border-success/40",
        },
      }}
    />
  )
}

export { toast } from "sonner"
