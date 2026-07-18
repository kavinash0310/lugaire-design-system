import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const COLUMNS = [
  {
    title: "House",
    links: ["Collections", "Atelier", "Journal", "Sustainability"],
  },
  {
    title: "Client Care",
    links: ["Shipping", "Returns", "Size Guide", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Stockists"],
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
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
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
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
