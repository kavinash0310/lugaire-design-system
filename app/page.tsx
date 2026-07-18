'use client'

import * as React from 'react'
import { Loader } from '@/components/landing/loader'
import { Nav } from '@/components/landing/nav'
import { Hero } from '@/components/landing/hero'
import { FeaturedCollection } from '@/components/landing/featured-collection'
import { EditorialStory } from '@/components/landing/editorial-story'
import { Craftsmanship } from '@/components/landing/craftsmanship'
import { PremiumFabric } from '@/components/landing/premium-fabric'
import { Collections } from '@/components/landing/collections'
import { FeaturedProducts } from '@/components/landing/featured-products'
import { Testimonials } from '@/components/landing/testimonials'
import { Instagram } from '@/components/landing/instagram'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/landing/footer'

export default function Page() {
  const [loading, setLoading] = React.useState(true)

  // This is a cinematic dark experience — force the dark palette regardless of
  // the visitor's stored theme, and lock scroll while the loader is on screen.
  React.useEffect(() => {
    const root = document.documentElement
    const hadDark = root.classList.contains('dark')
    root.classList.add('dark')
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
      if (!hadDark) root.classList.remove('dark')
    }
  }, [loading])

  const ready = !loading

  return (
    <main className="relative bg-[#121110]">
      {loading && <Loader onDone={() => setLoading(false)} />}

      <Nav ready={ready} />
      <Hero ready={ready} />
      <FeaturedCollection />
      <EditorialStory />
      <Craftsmanship />
      <PremiumFabric />
      <Collections />
      <FeaturedProducts />
      <Testimonials />
      <Instagram />
      <Newsletter />
      <Footer />
    </main>
  )
}
