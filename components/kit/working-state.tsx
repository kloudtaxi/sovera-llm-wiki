'use client'

import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { MODE_CONFIG, type Mode } from '@/components/mode/mode-provider'
import { cn } from '@/lib/utils'

export type WorkStep = {
  label: string
  status: 'done' | 'active' | 'pending'
  safety?: boolean
}

export function WorkingState({
  mode,
  title,
  steps,
}: {
  mode: Mode
  title: string
  steps: WorkStep[]
}) {
  const config = MODE_CONFIG[mode]
  const doneCount = steps.filter((s) => s.status === 'done').length
  return (
    <div className="rounded-2xl border-2 bg-surface p-4 sm:p-5" style={{ borderColor: config.color }}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: config.color }}>
          <Loader2 className="size-4 animate-spin" />
          {title}
        </p>
        <span className="font-mono text-xs font-semibold tabular-nums text-muted-foreground">
          {doneCount}/{steps.length}
        </span>
      </div>

      <ol className="mt-3 flex flex-col">
        {steps.map((step, i) => {
          const last = i === steps.length - 1
          return (
            <li key={i} className="flex gap-3">
              <div className="flex w-5 shrink-0 flex-col items-center">
                <span
                  className={cn(
                    'mt-0.5 flex size-5 items-center justify-center rounded-full',
                    step.status === 'done' && 'bg-success text-success-foreground',
                    step.status === 'active' && 'border-2 bg-surface',
                    step.status === 'pending' && 'border-2 border-border bg-surface',
                  )}
                  style={step.status === 'active' ? { borderColor: config.color } : undefined}
                >
                  {step.status === 'done' && <Check className="size-3" strokeWidth={3} />}
                  {step.status === 'active' && (
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                  )}
                </span>
                {!last && (
                  <span
                    aria-hidden="true"
                    className={cn('min-h-3 w-0.5 flex-1', step.status === 'done' ? 'bg-success' : 'bg-border')}
                  />
                )}
              </div>
              <div className={cn('flex min-w-0 flex-1 flex-col gap-0.5', !last && 'pb-3')}>
                <span
                  className={cn(
                    'text-sm leading-relaxed',
                    step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground',
                  )}
                >
                  {step.label}
                </span>
                {step.safety && step.status !== 'pending' && (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-success">
                    <ShieldCheck className="size-3" />
                    no sensitive data exposed
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
