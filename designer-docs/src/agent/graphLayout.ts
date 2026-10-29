import type { GraphEdge, GraphNode } from './types'

// A small, deterministic force layout for the graph map (Fruchterman-Reingold,
// then a pass that pushes overlapping labels apart). The same graph always
// gets the same picture, so screenshots and reviews stay comparable.

export type PlacedNode = GraphNode & { x: number; y: number; width: number; height: number; degree: number }

export type GraphLayout = {
  width: number
  height: number
  /** Nodes with at least one edge, placed by the force layout. */
  connected: PlacedNode[]
  /** Nodes with no edges, placed in a row below: "no relationships stated". */
  isolated: PlacedNode[]
  /** Top of the isolated row's frame, when there is one. */
  isolatedTop: number
}

const NODE_HEIGHT = 32
const CHAR_WIDTH = 7.6
const PADDING = 40

export function nodeWidth(id: string) {
  return Math.round(id.length * CHAR_WIDTH + 30)
}

/** Simple string hash, for small deterministic offsets. */
function hash(text: string) {
  let value = 0
  for (const char of text) value = (value * 31 + char.charCodeAt(0)) | 0
  return value
}

export function layoutGraph(nodes: GraphNode[], edges: GraphEdge[]): GraphLayout {
  const ids = new Set(nodes.map((node) => node.id))
  const degree = new Map<string, number>()
  // One spring per pair of nodes; "used with" pairs pull more weakly, so the
  // stated relationships shape the picture more than co-occurrence does.
  const pairs = new Map<string, number>()
  for (const edge of edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to) || edge.from === edge.to) continue
    degree.set(edge.from, (degree.get(edge.from) ?? 0) + 1)
    degree.set(edge.to, (degree.get(edge.to) ?? 0) + 1)
    const pair = [edge.from, edge.to].sort().join('\u0000')
    pairs.set(pair, Math.max(pairs.get(pair) ?? 0, edge.type === 'usedWith' ? 0.6 : 1))
  }

  const sorted = [...nodes].sort(
    (a, b) => Number(b.inPack) - Number(a.inPack) || (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0) || a.id.localeCompare(b.id),
  )
  const place = (node: GraphNode): PlacedNode => ({
    ...node,
    x: 0,
    y: 0,
    width: nodeWidth(node.id),
    height: NODE_HEIGHT,
    degree: degree.get(node.id) ?? 0,
  })
  const connected = sorted.filter((node) => (degree.get(node.id) ?? 0) > 0).map(place)
  const isolated = sorted.filter((node) => (degree.get(node.id) ?? 0) === 0).map(place)

  // The force layout works in a frame sized for the node count; the drawing
  // then grows to fit what it produced rather than shrinking its labels.
  const frameWidth = Math.max(640, Math.min(1100, 360 + connected.length * 26))
  const frameHeight = Math.max(360, Math.min(760, 240 + connected.length * 16))
  let width = Math.max(720, frameWidth)
  let height = connected.length ? frameHeight : 0

  if (connected.length) {
    const index = new Map(connected.map((node, i) => [node.id, i]))
    const links = [...pairs].map(([pair, weight]) => {
      const [a, b] = pair.split('\u0000').map((id) => index.get(id)!)
      return { a, b, weight }
    })
    const k = Math.sqrt((frameWidth * frameHeight) / connected.length) * 0.7
    const cx = frameWidth / 2
    const cy = frameHeight / 2

    // Start on a circle, in a stable order, with a small per-node nudge.
    connected.forEach((node, i) => {
      const angle = (2 * Math.PI * i) / connected.length + (hash(node.id) % 7) * 0.01
      node.x = cx + frameWidth * 0.38 * Math.cos(angle)
      node.y = cy + frameHeight * 0.38 * Math.sin(angle)
    })

    let temperature = frameWidth / 6
    for (let step = 0; step < 500; step++) {
      const dx = new Float64Array(connected.length)
      const dy = new Float64Array(connected.length)
      for (let i = 0; i < connected.length; i++) {
        for (let j = i + 1; j < connected.length; j++) {
          let x = connected[i].x - connected[j].x
          let y = connected[i].y - connected[j].y
          let distance = Math.hypot(x, y)
          if (distance < 0.01) {
            x = 0.01 * ((i % 3) - 1 || 1)
            y = 0.01
            distance = 0.015
          }
          const force = (k * k) / distance
          dx[i] += (x / distance) * force
          dy[i] += (y / distance) * force
          dx[j] -= (x / distance) * force
          dy[j] -= (y / distance) * force
        }
      }
      for (const { a, b, weight } of links) {
        const x = connected[a].x - connected[b].x
        const y = connected[a].y - connected[b].y
        const distance = Math.max(Math.hypot(x, y), 0.01)
        const force = ((distance * distance) / k) * weight
        dx[a] -= (x / distance) * force
        dy[a] -= (y / distance) * force
        dx[b] += (x / distance) * force
        dy[b] += (y / distance) * force
      }
      connected.forEach((node, i) => {
        // A little gravity keeps separate clusters close.
        dx[i] += (cx - node.x) * 0.03 * k * 0.1
        dy[i] += (cy - node.y) * 0.03 * k * 0.1
        const length = Math.max(Math.hypot(dx[i], dy[i]), 0.01)
        node.x += (dx[i] / length) * Math.min(length, temperature)
        node.y += (dy[i] / length) * Math.min(length, temperature)
      })
      temperature = Math.max(0.5, temperature * 0.988)
    }

    // Fit the drawing into the frame, shrinking distances but never labels.
    {
      const left = Math.min(...connected.map((node) => node.x))
      const right = Math.max(...connected.map((node) => node.x))
      const top = Math.min(...connected.map((node) => node.y))
      const bottom = Math.max(...connected.map((node) => node.y))
      const scale = Math.min(
        1,
        (frameWidth - 2 * PADDING - 120) / Math.max(right - left, 1),
        (frameHeight - 2 * PADDING - 32) / Math.max(bottom - top, 1),
      )
      for (const node of connected) {
        node.x = cx + (node.x - (left + right) / 2) * scale
        node.y = cy + (node.y - (top + bottom) / 2) * scale
      }
    }

    // Push overlapping labels apart, keeping a gap between labels.
    for (let pass = 0; pass < 400; pass++) {
      let moved = false
      for (let i = 0; i < connected.length; i++) {
        for (let j = i + 1; j < connected.length; j++) {
          const a = connected[i]
          const b = connected[j]
          const overlapX = (a.width + b.width) / 2 + 18 - Math.abs(a.x - b.x)
          const overlapY = (a.height + b.height) / 2 + 16 - Math.abs(a.y - b.y)
          if (overlapX > 0 && overlapY > 0) {
            moved = true
            if (overlapX < overlapY) {
              const shift = overlapX / 2 + 0.5
              const sign = a.x < b.x || (a.x === b.x && i < j) ? -1 : 1
              a.x += sign * shift
              b.x -= sign * shift
            } else {
              const shift = overlapY / 2 + 0.5
              const sign = a.y < b.y || (a.y === b.y && i < j) ? -1 : 1
              a.y += sign * shift
              b.y -= sign * shift
            }
          }
        }
      }
      if (!moved) break
    }

    // Move the drawing to the top left and size the frame to it.
    const left = Math.min(...connected.map((node) => node.x - node.width / 2))
    const right = Math.max(...connected.map((node) => node.x + node.width / 2))
    const top = Math.min(...connected.map((node) => node.y - node.height / 2))
    const bottom = Math.max(...connected.map((node) => node.y + node.height / 2))
    width = Math.max(720, Math.ceil(right - left + 2 * PADDING))
    height = Math.ceil(bottom - top + 2 * PADDING)
    const offsetX = (width - (right - left)) / 2 - left
    for (const node of connected) {
      node.x += offsetX
      node.y += PADDING - top
    }
  }

  // Components with no edges sit in a row of their own below the map.
  const isolatedTop = connected.length ? height : PADDING
  let totalHeight = connected.length ? height : PADDING
  if (isolated.length) {
    let x = PADDING + 16
    let y = isolatedTop + 48
    for (const node of isolated) {
      if (x + node.width > width - PADDING - 16) {
        x = PADDING + 16
        y += NODE_HEIGHT + 14
      }
      node.x = x + node.width / 2
      node.y = y + NODE_HEIGHT / 2
      x += node.width + 14
    }
    totalHeight = y + NODE_HEIGHT + 24
  }

  return { width, height: totalHeight + (isolated.length ? 16 : 0), connected, isolated, isolatedTop }
}
