import { SettingsCard, SettingsForm, SettingRow } from "@/components/admin/settings-section"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const RATES = [
  { region: "United States", rate: "Calculated by state" },
  { region: "United Kingdom", rate: "20% VAT" },
  { region: "European Union", rate: "19–25% VAT" },
  { region: "Singapore", rate: "9% GST" },
]

export default function TaxSettingsPage() {
  return (
    <SettingsForm label="Tax settings">
      <SettingsCard title="Tax configuration" description="How tax is calculated and displayed.">
        <SettingRow label="Prices include tax" description="Show tax-inclusive prices on the storefront.">
          <div className="flex sm:justify-end">
            <Switch aria-label="Prices include tax" />
          </div>
        </SettingRow>
        <SettingRow label="Charge tax on shipping" description="Apply tax to shipping charges where required.">
          <div className="flex sm:justify-end">
            <Switch defaultChecked aria-label="Charge tax on shipping" />
          </div>
        </SettingRow>
        <SettingRow label="Tax ID" htmlFor="tax-id" description="Displayed on invoices and receipts.">
          <Input id="tax-id" defaultValue="US-EIN 84-2910473" />
        </SettingRow>
      </SettingsCard>

      <SettingsCard title="Regional rates" description="Tax rates applied by destination.">
        <div className="flex flex-col gap-3">
          {RATES.map((r) => (
            <div
              key={r.region}
              className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border p-4"
            >
              <p className="text-sm font-medium">{r.region}</p>
              <p className="text-sm text-muted-foreground">{r.rate}</p>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="self-start">
            <Plus className="size-4" />
            Add region
          </Button>
        </div>
      </SettingsCard>
    </SettingsForm>
  )
}
