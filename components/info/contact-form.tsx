"use client"

import * as React from "react"
import { Input, Textarea, Label, Field } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

const TOPICS = ["General enquiry", "Sizing & fit", "Order & shipping", "Private appointment", "Press"]

export function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false)
  const [topic, setTopic] = React.useState(TOPICS[0])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Message sent", {
        description: "The house will respond within one business day.",
      })
      e.currentTarget?.reset?.()
    }, 900)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" required autoComplete="given-name" />
        </Field>
        <Field>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" required autoComplete="family-name" />
        </Field>
      </div>

      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </Field>

      <Field>
        <Label htmlFor="topic">Subject</Label>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger id="topic">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TOPICS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={6} placeholder="How may we help you?" />
      </Field>

      <div>
        <Button type="submit" variant="copper" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  )
}
