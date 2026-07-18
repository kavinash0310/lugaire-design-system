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
import { COLLECTIONS, type Collection } from "@/lib/mock/admin"

export default function AdminCollectionsPage() {
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Collection | null>(null)

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }
  function openEdit(col: Collection) {
    setEditing(col)
    setOpen(true)
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Collection updated" : "Collection created")
  }

  return (
    <>
      <AdminPageHeader
        title="Collections"
        description="Curate the seasonal and permanent lines that tell the house's story."
        breadcrumbs={[{ label: "Catalog" }, { label: "Collections" }]}
        action={
          <Button variant="copper" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add collection
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((col) => (
          <div key={col.id} className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              <Image
                src={col.image || "/placeholder.svg"}
                alt={col.name}
                fill
                sizes="(min-width:1024px) 30vw, 90vw"
                className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <StatusBadge status={col.status} />
              </div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-display text-xl leading-tight">{col.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {col.season} · {col.pieces} pieces
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" aria-label={`Edit ${col.name}`} onClick={() => openEdit(col)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${col.name}`}
                    onClick={() => toast.success(`${col.name} deleted`)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editing ? "Edit collection" : "New collection"}</ModalTitle>
            <ModalDescription>
              {editing ? "Update this line's details and visibility." : "Create a new seasonal or permanent line."}
            </ModalDescription>
          </ModalHeader>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
            <Field>
              <Label htmlFor="col-name">Name</Label>
              <Input id="col-name" required defaultValue={editing?.name} placeholder="Autumn Cycle" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="col-season">Season</Label>
                <Input id="col-season" required defaultValue={editing?.season} placeholder="AW25" />
              </Field>
              <Field>
                <Label htmlFor="col-status">Status</Label>
                <Select id="col-status" defaultValue={editing?.status ?? "Draft"}>
                  <option>Live</option>
                  <option>Scheduled</option>
                  <option>Archived</option>
                </Select>
              </Field>
            </div>
            <ModalFooter>
              <ModalClose render={<Button type="button" variant="ghost" />}>Cancel</ModalClose>
              <Button type="submit" variant="copper">
                {editing ? "Save changes" : "Create collection"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
