'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Lock,
  LockOpen,
  FileDown,
  Check,
  ShieldCheck,
  ArrowRight,
  CircleCheckBig,
} from 'lucide-react'
import { SAMPLE_ANSWER, SOURCES } from '@/lib/mock-data'
import { SourceCard } from '@/components/kit/source-drawer'

export function DeliveryGate() {
  const [verified, setVerified] = useState(false)
  const [exported, setExported] = useState(false)

  const claims = SAMPLE_ANSWER.sentences

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-mode-deliver/30 bg-mode-deliver/10 px-3 py-1 text-xs font-medium text-mode-deliver">
          <ShieldCheck className="size-3.5" />
          Delivery gate · you approve
        </div>
        <h1 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight text-foreground">
          Before this leaves your wiki, verify the sources.
        </h1>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          Every claim below is mapped to the exact document and locator it came from. Nothing exports
          until you confirm you&apos;ve reviewed them — you are the final authority, not Sovera.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left: deliverable */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">The deliverable</h2>
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground">
              Summary memo
            </span>
          </div>
          <p className="mb-4 font-serif text-base font-medium leading-snug text-foreground">
            {SAMPLE_ANSWER.question}
          </p>
          <div className="space-y-3">
            {claims.map((c, i) => (
              <p key={i} className="font-serif text-[15px] leading-relaxed text-foreground">
                <span className="mr-1.5 inline-flex size-5 items-center justify-center rounded-[6px] border border-mode-deliver/30 bg-mode-deliver/10 text-[11px] font-medium text-mode-deliver align-[1px]">
                  {i + 1}
                </span>
                {c.text}
              </p>
            ))}
          </div>
        </section>

        {/* Right: audit trail */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Deterministic audit trail
            </h2>
            <span className="text-[11px] text-muted-foreground">{claims.length} claims mapped</span>
          </div>
          <ol className="space-y-3">
            {claims.map((c, i) => (
              <li key={i} className="rounded-lg border border-border bg-canvas/60 p-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-5 items-center justify-center rounded-[6px] border border-mode-deliver/30 bg-mode-deliver/10 text-[11px] font-medium text-mode-deliver">
                    {i + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">Claim {i + 1} traces to</span>
                </div>
                <div className="mt-3 space-y-3">
                  {c.citations.map((cn) => (
                    <SourceCard key={cn} source={SOURCES[cn]} />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Gate */}
      <div className="mt-6 rounded-xl border border-mode-deliver/30 bg-mode-deliver/[0.06] p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {exported ? (
            <motion.div
              key="exported"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <CircleCheckBig className="size-6 text-success" />
              <div>
                <p className="font-medium text-foreground">Exported — and logged.</p>
                <p className="text-sm text-muted-foreground">
                  A record of your verification was written to the audit trail. You own this.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="gate" className="flex flex-col gap-5">
              <label className="flex cursor-pointer items-start gap-3">
                <span className="relative mt-0.5 flex size-5 shrink-0">
                  <input
                    type="checkbox"
                    checked={verified}
                    onChange={(e) => setVerified(e.target.checked)}
                    className="peer size-5 cursor-pointer appearance-none rounded-[6px] border border-mode-deliver/50 bg-surface transition-colors checked:border-mode-deliver checked:bg-mode-deliver focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="I've reviewed the sources and I'm accountable for this"
                  />
                  <Check className="pointer-events-none absolute left-0.5 top-0.5 size-4 text-white opacity-0 peer-checked:opacity-100" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  <span className="font-medium">
                    I&apos;ve reviewed the sources and I&apos;m accountable for this.
                  </span>
                  <span className="mt-0.5 block text-muted-foreground">
                    This deliverable and its claims are mine to stand behind.
                  </span>
                </span>
              </label>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex items-center gap-2 text-sm">
                  <AnimatePresence mode="wait" initial={false}>
                    {verified ? (
                      <motion.span
                        key="open"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 text-success"
                      >
                        <LockOpen className="size-4" />
                        Export unlocked
                      </motion.span>
                    ) : (
                      <motion.span
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 text-muted-foreground"
                      >
                        <Lock className="size-4" />
                        Locked until you verify
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  disabled={!verified}
                  onClick={() => setExported(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-mode-deliver px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-mode-deliver/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                  style={verified ? { boxShadow: '0 4px 16px color-mix(in srgb, var(--mode-deliver) 30%, transparent)' } : undefined}
                >
                  <FileDown className="size-4" />
                  Export deliverable
                  {verified && <ArrowRight className="size-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
