'use client'

import { useEffect } from 'react'
import { useMode, type Mode } from './mode-provider'

/** Sets the Trust Loop mode when a screen mounts. Renders nothing. */
export function SetMode({ mode }: { mode: Mode }) {
  const { setMode } = useMode()
  useEffect(() => {
    setMode(mode)
  }, [mode, setMode])
  return null
}
