"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, Textarea, Label, Field, FieldHint } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/toast"
import { CATEGORIES, COLLECTIONS, COLORS, SIZES } from "@/lib/products"
import type { AdminProduct } from "@/lib/mock/admin"

export function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)
  const isEdit = Boolean(product)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success(isEdit ? "Product updated" : "Product created", {
        description: isEdit ? "Your changes have been saved." : "The piece has been added to the catalogue.",
      })
      router.push("/admin/products")
    }, 900)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {/* Main column */}
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="font-display text-lg leading-tight">Details</h2>
          <Field>
            <Label htmlFor="name">Product name</Label>
            <Input id="name" name="name" required defaultValue={product?.name} placeholder="The Overcoat, No. 4" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" required defaultValue={product?.sku} placeholder="LG-OC-004" className="font-mono" />
            </Field>
            <Field>
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" name="price" type="number" min="0" required defaultValue={product?.price} placeholder="1480" />
            </Field>
          </div>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={5} placeholder="The atelier note for this piece…" />
            <FieldHint>A considered, editorial description shown on the product page.</FieldHint>
          </Field>
        </section>

        <section className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="font-display text-lg leading-tight">Colourways</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {COLORS.map((color) => (
              <label key={color.name} className="flex items-center gap-2.5 text-sm">
                <Checkbox name="colors" value={color.name} defaultChecked />
                <span className="flex items-center gap-2">
                  <span className="size-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                  {color.name}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="font-display text-lg leading-tight">Sizes</h2>
          <div className="flex flex-wrap gap-3">
            {SIZES.map((size) => (
              <label key={size} className="flex items-center gap-2 text-sm">
                <Checkbox name="sizes" value={size} defaultChecked />
                {size}
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar column */}
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="font-display text-lg leading-tight">Organisation</h2>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Select id="category" name="category" defaultValue={product?.category}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="collection">Collection</Label>
            <Select id="collection" name="collection" defaultValue={product?.collection}>
              {COLLECTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={product?.status ?? "Draft"}>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="stock">Stock quantity</Label>
            <Input id="stock" name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} />
          </Field>
        </section>

        <section className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6">
          <h2 className="font-display text-lg leading-tight">Media</h2>
          {product?.image ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-secondary">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="20rem" className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-border bg-secondary/40 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <ImagePlus className="size-5" />
              </span>
              <p className="px-4 text-sm text-muted-foreground">Drop an image, or browse to upload</p>
            </div>
          )}
          <Button type="button" variant="outline" size="sm">
            <ImagePlus className="size-4" />
            Upload image
          </Button>
        </section>
      </div>

      {/* Sticky actions */}
      <div className="lg:col-span-2 flex items-center justify-end gap-3 border-t border-border pt-6">
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
        <Button type="submit" variant="copper" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </Button>
      </div>
    </form>
  )
}
