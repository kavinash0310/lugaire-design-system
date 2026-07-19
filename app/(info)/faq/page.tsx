import type { Metadata } from "next"
import Link from "next/link"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { Accordion, type AccordionItemData } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we are asked most — orders, sizing, care, and the house itself.",
}

const GROUPS: { title: string; items: AccordionItemData[] }[] = [
  {
    title: "Orders & Payment",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Select your size and colourway on any product page, add the piece to your bag, and proceed to checkout. You may check out as a guest or sign in to your account for a faster experience.",
      },
      {
        question: "Which payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards, along with Apple Pay and Google Pay. All transactions are processed over an encrypted, secure connection.",
      },
      {
        question: "Can I amend or cancel an order after it is placed?",
        answer:
          "We begin preparing every order promptly. If you need to make a change, write to care@lugaire.com within two hours of ordering and we will do our utmost to accommodate you.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "Do you ship internationally?",
        answer:
          "Yes. The house ships to over ninety countries. Complimentary express shipping is offered on all orders, with duties and taxes calculated at checkout where applicable.",
      },
      {
        question: "How long will my order take to arrive?",
        answer:
          "Domestic orders arrive within 2–5 business days. International orders typically arrive within 5–9 business days, depending on customs. A tracking link accompanies every dispatch.",
      },
    ],
  },
  {
    title: "Sizing & Fit",
    items: [
      {
        question: "How do your garments fit?",
        answer: (
          <>
            Each piece is cut to a considered, true-to-size fit. Detailed measurements are found on our{" "}
            <Link href="/size-guide" className="text-copper hover:text-copper/80">
              Size Guide
            </Link>
            . If you sit between sizes, we recommend sizing up for a softer line.
          </>
        ),
      },
      {
        question: "What if a piece does not fit?",
        answer: (
          <>
            Unworn pieces may be returned within thirty days. See our{" "}
            <Link href="/returns" className="text-copper hover:text-copper/80">
              Return Policy
            </Link>{" "}
            for full details.
          </>
        ),
      },
    ],
  },
  {
    title: "Care & The House",
    items: [
      {
        question: "How should I care for my garments?",
        answer: (
          <>
            Care varies by cloth. Our{" "}
            <Link href="/care-guide" className="text-copper hover:text-copper/80">
              Care Guide
            </Link>{" "}
            details how to keep each fabric at its best for years to come.
          </>
        ),
      },
      {
        question: "Where are your garments made?",
        answer:
          "Every piece is cut, printed, and finished by hand in small batches, from premium heavyweight cottons, French terry, and brushed fleece. We produce in considered runs rather than mass volume, so quality is checked piece by piece.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <InfoHero
        eyebrow="Client Care"
        title="Frequently asked questions"
        description="A considered answer to the questions we hear most often. If yours is not here, the house reads every message personally."
      />

      <Container size="narrow" className="py-14 md:py-16">
        <div className="flex flex-col gap-12">
          {GROUPS.map((group) => (
            <section key={group.title} className="flex flex-col gap-2">
              <p className="text-eyebrow text-copper">{group.title}</p>
              <Accordion items={group.items} />
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 rounded-[var(--radius-xl)] border border-border bg-secondary/40 p-8">
          <h2 className="font-display text-2xl leading-tight tracking-tight">Still have a question?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Our client care team responds within one business day.
          </p>
          <Link href="/contact" className="mt-1 text-sm font-medium text-copper hover:text-copper/80">
            Contact the house →
          </Link>
        </div>
      </Container>
    </>
  )
}
