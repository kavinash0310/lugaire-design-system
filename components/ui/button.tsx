import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium select-none outline-none transition-[background-color,color,border-color,box-shadow,transform,opacity,filter] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-luxe-sm)] hover:opacity-90",
        copper:
          "bg-copper text-copper-foreground shadow-[var(--shadow-copper)] hover:brightness-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary",
        ghost: "bg-transparent text-foreground hover:bg-secondary",
        link: "bg-transparent text-foreground underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-luxe-sm)] hover:opacity-90",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-sm)] px-3.5 text-sm",
        default: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-13 rounded-[var(--radius-lg)] px-7 text-base",
        icon: "size-11 rounded-[var(--radius-md)]",
        "icon-sm": "size-9 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "primary",
  size = "default",
  nativeButton,
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  // When rendering as a custom element (e.g. a Link or anchor), Base UI needs
  // to know it is no longer a native <button>. Default it automatically so
  // callers can simply pass `render` without tripping the a11y warning.
  const resolvedNativeButton =
    nativeButton ?? (render === undefined ? undefined : false)

  return (
    <ButtonPrimitive
      data-slot="button"
      render={render}
      nativeButton={resolvedNativeButton}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
