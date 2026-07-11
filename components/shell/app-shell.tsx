'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  FilePlus2,
  ChevronsUpDown,
  Command,
  Settings,
  X,
  BookMarked,
} from 'lucide-react'
import { ParaTree } from './para-tree'
import { TopBar, type Crumb } from './top-bar'
import { CommandPalette } from './command-palette'
import { cn } from '@/lib/utils'

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Workspace switcher */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-3 py-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BookMarked className="size-4" />
        </div>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1 rounded-md px-1 py-1 text-left transition-colors hover:bg-sidebar-accent"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate font-serif text-sm font-semibold text-sidebar-foreground">
              Sovera
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              Meridian Advisory
            </span>
          </span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Add a source */}
      <div className="px-3 py-3">
        <Link
          href="/add"
          onClick={onNavigate}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
        >
          <FilePlus2 className="size-4" />
          Add a source
        </Link>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-3 pb-4" onClick={onNavigate}>
        <ParaTree />
      </div>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-2">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Command className="size-4" />
          <span className="flex-1">Command palette</span>
          <kbd className="rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px]">
            ⌘K
          </kbd>
        </button>
        <Link
          href="/settings"
          onClick={onNavigate}
          className="mt-0.5 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Settings className="size-4" />
          <span className="flex-1">Settings & sovereignty</span>
        </Link>
        <div className="mt-1 flex items-center gap-2 rounded-md px-2 py-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
            JR
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">Jordan Reyes</p>
            <p className="truncate text-[11px] text-muted-foreground">Connected to your Claude</p>
          </div>
          <span className="size-2 rounded-full bg-success" aria-label="Claude connected" />
        </div>
      </div>
    </div>
  )
}

export function AppShell({
  crumbs,
  action,
  contextPanel,
  children,
}: {
  crumbs: Crumb[]
  action?: React.ReactNode
  contextPanel?: React.ReactNode
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="reveal-rise absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3.5 z-10 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar crumbs={crumbs} action={action} onOpenSidebar={() => setMobileOpen(true)} />
        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
          {contextPanel && (
            <div className={cn('hidden w-80 shrink-0 border-l border-border bg-surface xl:block')}>
              {contextPanel}
            </div>
          )}
        </div>
      </div>

      <CommandPalette />
    </div>
  )
}
