import { Plus, Pencil, Minus } from 'lucide-react'

const MAP = {
  new: { icon: Plus, label: 'new', cls: 'text-success border-success/30 bg-success/10' },
  updated: { icon: Pencil, label: 'updated', cls: 'text-mode-create border-mode-create/30 bg-mode-create/10' },
  removed: { icon: Minus, label: 'removed', cls: 'text-destructive border-destructive/30 bg-destructive/10' },
} as const

export function DiffBadge({ change }: { change: 'new' | 'updated' | 'removed' }) {
  const { icon: Icon, label, cls } = MAP[change]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[6px] border px-1.5 py-0.5 text-[11px] font-medium ${cls}`}
    >
      <Icon className="size-3" />
      {label}
    </span>
  )
}
