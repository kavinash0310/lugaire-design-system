"use client"

import * as React from "react"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Label, Field } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import type { AdminOrderStatus } from "@/lib/mock/admin"

const OPTIONS: AdminOrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"]

export function OrderStatusControl({ initial }: { initial: AdminOrderStatus }) {
  const [status, setStatus] = React.useState<AdminOrderStatus>(initial)
  const [pending, setPending] = React.useState<AdminOrderStatus>(initial)

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg leading-tight">Status</h2>
        <StatusBadge status={status} />
      </div>
      <Field>
        <Label htmlFor="order-status">Update status</Label>
        <Select id="order-status" value={pending} onChange={(e) => setPending(e.target.value as AdminOrderStatus)}>
          {OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </Field>
      <Button
        variant="copper"
        disabled={pending === status}
        onClick={() => {
          setStatus(pending)
          toast.success(`Order marked as ${pending}`)
        }}
      >
        Save status
      </Button>
    </div>
  )
}
