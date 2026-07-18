import { cn } from "@/lib/utils"

const SWATCHES = [
  { name: "Primary", token: "bg-primary", text: "text-primary-foreground", hex: "#1A1A1A" },
  { name: "Secondary", token: "bg-secondary", text: "text-secondary-foreground", hex: "#F5F2EB" },
  { name: "Copper", token: "bg-copper", text: "text-copper-foreground", hex: "#B87333" },
  { name: "Muted", token: "bg-muted", text: "text-muted-foreground", hex: "#EFEAE0" },
  { name: "Background", token: "bg-background border border-border", text: "text-foreground", hex: "#FAF8F3" },
  { name: "Success", token: "bg-success", text: "text-success-foreground", hex: "#3F6212" },
  { name: "Destructive", token: "bg-destructive", text: "text-destructive-foreground", hex: "#9B2C2C" },
  { name: "Foreground", token: "bg-foreground", text: "text-background", hex: "#1A1A1A" },
]

function Palette() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {SWATCHES.map((s) => (
        <div
          key={s.name}
          className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--shadow-luxe-sm)]"
        >
          <div className={cn("flex h-24 items-end p-3", s.token, s.text)}>
            <span className="text-xs font-medium opacity-90">{s.name}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-sm font-medium">{s.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{s.hex}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Palette }
