import * as React from "react"
import { Container } from "@/components/layout/container"

/** Editorial header for information pages. */
export function InfoHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="border-b border-border bg-secondary/40">
      <Container size="default" className="py-16 md:py-20">
        <p className="text-eyebrow text-copper">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed text-pretty">
            {description}
          </p>
        )}
      </Container>
    </header>
  )
}

export type PolicySection = { heading: string; body: React.ReactNode }

/** Long-form legal / policy body with a sticky table of contents. */
export function PolicyBody({
  sections,
  updated,
}: {
  sections: PolicySection[]
  updated: string
}) {
  return (
    <Container size="default" className="py-14 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-eyebrow text-muted-foreground">On this page</p>
            <nav className="mt-4 flex flex-col gap-2">
              {sections.map((s, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.heading}
                </a>
              ))}
            </nav>
            <p className="mt-8 text-xs text-muted-foreground">Last updated {updated}</p>
          </div>
        </aside>

        <div className="flex flex-col gap-10">
          {sections.map((s, i) => (
            <section key={i} id={`section-${i}`} className="scroll-mt-24">
              <h2 className="font-display text-2xl leading-tight tracking-tight text-balance">
                {s.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  )
}
