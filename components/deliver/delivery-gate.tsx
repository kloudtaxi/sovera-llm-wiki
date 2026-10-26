'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockOpen, Lock, FileDown, Check, ShieldCheck, ArrowRight, CircleCheckBig } from 'lucide-react'
import { SAMPLE_ANSWER, SOURCES } from '@/lib/mock-data'
import { SourceCard } from '@/components/kit/source-drawer'
import { Rail, RailStep } from '@/components/kit/rail'
import { Disclosure, Eyebrow, MetaChip, Meter, StatusPill } from '@/components/kit/meta'

const DELIVER = 'var(--mode-deliver)'

export function DeliveryGate() {
  const [verified, setVerified] = useState(false)
  const [exported, setExported] = useState(false)

  const claims = SAMPLE_ANSWER.sentences

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-mode-deliver/30 bg-mode-deliver/10 px-3 py-1 text-xs font-medium text-mode-deliver">
          <ShieldCheck className="size-3.5" />
          Delivery gate · you approve
        </div>
        <h1 className="mt-3 text-balance font-serif text-3xl font-semibold leading-tight text-foreground">
          Before this leaves your wiki, verify the sources.
        </h1>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {SAMPLE_ANSWER.question}
        </p>
        <div className="mt-4 max-w-sm">
          <Meter
            label="Claims mapped"
            value={claims.length}
            total={claims.length}
            color={verified ? 'var(--success)' : DELIVER}
          />
        </div>
      </header>

      <Rail>
        {claims.map((claim, i) => (
          <RailStep
            key={i}
            state={verified ? 'done' : 'active'}
            marker={i + 1}
            accent={DELIVER}
          >
            <article className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  C{i + 1}
                </span>
                <StatusPill
                  label={verified ? 'Verified by you' : 'Awaiting review'}
                  color={verified ? 'var(--success)' : DELIVER}
                />
              </div>
              <p className="mt-2 text-pretty leading-relaxed text-foreground">
                <Eyebrow>Claim</Eyebrow>
                {claim.text}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-sm text-muted-foreground">Traces to</span>
                {claim.citations.map((cn) => (
                  <MetaChip key={cn}>{SOURCES[cn].document}</MetaChip>
                ))}
                {claim.citations.map((cn) => (
                  <MetaChip key={`loc-${cn}`}>{SOURCES[cn].locator}</MetaChip>
                ))}
              </div>
              <Disclosure summary="Show the exact excerpt">
                <div className="flex flex-col gap-3">
                  {claim.citations.map((cn) => (
                    <div key={cn} className="flex flex-col gap-2">
                      <SourceCard source={SOURCES[cn]} />
                      <blockquote className="rounded-lg border border-border bg-muted/40 p-3 text-sm leading-relaxed text-foreground">
                        {SOURCES[cn].snippet}
                      </blockquote>
                    </div>
                  ))}
                </div>
              </Disclosure>
            </article>
          </RailStep>
        ))}

        <RailStep state={exported ? 'done' : verified ? 'active' : 'locked'} marker={<LockOpen className="size-3.5" />} accent={DELIVER} last>
          <div
            className="rounded-2xl border-2 bg-surface p-4 sm:p-5"
            style={{ borderColor: exported ? 'var(--success)' : DELIVER }}
          >
            <AnimatePresence mode="wait">
              {exported ? (
                <motion.div
                  key="exported"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <CircleCheckBig className="mt-0.5 size-6 shrink-0 text-success" />
                  <div>
                    <p className="font-semibold text-foreground">Exported — and logged.</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Your verification was written to the audit trail. You own this.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <MetaChip>margin-memo.md</MetaChip>
                      <MetaChip>audit #c47e</MetaChip>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="gate" className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h2 className="font-serif text-lg font-bold text-foreground">Export</h2>
                    <StatusPill
                      label={verified ? 'Unlocked' : 'Locked'}
                      color={verified ? 'var(--success)' : 'var(--muted-foreground)'}
                    />
                  </div>
                  <p className="text-pretty leading-relaxed text-foreground">
                    <Eyebrow>Gate</Eyebrow>
                    Nothing exports until you confirm you&apos;ve reviewed every claim. You are the
                    final authority, not Sovera.
                  </p>

                  <label className="flex min-h-11 cursor-pointer items-start gap-3">
                    <span className="relative mt-0.5 flex size-5 shrink-0">
                      <input
                        type="checkbox"
                        checked={verified}
                        onChange={(e) => setVerified(e.target.checked)}
                        className="peer size-5 cursor-pointer appearance-none rounded-[6px] border border-mode-deliver/50 bg-surface transition-colors checked:border-mode-deliver checked:bg-mode-deliver focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      <Check className="pointer-events-none absolute left-0.5 top-0.5 size-4 text-primary-foreground opacity-0 peer-checked:opacity-100" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">
                      <span className="font-medium">
                        I&apos;ve reviewed the sources and I&apos;m accountable for this.
                      </span>
                    </span>
                  </label>

                  <button
                    type="button"
                    disabled={!verified}
                    onClick={() => setExported(true)}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-mode-deliver px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-mode-deliver/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground sm:w-auto sm:self-start"
                  >
                    {verified ? <FileDown className="size-4" /> : <Lock className="size-4" />}
                    Export deliverable
                    {verified && <ArrowRight className="size-4" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RailStep>
      </Rail>
    </div>
  )
}
