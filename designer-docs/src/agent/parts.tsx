import type { ReactNode } from 'react'
import { handleGuideNavigation } from '../GuideNavigation'
import { findGuide } from '../guides/store'
import { entryHref, guideViewHref } from './routes'
import type { EntryState, FactSource, Flag, Strength } from './types'

// Small pieces shared by the Agent view and the pack pages.

export const REPOSITORY = 'https://github.com/spiefi/coin-ds-docs'

const STRENGTH_LABELS: Record<Strength, string> = {
  required: 'Required',
  recommended: 'Recommended',
  discouraged: 'Discouraged',
}

export function StrengthChip({ strength }: { strength: Strength }) {
  return (
    <span className={`agent-strength is-${strength}`}>
      {STRENGTH_LABELS[strength] ?? strength}
    </span>
  )
}

export const SOURCE_NOTES: Record<FactSource, string> = {
  types: 'Read from the package’s TypeScript types',
  runtime: 'Checked by rendering the component',
  evidence: 'Verified in the guide’s evidence file',
  unknown: 'Not verified',
}

export function SourceBadge({ source }: { source: FactSource }) {
  return (
    <span className={`agent-source is-${source}`} title={SOURCE_NOTES[source]}>
      <span className="agent-visually-hidden">Source: </span>
      {source}
    </span>
  )
}

const STATE_LABELS: Record<EntryState, string> = {
  documented: 'Documented',
  flagged: 'Flagged',
  undocumented: 'Undocumented',
  unsupported: 'Unsupported',
}

export function StateChip({ state }: { state: EntryState }) {
  return <span className={`agent-state is-${state}`}>{STATE_LABELS[state] ?? state}</span>
}

export function SampleTag() {
  return (
    <span className="agent-sample-tag" title="The pack has not been published yet. This page reads the hand-written fixtures in src/agent/fixtures.">
      Sample data
    </span>
  )
}

export function shortSha(sha: string) {
  return /^[0-9a-f]{12,}$/i.test(sha) ? sha.slice(0, 7) : sha
}

export function CommitLink({ sha }: { sha: string | null }) {
  if (!sha) return <span className="agent-muted">none</span>
  if (!/^[0-9a-f]{7,40}$/i.test(sha)) return <code>{sha}</code>
  return (
    <a className="agent-code-link" href={`${REPOSITORY}/commit/${sha}`} target="_blank" rel="noreferrer">
      {shortSha(sha)}
    </a>
  )
}

export function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** A component id (e.g. Nudge) as its guide slug, when the site has that guide. */
export function guideSlugFor(id: string, known?: ReadonlyMap<string, string>) {
  const slug = known?.get(id) ?? id.toLowerCase().replace(/[^a-z0-9]/g, '')
  return findGuide(slug) ? slug : undefined
}

/**
 * Where a component's Agent view lives: its guide page in the Agent view, or,
 * for a pack entry without a guide (`known` maps pack ids to slugs), the
 * standalone entry page. Undefined when there is neither.
 */
export function agentHrefFor(id: string, known?: ReadonlyMap<string, string>, hash = 'overview') {
  const slug = guideSlugFor(id, known)
  if (slug) return guideViewHref(slug, 'agent', hash)
  const entrySlug = known?.get(id)
  return entrySlug ? entryHref(entrySlug, hash) : undefined
}

/** A link to a component's page in the given view, or plain text when there is none. */
export function ComponentLink({
  id,
  view = 'agent',
  known,
  children,
}: {
  id: string
  view?: 'agent' | 'designer'
  known?: ReadonlyMap<string, string>
  children?: ReactNode
}) {
  const slug = guideSlugFor(id, known)
  const href = view === 'agent' ? agentHrefFor(id, known) : slug && guideViewHref(slug, 'designer', 'overview')
  if (!href) return <span title="No guide or pack entry">{children ?? id}</span>
  return (
    <a href={href} onClick={handleGuideNavigation}>
      {children ?? id}
    </a>
  )
}

/** A token count, with ≈ when it is an estimate. `unit={false}` drops the word, for tables. */
export function Tokens({ tokens, estimated, unit = true }: { tokens: number; estimated?: boolean; unit?: boolean }) {
  return (
    <span className="agent-tokens" title={`${estimated ? 'Estimated' : 'Counted'}: ${tokens.toLocaleString('en-GB')} tokens`}>
      {estimated ? '≈' : ''}
      {tokens.toLocaleString('en-GB')}
      {unit && <span className="agent-tokens-unit"> tokens</span>}
    </span>
  )
}

const FLAG_BY: Record<Flag['by'], string> = {
  'trace-check': 'Trace check',
  'cross-check': 'Cross-check',
  human: 'Person',
}

export function flagBy(by: Flag['by']) {
  return FLAG_BY[by] ?? by
}

/** Flags on one item (its pointer or anything inside it). */
export function FlagNotes({ flags }: { flags: Flag[] }) {
  if (!flags.length) return null
  return (
    <ul className="agent-inline-flags">
      {flags.map((flag, index) => (
        <li key={index}>
          <span className="agent-flag-mark">Flagged</span>
          <span>{flag.reason}</span>
          <span className="agent-muted">{flagBy(flag.by)}</span>
        </li>
      ))}
    </ul>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="agent-empty-line">{children}</p>
}

/**
 * A labelled block of facts or guidance, so the two never look alike. For an
 * undocumented entry (`hints`), guidance is only a hint: no guide backs it.
 */
export function KindLabel({ kind, hints = false }: { kind: 'facts' | 'guidance'; hints?: boolean }) {
  if (kind === 'facts') return <p className="agent-kind is-facts">Facts · from the package</p>
  return hints ? (
    <p className="agent-kind is-hints">Hints · no guide documents this component</p>
  ) : (
    <p className="agent-kind is-guidance">Guidance · from the guide</p>
  )
}
