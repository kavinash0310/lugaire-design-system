"use client"

import * as React from "react"
import { Plus, Pencil, Trash2, Copy } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Input, Label, Field, FieldHint } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
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
import { COUPONS, type Coupon } from "@/lib/mock/admin"

function couponValue(c: Coupon): string {
  if (c.type === "Percentage") return `${c.value}% off`
  if (c.type === "Fixed") return `$${c.value} off`
  return "Free shipping"
}

export default function AdminCouponsPage() {
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Coupon | null>(null)

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }
  function openEdit(coupon: Coupon) {
    setEditing(coupon)
    setOpen(true)
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Coupon updated" : "Coupon created")
  }

  return (
    <>
      <AdminPageHeader
        title="Coupons"
        description="Discount codes and shipping offers — usage, limits, and validity."
        breadcrumbs={[{ label: "Marketing" }, { label: "Coupons" }]}
        action={
          <Button variant="copper" size="sm" onClick={openCreate}>
            <Plus className="size-4" />
            New coupon
          </Button>
        }
      />

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COUPONS.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(c.code)
                      toast.success(`Copied ${c.code}`)
                    }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-secondary px-2.5 py-1 font-mono text-xs font-medium tracking-wide transition-colors hover:bg-muted"
                  >
                    {c.code}
                    <Copy className="size-3 text-muted-foreground" />
                  </button>
                </TableCell>
                <TableCell className="text-muted-foreground">{c.type}</TableCell>
                <TableCell className="font-medium">{couponValue(c)}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">
                  {c.used.toLocaleString()} / {c.limit.toLocaleString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={c.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{c.expires}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" aria-label={`Edit ${c.code}`} onClick={() => openEdit(c)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete ${c.code}`}
                      onClick={() => toast.success(`${c.code} deleted`)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editing ? "Edit coupon" : "New coupon"}</ModalTitle>
            <ModalDescription>
              {editing ? "Update this code's discount and limits." : "Create a discount code for the storefront."}
            </ModalDescription>
          </ModalHeader>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
            <Field>
              <Label htmlFor="cp-code">Code</Label>
              <Input id="cp-code" required defaultValue={editing?.code} placeholder="ATELIER15" className="font-mono uppercase" />
              <FieldHint>Shown to customers at checkout. Uppercase, no spaces.</FieldHint>
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="cp-type">Type</Label>
                <Select id="cp-type" defaultValue={editing?.type ?? "Percentage"}>
                  <option>Percentage</option>
                  <option>Fixed</option>
                  <option>Free shipping</option>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="cp-value">Value</Label>
                <Input id="cp-value" type="number" min={0} defaultValue={editing?.value} placeholder="15" />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="cp-limit">Usage limit</Label>
                <Input id="cp-limit" type="number" min={0} defaultValue={editing?.limit} placeholder="500" />
              </Field>
              <Field>
                <Label htmlFor="cp-status">Status</Label>
                <Select id="cp-status" defaultValue={editing?.status ?? "Active"}>
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Expired</option>
                </Select>
              </Field>
            </div>
            <Field>
              <Label htmlFor="cp-expires">Expires</Label>
              <Input id="cp-expires" defaultValue={editing?.expires} placeholder="Jun 30, 2025" />
            </Field>
            <ModalFooter>
              <ModalClose render={<Button type="button" variant="ghost" />}>Cancel</ModalClose>
              <Button type="submit" variant="copper">
                {editing ? "Save changes" : "Create coupon"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
