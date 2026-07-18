import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function Avatar({
  src,
  name,
  className,
  size = 40,
}: {
  src?: string
  name: string
  className?: string
  size?: number
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span className="text-xs font-medium">{initials(name)}</span>
      )}
    </span>
  )
}

export { Avatar }
