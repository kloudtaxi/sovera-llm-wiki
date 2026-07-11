'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronRight, FolderKanban, Compass, Library, Archive } from 'lucide-react'
import { PARA_TREE, type ParaSection } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const SECTION_ICON = {
  projects: FolderKanban,
  areas: Compass,
  resources: Library,
  archives: Archive,
} as const

function SectionBlock({ section }: { section: ParaSection }) {
  const Icon = SECTION_ICON[section.key]
  const [open, setOpen] = useState(section.key === 'projects' || section.key === 'areas')
  const pathname = usePathname()

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-sidebar-accent"
        aria-expanded={open}
      >
        <ChevronRight
          className={cn(
            'size-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-90',
          )}
        />
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-xs font-medium tracking-wide text-sidebar-foreground uppercase">
          {section.label}
        </span>
        {section.active && (
          <span className="ml-auto inline-flex h-1.5 w-1.5 rounded-full bg-primary" aria-label="Active portfolio" />
        )}
      </button>

      {open && (
        <ul className="mt-0.5 mb-1 space-y-0.5 pl-3">
          {section.nodes.map((node) => {
            const active = pathname === node.path
            return (
              <li key={node.id}>
                <Link
                  href={node.path}
                  className={cn(
                    'flex items-center gap-2 rounded-md border-l py-1.5 pl-3 pr-2 text-sm transition-colors',
                    active
                      ? 'border-primary bg-sidebar-accent font-medium text-sidebar-foreground'
                      : 'border-sidebar-border text-muted-foreground hover:border-primary/40 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  )}
                >
                  <span className="truncate">{node.label}</span>
                </Link>
                {node.children && (
                  <ul className="mt-0.5 space-y-0.5 pl-4">
                    {node.children.map((child) => {
                      const childActive = pathname === child.path
                      return (
                        <li key={child.id}>
                          <Link
                            href={child.path}
                            className={cn(
                              'block truncate rounded-md py-1 pl-3 pr-2 text-[13px] transition-colors',
                              childActive
                                ? 'bg-sidebar-accent font-medium text-sidebar-foreground'
                                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function ParaTree() {
  return (
    <nav className="space-y-1" aria-label="PARA navigation">
      {PARA_TREE.map((section) => (
        <SectionBlock key={section.key} section={section} />
      ))}
    </nav>
  )
}
