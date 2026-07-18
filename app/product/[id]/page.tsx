import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductDetail } from "@/components/product-detail/product-detail"
import { PRODUCTS, getProduct, formatPrice } from "@/lib/products"

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Piece not found" }

  return {
    title: product.name,
    description: `${product.line} ${product.note}`,
    openGraph: {
      title: `${product.name} · ${formatPrice(product.price)}`,
      description: product.line,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        <ProductDetail product={product} />
      </main>
      <SiteFooter />
    </>
  )
}
