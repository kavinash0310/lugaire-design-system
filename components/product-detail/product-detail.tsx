"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import type { Product } from "@/lib/products"
import {
  galleryShots,
  storyBlocks,
  reviewsFor,
} from "@/lib/product-details"
import { Container } from "@/components/layout/container"
import { ProductGallery } from "@/components/product-detail/product-gallery"
import { ProductPurchase } from "@/components/product-detail/product-purchase"
import { ProductStory } from "@/components/product-detail/product-story"
import { ProductRecommendations } from "@/components/product-detail/product-recommendations"
import { ProductReviews } from "@/components/product-detail/product-reviews"

/**
 * Client orchestrator for the Product Detail Page. Owns the shared selection
 * state (active image, colourway, size) so the gallery and the purchase panel
 * stay in lockstep — selecting a colour animates the gallery, and the gallery
 * reflects the active shot everywhere.
 */
export function ProductDetail({ product }: { product: Product }) {
  const shots = React.useMemo(() => galleryShots(product), [product])
  const blocks = React.useMemo(() => storyBlocks(product), [product])
  const reviews = React.useMemo(() => reviewsFor(product), [product])

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [color, setColor] = React.useState(product.colors[0]?.name ?? "")
  const [size, setSize] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <Container size="wide" className="pt-6 md:pt-8">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{product.name}</span>
        </motion.nav>
      </Container>

      {/* Hero: gallery + purchase */}
      <Container size="wide" className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductGallery
              shots={shots}
              productName={product.name}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              colorKey={color}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <ProductPurchase
              product={product}
              color={color}
              onColorChange={setColor}
              size={size}
              onSizeChange={setSize}
            />
          </motion.div>
        </div>
      </Container>

      {/* Storytelling */}
      <Container size="wide" className="py-8 md:py-16">
        <ProductStory blocks={blocks} />
      </Container>

      {/* Recommendations */}
      <Container size="wide" className="py-12 md:py-20">
        <ProductRecommendations product={product} />
      </Container>

      {/* Reviews */}
      <Container size="wide" className="py-12 md:py-24">
        <ProductReviews reviews={reviews} />
      </Container>
    </div>
  )
}
