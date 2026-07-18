"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, Field, Label } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [email, setEmail] = React.useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 900)
  }

  if (sent) {
    return (
      <div className="flex flex-col">
        <span className="flex size-14 items-center justify-center rounded-full bg-copper/12 text-copper">
          <MailCheck className="size-6" />
        </span>
        <h1 className="mt-6 font-display text-3xl leading-tight tracking-tight">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          If an account exists for{" "}
          <span className="text-foreground">{email || "that address"}</span>, we&apos;ve sent a link to
          reset your password. It expires in 30 minutes.
        </p>
        <Button variant="outline" size="lg" className="mt-8" render={<Link href="/reset-password" />}>
          Continue to reset
        </Button>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <p className="text-eyebrow text-copper">Account Recovery</p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight">Forgot your password?</h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Enter the email on your account and we&apos;ll send you a secure link to set a new one.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Button type="submit" variant="copper" size="lg" disabled={loading}>
          {loading ? <Spinner className="text-copper-foreground" /> : "Send reset link"}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-8 inline-flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  )
}
