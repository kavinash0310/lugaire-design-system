import { SettingsCard, SettingsForm, SettingRow } from "@/components/admin/settings-section"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

const SWATCHES = [
  { name: "Copper", value: "var(--color-copper)" },
  { name: "Foreground", value: "var(--color-foreground)" },
  { name: "Muted", value: "var(--color-muted-foreground)" },
  { name: "Success", value: "var(--color-success)" },
  { name: "Destructive", value: "var(--color-destructive)" },
]

export default function BrandingSettingsPage() {
  return (
    <SettingsForm label="Branding">
      <SettingsCard title="Logo & identity" description="How the house appears across the storefront and emails.">
        <SettingRow label="Logo" description="SVG or PNG, at least 200px wide.">
          <Button type="button" variant="outline" size="sm" className="w-full">
            <Upload className="size-4" />
            Upload logo
          </Button>
        </SettingRow>
        <SettingRow label="Wordmark" htmlFor="wordmark">
          <Input id="wordmark" defaultValue="LUGAIRE" className="uppercase tracking-[0.2em]" />
        </SettingRow>
      </SettingsCard>

      <SettingsCard title="Palette" description="The brand colors used throughout the experience.">
        <div className="flex flex-wrap gap-4">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <span
                className="size-12 rounded-[var(--radius-md)] border border-border"
                style={{ backgroundColor: s.value }}
              />
              <span className="text-xs text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Typography" description="Typeface pairing for headings and body copy.">
        <SettingRow label="Display font" htmlFor="font-display">
          <Select id="font-display" defaultValue="Editorial Serif">
            <option>Editorial Serif</option>
            <option>Grotesque Sans</option>
            <option>Neo Grotesk</option>
          </Select>
        </SettingRow>
        <SettingRow label="Body font" htmlFor="font-body">
          <Select id="font-body" defaultValue="Grotesque Sans">
            <option>Grotesque Sans</option>
            <option>Humanist Sans</option>
            <option>Editorial Serif</option>
          </Select>
        </SettingRow>
      </SettingsCard>
    </SettingsForm>
  )
}
