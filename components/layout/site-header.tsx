"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const NAV = [
  { label: "Collections", href: "#collections" },
  { label: "Atelier", href: "#atelier" },
  { label: "Journal", href: "#journal" },
  { label: "Stockists", href: "#stockists" },
]

function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-base)] ease-[var(--ease-luxe)]",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-[0.2em] uppercase"
          >
            Lugaire
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="copper" size="sm" className="hidden sm:inline-flex">
              Shop
            </Button>

            <Drawer>
              <DrawerTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="md:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="size-5" />
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <DrawerBody className="flex flex-col gap-1">
                  {NAV.map((item) => (
                    <DrawerClose
                      key={item.label}
                      render={
                        <a
                          href={item.href}
                          className="rounded-[var(--radius-md)] px-3 py-3 text-base text-foreground transition-colors hover:bg-secondary"
                        />
                      }
                    >
                      {item.label}
                    </DrawerClose>
                  ))}
                  <Button variant="copper" className="mt-4">
                    Shop the collection
                  </Button>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Container>
    </header>
  )
}

export { SiteHeader }
