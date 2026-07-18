"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close

type Side = "right" | "left" | "top" | "bottom"

const sideClasses: Record<Side, string> = {
  right:
    "inset-y-0 right-0 h-full w-[min(26rem,calc(100vw-2rem))] border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
  left:
    "inset-y-0 left-0 h-full w-[min(26rem,calc(100vw-2rem))] border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
  top:
    "inset-x-0 top-0 w-full max-h-[85vh] border-b data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full",
  bottom:
    "inset-x-0 bottom-0 w-full max-h-[85vh] border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
}

function DrawerContent({
  className,
  children,
  side = "right",
  showClose = true,
  ...props
}: DialogPrimitive.Popup.Props & { side?: Side; showClose?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-[2px] transition-opacity duration-[var(--duration-base)] ease-[var(--ease-luxe)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
      <DialogPrimitive.Popup
        className={cn(
          "fixed z-50 flex flex-col border-border bg-card text-card-foreground shadow-[var(--shadow-luxe-xl)]",
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxe)] focus-visible:outline-none",
          sideClasses[side],
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none"
            aria-label="Close"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 border-b border-border p-6 pr-12", className)}
      {...props}
    />
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 border-t border-border p-6", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "font-display text-xl leading-tight tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
