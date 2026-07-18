import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { AccountShell } from "@/components/account/account-shell"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader solid />
      <main className="min-h-[70vh] bg-background">
        <AccountShell>{children}</AccountShell>
      </main>
      <SiteFooter />
    </>
  )
}
