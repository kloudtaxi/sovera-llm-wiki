'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type Mode = 'create' | 'retrieve' | 'synthesize' | 'deliver'

export const MODE_CONFIG: Record<
  Mode,
  {
    label: string
    lead: string
    caption: string
    color: string
    soft: string
  }
> = {
  create: {
    label: 'Create',
    lead: 'You lead',
    caption: 'You are framing the work. Sovera stays a quiet assistant.',
    color: 'var(--mode-create)',
    soft: 'color-mix(in srgb, var(--mode-create) 12%, transparent)',
  },
  retrieve: {
    label: 'Retrieve',
    lead: 'Machine works',
    caption: 'Sovera is reading and checking your sources.',
    color: 'var(--mode-retrieve)',
    soft: 'color-mix(in srgb, var(--mode-retrieve) 12%, transparent)',
  },
  synthesize: {
    label: 'Synthesize',
    lead: 'You supervise',
    caption: 'Sovera is drafting. You can nudge or veto anytime.',
    color: 'var(--mode-synthesize)',
    soft: 'color-mix(in srgb, var(--mode-synthesize) 12%, transparent)',
  },
  deliver: {
    label: 'Deliver',
    lead: 'You approve',
    caption: 'Nothing leaves until you verify the sources.',
    color: 'var(--mode-deliver)',
    soft: 'color-mix(in srgb, var(--mode-deliver) 14%, transparent)',
  },
}

export const MODE_ORDER: Mode[] = ['create', 'retrieve', 'synthesize', 'deliver']

type ModeContextValue = {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('create')
  const setMode = useCallback((next: Mode) => setModeState(next), [])
  const value = useMemo(() => ({ mode, setMode }), [mode, setMode])
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within a ModeProvider')
  return ctx
}
