import { AppShell } from '@/components/shell/app-shell'
import { SetMode } from '@/components/mode/set-mode'
import { ByocCard } from '@/components/settings/byoc-card'
import { PortabilityCard } from '@/components/settings/portability-card'
import { ShieldCheck, HardDriveDownload } from 'lucide-react'

export default function SettingsPage() {
  return (
    <AppShell crumbs={[{ label: 'Workspace', href: '/' }, { label: 'Settings & sovereignty' }]}>
      <SetMode mode="create" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
        <header className="mb-8">
          <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Settings &amp; sovereignty
          </h1>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Sovera is built so your knowledge stays yours — your model, your compute, your files, in
            a format you can walk away with anytime.
          </p>
        </header>

        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">Your Claude, your compute</h2>
          </div>
          <ByocCard />
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <HardDriveDownload className="size-4 text-primary" />
            <h2 className="font-serif text-xl font-semibold text-foreground">Portability</h2>
          </div>
          <PortabilityCard />
        </section>
      </div>
    </AppShell>
  )
}
