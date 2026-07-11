'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SOURCES } from '@/lib/mock-data'
import { useSourceDrawer } from './source-drawer'

export function CitationChip({ n }: { n: number }) {
  const { open } = useSourceDrawer()
  const [hover, setHover] = useState(false)
  const source = SOURCES[n]

  return (
    <span
      className="relative inline-block align-baseline"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        onClick={() => open(n)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="mx-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-[6px] border border-primary/30 bg-accent px-1 align-[1px] text-[11px] font-medium leading-none text-primary transition-colors hover:border-primary/60 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Citation ${n}: ${source?.document ?? 'source'}. Click to view source.`}
      >
        {n}
      </button>

      <AnimatePresence>
        {hover && source && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 w-64 -translate-x-1/2 rounded-lg border border-border bg-popover p-3 text-left shadow-lg shadow-foreground/10"
            role="tooltip"
          >
            <span className="block truncate text-xs font-medium text-foreground">
              {source.document}
            </span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">{source.locator}</span>
            <span className="mt-2 block font-serif text-[13px] leading-snug text-muted-foreground line-clamp-3">
              {source.snippet}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
