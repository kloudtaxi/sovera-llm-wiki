import { AppShell } from '@/components/shell/app-shell'
import { SetMode } from '@/components/mode/set-mode'
import { FindingCard } from '@/components/kit/finding-card'
import { FINDINGS } from '@/lib/mock-data'

export default function TidyPage() {
  return (
    <AppShell crumbs={[{ label: 'Workspace', href: '/' }, { label: 'Tidy up' }]}>
      <SetMode mode="create" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-sm text-success">
            <span className="size-2 rounded-full bg-success" aria-hidden="true" />
            Your wiki is in good health
          </div>
          <h1 className="mt-2 text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Tidy up
          </h1>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Sovera checked 49 pages for contradictions, stale claims, and gaps. It found
            {' '}
            {FINDINGS.length} things worth your attention. Nothing is changed until you approve it.
          </p>
        </header>

        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Pages checked', value: '49' },
            { label: 'Findings', value: String(FINDINGS.length) },
            { label: 'Auto-applied', value: '0' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-surface px-4 py-3">
              <p className="font-serif text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {FINDINGS.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sovera runs a quiet check like this every week. It will never change a page on its own.
        </p>
      </div>
    </AppShell>
  )
}
