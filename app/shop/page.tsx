import type { Metadata } from "next"
import Image from "next/image"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Catalog } from "@/components/shop/catalog"

export const metadata: Metadata = {
  title: "The Shop",
  description:
    "The full LUGAIRE catalogue — thirty considered pieces across outerwear, knitwear, tailoring and leather. Filter, preview, and keep what endures.",
}

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Cinematic catalogue overture */}
        <section className="grain relative flex h-[62vh] min-h-[440px] items-end overflow-hidden bg-[#141210]">
          <Image
            src="/editorial/campaign-wide.png"
            alt="LUGAIRE Autumn Cycle campaign"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-transparent" />
          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-14 md:px-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#c98a52]">
              The Catalogue — Autumn Cycle
            </p>
            <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[0.95] text-[#f5f2eb] md:text-7xl">
              Everything the house makes, in one quiet room.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-[#f5f2eb]/70">
              Thirty pieces. Five colourways. Six sizes. Preview any garment
              without leaving the grid, and keep the ones that stay with you.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <Catalog />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
