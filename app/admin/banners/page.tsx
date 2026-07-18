"use client"

import * as React from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input, Label, Field } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal"
import { toast } from "@/components/ui/toast"
import { BANNERS, type Banner } from "@/lib/mock/admin"

export default function AdminBannersPage() {
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Banner | null>(null)

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }
  function openEdit(banner: Banner) {
    setEditing(banner)
    setOpen(true)
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Banner updated" : "Banner created")
  }

  return (
    <>
      <AdminPageHeader
        title="Banners"
        description="Promotional placements across the homepage, shop, and site-wide strips."
        breadcrumbs={[{ label: "Marketing" }, { label: "Banners" }]}
        action={
          <Button variant="copper" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New banner
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {BANNERS.map((b) => (
          <div key={b.id} className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
            <div className="relative aspect-[21/9] overflow-hidden bg-secondary">
              <Image
                src={b.image || "/placeholder.svg"}
                alt={b.title}
                fill
                sizes="(min-width:1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/80 to-transparent p-5">
                <h2 className="font-display text-xl leading-tight text-foreground">{b.title}</h2>
                <p className="text-sm text-muted-foreground">{b.subtitle}</p>
              </div>
              <div className="absolute left-3 top-3">
                <StatusBadge status={b.status} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-5">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">{b.placement}</p>
                <p className="text-xs text-muted-foreground">
                  {b.starts} — {b.ends}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label={`Edit ${b.title}`} onClick={() => openEdit(b)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${b.title}`}
                  onClick={() => toast.success(`${b.title} deleted`)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editing ? "Edit banner" : "New banner"}</ModalTitle>
            <ModalDescription>
              {editing ? "Update this placement's copy and schedule." : "Create a promotional placement."}
            </ModalDescription>
          </ModalHeader>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
            <Field>
              <Label htmlFor="bn-title">Title</Label>
              <Input id="bn-title" required defaultValue={editing?.title} placeholder="Autumn Cycle" />
            </Field>
            <Field>
              <Label htmlFor="bn-subtitle">Subtitle</Label>
              <Input id="bn-subtitle" defaultValue={editing?.subtitle} placeholder="The new outerwear, in one quiet room." />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="bn-placement">Placement</Label>
                <Select id="bn-placement" defaultValue={editing?.placement ?? "Homepage Hero"}>
                  <option>Homepage Hero</option>
                  <option>Shop Header</option>
                  <option>Promo Strip</option>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="bn-status">Status</Label>
                <Select id="bn-status" defaultValue={editing?.status ?? "Draft"}>
                  <option>Live</option>
                  <option>Scheduled</option>
                  <option>Draft</option>
                </Select>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="bn-starts">Starts</Label>
                <Input id="bn-starts" defaultValue={editing?.starts} placeholder="May 1, 2025" />
              </Field>
              <Field>
                <Label htmlFor="bn-ends">Ends</Label>
                <Input id="bn-ends" defaultValue={editing?.ends} placeholder="Aug 31, 2025" />
              </Field>
            </div>
            <ModalFooter>
              <ModalClose render={<Button type="button" variant="ghost" />}>Cancel</ModalClose>
              <Button type="submit" variant="copper">
                {editing ? "Save changes" : "Create banner"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
