import { Check, Cpu, Lock, FolderClosed } from 'lucide-react'

const ASSURANCES = [
  {
    icon: Cpu,
    title: 'Runs on your Claude',
    body: 'Every read, draft, and answer uses the model you connected. We never proxy your prompts through our own keys.',
  },
  {
    icon: FolderClosed,
    title: 'Your documents stay yours',
    body: 'Sources live in your workspace. Sovera reads them to build pages but never trains on or ships them elsewhere.',
  },
  {
    icon: Lock,
    title: 'No hidden calls',
    body: 'A safety pass runs locally before anything leaves your machine, and you see it happen in the Retrieve step.',
  },
]

export function ByocCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
            <Cpu className="size-5" />
          </span>
          <div>
            <p className="font-medium text-foreground">Claude Desktop</p>
            <p className="text-xs text-muted-foreground">Connected as Jordan Reyes · claude-sonnet</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
          <Check className="size-3.5" />
          Connected
        </span>
      </div>

      <dl className="mt-5 grid gap-5 sm:grid-cols-3">
        {ASSURANCES.map((a) => (
          <div key={a.title}>
            <a.icon className="size-4 text-primary" />
            <dt className="mt-2 text-sm font-medium text-foreground">{a.title}</dt>
            <dd className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{a.body}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-lg border border-border px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reconnect
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-lg border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Switch model
        </button>
      </div>
    </div>
  )
}
