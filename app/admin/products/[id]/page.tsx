import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AdminPageHeader } from "@/components/admin/page-header"
import { ProductForm } from "@/components/admin/product-form"
import { getAdminProduct } from "@/lib/mock/admin"

export const metadata: Metadata = { title: "Edit Product" }

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getAdminProduct(id)
  if (!product) notFound()

  return (
    <>
      <AdminPageHeader
        title={product.name}
        description="Edit this piece — pricing, availability, and presentation."
        breadcrumbs={[
          { label: "Catalog" },
          { label: "Products", href: "/admin/products" },
          { label: product.name },
        ]}
      />
      <ProductForm product={product} />
    </>
  )
}
