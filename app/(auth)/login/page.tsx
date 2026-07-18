"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input, Field, Label } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordField } from "@/components/auth/password-field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Welcome back to LUGAIRE")
      router.push("/account")
    }, 900)
  }

  return (
    <div className="flex flex-col">
      <p className="text-eyebrow text-copper">Client Access</p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Sign in to your account to view orders, saved pieces, and private previews.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-copper transition-opacity hover:opacity-80">
              Forgot password?
            </Link>
          </div>
          <PasswordField id="password" placeholder="Enter your password" autoComplete="current-password" required />
        </Field>

        <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Checkbox defaultChecked /> Keep me signed in
        </label>

        <Button type="submit" variant="copper" size="lg" disabled={loading} className="mt-1">
          {loading ? <Spinner className="text-copper-foreground" /> : "Sign in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to the house?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
