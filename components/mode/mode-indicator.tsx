'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { PencilLine, Search, Sparkles, ShieldCheck } from 'lucide-react'
import { MODE_CONFIG, useMode, type Mode } from './mode-provider'

const ICONS: Record<Mode, typeof PencilLine> = {
  create: PencilLine,
  retrieve: Search,
  synthesize: Sparkles,
  deliver: ShieldCheck,
}

export function ModeIndicator() {
  const { mode } = useMode()
  const config = MODE_CONFIG[mode]
  const Icon = ICONS[mode]

  return (
    <div
      className="inline-flex h-8 items-center gap-2 rounded-lg border pl-2 pr-2.5 transition-colors duration-300"
      style={{
        borderColor: `color-mix(in srgb, ${config.color} 35%, transparent)`,
        backgroundColor: config.soft,
      }}
      role="status"
      aria-live="polite"
      aria-label={`Current mode: ${config.label}. ${config.lead}. ${config.caption}`}
    >
      <span
        className="relative flex size-2 items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="absolute inline-flex size-2 rounded-full opacity-60"
          style={{
            backgroundColor: config.color,
            animation: mode === 'retrieve' ? 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite' : 'none',
          }}
        />
        <span
          className="relative inline-flex size-2 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </span>

      <Icon className="size-3.5 shrink-0" style={{ color: config.color }} aria-hidden="true" />

      <div className="flex items-baseline gap-1.5 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="text-xs font-medium"
            style={{ color: config.color }}
          >
            {config.label}
          </motion.span>
        </AnimatePresence>
        <span className="hidden text-[11px] text-muted-foreground sm:inline">
          · {config.lead}
        </span>
      </div>
    </div>
  )
}
