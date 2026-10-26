import type { Mode } from '@/components/mode/mode-provider'

export type TrackedProject = {
  id: string
  title: string
  stage: Mode
  state: 'done' | 'active' | 'upcoming'
  statusLabel: string
  date: string
  next: string
  reviewed: number
  total: number
  refs: string[]
  checks: string[]
}

export const TRACKED_PROJECTS: TrackedProject[] = [
  {
    id: 'board',
    title: 'Q4 Board Deck',
    stage: 'deliver',
    state: 'done',
    statusLabel: 'Delivered',
    date: 'Oct 24',
    next: 'Exported after you verified all 14 claims against their sources.',
    reviewed: 14,
    total: 14,
    refs: ['board-q4.md', '3 sources', 'audit #a91f'],
    checks: [
      'Every claim maps to a document and locator',
      'You confirmed accountability before export',
      'Verification written to the audit trail',
    ],
  },
  {
    id: 'acme',
    title: 'Acme Corp — Q3 Diligence',
    stage: 'synthesize',
    state: 'active',
    statusLabel: 'Synthesizing',
    date: 'Oct 26',
    next: 'Verify 7 claims in Margin Compression before the memo can export.',
    reviewed: 17,
    total: 24,
    refs: ['Q3_Report.pdf', 'Call_Transcript.docx', '9 sources'],
    checks: [
      'Contradiction on Q4 cost outlook is resolved',
      'Remaining 7 claims reviewed by you',
      'Memo passes the delivery gate',
    ],
  },
  {
    id: 'northwind',
    title: 'Northwind Refresh',
    stage: 'retrieve',
    state: 'upcoming',
    statusLabel: 'Gathering sources',
    date: 'Oct 25',
    next: 'Add the 2026 price list so the pricing model stops citing a stale one.',
    reviewed: 3,
    total: 17,
    refs: ['pricing-model.xlsx', '6 sources'],
    checks: ['Current price list linked', 'Positioning pages reviewed', 'Pricing study drafted'],
  },
]
