import type { Metadata } from "next"
import { InfoHero, PolicyBody, type PolicySection } from "@/components/info/info-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LUGAIRE collects, uses, and protects your personal information.",
}

const SECTIONS: PolicySection[] = [
  {
    heading: "Information we collect",
    body: (
      <>
        <p>To serve you well, we collect information you provide directly and information gathered automatically:</p>
        <ul className="ml-4 flex list-disc flex-col gap-1.5">
          <li>Contact and account details — name, email, address, and phone number</li>
          <li>Order and payment information, processed securely by our payment partners</li>
          <li>Preferences, sizing notes, and communications with our client care team</li>
          <li>Device and usage data collected through cookies and similar technologies</li>
        </ul>
      </>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <>
        <p>Your information allows us to:</p>
        <ul className="ml-4 flex list-disc flex-col gap-1.5">
          <li>Process orders, arrange delivery, and handle returns</li>
          <li>Provide personal client care and fit guidance</li>
          <li>Send previews and atelier notes, only where you have opted in</li>
          <li>Protect the house and our clients against fraud</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Sharing your information",
    body: (
      <p>
        We never sell your personal information. We share it only with trusted partners who help us operate — such
        as payment processors, couriers, and technology providers — under strict confidentiality and only as
        necessary to fulfil your order.
      </p>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        We use essential cookies to run the site and optional cookies to understand how it is used and to improve
        it. You may manage your preferences at any time through your browser settings.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of your personal information, and you may withdraw
        consent to marketing at any time. To exercise these rights, write to privacy@lugaire.com.
      </p>
    ),
  },
  {
    heading: "Data security",
    body: (
      <p>
        We protect your information with encryption in transit, restricted access, and regular review. While no
        method is entirely infallible, we hold your data to the same standard of care as our craft.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <InfoHero
        eyebrow="Legal"
        title="Privacy policy"
        description="We treat your information with the same discretion and care we bring to everything the house makes."
      />
      <PolicyBody sections={SECTIONS} updated="May 2025" />
    </>
  )
}
