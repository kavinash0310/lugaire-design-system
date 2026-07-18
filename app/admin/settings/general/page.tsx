import { SettingsCard, SettingsForm, SettingRow } from "@/components/admin/settings-section"
import { Input, Textarea } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function GeneralSettingsPage() {
  return (
    <SettingsForm label="General settings">
      <SettingsCard title="Store details" description="The essentials that identify your storefront.">
        <SettingRow label="Store name" htmlFor="store-name">
          <Input id="store-name" defaultValue="Lugaire" />
        </SettingRow>
        <SettingRow label="Support email" htmlFor="store-email">
          <Input id="store-email" type="email" defaultValue="care@lugaire.com" />
        </SettingRow>
        <SettingRow label="Store description" htmlFor="store-desc" description="Used for SEO and social previews.">
          <Textarea id="store-desc" defaultValue="Considered menswear, made to last." />
        </SettingRow>
      </SettingsCard>

      <SettingsCard title="Regional" description="Defaults for currency, locale, and time.">
        <SettingRow label="Currency" htmlFor="currency">
          <Select id="currency" defaultValue="USD">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>JPY</option>
          </Select>
        </SettingRow>
        <SettingRow label="Timezone" htmlFor="timezone">
          <Select id="timezone" defaultValue="America/Los_Angeles">
            <option>America/Los_Angeles</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Singapore</option>
          </Select>
        </SettingRow>
        <SettingRow label="Maintenance mode" description="Temporarily hide the storefront from shoppers.">
          <div className="flex sm:justify-end">
            <Switch aria-label="Maintenance mode" />
          </div>
        </SettingRow>
      </SettingsCard>
    </SettingsForm>
  )
}
