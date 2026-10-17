import { isValidElement, type ReactNode } from 'react'
import type { GuideSectionId, GuideSectionSlots } from '../ComponentGuideTemplate'
import type { AgentEntry, FactOrigin, Origin, QuoteOrigin } from './types'

// Checks each quoted rule against the guide as it is now: the registered
// summary, the core principle, the section copy that guides pass to
// ComponentGuideTemplate, and docs/evidence/<slug>.md. It reads the props a
// guide writes, so it finds titles, captions, and notes without rendering.

/** A guide's copy. Guides with their own page shell give only the registered summary. */
export type GuideCopy = {
  summary: string
  corePrinciple?: string
  sections?: GuideSectionSlots
}

/** Where each entry section name lives on the Designer page. */
export const SECTION_ANCHORS: Record<string, { label: string; anchor?: string; page?: GuideSectionId }> = {
  summary: { label: 'Summary', anchor: 'overview' },
  corePrinciple: { label: 'Core principle', anchor: 'overview' },
  anatomy: { label: 'Anatomy', anchor: 'anatomy', page: 'anatomy' },
  configuration: { label: 'Configuration', anchor: 'configuration', page: 'configuration' },
  states: { label: 'States', anchor: 'states', page: 'states' },
  sizing: { label: 'Sizing', anchor: 'sizing', page: 'sizing' },
  content: { label: 'Content', anchor: 'content', page: 'content' },
  inContext: { label: 'In context', anchor: 'context', page: 'context' },
  doDont: { label: 'Do & Don’ts', anchor: 'dos-donts', page: 'dos-donts' },
  sources: { label: 'Sources', anchor: 'sources', page: 'sources' },
  evidence: { label: 'Evidence' },
}

export type TraceResult =
  | { status: 'found' }
  /** Found in the guide's source file; used for guides with their own page shell. */
  | { status: 'source' }
  | { status: 'elsewhere'; section: string }
  | { status: 'missing' }
  | { status: 'unchecked'; reason: string }

// Props that hold markup details rather than copy.
const SKIPPED_PROPS = new Set([
  'className',
  'testID',
  'href',
  'target',
  'rel',
  'style',
  'modes',
  'iconName',
  'src',
  'side',
  'id',
  'type',
  'variant',
])

/**
 * Text of a node as it reads inline (children joined without breaks, so
 * "<code>x</code>." stays "x."). Copy in other props, such as titles,
 * captions, and Anatomy parts, goes to `out` as separate pieces.
 */
