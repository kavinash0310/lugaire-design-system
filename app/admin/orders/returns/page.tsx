"use client"

import * as React from "react"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { formatPrice } from "@/lib/products"

type ReturnStatus = "Requested" | "Approved" | "Rejected" | "Refunded"

type ReturnRow = {
  id: string
  order: string
  customer: string
  reason: string
  amount: number
  status: ReturnStatus
}

const INITIAL: ReturnRow[] = [
  { id: "r1", order: "LG-10477", customer: "Thomas Wright", reason: "Sizing — too large", amount: 620, status: "Requested" },
  { id: "r2", order: "LG-10474", customer: "Sofia Rossi", reason: "Changed mind", amount: 380, status: "Requested" },
  { id: "r3", order: "LG-10470", customer: "Priya Nair", reason: "Fabric not as expected", amount: 2280, status: "Approved" },
  { id: "r4", order: "LG-10465", customer: "Mei Lin", reason: "Arrived late", amount: 1480, status: "Refunded" },
  { id: "r5", order: "LG-10461", customer: "Rafael Costa", reason: "Duplicate order", amount: 450, status: "Rejected" },
]

export default function AdminReturnsPage() {
  const [rows, setRows] = React.useState<ReturnRow[]>(INITIAL)

  function update(id: string, status: ReturnStatus, msg: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    toast.success(msg)
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Returns"
        description="Review return requests, approve refunds, and track resolution."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: "Returns" },
        ]}
      />

      <ul className="flex flex-col gap-3">
        {rows.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-medium">{r.order}</span>
                <StatusBadge status={r.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {r.customer} · {r.reason} · {formatPrice(r.amount)}
              </p>
            </div>
            {r.status === "Requested" ? (
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => update(r.id, "Rejected", `Return ${r.order} rejected`)}
                >
                  Reject
                </Button>
                <Button
                  variant="copper"
                  size="sm"
                  onClick={() => update(r.id, "Approved", `Return ${r.order} approved`)}
                >
                  Approve
                </Button>
              </div>
            ) : r.status === "Approved" ? (
              <Button
                variant="copper"
                size="sm"
                className="shrink-0"
                onClick={() => update(r.id, "Refunded", `Refund issued for ${r.order}`)}
              >
                Issue refund
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
