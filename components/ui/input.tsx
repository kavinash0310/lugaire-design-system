import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-md)] border border-input bg-card px-3.5 py-2 text-sm text-foreground shadow-[var(--shadow-luxe-xs)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/25",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-24 w-full rounded-[var(--radius-md)] border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-[var(--shadow-luxe-xs)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/25",
        className,
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-foreground leading-none peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
))
Label.displayName = "Label"

const Field = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-2", className)} {...props} />
)

const FieldHint = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p
    className={cn("text-xs text-muted-foreground leading-relaxed", className)}
    {...props}
  />
)

const FieldError = ({
  className,
  ...props
}: React.ComponentProps<"p">) => (
  <p
    className={cn("text-xs text-destructive leading-relaxed", className)}
    {...props}
  />
)

export { Input, Textarea, Label, Field, FieldHint, FieldError }
