import type { Metadata } from "next"
import { InfoHero, PolicyBody, type PolicySection } from "@/components/info/info-page"

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Thirty-day returns on unworn pieces — considered, and without friction.",
}

const SECTIONS: PolicySection[] = [
  {
    heading: "Thirty-day returns",
    body: (
      <p>
        We want every piece to earn its place in your wardrobe. If it does not, you may return any unworn item
        within thirty days of delivery for a full refund to the original payment method.
      </p>
    ),
  },
  {
    heading: "Condition of returns",
    body: (
      <>
        <p>To be accepted, returned pieces must be:</p>
        <ul className="ml-4 flex list-disc flex-col gap-1.5">
          <li>Unworn, unwashed, and unaltered</li>
          <li>In their original condition, with all tags attached</li>
          <li>Returned in, or with, the original packaging where possible</li>
        </ul>
        <p>Garments showing signs of wear, scent, or alteration cannot be accepted.</p>
      </>
    ),
  },
  {
    heading: "How to begin a return",
    body: (
      <>
        <p>
          Signed-in clients may open a return from their account, under Orders. Guests should write to
          care@lugaire.com with the order number. We will issue a prepaid return label and instructions.
        </p>
        <p>Returns are complimentary for domestic orders. International return shipping may be deducted from the refund.</p>
      </>
    ),
  },
  {
    heading: "Exchanges",
    body: (
      <p>
        The swiftest way to exchange a size or colourway is to return the original piece for a refund and place a
        new order. This ensures your preferred piece is reserved before stock moves.
      </p>
    ),
  },
  {
    heading: "Refund timing",
    body: (
      <p>
        Once your return reaches our atelier and passes inspection, refunds are processed within three to five
        business days. Your bank may take a further few days to reflect the credit.
      </p>
    ),
  },
  {
    heading: "Final-sale items",
    body: (
      <p>
        Signature Series drops and limited archive pieces are produced in small numbered runs and are therefore
        final sale, unless they arrive faulty. Faulty items are always covered, regardless of category.
      </p>
    ),
  },
]

export default function ReturnsPage() {
  return (
    <>
      <InfoHero
        eyebrow="Client Care"
        title="Return policy"
        description="Considered returns, without friction. Thirty days to decide whether a piece belongs in your wardrobe."
      />
      <PolicyBody sections={SECTIONS} updated="May 2025" />
    </>
  )
}
