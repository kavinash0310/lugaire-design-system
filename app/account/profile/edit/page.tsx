"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input, Field, Label, FieldHint } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { CUSTOMER } from "@/lib/mock/account"

export default function EditProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Profile updated")
      router.push("/account/profile")
    }, 900)
  }

  return (
    <div>
      <Link
        href="/account/profile"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to profile
      </Link>

      <AccountHeading eyebrow="Account" title="Edit profile" description="Update your personal details and contact information." />

      <form onSubmit={onSubmit} className="max-w-2xl">
        <div className="mb-8 flex flex-col items-start gap-5 rounded-[var(--radius-2xl)] border border-border bg-card p-6 sm:flex-row sm:items-center">
          <Avatar src={CUSTOMER.avatar} name={`${CUSTOMER.firstName} ${CUSTOMER.lastName}`} size={72} />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Profile photo</p>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline">Upload new</Button>
              <Button type="button" size="sm" variant="ghost">Remove</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-[var(--radius-2xl)] border border-border bg-card p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <Label htmlFor="first">First name</Label>
              <Input id="first" defaultValue={CUSTOMER.firstName} autoComplete="given-name" required />
            </Field>
            <Field>
              <Label htmlFor="last">Last name</Label>
              <Input id="last" defaultValue={CUSTOMER.lastName} autoComplete="family-name" required />
            </Field>
          </div>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={CUSTOMER.email} autoComplete="email" required />
            <FieldHint>We&apos;ll send order updates and previews to this address.</FieldHint>
          </Field>
          <Field>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue={CUSTOMER.phone} autoComplete="tel" />
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" variant="copper" size="lg" disabled={loading}>
            {loading ? <Spinner className="text-copper-foreground" /> : "Save changes"}
          </Button>
          <Button type="button" variant="ghost" size="lg" render={<Link href="/account/profile" />}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
