import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react"
import { AccountHeading } from "@/components/account/account-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/states"
import { ADDRESSES } from "@/lib/mock/account"

export const metadata: Metadata = {
  title: "Address Book",
  description: "Manage your saved shipping and billing addresses.",
}

export default function AddressBookPage() {
  return (
    <div>
      <AccountHeading
        eyebrow="Delivery"
        title="Address Book"
        description="Saved addresses for faster checkout."
        action={
          <Button variant="copper" render={<Link href="/account/addresses/new" />}>
            <Plus className="size-4" />
            Add address
          </Button>
        }
      />

      {ADDRESSES.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No addresses saved"
          description="Add an address to speed through checkout next time."
          action={<Button variant="copper" render={<Link href="/account/addresses/new" />}>Add address</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ADDRESSES.map((addr) => (
            <div key={addr.id} className="flex flex-col rounded-[var(--radius-2xl)] border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="size-4 text-copper" />
                  {addr.label}
                </span>
                {addr.isDefault && <Badge variant="copper" size="sm">Default</Badge>}
              </div>
              <address className="flex-1 not-italic text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">{addr.name}</span>
                <br />
                {addr.line1}
                {addr.line2 && (
                  <>
                    <br />
                    {addr.line2}
                  </>
                )}
                <br />
                {addr.city}, {addr.region} {addr.postal}
                <br />
                {addr.country}
                <br />
                {addr.phone}
              </address>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                <Button size="sm" variant="ghost">
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
                {!addr.isDefault && (
                  <Button size="sm" variant="ghost">
                    Set default
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="ml-auto text-destructive hover:text-destructive" aria-label="Remove address">
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
