import { SettingsCard, SettingsForm, SettingRow } from "@/components/admin/settings-section"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { StatusBadge } from "@/components/admin/status-badge"
import { CreditCard, Wallet, Banknote } from "lucide-react"

const PROVIDERS = [
  { name: "Card payments", detail: "Visa, Mastercard, Amex", icon: CreditCard, status: "Active" },
  { name: "Digital wallets", detail: "Apple Pay, Google Pay", icon: Wallet, status: "Active" },
  { name: "Bank transfer", detail: "Manual reconciliation", icon: Banknote, status: "Draft" },
]

export default function PaymentSettingsPage() {
  return (
    <SettingsForm label="Payment settings">
      <SettingsCard title="Payment methods" description="Providers offered at checkout.">
        <div className="flex flex-col gap-3">
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-secondary text-muted-foreground">
                  <p.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.detail}</p>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard title="Checkout behavior" description="How payments are captured and processed.">
        <SettingRow label="Capture mode" description="Charge cards immediately or on fulfillment.">
          <div className="flex sm:justify-end">
            <Switch defaultChecked aria-label="Immediate capture" />
          </div>
        </SettingRow>
        <SettingRow label="Statement descriptor" htmlFor="descriptor" description="What appears on customer statements.">
          <Input id="descriptor" defaultValue="LUGAIRE" className="uppercase" />
        </SettingRow>
      </SettingsCard>
    </SettingsForm>
  )
}
