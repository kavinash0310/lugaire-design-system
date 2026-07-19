import { SettingsCard, SettingsForm, SettingRow } from "@/components/admin/settings-section"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/status-badge"
import { Plus } from "lucide-react"

const ZONES = [
  { name: "Domestic (US)", rate: "Free over $150", time: "2–4 days", status: "Active" },
  { name: "Europe", rate: "$25 flat", time: "4–7 days", status: "Active" },
  { name: "Asia Pacific", rate: "$40 flat", time: "5–9 days", status: "Active" },
  { name: "Rest of world", rate: "$55 flat", time: "7–14 days", status: "Draft" },
]

export default function ShippingSettingsPage() {
  return (
    <SettingsForm label="Shipping settings">
      <SettingsCard title="Delivery options" description="Store-wide shipping behavior.">
        <SettingRow label="Free shipping threshold" htmlFor="free-threshold" description="Orders above this amount ship free.">
          <Input id="free-threshold" type="number" defaultValue={150} />
        </SettingRow>
        <SettingRow label="Local pickup" description="Allow customers to collect from the atelier.">
          <div className="flex sm:justify-end">
            <Switch defaultChecked aria-label="Local pickup" />
          </div>
        </SettingRow>
        <SettingRow label="Signature on delivery" description="Require a signature for high-value orders.">
          <div className="flex sm:justify-end">
            <Switch defaultChecked aria-label="Signature on delivery" />
          </div>
        </SettingRow>
      </SettingsCard>

      <SettingsCard title="Shipping zones" description="Regional rates and delivery estimates.">
        <div className="flex flex-col gap-3">
          {ZONES.map((z) => (
            <div
              key={z.name}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border p-4"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">{z.name}</p>
                <p className="text-xs text-muted-foreground">
                  {z.rate} · {z.time}
                </p>
              </div>
              <StatusBadge status={z.status} />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="self-start">
            <Plus className="size-4" />
            Add zone
          </Button>
        </div>
      </SettingsCard>
    </SettingsForm>
  )
}
