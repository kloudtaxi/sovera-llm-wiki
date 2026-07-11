'use client'

import { useState } from 'react'
import {
  GitCompareArrows,
  Clock,
  Unlink,
  CircleDashed,
  Check,
  X,
  Sparkles,
} from 'lucide-react'
import type { Finding } from '@/lib/mock-data'

const TYPE_META: Record<
  Finding['type'],
  { label: string; icon: typeof Clock; cls: string }
> = {
  contradiction: {
    label: 'Contradiction',
    icon: GitCompareArrows,
    cls: 'text-destructive border-destructive/30 bg-destructive/10',
  },
  stale: {
    label: 'Stale claim',
    icon: Clock,
    cls: 'text-mode-deliver border-mode-deliver/30 bg-mode-deliver/10',
  },
  orphan: {
    label: 'Orphan page',
    icon: Unlink,
    cls: 'text-mode-retrieve border-mode-retrieve/30 bg-mode-retrieve/10',
  },
  gap: {
    label: 'Knowledge gap',
    icon: CircleDashed,
    cls: 'text-mode-create border-mode-create/30 bg-mode-create/10',
  },
  'cross-reference': {
    label: 'Missing link',
    icon: Unlink,
    cls: 'text-mode-retrieve border-mode-retrieve/30 bg-mode-retrieve/10',
  },
}

export function FindingCard({ finding }: { finding: Finding }) {
  const [state, setState] = useState<'open' | 'approved' | 'dismissed'>('open')
  const meta = TYPE_META[finding.type]
  const Icon = meta.icon

  if (state !== 'open') {
    return (
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
        {state === 'approved' ? (
          <Check className="size-4 text-success" />
        ) : (
          <X className="size-4" />
        )}
        <span className="font-medium text-foreground">{finding.title}</span>
        <span className="ml-auto text-xs">
          {state === 'approved' ? 'Applied' : 'Dismissed'}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-[6px] border px-1.5 py-0.5 text-[11px] font-medium ${meta.cls}`}
        >
          <Icon className="size-3" />
          {meta.label}
        </span>
        {finding.pages.map((p) => (
          <span
            key={p}
            className="rounded-[6px] border border-border bg-muted/40 px-1.5 py-0.5 text-[11px] text-muted-foreground"
          >
            {p}
          </span>
        ))}
      </div>

      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-foreground">
        {finding.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{finding.detail}</p>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-primary/20 bg-accent/60 p-3">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <p className="text-[13px] leading-relaxed text-foreground">
          <span className="font-medium">Proposed fix · </span>
          {finding.proposal}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setState('approved')}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Check className="size-4" />
          Approve fix
        </button>
        <button
          type="button"
          onClick={() => setState('dismissed')}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <X className="size-4" />
          Dismiss
        </button>
        <span className="ml-auto text-[11px] text-muted-foreground">Never applied automatically</span>
      </div>
    </div>
  )
}
