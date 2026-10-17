import { useMemo, useState, type MouseEvent } from 'react'
import { handleGuideNavigation, navigateGuide } from '../GuideNavigation'
import { Segment } from '../guide-kit'
import { layoutGraph, type PlacedNode } from './graphLayout'
import { loadGraph, loadSizes, packFileUrl, sizeOf, useLoaded, type Pack } from './pack'
import { Loading, ReleaseLine, useUrlFilter } from './pageParts'
import { Empty, StateChip, Tokens, agentHrefFor } from './parts'
import type { GraphEdge, GraphEdgeType, PackGraph } from './types'

// The graph map: every component in graph.json as a node, and the typed
// relationships the pipeline derived from the entries as edges.

export const EDGE_TYPES: ReadonlyArray<readonly [GraphEdgeType, string, string]> = [
  ['useInstead', 'Use instead', 'An avoidWhen rule names this component instead.'],
  ['placedIn', 'Placed in', 'Placement advice names the component it goes in.'],
  ['slotAccepts', 'Slot accepts', 'A slot of the component accepts this export.'],
  ['usedWith', 'Used with', 'They appear together in an example.'],
]

const EDGE_LABEL = Object.fromEntries(EDGE_TYPES.map(([type, label]) => [type, label])) as Record<GraphEdgeType, string>

function edgeText(edge: GraphEdge) {
  const extra = [edge.slot && `slot ${edge.slot}`, edge.strength].filter(Boolean).join(', ')
  return `${edge.from} —${edge.type}→ ${edge.to}${extra ? ` (${extra})` : ''}`
}

/** Where a line from (fromX, fromY) toward the node's centre meets its edge. */
function boundaryPoint(node: PlacedNode, fromX: number, fromY: number) {
  const dx = fromX - node.x
  const dy = fromY - node.y
  if (!dx && !dy) return { x: node.x, y: node.y }
  const scale = Math.min(
    dx ? node.width / 2 / Math.abs(dx) : Infinity,
    dy ? node.height / 2 / Math.abs(dy) : Infinity,
  )
  return { x: node.x + dx * scale, y: node.y + dy * scale }
}

type DrawnEdge = { edge: GraphEdge; key: string; path: string; labelX: number; labelY: number }

function drawEdges(edges: GraphEdge[], nodes: Map<string, PlacedNode>): DrawnEdge[] {
  // Edges between the same two nodes curve apart so each stays visible.
  const groups = new Map<string, GraphEdge[]>()
  for (const edge of edges) {
    if (!nodes.has(edge.from) || !nodes.has(edge.to) || edge.from === edge.to) continue
    const pair = [edge.from, edge.to].sort().join('\u0000')
    groups.set(pair, [...(groups.get(pair) ?? []), edge])
  }
  const drawn: DrawnEdge[] = []
  for (const group of groups.values()) {
    group.forEach((edge, index) => {
      const from = nodes.get(edge.from)!
      const to = nodes.get(edge.to)!
      const mx = (from.x + to.x) / 2
      const my = (from.y + to.y) / 2
      const length = Math.max(Math.hypot(to.x - from.x, to.y - from.y), 1)
      // Offsets are measured on the pair's sorted direction, so two edges in
      // opposite directions don't land on the same curve.
      const sign = edge.from < edge.to ? 1 : -1
      const offset = (index - (group.length - 1) / 2) * 26 * sign
      const cx = mx + (-(to.y - from.y) / length) * offset
      const cy = my + ((to.x - from.x) / length) * offset
      const start = boundaryPoint(from, cx, cy)
      const end = boundaryPoint(to, cx, cy)
      drawn.push({
        edge,
        key: `${edge.from}-${edge.type}-${edge.to}-${edge.source}-${index}`,
        path: `M${start.x.toFixed(1)},${start.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${end.x.toFixed(1)},${end.y.toFixed(1)}`,
        labelX: 0.25 * start.x + 0.5 * cx + 0.25 * end.x,
        labelY: 0.25 * start.y + 0.5 * cy + 0.25 * end.y,
      })
    })
  }
  return drawn
}

