import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { Reveal, RevealItem } from "@/components/motion/reveal"

interface SectionProps extends React.ComponentProps<"section"> {
  eyebrow: string
  title: string
  description?: string
}

function Section({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      <Container size="wide">
        <Reveal stagger className="flex flex-col gap-4">
          <RevealItem>
            <span className="text-eyebrow text-copper">{eyebrow}</span>
          </RevealItem>
          <RevealItem className="flex flex-col gap-3">
            <h2 className="font-display text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="max-w-2xl text-base text-muted-foreground leading-relaxed text-pretty">
                {description}
              </p>
            )}
          </RevealItem>
        </Reveal>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  )
}

export { Section }
