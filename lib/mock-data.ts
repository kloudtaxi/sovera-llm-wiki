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