function nodeClass(node: PlacedNode) {
  if (!node.inPack) return 'agent-node is-outside'
  return `agent-node is-${node.state ?? 'unknown'}`
}

function nodeDescription(node: PlacedNode, href: string | undefined) {
  const where = node.inPack ? `in the pack, ${node.state ?? 'state unknown'}` : 'not in the pack'
  const relationships = node.degree ? `${node.degree} relationship${node.degree === 1 ? '' : 's'}` : 'no relationships stated'
  return `${node.id}: ${where}, ${relationships}.${href ? ' Opens its Agent view.' : ''}`
}

function GraphNodeMark({
  node,
  href,
  active,
  onFocus,
  onBlur,
}: {
  node: PlacedNode
  href: string | undefined
  active: boolean
  onFocus: () => void
  onBlur: () => void
}) {
  const body = (
    <>
      <rect
        x={node.x - node.width / 2}
        y={node.y - node.height / 2}
        width={node.width}
        height={node.height}
        rx={node.height / 2}
      />
      <text x={node.x} y={node.y} dominantBaseline="central" textAnchor="middle">
        {node.id}
      </text>
    </>
  )
  const className = `${nodeClass(node)}${active ? ' is-active' : ''}${node.degree ? '' : ' is-isolated'}`
  if (!href) {
    return (
      <g className={className} onMouseEnter={onFocus} onMouseLeave={onBlur} aria-label={nodeDescription(node, undefined)} role="img">
        <title>{nodeDescription(node, undefined)}</title>
        {body}
      </g>
    )
  }
  const open = (event: MouseEvent<Element>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigateGuide(new URL(href, window.location.href))
  }
  return (
    <a
      href={href}
      className={className}
      onClick={open}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={nodeDescription(node, href)}
    >
      <title>{nodeDescription(node, href)}</title>
      {body}
    </a>
  )
}

