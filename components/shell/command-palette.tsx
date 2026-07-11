'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FilePlus2,
  MessageCircleQuestion,
  CornerDownLeft,
  Sparkles,
  FolderPlus,
  Search,
  ArrowUpDown,
} from 'lucide-react'

type Command = {
  id: string
  label: string
  hint: string
  icon: typeof FilePlus2
  href: string
}

const COMMANDS: Command[] = [
  { id: 'add', label: 'Add a source', hint: 'Ingest a document into your wiki', icon: FilePlus2, href: '/add' },
  { id: 'ask', label: 'Ask your wiki', hint: 'Get a cited answer', icon: MessageCircleQuestion, href: '/ask' },
  { id: 'tidy', label: 'Tidy up', hint: 'Run a knowledge health check', icon: Sparkles, href: '/tidy' },
  { id: 'jump-acme', label: 'Jump to Acme Corp — Q3', hint: 'Project page', icon: Search, href: '/page/projects/acme-q3' },
  { id: 'new-project', label: 'New project', hint: 'Start a fresh PARA project', icon: FolderPlus, href: '/' },
]

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    )
  }, [query])

  function run(cmd: Command) {
    setOpen(false)
    router.push(cmd.href)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <div className="reveal-rise relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover shadow-lg shadow-foreground/10">
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter' && results[active]) {
                e.preventDefault()
                run(results[active])
              }
            }}
            placeholder="Add a source, ask a question, jump to a page…"
            className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nothing matches “{query}”.
            </li>
          )}
          {results.map((cmd, i) => {
            const Icon = cmd.icon
            return (
              <li key={cmd.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(cmd)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    i === active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  <Icon
                    className={`size-4 shrink-0 ${i === active ? 'text-accent-foreground' : 'text-muted-foreground'}`}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{cmd.label}</span>
                    <span className="block text-xs text-muted-foreground">{cmd.hint}</span>
                  </span>
                  {i === active && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ArrowUpDown className="size-3" /> to navigate
          </span>
          <span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-sans">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  )
}
