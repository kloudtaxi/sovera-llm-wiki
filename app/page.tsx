import { AppShell } from '@/components/shell/app-shell'
import { SetMode } from '@/components/mode/set-mode'
import { AskEntry } from '@/components/home/ask-entry'
import { ProjectTrack } from '@/components/home/project-track'
import { ActivityItem } from '@/components/home/activity-item'
import { ACTIVITY } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <AppShell crumbs={[{ label: 'Workspace' }]}>
      <SetMode mode="create" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
        <header className="mb-8">
          <p className="text-sm text-muted-foreground">Good afternoon, Jordan.</p>
          <h1 className="mt-1 text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Your knowledge has grown since you last looked.
          </h1>
          <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Three active projects, 49 pages, and every claim traceable to a source you added.
          </p>
        </header>

        <AskEntry />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
          {/* Projects */}
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-xl font-semibold text-foreground">Where things stand</h2>
              <span className="text-xs text-muted-foreground">Create → Deliver</span>
            </div>
            <ProjectTrack />
          </section>

          {/* Activity */}
          <section>
            <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">Recent activity</h2>
            <div className="rounded-xl border border-border bg-surface px-4 py-1">
              <ul className="divide-y divide-border">
                {ACTIVITY.map((entry) => (
                  <ActivityItem key={entry.id} entry={entry} />
                ))}
              </ul>
            </div>
            <p className="mt-2 px-1 text-[11px] text-muted-foreground">
              An append-only log. Nothing changes without your say-so.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
