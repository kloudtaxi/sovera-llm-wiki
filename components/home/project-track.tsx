import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Rail, RailStep } from '@/components/kit/rail'
import { Disclosure, Eyebrow, MetaChip, Meter, StatusPill } from '@/components/kit/meta'
import { TRACKED_PROJECTS, type TrackedProject } from '@/lib/project-track'
import { cn } from '@/lib/utils'

const STAGE_EYEBROW: Record<TrackedProject['stage'], string> = {
  create: 'Next',
  retrieve: 'Next',
  synthesize: 'Next',
  deliver: 'Gate',
}

function statusColor(project: TrackedProject) {
  if (project.state === 'done') return 'var(--success)'
  if (project.state === 'active') return `var(--mode-${project.stage})`
  return 'var(--muted-foreground)'
}

export function ProjectTrack() {
  return (
    <Rail>
      {TRACKED_PROJECTS.map((project, i) => {
        const color = statusColor(project)
        const active = project.state === 'active'
        return (
          <RailStep
            key={project.id}
            state={project.state}
            marker={i + 1}
            accent={color}
            last={i === TRACKED_PROJECTS.length - 1}
          >
            <article
              className={cn(
                'rounded-2xl border bg-surface p-4 sm:p-5',
                active ? 'border-2' : 'border-border',
              )}
              style={active ? { borderColor: color } : undefined}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="flex items-baseline gap-2 font-serif text-lg font-bold leading-snug text-foreground">
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    P{i + 1}
                  </span>
                  <Link
                    href="/page/projects/acme-q3"
                    className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {project.title}
                  </Link>
                </h3>
                <StatusPill label={project.statusLabel} date={project.date} color={color} />
              </div>

              <p className="mt-2 text-pretty leading-relaxed text-foreground">
                <Eyebrow>{STAGE_EYEBROW[project.stage]}</Eyebrow>
                {project.next}
              </p>

              <div className="mt-3">
                <Meter
                  label="Claims verified"
                  value={project.reviewed}
                  total={project.total}
                  color={project.state === 'done' ? 'var(--success)' : color}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.refs.map((ref) => (
                  <MetaChip key={ref}>{ref}</MetaChip>
                ))}
              </div>

              <Disclosure summary="What has to be true to deliver">
                <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.checks.map((check) => (
                    <li key={check} className="flex gap-2">
                      <span aria-hidden="true">·</span>
                      {check}
                    </li>
                  ))}
                </ul>
                {active && (
                  <Link
                    href="/ask/ans-margin-q3/export"
                    className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
                    style={{ color }}
                  >
                    Open the delivery gate
                    <ArrowUpRight className="size-4" />
                  </Link>
                )}
              </Disclosure>
            </article>
          </RailStep>
        )
      })}
    </Rail>
  )
}
