// The pack graph, derived by code from the entries (no AI step):
//
// - useInstead: an avoidWhen rule's useInstead.
// - placedIn: a placementAdvice rule whose text names an exact component export
//   (a word, not part of a longer name).
// - slotAccepts: an allowedChildren slot that names a component export
//   (ReactNode, or a row type such as BenefitCardItem, makes no edge).
// - usedWith: another component in the same example's JSX.
//
// Each edge's source is a JSON pointer into the from-component's entry.

// A capitalised word followed by another capitalised word or a number is part
// of a longer name ("Text Input", "Form Field", "Form 16"), not the export it spells.
const words = (text) => [...String(text).matchAll(/\b[A-Z][A-Za-z0-9]*\b(?!\s+(?:[A-Z]|\d))/g)].map((match) => match[0])
const jsxTags = (jsx) => [...new Set([...jsx.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((match) => match[1]))]

export function buildGraph({ packVersion, entries, componentNames }) {
  const names = new Set(componentNames)
  const edges = []
  const add = (edge) => {
    const same = edges.find((other) => other.from === edge.from && other.to === edge.to &&
      other.type === edge.type && (other.slot ?? '') === (edge.slot ?? ''))
    if (!same) edges.push(edge)
  }
  for (const entry of entries) {
    entry.avoidWhen.forEach((rule, index) => {
      if (rule.useInstead) add({ from: entry.id, to: rule.useInstead, type: 'useInstead', strength: rule.strength, source: `/avoidWhen/${index}` })
    })
    entry.placementAdvice.forEach((rule, index) => {
      for (const name of new Set(words(rule.text))) {
        if (name !== entry.id && names.has(name)) {
          add({ from: entry.id, to: name, type: 'placedIn', strength: rule.strength, source: `/placementAdvice/${index}` })
        }
      }
    })
    entry.allowedChildren.forEach((slot, index) => {
      for (const name of slot.accepts) {
        if (name !== entry.id && names.has(name)) add({ from: entry.id, to: name, type: 'slotAccepts', slot: slot.slot, source: `/allowedChildren/${index}` })
      }
    })
    entry.examples.forEach((example, index) => {
      for (const name of jsxTags(example.jsx)) {
        if (name !== entry.id && names.has(name)) add({ from: entry.id, to: name, type: 'usedWith', source: `/examples/${index}` })
      }
    })
  }
  const inPack = new Map(entries.map((entry) => [entry.id, entry]))
  const nodes = entries.map((entry) => ({ id: entry.id, slug: entry.slug, category: entry.category, state: entry.status.state, inPack: true }))
  for (const id of [...new Set(edges.map((edge) => edge.to))].sort()) {
    if (!inPack.has(id)) nodes.push({ id, slug: null, category: null, state: null, inPack: false })
  }
  return { schemaVersion: 1, packVersion, nodes, edges }
}

/** One-line triple, e.g. `Badge —usedWith→ Card` or `Stack —placedIn→ ActionFooter (recommended)`. */
export function triple(edge, inPackIds) {
  const slot = edge.slot ? `(${edge.slot})` : ''
  const notes = [edge.strength, inPackIds.has(edge.to) ? null : `${edge.to} has no entry`].filter(Boolean)
  return `${edge.from} —${edge.type}${slot}→ ${edge.to}${notes.length ? ` (${notes.join('; ')})` : ''}`
}
