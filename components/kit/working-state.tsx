'use client'

import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { MODE_CONFIG, type Mode } from '@/components/mode/mode-provider'

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
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        borderColor: `color-mix(in srgb, ${config.color} 30%, transparent)`,
        backgroundColor: config.soft,
      }}
    >
      <div className="flex items-center gap-2.5">
        <Loader2 className="size-4 animate-spin" style={{ color: config.color }} />
        <p className="text-sm font-medium" style={{ color: config.color }}>
          {title}
        </p>
      </div>

      <ul className="mt-4 space-y-2.5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <span className="flex size-4 shrink-0 items-center justify-center">
              {step.status === 'done' ? (
                <Check className="size-4" style={{ color: config.color }} />
              ) : step.status === 'active' ? (
                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
              ) : (
                <span className="size-1.5 rounded-full bg-muted-foreground/40" />
              )}
            </span>
            <span
              className={
                step.status === 'pending' ? 'text-muted-foreground/60' : 'text-foreground'
              }
            >
              {step.label}
            </span>
            {step.safety && step.status !== 'pending' && (
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-success">
                <ShieldCheck className="size-3" />
                no sensitive data exposed
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
