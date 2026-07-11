'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UploadCloud, FileText, Check, CheckCircle2, ArrowRight } from 'lucide-react'
import { useMode } from '@/components/mode/mode-provider'
import { WorkingState, type WorkStep } from '@/components/kit/working-state'
import { DiffBadge } from '@/components/kit/diff-badge'
import { TakeawayList } from '@/components/kit/takeaway-list'
import { TOUCHED_PAGES, TAKEAWAYS } from '@/lib/mock-data'

type Phase = 'idle' | 'retrieve' | 'synthesize' | 'review' | 'filed'

const RETRIEVE_STEPS: WorkStep[] = [
  { label: 'Reading Q3_Report.pdf · 28 pages', status: 'pending' },
  { label: 'Checking for sensitive data', status: 'pending', safety: true },
  { label: 'Finding related pages in your wiki', status: 'pending' },
]

export function IngestFlow() {
  const { setMode } = useMode()
  const [phase, setPhase] = useState<Phase>('idle')
  const [steps, setSteps] = useState<WorkStep[]>(RETRIEVE_STEPS)
  const [touchedShown, setTouchedShown] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  const start = useCallback(() => {
    clearTimers()
    setTouchedShown(0)
    setPhase('retrieve')
    setMode('retrieve')
    setSteps(RETRIEVE_STEPS.map((s, i) => ({ ...s, status: i === 0 ? 'active' : 'pending' })))

    const t = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))

    t(900, () => setSteps((s) => s.map((x, i) => (i === 0 ? { ...x, status: 'done' } : i === 1 ? { ...x, status: 'active' } : x))))
    t(1800, () => setSteps((s) => s.map((x, i) => (i <= 1 ? { ...x, status: 'done' } : i === 2 ? { ...x, status: 'active' } : x))))
    t(2600, () => setSteps((s) => s.map((x) => ({ ...x, status: 'done' }))))

    // Move to synthesize
    t(3000, () => {
      setPhase('synthesize')
      setMode('synthesize')
    })

    // Stream touched pages one by one
    TOUCHED_PAGES.forEach((_, i) => {
      t(3400 + i * 650, () => setTouchedShown(i + 1))
    })

    // Move to review (still supervise); mode returns to create for the confirm decision
    t(3400 + TOUCHED_PAGES.length * 650 + 500, () => {
      setPhase('review')
    })
  }, [setMode])

  const fileIt = () => {
    setPhase('filed')
    setMode('create')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <header className="mb-8">
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Add a source
        </h1>
        <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Drop a document and watch your wiki grow. Nothing is filed until you approve it.
        </p>
      </header>

      {/* Dropzone */}
      {phase === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center transition-colors hover:border-primary/50 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
            <UploadCloud className="size-6" />
          </span>
          <span className="font-serif text-lg font-medium text-foreground">
            Drop a PDF, document, or image
          </span>
          <span className="text-sm text-muted-foreground">
            or click to browse · we&apos;ll use a sample Q3_Report.pdf for this demo
          </span>
        </button>
      )}

      {/* File chip */}
      {phase !== 'idle' && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
            <FileText className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">Q3_Report.pdf</p>
            <p className="text-xs text-muted-foreground">2.4 MB · 28 pages</p>
          </div>
          {phase === 'review' || phase === 'filed' ? (
            <span className="inline-flex items-center gap-1 text-xs text-success">
              <Check className="size-3.5" /> Read
            </span>
          ) : null}
        </div>
      )}

      {/* Retrieve working state */}
      {phase === 'retrieve' && (
        <WorkingState mode="retrieve" title="Reading your source" steps={steps} />
      )}

      {/* Synthesize: streaming touched pages */}
      {(phase === 'synthesize' || phase === 'review' || phase === 'filed') && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">Pages being touched</h2>
            <span className="text-xs text-muted-foreground">
              {touchedShown} of {TOUCHED_PAGES.length}
            </span>
          </div>
          <ul className="space-y-2">
            <AnimatePresence>
              {TOUCHED_PAGES.slice(0, touchedShown).map((page) => (
                <motion.li
                  key={page.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                >
                  <DiffBadge change={page.change} />
                  <span className="font-medium text-foreground">{page.title}</span>
                  <span className="ml-auto truncate text-xs text-muted-foreground">{page.note}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      )}

      {/* Review takeaways + confirm */}
      {(phase === 'review' || phase === 'filed') && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mt-8 rounded-xl border border-border bg-surface p-6"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">Here&apos;s what I learned</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Three key takeaways, each traceable to the source. Review before it&apos;s filed.
          </p>
          <div className="mt-4">
            <TakeawayList takeaways={TAKEAWAYS} />
          </div>

          {phase === 'review' ? (
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <button
                type="button"
                onClick={fileIt}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Check className="size-4" />
                Looks right — file it
              </button>
              <button
                type="button"
                onClick={() => setPhase('idle')}
                className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Discard
              </button>
              <span className="text-[11px] text-muted-foreground">
                Filing adds these pages to your wiki. You can undo it from the activity log.
              </span>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="size-4" />
                Filed — 5 pages updated in your wiki
              </span>
              <a
                href="/page/projects/acme-q3/margin-compression"
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                View Margin Compression
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          )}
        </motion.section>
      )}
    </div>
  )
}
