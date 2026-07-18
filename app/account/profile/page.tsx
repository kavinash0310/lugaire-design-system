import type { Metadata } from "next"
import Link from "next/link"
import { Pencil, ShieldCheck } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CUSTOMER } from "@/lib/mock/account"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your LUGAIRE profile and preferences.",
}

const DETAILS = [
  { label: "First name", value: CUSTOMER.firstName },
  { label: "Last name", value: CUSTOMER.lastName },
  { label: "Email", value: CUSTOMER.email },
  { label: "Phone", value: CUSTOMER.phone },
  { label: "Member since", value: CUSTOMER.since },
  { label: "Tier", value: CUSTOMER.tier },
]

const PREFERENCES = [
  { label: "Order updates", description: "Shipping, delivery, and returns notifications.", on: true },
  { label: "Private previews", description: "Early access to each cycle for Atelier Circle members.", on: true },
  { label: "Atelier notes", description: "Occasional letters on craft and material.", on: false },
  { label: "SMS alerts", description: "Time-sensitive delivery messages by text.", on: false },
]

export default function ProfilePage() {
  return (
    <div>
      <AccountHeading
        eyebrow="Account"
        title="Profile"
        description="Your details and how the house stays in touch."
        action={
          <Button variant="outline" render={<Link href="/account/profile/edit" />}>
            <Pencil className="size-4" />
            Edit profile
          </Button>
        }
      />

      {/* Identity */}
      <div className="mb-8 flex flex-col items-start gap-5 rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:flex-row sm:items-center">
        <Avatar src={CUSTOMER.avatar} name={`${CUSTOMER.firstName} ${CUSTOMER.lastName}`} size={72} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl leading-tight tracking-tight">
              {CUSTOMER.firstName} {CUSTOMER.lastName}
            </h2>
            <Badge variant="copper">{CUSTOMER.tier}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{CUSTOMER.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mb-8 rounded-[var(--radius-2xl)] border border-border bg-card">
        <div className="border-b border-border p-6">
          <h2 className="font-display text-xl leading-tight tracking-tight">Personal details</h2>
        </div>
        <dl className="grid gap-x-8 gap-y-6 p-6 sm:grid-cols-2">
          {DETAILS.map((d) => (
            <div key={d.label}>
              <dt className="text-eyebrow text-muted-foreground">{d.label}</dt>
              <dd className="mt-1.5 text-sm">{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Preferences */}
      <div className="mb-8 rounded-[var(--radius-2xl)] border border-border bg-card">
        <div className="border-b border-border p-6">
          <h2 className="font-display text-xl leading-tight tracking-tight">Communication preferences</h2>
        </div>
        <ul className="divide-y divide-border">
          {PREFERENCES.map((p) => (
            <li key={p.label} className="flex items-center justify-between gap-4 p-6">
              <div>
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
              <Switch defaultChecked={p.on} aria-label={p.label} />
            </li>
          ))}
        </ul>
      </div>

      {/* Security */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-secondary text-copper">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Password &amp; security</p>
            <p className="text-sm text-muted-foreground">Last updated 3 days ago.</p>
          </div>
        </div>
        <Button variant="ghost" render={<Link href="/reset-password" />}>
          Change password
        </Button>
      </div>
    </div>
  )
}