function inlineText(node: unknown, out: string[], depth = 0): string {
  if (depth > 40 || node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map((child) => inlineText(child, out, depth + 1)).join('')
  if (typeof node !== 'object') return ''
  const element = isValidElement(node)
  const values = element ? (node.props as Record<string, unknown>) : (node as Record<string, unknown>)
  for (const [name, value] of Object.entries(values)) {
    if (name === 'children' || SKIPPED_PROPS.has(name) || typeof value === 'function') continue
    const piece = inlineText(value, out, depth + 1)
    if (piece) out.push(piece)
  }
  return element ? inlineText(values.children, out, depth + 1) : ''
}

function collectAll(node: ReactNode) {
  const out: string[] = []
  const text = inlineText(node, out)
  if (text) out.push(text)
  return out
}

export function normalize(text: string) {
  return text
    .replace(/[\u2018\u2019\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201F\u2033]/g, '"')
    .replace(/[\u00a0\s]+/g, ' ')
    .trim()
}

/** The guide's copy per entry section name, normalized. */
export function guideText(copy: GuideCopy): Record<string, string> {
  const text: Record<string, string> = { summary: normalize(copy.summary) }
  if (copy.corePrinciple !== undefined) text.corePrinciple = normalize(copy.corePrinciple)
  for (const [name, { page }] of Object.entries(SECTION_ANCHORS)) {
    if (!page || !copy.sections) continue
    const section = copy.sections[page]
    const parts = [section.header, section.title, ...collectAll(section.description), ...collectAll(section.body)]
    text[name] = normalize(parts.join(' \n '))
  }
  return text
}

export function isQuote(origin: Origin | null | undefined): origin is QuoteOrigin {
  return !!origin && 'quote' in origin && typeof origin.quote === 'string'
}

export function isFact(origin: Origin | null | undefined): origin is FactOrigin {
  return !!origin && 'fact' in origin && typeof origin.fact === 'string'
}

export function traceQuote(origin: QuoteOrigin, text: Record<string, string>): TraceResult {
  const quote = normalize(origin.quote)
  if (!quote) return { status: 'unchecked', reason: 'The quote is empty.' }
  const own = text[origin.section]
  if (own === undefined) {
    return SECTION_ANCHORS[origin.section]
      ? { status: 'unchecked', reason: 'Loading the evidence file…' }
      : { status: 'unchecked', reason: `“${origin.section}” is not a guide section.` }
  }
  if (own.includes(quote)) return { status: 'found' }
  const other = Object.entries(text).find(([, value]) => value.includes(quote))
  return other ? { status: 'elsewhere', section: other[0] } : { status: 'missing' }
}

const EVIDENCE = import.meta.glob<string>(['../../docs/evidence/*.md', '!../../docs/evidence/*.brief.md'], {
  query: '?raw',
  import: 'default',
})

/** docs/evidence/<slug>.md, normalized, or null when the guide has none. */
export async function loadEvidence(slug: string): Promise<string | null> {
  const load = EVIDENCE[`../../docs/evidence/${slug}.md`]
  return load ? normalize(await load()) : null
}

// Guides that build their own page shell give no section copy, so their quotes
// are checked against the guide's source files instead: the registration in
// src/guides/<slug>.guide.tsx and the modules it imports from src/.
const REGISTRATIONS = import.meta.glob<string>('../guides/*.guide.tsx', { query: '?raw', import: 'default' })
const GUIDE_MODULES = import.meta.glob<string>(['../*.tsx', '!../main.tsx', '!../App.tsx'], {
  query: '?raw',
  import: 'default',
})

/** Copy as it reads in a TSX source file: JSX spacing, entities, and string escapes resolved. */
function sourceText(source: string) {
  return normalize(
    source
      .replace(/\{['"` ]\s*['"`]?\}/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\\(['"`])/g, '$1'),
  )
}

/** The guide's source text, normalized, or null when it can't be found. */
export async function loadGuideSource(slug: string): Promise<string | null> {
  const registration = REGISTRATIONS[`../guides/${slug}.guide.tsx`]
  if (!registration) return null
  const source = await registration()
  const modules = [...source.matchAll(/from '\.\.\/([\w-]+)'/g)]
    .map((match) => GUIDE_MODULES[`../${match[1]}.tsx`])
    .filter((load): load is () => Promise<string> => !!load)
  const texts = await Promise.all(modules.map((load) => load()))
  return sourceText([source, ...texts].join('\n'))
}

/** Every origin in the entry with the JSON pointer of the item it belongs to. */
export function entryOrigins(entry: AgentEntry): Array<{ pointer: string; origin: Origin }> {
  const origins: Array<{ pointer: string; origin: Origin }> = []
  const add = (pointer: string, origin: Origin | null | undefined) => {
    if (origin) origins.push({ pointer, origin })
  }
  const rules = ['useWhen', 'avoidWhen', 'placementAdvice', 'configuration', 'accessibility'] as const
  for (const key of rules) (entry[key] ?? []).forEach((rule, index) => add(`/${key}/${index}`, rule.from))
  ;(entry.content?.rules ?? []).forEach((rule, index) => add(`/content/rules/${index}`, rule.from))
  ;(entry.anatomy ?? []).forEach((part, index) => add(`/anatomy/${index}`, part.from))
  ;(entry.states ?? []).forEach((state, index) => add(`/states/${index}`, state.from))
  ;(entry.doDont ?? []).forEach((pair, index) => add(`/doDont/${index}`, pair.from))
  ;(entry.examples ?? []).forEach((example, index) => add(`/examples/${index}`, example.from))
  return origins
}

/** Resolves a JSON pointer such as /facts/props/0 inside the entry. */
export function resolvePointer(entry: AgentEntry, pointer: string): unknown {
  if (pointer === '') return entry
  if (!pointer.startsWith('/')) return undefined
  let value: unknown = entry
  for (const raw of pointer.slice(1).split('/')) {
    const key = raw.replace(/~1/g, '/').replace(/~0/g, '~')
    if (value === null || typeof value !== 'object') return undefined
    value = (value as Record<string, unknown>)[key]
  }
  return value
}
