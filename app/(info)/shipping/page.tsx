import type { Metadata } from "next"
import { InfoHero, PolicyBody, type PolicySection } from "@/components/info/info-page"

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "How and when the house delivers — complimentary express shipping, worldwide.",
}

const SECTIONS: PolicySection[] = [
  {
    heading: "Complimentary shipping",
    body: (
      <>
        <p>
          LUGAIRE offers complimentary express shipping on every order, with no minimum spend. Each piece is
          prepared by hand, wrapped in acid-free tissue, and dispatched from our atelier within one to two
          business days.
        </p>
        <p>You will receive a confirmation with a tracking link the moment your order leaves us.</p>
      </>
    ),
  },
  {
    heading: "Delivery timeframes",
    body: (
      <>
        <p>Once dispatched, estimated delivery windows are as follows:</p>
        <ul className="ml-4 flex list-disc flex-col gap-1.5">
          <li>Domestic — 2 to 5 business days</li>
          <li>Europe — 3 to 6 business days</li>
          <li>North America — 4 to 7 business days</li>
          <li>Rest of world — 5 to 9 business days</li>
        </ul>
        <p>Timeframes are estimates and may extend during peak periods or customs inspection.</p>
      </>
    ),
  },
  {
    heading: "Duties & taxes",
    body: (
      <p>
        For most destinations, applicable duties and taxes are calculated and settled at checkout, so your order
        arrives with nothing further to pay. Where this is not possible, any charges are the responsibility of the
        recipient and are levied by the destination customs authority.
      </p>
    ),
  },
  {
    heading: "Tracking your order",
    body: (
      <p>
        Every dispatch includes a tracking link. Signed-in clients may also follow an order&apos;s progress from
        their account, under Orders, at any time.
      </p>
    ),
  },
  {
    heading: "Signature on delivery",
    body: (
      <p>
        For the security of high-value pieces, a signature is required on delivery. If no one is available, the
        courier will leave a card and attempt redelivery, or hold the parcel at a nearby collection point.
      </p>
    ),
  },
]

export default function ShippingPage() {
  return (
    <>
      <InfoHero
        eyebrow="Client Care"
        title="Shipping policy"
        description="The house delivers worldwide with complimentary express shipping, and treats every parcel with the same care as the cloth within it."
      />
      <PolicyBody sections={SECTIONS} updated="May 2025" />
    </>
  )
}
