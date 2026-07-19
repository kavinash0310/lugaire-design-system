"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, LayoutDashboard, Menu, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/components/site/wishlist-provider"
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
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

// Demo entry points (no auth yet) surfaced in the mobile menu.
const DEMO_NAV = [
  { label: "My Account", href: "/account", icon: User },
  { label: "Admin Panel", href: "/admin", icon: LayoutDashboard },
]

function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false)
  const { count } = useWishlist()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const opaque = solid || scrolled

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter,color] duration-[var(--duration-base)] ease-[var(--ease-luxe)]",
        opaque
          ? "border-b border-border glass text-foreground"
          : "border-b border-transparent bg-transparent text-[#f5f2eb]",
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-[0.2em] uppercase"
          >
            Lugaire
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Wishlist, ${count} items`}
              className="relative"
              render={<Link href="/account/wishlist" />}
            >
              <Heart className="size-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-copper text-[0.6rem] font-medium text-copper-foreground">
                  {count}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Cart"
              render={<Link href="/cart" />}
            >
              <ShoppingBag className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="My account"
              className="hidden sm:inline-flex"
              render={<Link href="/account" />}
            >
              <User className="size-5" />
            </Button>
            <Button
              variant="copper"
              size="sm"
              className="hidden sm:inline-flex"
              render={<Link href="/shop" />}
            >
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
                        <Link
                          href={item.href}
                          className="rounded-[var(--radius-md)] px-3 py-3 text-base text-foreground transition-colors hover:bg-secondary"
                        />
                      }
                    >
                      {item.label}
                    </DrawerClose>
                  ))}
                  <Button variant="copper" className="mt-4" render={<Link href="/shop" />}>
                    Shop the collection
                  </Button>

                  <p className="mt-6 px-3 text-eyebrow text-muted-foreground">Demo access</p>
                  {DEMO_NAV.map((item) => (
                    <DrawerClose
                      key={item.label}
                      render={
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-3 text-base text-foreground transition-colors hover:bg-secondary"
                        />
                      }
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </DrawerClose>
                  ))}
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
