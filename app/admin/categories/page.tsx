"use client"

import * as React from "react"
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { Button } from "@/components/ui/button"
import { Input, Textarea, Label, Field, FieldHint } from "@/components/ui/input"
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
import { CATEGORIES, type Category } from "@/lib/mock/admin"

export default function AdminCategoriesPage() {
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Category | null>(null)

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }
  function openEdit(cat: Category) {
    setEditing(cat)
    setOpen(true)
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Category updated" : "Category created")
  }

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description="Organise the catalogue into the house's defining garment families."
        breadcrumbs={[{ label: "Catalog" }, { label: "Categories" }]}
        action={
          <Button variant="copper" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            Add category
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-copper/12 text-copper">
                <FolderTree className="size-5" />
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" aria-label={`Edit ${cat.name}`} onClick={() => openEdit(cat)}>
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${cat.name}`}
                  onClick={() => toast.success(`${cat.name} deleted`)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-xl leading-tight">{cat.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{cat.description}</p>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="tabular-nums font-medium text-foreground">{cat.products}</span> products
              <span className="ml-auto font-mono text-xs">/{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editing ? "Edit category" : "New category"}</ModalTitle>
            <ModalDescription>
              {editing ? "Update how this family appears across the store." : "Create a new garment family for the catalogue."}
            </ModalDescription>
          </ModalHeader>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
            <Field>
              <Label htmlFor="cat-name">Name</Label>
              <Input id="cat-name" required defaultValue={editing?.name} placeholder="Outerwear" />
            </Field>
            <Field>
              <Label htmlFor="cat-slug">Slug</Label>
              <Input id="cat-slug" required defaultValue={editing?.slug} placeholder="outerwear" className="font-mono" />
              <FieldHint>Used in the storefront URL.</FieldHint>
            </Field>
            <Field>
              <Label htmlFor="cat-desc">Description</Label>
              <Textarea id="cat-desc" rows={3} defaultValue={editing?.description} placeholder="Coats, trenches, and topcoats." />
            </Field>
            <ModalFooter>
              <ModalClose render={<Button type="button" variant="ghost" />}>Cancel</ModalClose>
              <Button type="submit" variant="copper">
                {editing ? "Save changes" : "Create category"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
