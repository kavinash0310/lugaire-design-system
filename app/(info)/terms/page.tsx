import type { Metadata } from "next"
import { InfoHero, PolicyBody, type PolicySection } from "@/components/info/info-page"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of LUGAIRE and any purchase from the house.",
}

const SECTIONS: PolicySection[] = [
  {
    heading: "Acceptance of terms",
    body: (
      <p>
        By accessing this site and placing an order, you agree to these terms and conditions in full. If you do not
        accept them, please refrain from using the site.
      </p>
    ),
  },
  {
    heading: "Products & pricing",
    body: (
      <>
        <p>
          We take great care to represent every piece faithfully. Colours may vary subtly between screens, and
          natural materials carry inherent variation, which we consider part of their character.
        </p>
        <p>
          All prices are shown in the currency selected at checkout and are inclusive of applicable taxes where
          indicated. We reserve the right to correct pricing errors before an order is dispatched.
        </p>
      </>
    ),
  },
  {
    heading: "Orders & acceptance",
    body: (
      <p>
        Your order is an offer to purchase. A contract is formed only once we dispatch your order and send
        confirmation. We may decline or cancel an order where stock is unavailable, an error is identified, or fraud
        is suspected.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        All content on this site — including imagery, text, and the LUGAIRE name and marks — is the property of the
        house and protected by law. It may not be reproduced or used without our written permission.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, LUGAIRE shall not be liable for indirect or consequential loss
        arising from the use of this site. Nothing in these terms limits liability for matters that cannot lawfully
        be limited.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of France, and any dispute shall be subject to the exclusive
        jurisdiction of the courts of Paris.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: <p>Questions regarding these terms may be directed to legal@lugaire.com.</p>,
  },
]

export default function TermsPage() {
  return (
    <>
      <InfoHero
        eyebrow="Legal"
        title="Terms & conditions"
        description="The terms that govern your use of the site and any purchase made from the house of LUGAIRE."
      />
      <PolicyBody sections={SECTIONS} updated="May 2025" />
    </>
  )
}
