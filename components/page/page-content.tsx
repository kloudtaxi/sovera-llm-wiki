'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Check } from 'lucide-react'
import { CitationChip } from '@/components/kit/citation-chip'
import type { PageBlock, PageRun, WikiPage } from '@/lib/mock-data'

function Runs({ runs }: { runs: PageRun[] }) {
  return (
    <>
      {runs.map((run, i) => {
        if (run.t === 'text') return <span key={i}>{run.v}</span>
        if (run.t === 'cite') return <CitationChip key={i} n={run.n} />
        return (
          <Link
            key={i}
            href={run.href}
            className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
          >
            {run.v}
          </Link>
        )
      })}
    </>
  )
}

function Block({ block }: { block: PageBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-8 font-serif text-2xl font-semibold text-foreground">{block.text}</h2>
      )
    case 'paragraph':
      return (
        <p className="mt-4 font-serif text-[17px] leading-[1.7] text-foreground">
          <Runs runs={block.runs} />
        </p>
      )
    case 'list':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 font-serif text-[17px] leading-[1.7] text-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>
                <Runs runs={item} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote className="mt-5 border-l-2 border-primary/40 pl-5">
          <p className="font-serif text-[17px] italic leading-[1.7] text-muted-foreground">
            &ldquo;{block.text}&rdquo;
            <CitationChip n={block.citation} />
          </p>
        </blockquote>
      )
  }
}

export function PageContent({ page }: { page: WikiPage }) {
  const [editing, setEditing] = useState(false)

  return (
    <article className="mx-auto max-w-[68ch] px-4 py-8 sm:px-8 sm:py-12">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {page.section}
        </p>
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {editing ? <Check className="size-3.5" /> : <Pencil className="size-3.5" />}
          {editing ? 'Done editing' : 'Edit page'}
        </button>
      </div>

      <h1 className="mt-2 text-balance font-serif text-4xl font-semibold leading-tight text-foreground">
        {page.title}
      </h1>
      <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
        {page.summary}
      </p>

      <div
        className={
          editing
            ? 'mt-8 rounded-lg border border-dashed border-primary/40 bg-accent/30 p-4 transition-colors'
            : 'mt-8'
        }
      >
        {editing && (
          <p className="mb-2 text-xs text-primary">
            Editing — you always have the final word on any page.
          </p>
        )}
        {page.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      <p className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
        {page.maintainedOn}
      </p>
    </article>
  )
}
