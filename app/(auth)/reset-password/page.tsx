"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, Label, FieldError } from "@/components/ui/input"
import { PasswordField } from "@/components/auth/password-field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

const RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

export default function ResetPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")

  const mismatch = confirm.length > 0 && password !== confirm
  const valid = RULES.every((r) => r.test(password)) && !mismatch && confirm.length > 0

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Your password has been reset")
      router.push("/login")
    }, 900)
  }

  return (
    <div className="flex flex-col">
      <p className="text-eyebrow text-copper">Account Recovery</p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight">Set a new password</h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Choose a strong password you don&apos;t use anywhere else.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <Field>
          <Label htmlFor="password">New password</Label>
          <PasswordField
            id="password"
            placeholder="New password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <ul className="flex flex-col gap-1.5">
          {RULES.map((rule) => {
            const ok = rule.test(password)
            return (
              <li
                key={rule.label}
                className={ok ? "flex items-center gap-2 text-xs text-success" : "flex items-center gap-2 text-xs text-muted-foreground"}
              >
                <Check className={ok ? "size-3.5" : "size-3.5 opacity-40"} />
                {rule.label}
              </li>
            )
          })}
        </ul>

        <Field>
          <Label htmlFor="confirm">Confirm password</Label>
          <PasswordField
            id="confirm"
            placeholder="Re-enter password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={mismatch}
            required
          />
          {mismatch && <FieldError>Passwords do not match.</FieldError>}
        </Field>

        <Button type="submit" variant="copper" size="lg" disabled={loading || !valid}>
          {loading ? <Spinner className="text-copper-foreground" /> : "Reset password"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
