import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'mr-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center truncate rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-foreground/80">
      {children}
    </span>
  )
}

export function StatusPill({
  label,
  date,
  color,
}: {
  label: string
  date?: string
  color: string
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold" style={{ color }}>
      <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
      {date && <span className="font-medium opacity-80">· {date}</span>}
    </span>
  )
}

export function Meter({
  label,
  value,
  total,
  color = 'var(--success)',
}: {
  label: string
  value: number
  total: number
  color?: string
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="shrink-0">
        {label}{' '}
        <span className="font-semibold tabular-nums text-foreground">
          {value}/{total}
        </span>
      </span>
      <span
        className="h-1.5 min-w-16 flex-1 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <span
          className="block h-full rounded-full transition-[width] duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </span>
    </div>
  )
}

export function Disclosure({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="group mt-1">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 shrink-0 transition-transform group-open:rotate-90" />
        {summary}
      </summary>
      <div className="pb-1 pl-5 pt-1">{children}</div>
    </details>
  )
}
