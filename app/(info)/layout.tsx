import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader solid />
      <main className="min-h-[70vh] bg-background">{children}</main>
      <SiteFooter />
    </>
  )
}
