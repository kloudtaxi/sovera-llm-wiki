'use client'

import { useState } from 'react'
import { Download, FileCode2, Check } from 'lucide-react'

export function PortabilityCard() {
  const [exported, setExported] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-pretty leading-relaxed text-foreground">
        Your knowledge is plain Markdown — one file per page, with wikilinks and citations intact.
        Export everything, anytime. There is no lock-in and nothing proprietary about the format.
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <FileCode2 className="size-4 shrink-0 text-muted-foreground" />
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-muted-foreground">
          /meridian-wiki/projects/acme-q3/margin-compression.md
        </code>
        <span className="rounded-md border border-primary/30 bg-accent px-1.5 py-0.5 text-[11px] font-medium text-primary">
          Obsidian-ready
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => setExported(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {exported ? <Check className="size-4" /> : <Download className="size-4" />}
          {exported ? 'Export ready — 49 files' : 'Export everything'}
        </button>
        <span className="text-[13px] text-muted-foreground">
          Downloads a .zip of Markdown files, folders mirroring your PARA structure.
        </span>
      </div>
    </div>
  )
}
