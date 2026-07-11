'use client'

import Link from 'next/link'
import { Menu, Search } from 'lucide-react'
import { ModeIndicator } from '@/components/mode/mode-indicator'
import { ThemeToggle } from './theme-toggle'

export type Crumb = { label: string; href?: string }

function openPalette() {
  window.dispatchEvent(new Event('open-command-palette'))
}

export function TopBar({
  crumbs,
  onOpenSidebar,
  action,
}: {
  crumbs: Crumb[]
  onOpenSidebar?: () => void
  action?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-canvas/80 px-3 backdrop-blur-md sm:px-5">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1.5 text-sm">
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <span className="text-muted-foreground/50">/</span>}
              {c.href ? (
                <Link
                  href={c.href}
                  className="truncate text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="truncate font-medium text-foreground">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <ModeIndicator />

      <button
        type="button"
        onClick={openPalette}
        className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        aria-label="Search — open command palette"
      >
        <Search className="size-4" />
        <span>Search</span>
        <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>

      <button
        type="button"
        onClick={openPalette}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        aria-label="Search"
      >
        <Search className="size-4" />
      </button>

      <ThemeToggle />

      {action}
    </header>
  )
}
