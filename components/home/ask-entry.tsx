'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export function AskEntry() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    router.push(q ? `/ask?q=${encodeURIComponent(q)}` : '/ask')
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-6 sm:p-7">
      <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
        <Sparkles className="size-3.5" />
        Ask your wiki
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit(e)
          }}
          placeholder="What is driving the margin compression at Acme in Q3?"
          className="min-h-11 flex-1 rounded-lg border border-border bg-canvas px-4 py-2.5 font-serif text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/40"
          aria-label="Ask your wiki a question"
        />
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Ask
          <ArrowRight className="size-4" />
        </button>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">
        Every answer is assembled from your own sources and carries citations you can verify.
      </p>
    </section>
  )
}
