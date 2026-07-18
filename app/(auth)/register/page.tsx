"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input, Field, Label, FieldHint } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordField } from "@/components/auth/password-field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Your account has been created")
      router.push("/account")
    }, 900)
  }

  return (
    <div className="flex flex-col">
      <p className="text-eyebrow text-copper">Join the House</p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Save pieces, track orders, and receive private previews of each cycle.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="first">First name</Label>
            <Input id="first" placeholder="Julian" autoComplete="given-name" required />
          </Field>
          <Field>
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Vasquez" autoComplete="family-name" required />
          </Field>
        </div>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <PasswordField id="password" placeholder="Create a password" autoComplete="new-password" required />
          <FieldHint>At least 8 characters, with a number and a symbol.</FieldHint>
        </Field>

        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <Checkbox className="mt-0.5" required />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-foreground underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <Button type="submit" variant="copper" size="lg" disabled={loading} className="mt-1">
          {loading ? <Spinner className="text-copper-foreground" /> : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
