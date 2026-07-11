export type ParaNode = {
  id: string
  label: string
  path: string
  children?: ParaNode[]
}

export type ParaSection = {
  key: 'projects' | 'areas' | 'resources' | 'archives'
  label: string
  active?: boolean
  nodes: ParaNode[]
}

export const PARA_TREE: ParaSection[] = [
  {
    key: 'projects',
    label: 'Projects',
    active: true,
    nodes: [
      {
        id: 'p-acme',
        label: 'Acme Corp — Q3 Diligence',
        path: '/page/projects/acme-q3',
        children: [
          { id: 'p-acme-1', label: 'Margin Compression', path: '/page/projects/acme-q3/margin-compression' },
          { id: 'p-acme-2', label: 'Revenue Quality', path: '/page/projects/acme-q3/revenue-quality' },
          { id: 'p-acme-3', label: 'Management Notes', path: '/page/projects/acme-q3/management' },
        ],
      },
      {
        id: 'p-north',
        label: 'Northwind Refresh',
        path: '/page/projects/northwind',
        children: [
          { id: 'p-north-1', label: 'Positioning', path: '/page/projects/northwind/positioning' },
          { id: 'p-north-2', label: 'Pricing Study', path: '/page/projects/northwind/pricing' },
        ],
      },
      { id: 'p-board', label: 'Q4 Board Deck', path: '/page/projects/board-q4' },
    ],
  },
  {
    key: 'areas',
    label: 'Areas',
    nodes: [
      { id: 'a-market', label: 'Market Intelligence', path: '/page/areas/market-intel' },
      { id: 'a-clients', label: 'Client Relationships', path: '/page/areas/clients' },
      { id: 'a-ops', label: 'Internal Operations', path: '/page/areas/operations' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    nodes: [
      { id: 'r-frame', label: 'Frameworks & Playbooks', path: '/page/resources/frameworks' },
      { id: 'r-glossary', label: 'Finance Glossary', path: '/page/resources/glossary' },
    ],
  },
  {
    key: 'archives',
    label: 'Archives',
    nodes: [{ id: 'ar-2024', label: '2024 Engagements', path: '/page/archives/2024' }],
  },
]

export type ProjectCard = {
  id: string
  title: string
  status: string
  lastActivity: string
  pages: number
  sources: number
}

export const PROJECTS: ProjectCard[] = [
  {
    id: 'acme',
    title: 'Acme Corp — Q3 Diligence',
    status: 'Reviewing margin compression across three cost centers.',
    lastActivity: '2 hours ago',
    pages: 24,
    sources: 9,
  },
  {
    id: 'northwind',
    title: 'Northwind Refresh',
    status: 'Repositioning study; pricing model half-drafted.',
    lastActivity: 'Yesterday',
    pages: 17,
    sources: 6,
  },
  {
    id: 'board',
    title: 'Q4 Board Deck',
    status: 'Assembling the narrative from four active projects.',
    lastActivity: '3 days ago',
    pages: 8,
    sources: 3,
  },
]

export type ActivityEntry = {
  id: string
  action: string
  detail: string
  time: string
  kind: 'add' | 'ask' | 'tidy' | 'edit'
}

export const ACTIVITY: ActivityEntry[] = [
  {
    id: 'act-1',
    action: 'Added Q3_Report.pdf',
    detail: 'Touched 12 pages · 3 new, 9 updated',
    time: '2h ago',
    kind: 'add',
  },
  {
    id: 'act-2',
    action: 'Asked about margin drivers',
    detail: 'Answer saved to Margin Compression',
    time: '2h ago',
    kind: 'ask',
  },
  {
    id: 'act-3',
    action: 'Tidy up ran',
    detail: '2 contradictions found, 1 resolved',
    time: 'Yesterday',
    kind: 'tidy',
  },
  {
    id: 'act-4',
    action: 'Edited Revenue Quality',
    detail: 'You refined the deferred-revenue note',
    time: 'Yesterday',
    kind: 'edit',
  },
  {
    id: 'act-5',
    action: 'Added Management_Call_Transcript.docx',
    detail: 'Touched 5 pages · 1 new, 4 updated',
    time: '2 days ago',
    kind: 'add',
  },
]

export type Source = {
  id: number
  document: string
  locator: string
  kind: 'PDF' | 'DOCX' | 'XLSX' | 'Transcript'
  snippet: string
  addedOn: string
}

export const SOURCES: Record<number, Source> = {
  1: {
    id: 1,
    document: 'Q3_Report.pdf',
    locator: 'Page 14, MD&A',
    kind: 'PDF',
    snippet:
      'Gross margin declined 340 bps year-over-year, driven primarily by elevated input costs in the components segment and an unfavorable product mix shift toward lower-margin service contracts.',
    addedOn: 'Added 2 hours ago',
  },
  2: {
    id: 2,
    document: 'Management_Call_Transcript.docx',
    locator: 'Section 3, CFO remarks',
    kind: 'Transcript',
    snippet:
      '"We expect roughly two-thirds of the component cost pressure to persist into Q4, though we have pricing actions in market that should recover a portion in the following quarter."',
    addedOn: 'Added 2 days ago',
  },
  3: {
    id: 3,
    document: 'Cost_Bridge_Q3.xlsx',
    locator: 'Sheet "Bridge", rows 8–15',
    kind: 'XLSX',
    snippet:
      'Components +$4.2M, Logistics +$1.1M, Mix -$2.3M, FX +$0.4M. Net gross-margin impact of -$7.0M against prior-year quarter.',
    addedOn: 'Added 2 hours ago',
  },
  4: {
    id: 4,
    document: 'Industry_Outlook_2026.pdf',
    locator: 'Page 6, Cost Environment',
    kind: 'PDF',
    snippet:
      'Component spot prices are forecast to ease 8–12% through the first half of the year as supply normalizes, offering partial relief to hardware manufacturers.',
    addedOn: 'Added last week',
  },
}

export type AnswerSentence = {
  text: string
  citations: number[]
}

export type SampleAnswer = {
  id: string
  question: string
  savedTo: string
  sentences: AnswerSentence[]
}

export const SAMPLE_ANSWER: SampleAnswer = {
  id: 'ans-margin-q3',
  question: 'What is driving the margin compression at Acme in Q3, and how durable is it?',
  savedTo: 'Acme Corp — Q3 Diligence',
  sentences: [
    {
      text: 'Acme’s gross margin fell about 340 basis points year-over-year in Q3.',
      citations: [1],
    },
    {
      text: 'The largest driver was elevated component input costs, which added roughly $4.2M of pressure, followed by higher logistics spend.',
      citations: [3],
    },
    {
      text: 'A shift in product mix toward lower-margin service contracts compounded the effect, while favorable foreign exchange offset only a small portion.',
      citations: [1, 3],
    },
    {
      text: 'Management expects about two-thirds of the component cost pressure to persist into Q4, so the compression is not purely transient.',
      citations: [2],
    },
    {
      text: 'However, pricing actions already in market and an industry forecast of easing component prices in the first half suggest partial recovery is plausible over the next two quarters.',
      citations: [2, 4],
    },
  ],
}

export type TouchedPage = {
  id: string
  title: string
  change: 'new' | 'updated' | 'removed'
  note: string
}

export const TOUCHED_PAGES: TouchedPage[] = [
  { id: 't1', title: 'Margin Compression', change: 'new', note: 'Created from cost bridge' },
  { id: 't2', title: 'Acme Corp', change: 'updated', note: 'Added Q3 financial summary' },
  { id: 't3', title: 'Revenue Quality', change: 'updated', note: 'Linked service-contract mix' },
  { id: 't4', title: 'Component Costs', change: 'new', note: 'New resource page' },
  { id: 't5', title: 'Management Notes', change: 'updated', note: 'CFO Q4 guidance' },
]

export type Takeaway = {
  id: string
  text: string
  citation: number
}

export const TAKEAWAYS: Takeaway[] = [
  {
    id: 'tk1',
    text: 'Gross margin compressed 340 basis points year-over-year, the steepest quarterly decline in eight quarters.',
    citation: 1,
  },
  {
    id: 'tk2',
    text: 'Component input costs were the single largest driver at roughly $4.2M of pressure.',
    citation: 3,
  },
  {
    id: 'tk3',
    text: 'Management guided that about two-thirds of the cost pressure persists into Q4.',
    citation: 2,
  },
]

/** Editorial content for a living wiki page (S6). */
export type PageBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; runs: PageRun[] }
  | { type: 'quote'; text: string; citation: number }
  | { type: 'list'; items: PageRun[][] }

export type PageRun =
  | { t: 'text'; v: string }
  | { t: 'link'; v: string; href: string }
  | { t: 'cite'; n: number }

export type WikiPage = {
  path: string
  title: string
  section: string
  summary: string
  maintainedOn: string
  blocks: PageBlock[]
  backlinks: { label: string; path: string; context: string }[]
}

export const WIKI_PAGE: WikiPage = {
  path: 'projects/acme-q3/margin-compression',
  title: 'Margin Compression',
  section: 'Projects · Acme Corp — Q3 Diligence',
  summary: 'Why Acme’s gross margin fell in Q3, what is driving it, and how durable the pressure is.',
  maintainedOn: 'Last maintained by Sovera on Oct 3, from Q3_Report.pdf',
  blocks: [
    {
      type: 'paragraph',
      runs: [
        { t: 'text', v: 'In Q3, ' },
        { t: 'link', v: 'Acme Corp', href: '/page/areas/market-intel' },
        {
          t: 'text',
          v: ' reported a gross margin decline of roughly 340 basis points year-over-year — the steepest quarterly contraction in two years.',
        },
        { t: 'cite', n: 1 },
      ],
    },
    { type: 'heading', text: 'What is driving it' },
    {
      type: 'paragraph',
      runs: [
        {
          t: 'text',
          v: 'The compression is concentrated in three cost centers. Elevated component input costs are the dominant factor, followed by higher logistics spend and an unfavorable shift toward lower-margin ',
        },
        { t: 'link', v: 'service contracts', href: '/page/projects/acme-q3/revenue-quality' },
        { t: 'text', v: '.' },
        { t: 'cite', n: 3 },
      ],
    },
    {
      type: 'list',
      items: [
        [{ t: 'text', v: 'Components: +$4.2M of pressure against prior year' }, { t: 'cite', n: 3 }],
        [{ t: 'text', v: 'Logistics: +$1.1M, driven by expedited freight' }, { t: 'cite', n: 3 }],
        [{ t: 'text', v: 'Product mix: −$2.3M from service-contract growth' }, { t: 'cite', n: 3 }],
      ],
    },
    { type: 'heading', text: 'How durable is it' },
    {
      type: 'quote',
      text: 'We expect roughly two-thirds of the component cost pressure to persist into Q4, though we have pricing actions in market that should recover a portion in the following quarter.',
      citation: 2,
    },
    {
      type: 'paragraph',
      runs: [
        {
          t: 'text',
          v: 'Independent forecasts suggest component spot prices ease 8–12% through the first half, offering partial relief that is not yet reflected in guidance.',
        },
        { t: 'cite', n: 4 },
      ],
    },
  ],
  backlinks: [
    {
      label: 'Acme Corp — Q3 Diligence',
      path: '/page/projects/acme-q3',
      context: 'Summarizes margin findings for the diligence memo.',
    },
    {
      label: 'Revenue Quality',
      path: '/page/projects/acme-q3/revenue-quality',
      context: 'References service-contract mix as a margin factor.',
    },
    {
      label: 'Q4 Board Deck',
      path: '/page/projects/board-q4',
      context: 'Pulls the cost-bridge chart for the narrative.',
    },
  ],
}

export type InferredGroup = {
  key: 'projects' | 'areas'
  label: string
  items: { id: string; label: string; note: string }[]
}

export const INFERRED_WORKSPACE: InferredGroup[] = [
  {
    key: 'projects',
    label: 'Projects',
    items: [
      { id: 'i-acme', label: 'Acme Corp — Q3 Diligence', note: '9 files · financials, transcripts' },
      { id: 'i-north', label: 'Northwind Refresh', note: '6 files · positioning, pricing' },
      { id: 'i-board', label: 'Q4 Board Deck', note: '3 files · drafts, charts' },
      { id: 'i-hire', label: 'Q1 Hiring Plan', note: '4 files · org chart, budgets' },
    ],
  },
  {
    key: 'areas',
    label: 'Areas',
    items: [
      { id: 'i-market', label: 'Market Intelligence', note: '12 files · industry reports' },
      { id: 'i-clients', label: 'Client Relationships', note: '7 files · notes, contracts' },
      { id: 'i-ops', label: 'Internal Operations', note: '5 files · processes, policies' },
    ],
  },
]

export type Finding = {
  id: string
  type: 'contradiction' | 'stale' | 'orphan' | 'gap' | 'cross-reference'
  title: string
  detail: string
  pages: string[]
  proposal: string
}

export const FINDINGS: Finding[] = [
  {
    id: 'f1',
    type: 'contradiction',
    title: 'Two pages disagree on the Q4 cost outlook',
    detail:
      'Margin Compression says two-thirds of cost pressure persists into Q4, while Management Notes cites “most pressure resolved by Q4.” One of these is stale.',
    pages: ['Margin Compression', 'Management Notes'],
    proposal: 'Keep the transcript-sourced figure (two-thirds persists) and flag the other as superseded.',
  },
  {
    id: 'f2',
    type: 'stale',
    title: 'Pricing Study cites a superseded price list',
    detail:
      'The Northwind pricing model references the 2024 list. A newer 2026 list was added last week but not linked here.',
    pages: ['Pricing Study'],
    proposal: 'Update references to the 2026 price list and note the change in the page history.',
  },
  {
    id: 'f3',
    type: 'orphan',
    title: 'Component Costs has no inbound links',
    detail:
      'This resource page is referenced by no other page, so it is hard to discover from your projects.',
    pages: ['Component Costs'],
    proposal: 'Add a cross-reference from Margin Compression, where it is most relevant.',
  },
  {
    id: 'f4',
    type: 'gap',
    title: 'No page covers Acme’s pricing actions',
    detail:
      'Management mentioned pricing actions “in market,” but there is no page capturing what they are or their expected impact.',
    pages: [],
    proposal: 'Draft a stub page “Acme Pricing Actions” linked from Margin Compression.',
  },
]
