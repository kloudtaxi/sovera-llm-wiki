'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookmarkPlus, FileDown, StopCircle, CornerDownLeft } from 'lucide-react'
import { useMode } from '@/components/mode/mode-provider'
import { WorkingState, type WorkStep } from '@/components/kit/working-state'
import { CitationChip } from '@/components/kit/citation-chip'
import { SAMPLE_ANSWER } from '@/lib/mock-data'

type Phase = 'idle' | 'retrieve' | 'synthesize' | 'done'

const RETRIEVE_STEPS: WorkStep[] = [
  { label: 'Searching 49 pages across your wiki', status: 'active' },
  { label: 'Reading Q3_Report.pdf, Cost_Bridge_Q3.xlsx, transcript', status: 'pending' },
  { label: 'Checking sources for sensitive data', status: 'pending', safety: true },
]

export function AskFlow({ initialQuestion }: { initialQuestion?: string }) {
  const { setMode } = useMode()
  const [phase, setPhase] = useState<Phase>('idle')
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState('')
  const [steps, setSteps] = useState<WorkStep[]>(RETRIEVE_STEPS)
  const [visibleSentences, setVisibleSentences] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion)
    }
  }, [initialQuestion])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  function reset() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function start(q: string) {
    const text = q.trim() || SAMPLE_ANSWER.question
    reset()
    setAsked(text)
    setVisibleSentences(0)
    setPhase('retrieve')
    setMode('retrieve')
    setSteps(RETRIEVE_STEPS)

    const t = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms))

    t(() => setSteps((s) => s.map((x, i) => (i === 0 ? { ...x, status: 'done' } : i === 1 ? { ...x, status: 'active' } : x))), 700)
    t(() => setSteps((s) => s.map((x, i) => (i <= 1 ? { ...x, status: 'done' } : { ...x, status: 'active' }))), 1500)
    t(() => setSteps((s) => s.map((x) => ({ ...x, status: 'done' }))), 2300)

    // move to synthesize
    t(() => {
      setPhase('synthesize')
      setMode('synthesize')
    }, 2600)

    // stream sentences
    SAMPLE_ANSWER.sentences.forEach((_, i) => {
      t(() => setVisibleSentences(i + 1), 3000 + i * 700)
    })

    // done
    t(() => setPhase('done'), 3000 + SAMPLE_ANSWER.sentences.length * 700 + 300)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    start(question)
  }

  function stop() {
    reset()
    setPhase('done')
    setVisibleSentences(SAMPLE_ANSWER.sentences.length)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      {/* Ask box */}
      <form onSubmit={submit} className="mb-8">
        <label className="mb-2 block text-sm text-muted-foreground">
          Ask your wiki anything. You&apos;ll get an answer built only from your own sources.
        </label>
        <div className="rounded-xl border border-border bg-surface p-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                submit(e)
              }
            }}
            rows={2}
            placeholder={SAMPLE_ANSWER.question}
            className="w-full resize-none bg-transparent px-3 py-2 font-serif text-lg leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/60"
            aria-label="Your question"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex">
              <CornerDownLeft className="size-3" /> to ask · Shift+Enter for a new line
            </span>
            <button
              type="submit"
              disabled={phase === 'retrieve' || phase === 'synthesize'}
              className="ml-auto inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Ask
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </form>

      {phase === 'idle' && (
        <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
          <p className="font-serif text-lg text-foreground">Nothing asked yet.</p>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
            Try the sample question above, or ask your own. Watch the mode indicator move as Sovera
            retrieves, then synthesizes — you stay in control the whole way.
          </p>
        </div>
      )}

      {asked && phase !== 'idle' && (
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your question
          </p>
          <p className="mt-1 text-pretty font-serif text-2xl font-semibold leading-snug text-foreground">
            {asked}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'retrieve' && (
          <motion.div
            key="retrieve"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <WorkingState mode="retrieve" title="Reading your wiki" steps={steps} />
          </motion.div>
        )}

        {(phase === 'synthesize' || phase === 'done') && (
          <motion.div
            key="answer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {phase === 'synthesize' && (
              <div className="mb-4 flex items-center justify-between rounded-lg border border-mode-synthesize/30 bg-mode-synthesize/10 px-4 py-2.5">
                <span className="text-sm font-medium text-mode-synthesize">
                  Assembling your answer — you can steer or stop.
                </span>
                <button
                  type="button"
                  onClick={stop}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-mode-synthesize transition-colors hover:bg-mode-synthesize/15"
                >
                  <StopCircle className="size-4" />
                  Stop
                </button>
              </div>
            )}

            <article className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <p className="font-serif text-[19px] leading-[1.7] text-foreground">
                {SAMPLE_ANSWER.sentences.slice(0, visibleSentences).map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {s.text}
                    {s.citations.map((c) => (
                      <CitationChip key={c} n={c} />
                    ))}{' '}
                  </motion.span>
                ))}
              </p>
            </article>

            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <BookmarkPlus className="size-4" />
                  Save this answer as a page
                </button>
                <Link
                  href={`/ask/${SAMPLE_ANSWER.id}/export`}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-mode-deliver px-4 text-sm font-medium text-white transition-colors hover:bg-mode-deliver/90"
                >
                  <FileDown className="size-4" />
                  Export or share
                </Link>
                <span className="text-xs text-muted-foreground sm:ml-auto">
                  Would be filed under{' '}
                  <span className="font-medium text-foreground">{SAMPLE_ANSWER.savedTo}</span>
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
