import Link from 'next/link'
import { CornerUpLeft } from 'lucide-react'
import { GraphMiniMap } from '@/components/kit/graph-mini-map'
import type { WikiPage } from '@/lib/mock-data'

export function PageContextPanel({ page }: { page: WikiPage }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <section className="border-b border-border p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Neighborhood
        </p>
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-2">
          <GraphMiniMap className="w-full" />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          This page connects to 5 others in your wiki.
        </p>
      </section>

      <section className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Mentioned by
        </p>
        <ul className="mt-3 space-y-3">
          {page.backlinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="group flex gap-2 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <CornerUpLeft className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                    {link.label}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
                    {link.context}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
