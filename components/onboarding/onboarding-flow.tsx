'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookMarked,
  Cpu,
  ShieldCheck,
  UploadCloud,
  FolderClosed,
  Check,
  ArrowRight,
  Loader2,
  X,
  Sparkles,
} from 'lucide-react'
import { ThemeToggle } from '@/components/shell/theme-toggle'
import { INFERRED_WORKSPACE } from '@/lib/mock-data'

type Step = 'connect' | 'point' | 'scan' | 'confirm'

const SCAN_LINES = [
  'Reading 42 files across 3 folders',
  'Grouping by topic and recency',
  'Checking for sensitive data',
  'Proposing a PARA structure',
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('connect')
  const [scanLine, setScanLine] = useState(0)
  const [removed, setRemoved] = useState<Set<string>>(new Set())
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const runScan = useCallback(() => {
    setStep('scan')
    setScanLine(0)
    SCAN_LINES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setScanLine(i + 1), 700 * (i + 1)))
    })
    timers.current.push(setTimeout(() => setStep('confirm'), 700 * (SCAN_LINES.length + 1)))
  }, [])

  const toggleRemove = (id: string) => {
    setRemoved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const stepIndex = { connect: 0, point: 1, scan: 2, confirm: 2 }[step]

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookMarked className="size-4" />
          </span>
          <span className="font-serif text-lg font-semibold text-foreground">Sovera</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 'connect' && (
            <motion.section
              key="connect"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Build a second brain from your own documents — that you fully own.
              </h1>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                Sovera turns your files into a living, cited wiki. It runs on your Claude, so your
                documents and compute never leave your control.
              </p>

              <div className="mt-8 rounded-xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Cpu className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Connect your Claude</p>
                    <p className="text-sm text-muted-foreground">Claude Desktop or Claude Code</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/20 bg-accent/50 p-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-[13px] leading-relaxed text-foreground">
                    Your prompts run through your own model. Sovera never proxies your data or
                    trains on your files.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('point')}
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Cpu className="size-4" />
                  Connect Claude
                </button>
              </div>
            </motion.section>
          )}

          {step === 'point' && (
            <motion.section
              key="point"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="mb-1 inline-flex items-center gap-1.5 text-sm text-success">
                <Check className="size-4" /> Claude connected
              </div>
              <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                Point me at your stuff
              </h1>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                Drag in a folder of documents or connect a source. I&apos;ll read them and propose a
                structure — nothing is saved until you approve it.
              </p>

              <button
                type="button"
                onClick={runScan}
                className="mt-8 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-14 text-center transition-colors hover:border-primary/50 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                  <UploadCloud className="size-6" />
                </span>
                <span className="font-serif text-lg font-medium text-foreground">
                  Drop a folder of documents
                </span>
                <span className="text-sm text-muted-foreground">
                  PDFs, docs, spreadsheets, images · we&apos;ll use a sample set for this demo
                </span>
              </button>
            </motion.section>
          )}

          {step === 'scan' && (
            <motion.section
              key="scan"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground">
                Reading your documents
              </h1>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                This takes a moment. I&apos;m transparent about every step.
              </p>
              <div className="mt-8 rounded-xl border border-mode-retrieve/30 bg-mode-retrieve/[0.08] p-6">
                <ul className="space-y-3">
                  {SCAN_LINES.map((line, i) => (
                    <li key={line} className="flex items-center gap-2.5 text-sm">
                      <span className="flex size-4 items-center justify-center">
                        {i < scanLine ? (
                          <Check className="size-4 text-mode-retrieve" />
                        ) : i === scanLine ? (
                          <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                        ) : (
                          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                        )}
                      </span>
                      <span className={i > scanLine ? 'text-muted-foreground/60' : 'text-foreground'}>
                        {line}
                      </span>
                      {i === 2 && i < scanLine && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-success">
                          <ShieldCheck className="size-3" /> none found
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}

          {step === 'confirm' && (
            <motion.section
              key="confirm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="mb-1 inline-flex items-center gap-1.5 text-sm text-primary">
                <Sparkles className="size-4" /> Here&apos;s a starting structure
              </div>
              <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground">
                I found 4 projects and 3 areas
              </h1>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
                Here&apos;s the workspace I inferred, organized with PARA. Remove anything that
                doesn&apos;t fit — you can always change it later.
              </p>

              <div className="mt-8 space-y-6">
                {INFERRED_WORKSPACE.map((group) => (
                  <div key={group.key}>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item) => {
                        const isRemoved = removed.has(item.id)
                        return (
                          <li
                            key={item.id}
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                              isRemoved
                                ? 'border-border bg-muted/30 opacity-60'
                                : 'border-border bg-surface'
                            }`}
                          >
                            <FolderClosed className="size-4 shrink-0 text-muted-foreground" />
                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-sm font-medium text-foreground ${
                                  isRemoved ? 'line-through' : ''
                                }`}
                              >
                                {item.label}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">{item.note}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleRemove(item.id)}
                              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label={isRemoved ? `Restore ${item.label}` : `Remove ${item.label}`}
                            >
                              {isRemoved ? <ArrowRight className="size-4" /> : <X className="size-4" />}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Check className="size-4" />
                  Looks good — build my workspace
                </button>
                <span className="text-[13px] text-muted-foreground">
                  Creates {7 - removed.size} spaces. Nothing is committed until now.
                </span>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
