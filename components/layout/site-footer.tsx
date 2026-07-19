import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const COLUMNS = [
  {
    title: "House",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/#collections" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Return Policy", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Fabric Guide", href: "/fabric-guide" },
      { label: "Care Guide", href: "/care-guide" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
]

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <span className="font-display text-2xl font-semibold tracking-[0.2em] uppercase">
              Lugaire
            </span>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed text-pretty">
              Considered luxury, built to endure. Join the list for private
              previews and atelier notes.
            </p>
            <form className="flex max-w-sm items-center gap-2">
              <Input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              />
              <Button variant="copper" type="submit">
                Join
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <p className="text-eyebrow text-muted-foreground">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} Lugaire. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <span aria-hidden className="text-border">|</span>
            <span className="text-eyebrow">Demo</span>
            <Link href="/account" className="transition-colors hover:text-foreground">
              Customer
            </Link>
            <Link href="/admin" className="transition-colors hover:text-foreground">
              Admin
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
