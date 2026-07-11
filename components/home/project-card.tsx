import Link from 'next/link'
import { FileText, Layers } from 'lucide-react'
import { GraphSpark } from '@/components/kit/graph-mini-map'
import type { ProjectCard as ProjectCardType } from '@/lib/mock-data'

export function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <Link
      href="/page/projects/acme-q3"
      className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
          {project.title}
        </h3>
        <GraphSpark className="mt-1 h-8 w-11 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.status}</p>
      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="size-3.5" />
          {project.pages} pages
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Layers className="size-3.5" />
          {project.sources} sources
        </span>
        <span className="ml-auto">{project.lastActivity}</span>
      </div>
    </Link>
  )
}
