import { Check, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type RailState = 'done' | 'active' | 'upcoming' | 'locked'

export function Rail({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ol className={cn('flex flex-col', className)}>{children}</ol>
}

export function RailStep({
  state,
  marker,
  last = false,
  accent = 'var(--primary)',
  children,
}: {
  state: RailState
  marker?: React.ReactNode
  last?: boolean
  accent?: string
  children: React.ReactNode
}) {
  const lineDone = state === 'done'
  return (
    <li className="relative flex gap-3 sm:gap-4">
      <div className="flex w-8 shrink-0 flex-col items-center">
        <RailNode state={state} marker={marker} accent={accent} />
        {!last && (
          <span
            aria-hidden="true"
            className={cn('w-0.5 flex-1', lineDone ? 'bg-success' : 'bg-border')}
          />
        )}
      </div>
      <div className={cn('min-w-0 flex-1', last ? 'pb-0' : 'pb-4')}>{children}</div>
    </li>
  )
}

function RailNode({
  state,
  marker,
  accent,
}: {
  state: RailState
  marker?: React.ReactNode
  accent: string
}) {
  if (state === 'done') {
    return (
      <span className="mt-4 flex size-8 items-center justify-center rounded-full bg-success text-success-foreground">
        <Check className="size-4" strokeWidth={2.5} />
        <span className="sr-only">Done</span>
      </span>
    )
  }
  if (state === 'locked') {
    return (
      <span className="mt-4 flex size-8 items-center justify-center rounded-full border-2 border-dashed border-border bg-surface text-muted-foreground">
        <Lock className="size-3.5" />
        <span className="sr-only">Locked</span>
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span
        className="mt-4 flex size-8 items-center justify-center rounded-full border-2 bg-surface text-xs font-semibold"
        style={{ borderColor: accent, color: accent }}
      >
        {marker}
      </span>
    )
  }
  return (
    <span className="mt-4 flex size-8 items-center justify-center rounded-full border-2 border-border bg-surface text-xs font-semibold text-muted-foreground">
      {marker}
    </span>
  )
}
