"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function SettingsCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-border bg-card p-6">
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="font-display text-lg leading-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground text-pretty">{description}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  )
}

export function SettingsForm({
  children,
  label = "Settings",
}: {
  children: React.ReactNode
  label?: string
}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success(`${label} saved`)
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {children}
      <div className="flex justify-end gap-2 border-t border-border pt-6">
        <Button type="reset" variant="ghost">
          Reset
        </Button>
        <Button type="submit" variant="copper">
          Save changes
        </Button>
      </div>
    </form>
  )
}

export function SettingRow({
  label,
  description,
  htmlFor,
  children,
}: {
  label: string
  description?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {description && <p className="text-xs text-muted-foreground text-pretty">{description}</p>}
      </div>
      <div className="shrink-0 sm:w-64">{children}</div>
    </div>
  )
}