function GraphMap({ graph, visible, known }: { graph: PackGraph; visible: Set<GraphEdgeType>; known: Map<string, string> }) {
  const layout = useMemo(() => layoutGraph(graph.nodes, graph.edges), [graph])
  const placed = useMemo(
    () => new Map([...layout.connected, ...layout.isolated].map((node) => [node.id, node])),
    [layout],
  )
  const drawn = useMemo(() => drawEdges(graph.edges, placed), [graph.edges, placed])
  const [focus, setFocus] = useState<string | null>(null)
  const shownEdges = drawn.filter(({ edge }) => visible.has(edge.type))
  const neighbours = new Set(
    focus
      ? shownEdges.flatMap(({ edge }) => (edge.from === focus || edge.to === focus ? [edge.from, edge.to] : []))
      : [],
  )

  return (
    <div className="agent-graph-scroll">
      <svg
        className={`agent-graph${focus ? ' has-focus' : ''}`}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width={layout.width}
        role="group"
        aria-label={`Graph map: ${graph.nodes.length} components and ${graph.edges.length} relationships. The table view lists every relationship.`}
      >
        <defs>
          {EDGE_TYPES.map(([type]) => (
            <marker
              key={type}
              id={`agent-arrow-${type}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className={`agent-arrow is-${type}`} />
            </marker>
          ))}
        </defs>

        {layout.isolated.length > 0 && (
          <g className="agent-isolated-frame">
            <rect x={24} y={layout.isolatedTop} width={layout.width - 48} height={layout.height - layout.isolatedTop - 8} rx={14} />
            <text x={40} y={layout.isolatedTop + 26}>
              No relationships stated ({layout.isolated.length})
            </text>
          </g>
        )}

        <g aria-hidden="true">
          {shownEdges.map(({ edge, key, path }) => {
            const lit = focus !== null && (edge.from === focus || edge.to === focus)
            return (
              <path
                key={key}
                d={path}
                className={`agent-edge is-${edge.type}${lit ? ' is-lit' : ''}`}
                markerEnd={edge.type === 'usedWith' ? undefined : `url(#agent-arrow-${edge.type})`}
              >
                <title>{edgeText(edge)}</title>
              </path>
            )
          })}
          {focus &&
            shownEdges
              .filter(({ edge }) => edge.from === focus || edge.to === focus)
              .map(({ edge, key, labelX, labelY }) => (
                <text key={`label-${key}`} x={labelX} y={labelY} className={`agent-edge-label is-${edge.type}`} textAnchor="middle">
                  {EDGE_LABEL[edge.type]}
                  {edge.slot ? ` · ${edge.slot}` : ''}
                </text>
              ))}
        </g>

        {[...layout.connected, ...layout.isolated].map((node) => (
          <GraphNodeMark
            key={node.id}
            node={node}
            href={agentHrefFor(node.id, known)}
            active={focus === node.id || neighbours.has(node.id)}
            onFocus={() => setFocus(node.id)}
            onBlur={() => setFocus((current) => (current === node.id ? null : current))}
          />
        ))}
      </svg>
    </div>
  )
}

function EdgeTable({ graph, visible, known }: { graph: PackGraph; visible: Set<GraphEdgeType>; known: Map<string, string> }) {
  const edges = graph.edges.filter((edge) => visible.has(edge.type))
  if (!edges.length) return <Empty>No relationships of the selected types.</Empty>
  const link = (id: string, hash?: string, text?: string) => {
    const href = agentHrefFor(id, known, hash)
    return href ? (
      <a href={href} onClick={handleGuideNavigation}>
        {text ?? id}
      </a>
    ) : (
      <span>{text ?? id}</span>
    )
  }
  return (
    <div className="agent-table-scroll">
      <table className="agent-table agent-edge-table">
        <caption className="agent-visually-hidden">Every relationship in the graph</caption>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">Relationship</th>
            <th scope="col">To</th>
            <th scope="col">Slot</th>
            <th scope="col">Strength</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((edge, index) => (
            <tr key={`${edge.from}-${edge.type}-${edge.to}-${index}`}>
              <th scope="row">{link(edge.from)}</th>
              <td>
                <span className={`agent-edge-chip is-${edge.type}`}>{EDGE_LABEL[edge.type] ?? edge.type}</span>
              </td>
              <td>{link(edge.to)}</td>
              <td>{edge.slot ? <code>{edge.slot}</code> : <span className="agent-muted">–</span>}</td>
              <td>{edge.strength ?? <span className="agent-muted">–</span>}</td>
              <td>{link(edge.from, `agent${edge.source.replace(/[^\w]+/g, '-')}`, edge.source)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Legend({ graph, visible, toggle }: { graph: PackGraph; visible: Set<GraphEdgeType>; toggle: (type: GraphEdgeType) => void }) {
  return (
    <div className="agent-graph-legend">
      <fieldset className="agent-edge-filter">
        <legend>Relationships</legend>
        {EDGE_TYPES.map(([type, label, note]) => {
          const count = graph.edges.filter((edge) => edge.type === type).length
          return (
            <button
              key={type}
              type="button"
              aria-pressed={visible.has(type)}
              className={visible.has(type) ? 'is-on' : undefined}
              onClick={() => toggle(type)}
              title={note}
            >
              <svg viewBox="0 0 28 10" width="28" height="10" aria-hidden="true">
                <path d="M1,5 H26" className={`agent-edge is-${type}`} markerEnd={type === 'usedWith' ? undefined : `url(#agent-arrow-${type})`} />
              </svg>
              {label}
              <span className="agent-count">{count}</span>
            </button>
          )
        })}
      </fieldset>
      <div className="agent-node-legend" aria-label="Node styles">
        <span className="agent-legend-label">Components</span>
        {(['documented', 'flagged', 'undocumented', 'unsupported'] as const).map((state) => (
          <span key={state} className={`agent-node-key is-${state}`}>
            <StateChip state={state} />
          </span>
        ))}
        <span className="agent-node-key is-outside">Not in the pack</span>
      </div>
    </div>
  )
}

export function GraphPage({ pack }: { pack: Pack }) {
  const data = useLoaded(`graph:${pack.source}:${pack.current}`, async () => {
    const [graph, sizes] = await Promise.all([loadGraph(pack), loadSizes(pack).catch(() => null)])
    return { graph, sizes }
  })
  const [mode, setMode] = useUrlFilter('show', 'Map', { Map: null, Table: 'table' })
  const [visible, setVisible] = useState<Set<GraphEdgeType>>(() => new Set(EDGE_TYPES.map(([type]) => type)))
  const toggle = (type: GraphEdgeType) =>
    setVisible((current) => {
      const next = new Set(current)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })

  const graph = data.status === 'ready' ? data.value.graph : null
  const size = data.status === 'ready' ? sizeOf(data.value.sizes, 'graph.json') : undefined
  const known = useMemo(
    () => new Map((graph?.nodes ?? []).filter((node) => node.inPack && node.slug).map((node) => [node.id, node.slug!])),
    [graph],
  )
  const degree = useMemo(() => {
    const counts = new Map<string, number>()
    for (const edge of graph?.edges ?? []) {
      counts.set(edge.from, (counts.get(edge.from) ?? 0) + 1)
      counts.set(edge.to, (counts.get(edge.to) ?? 0) + 1)
    }
    return counts
  }, [graph])
  const isolated = (graph?.nodes ?? []).filter((node) => !degree.get(node.id))
  const inPack = (graph?.nodes ?? []).filter((node) => node.inPack).length

  return (
    <>
      <ReleaseLine pack={pack} file="graph.json" />
      <Loading loaded={data}>
        {graph ? (
          <>
            <ul className="agent-counts agent-graph-counts" aria-label="Graph size">
              <li>
                <strong>{inPack}</strong>
                <span>Components in the pack</span>
              </li>
              <li>
                <strong>{graph.nodes.length - inPack}</strong>
                <span>Named by edges, not in the pack</span>
              </li>
              <li>
                <strong>{graph.edges.length}</strong>
                <span>Relationships</span>
              </li>
              {size && (
                <li>
                  <strong>
                    <Tokens tokens={size.tokens} estimated={size.estimated} unit={false} />
                  </strong>
                  <span>Tokens in graph.json, for the graph variant</span>
                </li>
              )}
            </ul>
            {isolated.length > 0 && (
              <p className="agent-isolated-note">
                <strong>No relationships stated</strong> for {isolated.length} component{isolated.length === 1 ? '' : 's'}:{' '}
                {isolated.map((node, index) => (
                  <span key={node.id}>
                    {index > 0 && ', '}
                    {agentHrefFor(node.id, known) ? (
                      <a href={agentHrefFor(node.id, known)} onClick={handleGuideNavigation}>
                        {node.id}
                      </a>
                    ) : (
                      node.id
                    )}
                  </span>
                ))}
                . Their entries name no other component.
              </p>
            )}
            <Legend graph={graph} visible={visible} toggle={toggle} />
            <div className="agent-page-controls">
              <Segment label="Show as" value={mode} options={['Map', 'Table'] as const} onChange={setMode} />
              {pack.source === 'live' && (
                <a className="agent-row-link" href={packFileUrl(pack.current, 'graph.json')} target="_blank" rel="noreferrer">
                  Raw graph.json
                </a>
              )}
            </div>
            {mode === 'Map' ? (
              <>
                <GraphMap graph={graph} visible={visible} known={known} />
                <p className="agent-page-note agent-table-note">
                  Hover over or tab to a component to see its relationships; select it to open its Agent view. Edges come
                  from the entries by code: use instead from avoidWhen, placed in from placement advice, slot accepts from
                  allowed children, and used with from examples.
                </p>
              </>
            ) : (
              <EdgeTable graph={graph} visible={visible} known={known} />
            )}
          </>
        ) : (
          <Empty>
            Release <code>{pack.current}</code> has no <code>graph.json</code>.
          </Empty>
        )}
      </Loading>
    </>
  )
}
