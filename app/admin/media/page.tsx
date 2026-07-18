"use client"

import * as React from "react"
import Image from "next/image"
import { Upload, Search, Trash2, Copy } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { MEDIA } from "@/lib/mock/admin"

export default function AdminMediaPage() {
  const [query, setQuery] = React.useState("")

  const filtered = MEDIA.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        description="Editorial imagery and campaign assets used across the storefront."
        breadcrumbs={[{ label: "Marketing" }, { label: "Media Library" }]}
        action={
          <Button variant="copper" size="sm" onClick={() => toast.success("Upload dialog opened")}>
            <Upload className="size-4" />
            Upload
          </Button>
        }
      />

      <div className="relative mb-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search assets"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((m) => (
          <figure
            key={m.id}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card"
          >
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <Image
                src={m.src || "/placeholder.svg"}
                alt={m.name}
                fill
                sizes="(min-width:1024px) 22vw, 45vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label={`Copy ${m.name} path`}
                  onClick={() => {
                    navigator.clipboard?.writeText(m.src)
                    toast.success("Path copied")
                  }}
                >
                  <Copy className="size-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label={`Delete ${m.name}`}
                  onClick={() => toast.success(`${m.name} deleted`)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <figcaption className="flex flex-col gap-1 p-3">
              <p className="truncate text-sm font-medium" title={m.name}>
                {m.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {m.dimensions} · {m.size}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
