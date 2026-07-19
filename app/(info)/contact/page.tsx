import type { Metadata } from "next"
import { InfoHero } from "@/components/info/info-page"
import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/info/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the house of LUGAIRE — client care, appointments, and press.",
}

const CHANNELS = [
  { label: "Client Care", value: "care@lugaire.com", note: "Replies within one business day" },
  { label: "Studio Visits", value: "studio@lugaire.com", note: "By appointment, in Paris & London" },
  { label: "Press & Partnerships", value: "press@lugaire.com", note: "For editorial and collaboration" },
]

const HOUSES = [
  { city: "Paris", lines: ["18 Rue Saint-Honoré", "75001 Paris, France", "+33 1 42 00 18 00"] },
  { city: "London", lines: ["24 Redchurch Street", "Shoreditch, E2 7DP", "+44 20 7100 4400"] },
]

export default function ContactPage() {
  return (
    <>
      <InfoHero
        eyebrow="Get in touch"
        title="Speak with the house"
        description="Whether you seek guidance on sizing, a private appointment, or a matter of press — we answer every message with the same care we give the cloth."
      />

      <Container size="default" className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <ContactForm />

          <aside className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-eyebrow text-muted-foreground">Direct lines</p>
              {CHANNELS.map((c) => (
                <div key={c.label} className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium">{c.label}</p>
                  <a href={`mailto:${c.value}`} className="text-sm text-copper transition-colors hover:text-copper/80">
                    {c.value}
                  </a>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-eyebrow text-muted-foreground">Our houses</p>
              {HOUSES.map((h) => (
                <div key={h.city} className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium">{h.city}</p>
                  {h.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
