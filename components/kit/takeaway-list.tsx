import { CitationChip } from './citation-chip'
import type { Takeaway } from '@/lib/mock-data'

export function TakeawayList({ takeaways }: { takeaways: Takeaway[] }) {
  return (
    <ul className="space-y-3">
      {takeaways.map((tk) => (
        <li key={tk.id} className="flex gap-3">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <p className="font-serif text-[15px] leading-relaxed text-foreground">
            {tk.text}
            <CitationChip n={tk.citation} />
          </p>
        </li>
      ))}
    </ul>
  )
}
