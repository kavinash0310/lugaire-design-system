"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import { Input, Field, Label } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

const COUNTRIES = ["United States", "United Kingdom", "France", "Italy", "Japan", "Singapore", "Denmark", "Portugal"]

export default function AddAddressPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Address saved")
      router.push("/account/addresses")
    }, 900)
  }

  return (
    <div>
      <Link
        href="/account/addresses"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to addresses
      </Link>

      <AccountHeading eyebrow="Delivery" title="Add address" description="Save a new shipping address for checkout." />

      <form onSubmit={onSubmit} className="max-w-2xl">
        <div className="flex flex-col gap-5 rounded-[var(--radius-2xl)] border border-border bg-card p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="label">Label</Label>
              <Input id="label" placeholder="Home, Studio…" required />
            </Field>
            <Field>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Julian Vasquez" autoComplete="name" required />
            </Field>
          </div>
          <Field>
            <Label htmlFor="line1">Address line 1</Label>
            <Input id="line1" placeholder="Street address" autoComplete="address-line1" required />
          </Field>
          <Field>
            <Label htmlFor="line2">Address line 2</Label>
            <Input id="line2" placeholder="Apartment, suite, floor (optional)" autoComplete="address-line2" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="city">City</Label>
              <Input id="city" autoComplete="address-level2" required />
            </Field>
            <Field>
              <Label htmlFor="region">State / Region</Label>
              <Input id="region" autoComplete="address-level1" required />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="postal">Postal code</Label>
              <Input id="postal" autoComplete="postal-code" required />
            </Field>
            <Field>
              <Label htmlFor="country">Country</Label>
              <Select id="country" defaultValue="United States" required>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" autoComplete="tel" required />
          </Field>

          <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Checkbox defaultChecked /> Set as default address
          </label>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="copper" size="lg" disabled={loading}>
            {loading ? <Spinner className="text-copper-foreground" /> : "Save address"}
          </Button>
          <Button type="button" variant="ghost" size="lg" render={<Link href="/account/addresses" />}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
