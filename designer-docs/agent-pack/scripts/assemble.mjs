// Assembles each pilot entry from its generated facts, its copy snapshot and
// its extracted guidance, then runs the automated checks:
//
// - trace: every from.quote is in the named section of the rendered guide and
//   in the guide's source at the recorded commit (evidence quotes: in the
//   evidence file at that commit); every from.fact pointer resolves.
// - strength: a quote with an absolute word (must, never, always, only,
//   required) needs a recorded scope; `required` needs a package fact or an
//   absolute word that applies everywhere; ambiguous scopes are flagged.
// - consistency: the entry is valid against the schema; names in guidance are
//   props, slots, modes or exports that exist; useInstead names an export;
//   example JSX type-checks against jfs-components.
//
// Errors stop the build. Flags (by trace-check) mark what a person must look
// at: ambiguous absolute words, evidence checked on another package version,
// empty guidance, and entries the cross-check has not reviewed in this form.

import { createHash } from 'node:crypto'
import { join } from 'node:path'
import {
  CITABLE_SECTIONS, PACK, guideCommitOf, loadPack, norm, packageInfo, pointerGet,
  readJson, readJsonIfExists, showAt, uncommittedGuideFiles, validate,
} from './lib.mjs'
import { generateFacts, modeCollections, packageExports, typecheckExamples } from './facts.mjs'
import { sourceCorpus } from './source-text.mjs'

const ABSOLUTE = /\b(must|never|always|only|required)\b/i
const RULE_LISTS = ['useWhen', 'avoidWhen', 'placementAdvice', 'configuration', 'accessibility']
const FLAG_IF_EMPTY = ['useWhen', 'avoidWhen', 'anatomy', 'placementAdvice', 'configuration', 'states', 'accessibility', 'doDont']
// Words in guidance that look like identifiers but name products or tools.
const NOT_API = new Set(['JioFinance', 'JioPoints', 'JioPlus', 'JioType', 'LayoutAnimation', 'ScrollView', 'TypeScript', 'JavaScript'])

const RULE_KEYS = ['text', 'strength', 'from', 'target', 'value', 'useInstead']
const pick = (item, keys) => Object.fromEntries(keys.filter((key) => item[key] !== undefined).map((key) => [key, item[key]]))

export function entryHash(entry) {
  const { status, ...content } = entry
  void status
  return createHash('sha256').update(JSON.stringify(content)).digest('hex')
}

function sectionPool(snapshot, section) {
  if (section === 'summary') return [snapshot.summary]
  if (section === 'corePrinciple') return [snapshot.corePrinciple]
  const copy = snapshot.sections[section]
  return copy ? [copy.title, copy.description, ...copy.blocks].filter(Boolean) : []
}

function allSnapshotText(snapshot) {
  const pools = [snapshot.summary, snapshot.corePrinciple]
  for (const copy of Object.values(snapshot.sections)) {
    pools.push(copy.title, copy.description, ...copy.blocks, ...copy.specimen)
    for (const pair of copy.doDont) pools.push(pair.do.specimen, pair.dont.specimen)
  }
  return pools.filter(Boolean)
}

const contains = (pool, quote) => pool.some((text) => norm(text).includes(norm(quote)))

/** Walks every item that carries a `from` origin, with its JSON pointer. */
function* origins(entry) {
  for (const list of [...RULE_LISTS, 'anatomy', 'states', 'doDont', 'examples']) {
    for (const [index, item] of entry[list].entries()) if (item.from) yield [`/${list}/${index}`, item]
  }
  for (const [index, item] of entry.content.rules.entries()) yield [`/content/rules/${index}`, item]
}

function identifierTokens(text) {
  return [
    ...String(text).matchAll(/\b[a-z][a-z0-9]*[A-Z][A-Za-z0-9]*\b/g),
    ...String(text).matchAll(/\b[A-Z][a-z0-9]+[A-Z][A-Za-z0-9]*\b/g),
  ].map((match) => match[0])
}

