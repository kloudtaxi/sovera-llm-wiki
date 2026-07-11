type Node = { x: number; y: number; r: number; primary?: boolean }

const SPARK_NODES: Node[] = [
  { x: 14, y: 20, r: 2 },
  { x: 30, y: 12, r: 2.5 },
  { x: 32, y: 30, r: 3, primary: true },
  { x: 48, y: 22, r: 2 },
  { x: 20, y: 34, r: 2 },
]

const SPARK_EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
]

/** Tiny knowledge-graph "spark" — a compact neighborhood glyph for cards. */
export function GraphSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 62 44" className={className} aria-hidden="true" fill="none">
      {SPARK_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={SPARK_NODES[a].x}
          y1={SPARK_NODES[a].y}
          x2={SPARK_NODES[b].x}
          y2={SPARK_NODES[b].y}
          stroke="currentColor"
          strokeWidth={1}
          className="text-border"
        />
      ))}
      {SPARK_NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          className={n.primary ? 'text-primary' : 'text-muted-foreground'}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

const MAP_NODES: (Node & { label?: string })[] = [
  { x: 90, y: 60, r: 7, primary: true, label: 'This page' },
  { x: 40, y: 30, r: 4 },
  { x: 150, y: 34, r: 4 },
  { x: 34, y: 90, r: 4 },
  { x: 150, y: 96, r: 4 },
  { x: 90, y: 108, r: 3 },
]
const MAP_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
]

/** Larger neighborhood map for a wiki page's context panel. */
export function GraphMiniMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 130" className={className} fill="none" role="img" aria-label="Knowledge graph neighborhood for this page">
      {MAP_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={MAP_NODES[a].x}
          y1={MAP_NODES[a].y}
          x2={MAP_NODES[b].x}
          y2={MAP_NODES[b].y}
          stroke="currentColor"
          strokeWidth={1}
          className="text-border"
        />
      ))}
      {MAP_NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          className={n.primary ? 'text-primary' : 'text-muted-foreground'}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
