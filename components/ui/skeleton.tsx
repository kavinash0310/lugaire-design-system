import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] bg-[linear-gradient(90deg,var(--muted)_25%,color-mix(in_oklab,var(--muted)_60%,var(--card))_50%,var(--muted)_75%)] bg-[length:200%_100%] animate-[var(--animate-shimmer)]",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
