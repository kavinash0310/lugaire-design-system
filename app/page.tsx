import { ArrowRight, Star } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Section } from "@/components/showcase/section"
import { Hero } from "@/components/showcase/hero"
import { Palette } from "@/components/showcase/palette"
import { OverlayDemos, ToastDemos } from "@/components/showcase/interactive-demos"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldHint,
  Input,
  Label,
  Textarea,
} from "@/components/ui/input"
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/states"

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        {/* Foundations — Color */}
        <Section
          id="foundations"
          eyebrow="Foundations"
          title="A restrained, warm palette"
          description="Five core colors anchor the system: a near-black primary, a warm bone secondary, and copper reserved exclusively for moments that matter."
          className="bg-secondary/30"
        >
          <Palette />
        </Section>

        {/* Typography */}
        <Section
          eyebrow="Foundations"
          title="Typography with intent"
          description="Cormorant Garamond for display sets an editorial tone; Geist carries body copy with clarity."
        >
          <div className="flex flex-col gap-8 rounded-[var(--radius-2xl)] border border-border bg-card p-8 shadow-[var(--shadow-luxe-sm)] sm:p-12">
            <div className="flex flex-col gap-1 border-b border-border pb-6">
              <span className="text-eyebrow text-copper">Display · Serif</span>
              <p className="font-display text-6xl leading-[0.95] tracking-[-0.03em]">
                Aa Bb Cc
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow text-muted-foreground">The scale</span>
              <p className="font-display text-5xl leading-tight tracking-tight text-balance">
                The overcoat, reimagined
              </p>
              <p className="font-display text-3xl leading-tight text-muted-foreground">
                Considered from collar to cuff
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
                Body copy is set in Geist at a comfortable measure with relaxed
                line height for long-form reading. Every garment is a study in
                proportion, weight, and the quiet confidence of good materials.
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                Monospace · SKU-LG-0042 · $1,480
              </p>
            </div>
          </div>
        </Section>

        {/* Buttons & Badges */}
        <Section
          id="components"
          eyebrow="Components"
          title="Buttons & badges"
          description="Seven button variants and five sizes, each with copper reserved for primary intent."
          className="bg-secondary/30"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-2xl)] border border-border bg-card p-8 shadow-[var(--shadow-luxe-sm)]">
              <Button variant="copper">
                Shop now
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button variant="copper" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-2xl)] border border-border bg-card p-8 shadow-[var(--shadow-luxe-sm)]">
              <Badge variant="copper">
                <Star className="size-3" />
                Featured
              </Badge>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="muted">Muted</Badge>
              <Badge variant="success">In stock</Badge>
              <Badge variant="destructive">Sold out</Badge>
            </div>
          </div>
        </Section>

        {/* Forms */}
        <Section
          eyebrow="Components"
          title="Forms & inputs"
          description="Accessible fields with labels, hints, and validation states built in."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Client details</CardTitle>
                <CardDescription>All fields are required.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Field>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Amara Okafor" />
                  <FieldHint>As it should appear on your order.</FieldHint>
                </Field>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="not-an-email"
                    aria-invalid="true"
                  />
                  <FieldError>Enter a valid email address.</FieldError>
                </Field>
                <Field>
                  <Label htmlFor="note">Note to atelier</Label>
                  <Textarea id="note" placeholder="Any special requests…" />
                </Field>
              </CardContent>
              <CardFooter>
                <Button variant="copper">Save details</Button>
                <Button variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>

            <Card interactive className="overflow-hidden">
              <CardHeader>
                <Badge variant="copper" className="w-fit">
                  Interactive
                </Badge>
                <CardTitle className="mt-2">Hover me</CardTitle>
                <CardDescription>
                  Cards can lift on hover with soft copper-tinted depth — ideal
                  for product tiles and editorial links.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col gap-3">
                  {["Craftsmanship", "Materials", "Provenance"].map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">Verified</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn more
                  <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* Overlays & Toasts */}
        <Section
          eyebrow="Components"
          title="Overlays & notifications"
          description="Modals, drawers, and toasts share the same easing and depth language for a cohesive feel."
          className="bg-secondary/30"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Modals & drawers</CardTitle>
                <CardDescription>
                  Built on Base UI with focus trapping, scroll locking, and
                  animated entrances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OverlayDemos />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Toasts</CardTitle>
                <CardDescription>
                  Theme-aware notifications for confirmations, errors, and
                  actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ToastDemos />
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* States */}
        <Section
          eyebrow="Components"
          title="Feedback & states"
          description="Empty, error, and loading states — plus shimmering skeletons — keep the experience considered even when there's nothing to show."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <EmptyState
              title="Your archive is empty"
              description="Save pieces you love and they'll appear here."
              action={<Button variant="outline">Browse collection</Button>}
            />
            <ErrorState
              title="Something went wrong"
              description="We couldn't load your archive. Please try again."
              action={<Button variant="outline">Retry</Button>}
            />
            <div className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card p-4 shadow-[var(--shadow-luxe-sm)]">
              <Skeleton className="aspect-[4/3] w-full rounded-[var(--radius-lg)]" />
              <div className="flex flex-col gap-2.5 pt-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="mt-2 h-9 w-28 rounded-[var(--radius-md)]" />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-luxe-sm)]">
            <LoadingState label="Loading the collection…" />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}