export function assemble({ builtAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z') } = {}) {
  const pack = loadPack()
  const pkg = packageInfo()
  const errors = []
  const error = (slug, message) => errors.push(`${slug}: ${message}`)
  const ids = pack.components.map((component) => component.id)
  const generated = generateFacts(ids)
  const exports = packageExports()
  const collections = modeCollections()
  const pilotIds = new Set(ids)
  const entries = []
  const exampleJobs = []

  // Prop names across the pilot, so composition rules may name a pilot child's props.
  const pilotPropNames = new Set()
  for (const facts of Object.values(generated)) {
    for (const fact of [...facts.props, ...facts.slots, ...facts.events]) {
      pilotPropNames.add(fact.name)
      pilotPropNames.add(fact.name.split('.').pop())
    }
  }

  for (const component of pack.components) {
    const { slug, id } = component
    const dirty = uncommittedGuideFiles(component)
    if (dirty.length) error(slug, `uncommitted guide files: ${dirty.join(', ')}`)
    const snapshot = readJsonIfExists(join(PACK, 'copy', `${slug}.json`))
    const guidance = readJsonIfExists(join(PACK, 'guidance', `${slug}.json`))
    if (!snapshot) { error(slug, 'no copy snapshot; run npm run agent-pack:copy'); continue }
    if (!guidance) { error(slug, `no guidance file at agent-pack/guidance/${slug}.json`); continue }
    const commit = guideCommitOf(component)
    if (snapshot.guideCommit !== commit) {
      error(slug, `the guide changed after its copy snapshot (${snapshot.guideCommit.slice(0, 7)} → ${commit.slice(0, 7)}); run npm run agent-pack:copy -- ${slug}`)
    }
    if (guidance.guideCommit !== snapshot.guideCommit) {
      error(slug, `guidance was extracted at ${String(guidance.guideCommit).slice(0, 7)}, the snapshot is at ${snapshot.guideCommit.slice(0, 7)}; re-extract the changed sections`)
    }
    const flags = []
    const flag = (field, reason) => flags.push({ field, reason, by: 'trace-check' })

    // Facts: generated from types, then evidence and unknown facts from the guidance file.
    const base = generated[id]
    const facts = {
      props: base.props.map((fact) => ({ ...fact })),
      modes: base.modes.map((fact) => ({ ...fact })),
      slots: base.slots.map((fact) => ({ ...fact })),
      events: base.events.map((fact) => ({ ...fact })),
      gaps: [],
    }
    const evidenceItems = []
    for (const item of guidance.evidenceFacts ?? []) {
      const list = facts[item.list]
      if (!list || item.list === 'gaps') { error(slug, `evidence fact for unknown list "${item.list}"`); continue }
      let index = list.findIndex((fact) => fact.name === item.name)
      if (index === -1) {
        if (!item.create) { error(slug, `evidence fact names ${item.list} "${item.name}", which the package does not declare (set create: true if the evidence establishes it)`); continue }
        list.push({ name: item.name, source: 'evidence' })
        index = list.length - 1
      }
      const fact = list[index]
      const declared = fact.description
      Object.assign(fact, pick(item, ['type', 'values', 'default', 'required']))
      fact.description = norm([item.description, declared && !item.create ? `Declared: ${declared}` : ''].filter(Boolean).join(' '))
      fact.source = 'evidence'
      fact.checkedOn = item.checkedOn
      evidenceItems.push([`/facts/${item.list}/${index}`, item])
    }
    for (const item of guidance.unknownFacts ?? []) {
      const list = facts[item.list]
      if (!list || list.some((fact) => fact.name === item.name)) { error(slug, `unknown fact ${item.list}/${item.name} is not new`); continue }
      list.push({ ...pick(item, ['name', 'type', 'values', 'description']), source: 'unknown' })
    }
    for (const [index, gap] of (guidance.gaps ?? []).entries()) {
      facts.gaps.push({ text: gap.text, source: 'evidence', checkedOn: gap.checkedOn })
      evidenceItems.push([`/facts/gaps/${index}`, gap])
    }

    // Guidance files cite facts by name ("props:button"); entries carry JSON pointers.
    const resolveFact = (from) => {
      if (!from || !('fact' in from) || from.fact.startsWith('/')) return from
      const [list, ...rest] = from.fact.split(':')
      const name = rest.join(':')
      const index = facts[list]?.findIndex((fact) => fact.name === name) ?? -1
      if (index === -1) { error(slug, `guidance cites fact ${from.fact}, which does not exist`); return from }
      return { fact: `/facts/${list}/${index}` }
    }
    for (const list of [...RULE_LISTS, 'anatomy', 'states', 'doDont', 'examples']) {
      for (const item of guidance[list] ?? []) item.from = resolveFact(item.from)
    }
    for (const item of guidance.content?.rules ?? []) item.from = resolveFact(item.from)

    const strip = {
      rule: (item) => pick(item, RULE_KEYS),
      anatomy: (item) => pick(item, ['part', 'holds', 'required', 'from']),
      state: (item) => pick(item, ['state', 'when', 'from']),
      doDont: (item) => pick(item, ['do', 'dont', 'why', 'from']),
      example: (item) => ({ purpose: item.purpose, jsx: item.jsx, from: item.from ?? null }),
    }
    const entry = {
      schemaVersion: 1,
      id,
      slug,
      category: component.category,
      tags: snapshot.keywords,
      status: { state: 'documented', guideCommit: snapshot.guideCommit, packageVersion: pkg.version, builtAt, flags },
      summary: snapshot.summary,
      useWhen: (guidance.useWhen ?? []).map(strip.rule),
      avoidWhen: (guidance.avoidWhen ?? []).map(strip.rule),
      anatomy: (guidance.anatomy ?? []).map(strip.anatomy),
      allowedChildren: base.allowedChildren.map((item) => ({ ...item })),
      placementAdvice: (guidance.placementAdvice ?? []).map(strip.rule),
      configuration: (guidance.configuration ?? []).map(strip.rule),
      content: {
        rules: (guidance.content?.rules ?? []).map(strip.rule),
        good: guidance.content?.good ?? [],
        bad: guidance.content?.bad ?? [],
      },
      states: (guidance.states ?? []).map(strip.state),
      accessibility: (guidance.accessibility ?? []).map(strip.rule),
      doDont: (guidance.doDont ?? []).map(strip.doDont),
      examples: (guidance.examples ?? []).map(strip.example),
      facts,
      sources: {
        guide: `${pack.siteUrl}/?component=${slug}`,
        figma: snapshot.figma,
        storybook: snapshot.storybook,
      },
    }

    // Trace.
    const corpus = component.guideFiles.flatMap((file) => sourceCorpus(showAt(snapshot.guideCommit, file), file))
    const evidenceText = norm(showAt(snapshot.guideCommit, component.evidence))
    const curatedByPointer = new Map()
    for (const list of [...RULE_LISTS, 'anatomy', 'states', 'doDont', 'examples']) {
      for (const [index, item] of (guidance[list] ?? []).entries()) curatedByPointer.set(`/${list}/${index}`, item)
    }
    for (const [index, item] of (guidance.content?.rules ?? []).entries()) curatedByPointer.set(`/content/rules/${index}`, item)

    for (const [pointer, item] of origins(entry)) {
      const from = item.from
      if (from === null) continue
      if ('fact' in from) {
        if (!from.fact.startsWith('/facts/') || pointerGet(entry, from.fact) === undefined) {
          error(slug, `${pointer} cites fact ${from.fact}, which does not exist`)
        }
        continue
      }
      if (!CITABLE_SECTIONS.includes(from.section)) { error(slug, `${pointer} cites section "${from.section}"`); continue }
      // A Sources note names the package version it was checked on, like the evidence.
      if (from.section === 'sources' && curatedByPointer.get(pointer)?.checkedVersion) {
        evidenceItems.push([pointer, curatedByPointer.get(pointer)])
      }
      if (from.section === 'evidence') {
        if (!evidenceText.includes(norm(from.quote))) error(slug, `${pointer} quote is not in ${component.evidence} at ${snapshot.guideCommit.slice(0, 7)}: "${from.quote}"`)
        const curated = curatedByPointer.get(pointer)
        if (!curated?.checkedVersion) error(slug, `${pointer} cites evidence without checkedVersion`)
        else evidenceItems.push([pointer, curated])
        continue
      }
      if (!contains(sectionPool(snapshot, from.section), from.quote)) {
        const elsewhere = [...CITABLE_SECTIONS, ...Object.keys(snapshot.sections)].filter((section) =>
          section !== from.section && contains(sectionPool(snapshot, section), from.quote))
        error(slug, `${pointer} quote is not in the ${from.section} section${elsewhere.length ? ` (found in ${[...new Set(elsewhere)].join(', ')})` : ''}: "${from.quote}"`)
      } else if (!contains(corpus, from.quote)) {
        error(slug, `${pointer} quote renders on the page but is not in the guide source at ${snapshot.guideCommit.slice(0, 7)}: "${from.quote}"`)
      }
    }
    for (const [pointer, item] of evidenceItems) {
      if (pointer.startsWith('/facts/')) {
        if (item.from) {
          // A gap the guide itself states (its Sources note summarises the evidence).
          if (!contains(sectionPool(snapshot, item.from.section), item.from.quote) || !contains(corpus, item.from.quote)) {
            error(slug, `${pointer} quote is not in the guide's ${item.from.section} section: "${item.from.quote}"`)
          }
        } else if (!evidenceText.includes(norm(item.quote ?? ''))) {
          error(slug, `${pointer} evidence quote is not in ${component.evidence}: "${item.quote}"`)
        }
        if (!item.checkedVersion || !item.checkedOn) error(slug, `${pointer} needs checkedOn and checkedVersion`)
      }
      // checkedVersion may name a build (0.1.78-636f3f5); compare the version.
      if (item.checkedVersion && item.checkedVersion.split('-')[0] !== pkg.version) {
        flag(pointer, `Checked on jfs-components ${item.checkedVersion} (${item.checkedOn}); the installed package is ${pkg.version}. Re-check before relying on it.`)
      }
    }
    entry.doDont.forEach((pair, index) => {
      const pool = sectionPool(snapshot, 'doDont')
      for (const key of ['do', 'dont', 'why']) {
        if (!contains(pool, pair[key])) error(slug, `/doDont/${index}/${key} is not Do & Don't copy: "${pair[key]}"`)
      }
    })
    entry.anatomy.forEach((part, index) => {
      if ('section' in part.from && part.from.section === 'anatomy' && !contains(sectionPool(snapshot, 'anatomy'), part.part)) {
        error(slug, `/anatomy/${index}/part "${part.part}" is not an anatomy part name in the guide`)
      }
    })
    for (const key of ['good', 'bad']) {
      entry.content[key].forEach((text, index) => {
        if (!contains(allSnapshotText(snapshot), text)) error(slug, `/content/${key}/${index} is not copy the guide shows: "${text}"`)
      })
    }

    // Strength.
    for (const [pointer, curated] of curatedByPointer) {
      if (!('strength' in curated)) continue
      const quote = curated.from && 'quote' in curated.from ? curated.from.quote : ''
      const word = quote.match(ABSOLUTE)?.[1]
      const absolute = curated.absolute
      if (word && !absolute) error(slug, `${pointer} quotes "${word}": record absolute.scope (everywhere, contextual or ambiguous)`)
      if (absolute && !['everywhere', 'contextual', 'ambiguous'].includes(absolute.scope)) error(slug, `${pointer} absolute.scope is "${absolute.scope}"`)
      if (curated.strength === 'required') {
        const fromFact = curated.from && 'fact' in curated.from
        if (!fromFact && absolute?.scope !== 'everywhere') {
          error(slug, `${pointer} is required without a package fact or an absolute word that applies everywhere`)
        }
      }
      if (absolute?.scope === 'ambiguous') {
        flag(pointer, `The source says "${absolute.word ?? word}", but ${absolute.reason} Read as ${curated.strength}, not hardened into a constraint.`)
      }
    }

    // Consistency: names, values, useInstead.
    const ownNames = new Set()
    for (const list of ['props', 'slots', 'events', 'modes']) {
      for (const fact of facts[list]) {
        ownNames.add(fact.name)
        ownNames.add(fact.name.split('.').pop())
      }
    }
    const findTarget = (target) => [...facts.props, ...facts.modes].find((fact) => fact.name === target)
    for (const [pointer, item] of origins(entry)) {
      if (item.target !== undefined) {
        const fact = findTarget(item.target)
        if (!fact) error(slug, `${pointer} targets "${item.target}", which is not a prop or mode in the facts`)
        else if (item.value !== undefined && fact.values && !fact.values.includes(item.value)) {
          error(slug, `${pointer} value "${item.value}" is not one of ${item.target}'s values (${fact.values.join(', ')})`)
        } else if (item.value !== undefined && /^boolean$/.test(fact.type ?? '') && !['true', 'false'].includes(item.value)) {
          error(slug, `${pointer} value "${item.value}" is not a boolean`)
        }
      }
      if (item.useInstead !== undefined && !exports.has(item.useInstead)) {
        error(slug, `${pointer} useInstead "${item.useInstead}" is not a jfs-components export`)
      }
      for (const text of [item.text, item.holds, item.when, item.purpose]) {
        for (const token of identifierTokens(text ?? '')) {
          if (ownNames.has(token) || exports.has(token) || collections.has(token) || pilotPropNames.has(token) || NOT_API.has(token)) continue
          error(slug, `${pointer} names "${token}", which is not in the facts or the package exports`)
        }
      }
    }
    entry.examples.forEach((example, index) => exampleJobs.push({ slug, index, example }))

    for (const field of FLAG_IF_EMPTY) {
      if (!entry[field].length) flag(`/${field}`, `The guide gives no ${field} guidance; left empty rather than guessed.`)
    }
    if (!entry.content.rules.length) flag('/content/rules', 'The guide gives no content rules; left empty rather than guessed.')

    entries.push({ component, snapshot, guidance, entry })
  }

  // Examples compile against jfs-components.
  const exampleErrors = typecheckExamples(exampleJobs.map((job) => job.example))
  for (const [index, list] of exampleErrors) {
    const job = exampleJobs[index]
    error(job.slug, `/examples/${job.index} does not type-check: ${list.join('; ')}`)
  }

  // Cross-check and human review flags; then state and schema.
  for (const record of entries) {
    const { entry, component } = record
    const { slug } = component
    const hash = entryHash(entry)
    record.hash = hash
    const review = readJsonIfExists(join(PACK, 'cross-check', `${slug}.json`))
    const human = readJsonIfExists(join(PACK, 'reviews', `${slug}.json`), { flags: [], dismissed: [] })
    const dismissed = (item) => (human.dismissed ?? []).some((d) => d.field === item.field && d.reason === item.reason)
    if (!review) {
      entry.status.flags.push({ field: '', reason: `Not cross-checked yet. Run npm run agent-pack:cross-check -- ${slug}.`, by: 'trace-check' })
    } else if (review.entryHash !== hash) {
      entry.status.flags.push({ field: '', reason: `The cross-check reviewed an earlier version of this entry. Run npm run agent-pack:cross-check -- ${slug}.`, by: 'trace-check' })
    } else {
      for (const item of review.flags) {
        if (pointerGet(entry, item.field) === undefined) error(slug, `cross-check flag points at ${item.field}, which does not exist`)
        if (!dismissed(item)) entry.status.flags.push({ field: item.field, reason: item.reason, by: 'cross-check' })
      }
    }
    for (const item of human.flags ?? []) entry.status.flags.push({ field: item.field, reason: item.reason, by: 'human' })
    entry.status.state = entry.status.flags.length ? 'flagged' : 'documented'
    for (const problem of validate('entry', entry)) error(slug, `schema: ${problem}`)
    record.outsidePilot = [...new Set(entry.avoidWhen.map((rule) => rule.useInstead).filter((id) => id && !pilotIds.has(id)))]
  }

  return { pack, pkg, entries, errors, builtAt }
}

export function loadSnapshot(slug) {
  return readJson(join(PACK, 'copy', `${slug}.json`))
}
