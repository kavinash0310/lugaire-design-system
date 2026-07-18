import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CinematicHero } from "@/components/home/cinematic-hero"
import { MarqueeBand } from "@/components/home/marquee-band"
import { StorySection } from "@/components/home/story-section"
import { HorizontalCollection } from "@/components/home/horizontal-collection"
import { Featured } from "@/components/home/featured"
import { Timeline } from "@/components/home/timeline"
import { Manifesto } from "@/components/home/manifesto"

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CinematicHero />
        <MarqueeBand />
        <StorySection />
        <HorizontalCollection />
        <Featured />
        <Timeline />
        <Manifesto />
      </main>
      <SiteFooter />
    </div>
  )
}
