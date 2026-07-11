import { AppShell } from '@/components/shell/app-shell'
import { SetMode } from '@/components/mode/set-mode'
import { DeliveryGate } from '@/components/deliver/delivery-gate'

export default function ExportPage() {
  return (
    <AppShell
      crumbs={[
        { label: 'Workspace', href: '/' },
        { label: 'Ask', href: '/ask' },
        { label: 'Deliver' },
      ]}
    >
      <SetMode mode="deliver" />
      <DeliveryGate />
    </AppShell>
  )
}
