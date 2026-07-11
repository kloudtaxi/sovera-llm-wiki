import { FilePlus2, MessageCircleQuestion, Sparkles, PencilLine } from 'lucide-react'
import type { ActivityEntry } from '@/lib/mock-data'

const ICON = {
  add: FilePlus2,
  ask: MessageCircleQuestion,
  tidy: Sparkles,
  edit: PencilLine,
} as const

export function ActivityItem({ entry }: { entry: ActivityEntry }) {
  const Icon = ICON[entry.kind]
  return (
    <li className="flex gap-3 py-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground">
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{entry.action}</p>
        <p className="text-xs text-muted-foreground">{entry.detail}</p>
      </div>
      <span className="shrink-0 text-[11px] text-muted-foreground">{entry.time}</span>
    </li>
  )
}
