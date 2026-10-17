#!/usr/bin/env node
// Prints the facts the build generates for one or more slugs, so whoever
// extracts guidance can see the props, slots, modes and values that exist.
//
//   node agent-pack/scripts/show-facts.mjs formfield checkboxitem

import { generateFacts } from './facts.mjs'
import { fail, loadPack } from './lib.mjs'

const slugs = process.argv.slice(2)
const pack = loadPack()
const components = pack.components.filter((component) => slugs.includes(component.slug))
if (!components.length) fail('name one or more pilot slugs')
const facts = generateFacts(components.map((component) => component.id))
for (const component of components) {
  const { props, modes, slots, events, allowedChildren, doc, declaredIn } = facts[component.id]
  console.log(JSON.stringify({ id: component.id, slug: component.slug, declaredIn, doc, props, modes, slots, events, allowedChildren }, null, 2))
}
