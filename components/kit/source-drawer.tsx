'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, FileSpreadsheet, MessageSquareText, X, MapPin } from 'lucide-react'
import { SOURCES, type Source } from '@/lib/mock-data'

const KIND_ICON = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  Transcript: MessageSquareText,
} as const

type DrawerContextValue = {
  activeId: number | null
  open: (id: number) => void
  close: () => void
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

export function SourceDrawerProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<number | null>(null)
  const open = useCallback((id: number) => setActiveId(id), [])
  const close = useCallback(() => setActiveId(null), [])
  const value = useMemo(() => ({ activeId, open, close }), [activeId, open, close])

  return (
    <DrawerContext.Provider value={value}>
      {children}
      <SourceDrawer source={activeId ? SOURCES[activeId] : null} onClose={close} />
    </DrawerContext.Provider>
  )
}

export function useSourceDrawer() {
  const ctx = useContext(DrawerContext)
  if (!ctx) throw new Error('useSourceDrawer must be used within SourceDrawerProvider')
  return ctx
}

function SourceDrawer({ source, onClose }: { source: Source | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {source && (
        <div className="fixed inset-0 z-40 flex justify-end" role="dialog" aria-modal="true" aria-label={`Source: ${source.document}`}>
          <motion.button
            type="button"
            aria-label="Close source drawer"
            className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-xl shadow-foreground/10"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Source
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <SourceCard source={source} />
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Exact excerpt
                </p>
                <blockquote className="mt-2 rounded-lg border border-border bg-muted/40 p-4 font-serif text-[15px] leading-relaxed text-foreground">
                  {source.snippet}
                </blockquote>
                <p className="mt-3 text-xs text-muted-foreground">{source.addedOn}</p>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export function SourceCard({ source }: { source: Source }) {
  const Icon = KIND_ICON[source.kind]
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{source.document}</p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          {source.locator}
        </p>
        <span className="mt-2 inline-flex rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {source.kind}
        </span>
      </div>
    </div>
  )
}
