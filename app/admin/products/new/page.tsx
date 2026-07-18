import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/page-header"
import { ProductForm } from "@/components/admin/product-form"

export const metadata: Metadata = { title: "Add Product" }

export default function NewProductPage() {
  return (
    <>
      <AdminPageHeader
        title="Add product"
        description="Introduce a new piece to the house catalogue."
        breadcrumbs={[{ label: "Catalog" }, { label: "Products", href: "/admin/products" }, { label: "Add product" }]}
      />
      <ProductForm />
    </>
  )
}
