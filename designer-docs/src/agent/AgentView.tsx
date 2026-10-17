import { Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from 'react'
import { handleGuideNavigation } from '../GuideNavigation'
import { jsxComponents } from './jsx'
import { Markdown } from './Markdown'
import {
  loadEntry,
  loadIndex,
  loadPack,
  loadRendering,
  loadSizes,
  packFileUrl,
  renderingPath,
  sizeOf,
  useLoaded,
  type Pack,
  type Rendering,
} from './pack'
import { RawToggle, useUrlFilter } from './pageParts'
import {
  CommitLink,
  ComponentLink,
  Empty,
  FlagNotes,
  KindLabel,
  REPOSITORY,
  SampleTag,
  SourceBadge,
  StateChip,
  StrengthChip,
  Tokens,
  flagBy,
  formatDate,
} from './parts'
import { agentPageHref, guideViewHref } from './routes'
import {
  SECTION_ANCHORS,
  entryOrigins,
  guideText,
  isFact,
  isQuote,
  loadEvidence,
  loadGuideSource,
  normalize,
  resolvePointer,
  traceQuote,
  type GuideCopy,
  type TraceResult,
} from './trace'
import type { AgentEntry, Fact, Flag, Origin, PackIndex, PackSizes, QuoteOrigin, Rule } from './types'
import { findGuide } from '../guides/store'
import './agent.css'

// The live renderer imports every jfs-components export, so it loads only when an example shows.
const LiveJsx = lazy(() => import('./LiveJsx'))

export const AGENT_NAV = [
  ['overview', 'Overview'],
  ['agent-when', 'When to use'],
  ['agent-anatomy', 'Anatomy'],
  ['agent-composition', 'Composition'],
  ['agent-configuration', 'Configuration'],
  ['agent-content', 'Content'],
  ['agent-states', 'States'],
  ['agent-accessibility', 'Accessibility'],
  ['agent-dos-donts', 'Do & Don’ts'],
  ['agent-examples', 'Examples'],
  ['agent-facts', 'Facts'],
  ['agent-gaps', 'Gaps'],
  ['agent-flags', 'Flags'],
  ['sources', 'Sources'],
] as const

const OVERVIEW_ONLY = [['overview', 'Overview']] as const

/** The page navigation for an entry: facts first when no guide documents it. */
function entryNav(hints: boolean): AgentNavItems {
  if (!hints) return AGENT_NAV
  const lead = new Set<string>(['agent-facts', 'agent-gaps'])
  return [AGENT_NAV[0], ...AGENT_NAV.filter(([id]) => lead.has(id)), ...AGENT_NAV.slice(1).filter(([id]) => !lead.has(id))]
}

export type AgentNavItems = ReadonlyArray<readonly [string, string]>

/** Element id for an item in the entry, from its JSON pointer. */
function anchorFor(pointer: string) {
  return pointer ? `agent${pointer.replace(/[^\w]+/g, '-')}` : 'overview'
}

// The section that shows each top-level field, for flags on a whole field.
const FIELD_SECTIONS: Record<string, string> = {
  summary: 'agent-when',
  useWhen: 'agent-when',
  avoidWhen: 'agent-when',
  anatomy: 'agent-anatomy',
  allowedChildren: 'agent-composition',
  placementAdvice: 'agent-composition',
  configuration: 'agent-configuration',
  content: 'agent-content',
  states: 'agent-states',
  accessibility: 'agent-accessibility',
  doDont: 'agent-dos-donts',
  examples: 'agent-examples',
  facts: 'agent-facts',
  sources: 'sources',
}

/** Element id for whatever a flag points at: its item, or the section that shows the field. */
function anchorForField(field: string) {
  const item = /^\/(?:facts\/\w+|content\/rules|\w+)\/\d+/.exec(field)
  if (item) return anchorFor(item[0])
  return FIELD_SECTIONS[field.split('/')[1] ?? ''] ?? 'overview'
}

const REQUIRED_KEYS: ReadonlyArray<keyof AgentEntry> = [
  'schemaVersion', 'id', 'slug', 'category', 'tags', 'status', 'summary', 'useWhen', 'avoidWhen', 'anatomy',
  'allowedChildren', 'placementAdvice', 'configuration', 'content', 'states', 'accessibility', 'doDont',
  'examples', 'facts', 'sources',
]

/** Top-level schema problems that would hide content in this view. */
function entryProblems(entry: AgentEntry) {
  const record = entry as unknown as Record<string, unknown>
  const problems = REQUIRED_KEYS.filter((key) => record[key] === undefined).map((key) => `missing ${key}`)
  if (entry.schemaVersion !== undefined && entry.schemaVersion !== 1) problems.push(`schemaVersion is ${entry.schemaVersion}, not 1`)
  return problems
}

/** Everything the parts of the view need to show where a rule came from. */
type Context = {
  entry: AgentEntry
  slug: string
  ids: ReadonlyMap<string, string>
  trace: (origin: QuoteOrigin) => TraceResult
  /** Flags on an item or anything inside it. */
  flagsFor: (pointer: string) => Flag[]
  /** Flags on exactly these fields, such as a whole array the guide leaves empty. */
  flagsAt: (pointers: readonly string[]) => Flag[]
  /** Undocumented: no guide backs the guidance, so it reads as hints. */
  hints: boolean
}

function useTraceContext(entry: AgentEntry | null, slug: string, copy: GuideCopy, index: PackIndex | null) {
  const evidence = useLoaded(`evidence:${slug}`, () => loadEvidence(slug))
  // The guide's source files, for copy the section walk can't see: guides
  // with their own page shell, and copy inside a guide's helper components.
  const source = useLoaded(`source:${slug}`, () => loadGuideSource(slug))
  return useMemo<Context | null>(() => {
    if (!entry) return null
    const text = guideText(copy)
    if (evidence.status === 'ready' && evidence.value !== null) text.evidence = evidence.value
    const flags = entry.status?.flags ?? []
    const ids = new Map((index?.components ?? []).map((component) => [component.id, component.slug]))
    if (entry.id) ids.set(entry.id, entry.slug)
    return {
      entry,
      slug,
      ids,
      trace: (origin) => {
        if (origin.section === 'evidence') {
          if (evidence.status === 'ready' && evidence.value === null) {
            return { status: 'unchecked', reason: `This guide has no docs/evidence/${slug}.md.` }
          }
          return traceQuote(origin, text)
        }
        const walked = text[origin.section] !== undefined ? traceQuote(origin, text) : null
        if (walked && (walked.status === 'found' || walked.status === 'elsewhere')) return walked
        if (!SECTION_ANCHORS[origin.section]) return walked ?? traceQuote(origin, text)
        // Not in the section copy the page passes in: look in the guide's source.
        if (source.status !== 'ready') return { status: 'unchecked', reason: 'Checking the guide source…' }
        if (source.value === null) return walked ?? { status: 'unchecked', reason: 'Not checked: the guide source was not found.' }
        return source.value.includes(normalize(origin.quote)) ? { status: 'source' } : { status: 'missing' }
      },
      flagsFor: (pointer) =>
        pointer ? flags.filter((flag) => flag.field === pointer || flag.field.startsWith(`${pointer}/`)) : [],
      flagsAt: (pointers) => flags.filter((flag) => pointers.includes(flag.field)),
      hints: entry.status?.state === 'undocumented',
    }
  }, [copy, entry, evidence, index, slug, source])
}

function TraceNote({ result }: { result: TraceResult }) {
  switch (result.status) {
    case 'found':
      return <span className="agent-trace is-found">Matches the current guide</span>
    case 'source':
      return (
        <span className="agent-trace is-found" title="Found in the guide's source files; its section was not checked.">
          Matches the guide’s source
        </span>
      )
    case 'elsewhere':
      return (
        <span className="agent-trace is-warning">
          In the current guide, but under {SECTION_ANCHORS[result.section]?.label ?? result.section}
        </span>
      )
    case 'missing':
      return <span className="agent-trace is-warning">Not in the current guide</span>
    case 'unchecked':
      return <span className="agent-trace is-unchecked">{result.reason}</span>
  }
}

function evidenceUrl(entry: AgentEntry, slug: string) {
  return `${REPOSITORY}/blob/${entry.status?.guideCommit ?? 'main'}/designer-docs/docs/evidence/${slug}.md`
}

function OriginView({ origin, ctx }: { origin: Origin | null | undefined; ctx: Context }) {
  if (isQuote(origin)) {
    const section = SECTION_ANCHORS[origin.section]
    return (
      <figure className="agent-origin">
        <blockquote>{origin.quote}</blockquote>
        <figcaption>
          <span className="agent-origin-section">From {section?.label ?? origin.section}</span>
          <TraceNote result={ctx.trace(origin)} />
          {section?.anchor ? (
            <a href={guideViewHref(ctx.slug, 'designer', section.anchor)} onClick={handleGuideNavigation}>
              Open in Designer view
            </a>
          ) : origin.section === 'evidence' ? (
            <a href={evidenceUrl(ctx.entry, ctx.slug)} target="_blank" rel="noreferrer">
              Open evidence file
            </a>
          ) : null}
        </figcaption>
      </figure>
    )
  }
  if (isFact(origin)) {
    const fact = resolvePointer(ctx.entry, origin.fact) as Fact | undefined
    return (
      <p className="agent-origin is-fact">
        <span className="agent-origin-section">From fact</span>{' '}
        {fact ? (
          <a href={`#${anchorFor(origin.fact)}`}>
            <code>{fact.name ?? origin.fact}</code>
          </a>
        ) : (
          <code>{origin.fact}</code>
        )}
        {fact ? <SourceBadge source={fact.source} /> : <span className="agent-trace is-warning">No fact at this pointer</span>}
      </p>
    )
  }
  return <p className="agent-origin is-none">No source given</p>
}

function RuleItem({ rule, pointer, ctx }: { rule: Rule; pointer: string; ctx: Context }) {
  return (
    <li className="agent-rule" id={anchorFor(pointer)}>
      <div className="agent-rule-head">
        {ctx.hints && <span className="agent-hint-chip">Hint</span>}
        <StrengthChip strength={rule.strength} />
        {rule.target && (
          <span className="agent-rule-target">
            <code>{rule.target}</code>
            {rule.value !== undefined && (
              <>
                {' = '}
                <code>{rule.value}</code>
              </>
            )}
          </span>
        )}
      </div>
      <p className="agent-rule-text">{rule.text}</p>
      {rule.useInstead && (
        <p className="agent-use-instead">
          Use <ComponentLink id={rule.useInstead} known={ctx.ids} /> instead
        </p>
      )}
      <OriginView origin={rule.from} ctx={ctx} />
      <FlagNotes flags={ctx.flagsFor(pointer)} />
    </li>
  )
}

function RuleList({ rules, path, ctx, none }: { rules: Rule[] | undefined; path: string; ctx: Context; none: string }) {
  if (!rules?.length) return <Empty>{none}</Empty>
  return (
    <ul className="agent-rules">
      {rules.map((rule, index) => (
        <RuleItem rule={rule} pointer={`${path}/${index}`} ctx={ctx} key={index} />
      ))}
    </ul>
  )
}

function AgentSection({
  id,
  eyebrow,
  title,
  intro,
  flags = [],
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: ReactNode
  /** Flags on the section's fields as a whole. */
  flags?: Flag[]
  children: ReactNode
}) {
  return (
    <section id={id} className="agent-section anchor-section" aria-labelledby={`${id}-title`}>
      <header className="agent-section-header">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro && <p>{intro}</p>}
        <FlagNotes flags={flags} />
      </header>
      {children}
    </section>
  )
}

function FactTable({ title, facts, path, ctx }: { title: string; facts: Fact[] | undefined; path: string; ctx: Context }) {
  return (
    <div className="agent-fact-group">
      <h3>
        {title} <span className="agent-count">{facts?.length ?? 0}</span>
      </h3>
      {facts?.length ? (
        <div className="agent-table-scroll">
          <table className="agent-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type or values</th>
                <th scope="col">Default</th>
                <th scope="col">Required</th>
                <th scope="col">Description</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {facts.map((fact, index) => {
                const pointer = `${path}/${index}`
                const flags = ctx.flagsFor(pointer)
                return (
                  <tr id={anchorFor(pointer)} key={index} className={flags.length ? 'is-flagged' : undefined}>
                    <th scope="row">
                      <code>{fact.name}</code>
                    </th>
                    <td>
                      {fact.type && <code>{fact.type}</code>}
                      {fact.values?.length ? (
                        <span className="agent-values">
                          {fact.values.map((value) => (
                            <code key={value}>{value}</code>
                          ))}
                        </span>
                      ) : null}
                    </td>
                    <td>{fact.default !== undefined ? <code>{JSON.stringify(fact.default)}</code> : <span className="agent-muted">–</span>}</td>
                    <td>{fact.required === undefined ? <span className="agent-muted">–</span> : fact.required ? 'Yes' : 'No'}</td>
                    <td>
                      {fact.description ?? <span className="agent-muted">–</span>}
                      <FlagNotes flags={flags} />
                    </td>
                    <td>
                      <SourceBadge source={fact.source} />
                      {fact.checkedOn && <span className="agent-checked">Checked {formatDate(fact.checkedOn)}</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty>None in this entry.</Empty>
      )}
    </div>
  )
}

function ExampleCard({ example, index, total, ctx }: { example: AgentEntry['examples'][number]; index: number; total: number; ctx: Context }) {
  const [fill, setFill] = useState(false)
  const pointer = `/examples/${index}`
  const components = useMemo(() => jsxComponents(example.jsx), [example.jsx])
  return (
    <article className="agent-example" id={anchorFor(pointer)}>
      <header className="agent-example-header">
        <p className="agent-muted">
          Example {index + 1} of {total}
        </p>
        <h3>{example.purpose}</h3>
      </header>
      <div className="agent-example-grid">
        <div className="agent-example-live">
          <div className={`preview-stage agent-example-stage${fill ? ' is-fill' : ''}`}>
            <div className="agent-example-host">
              <Suspense fallback={<p className="agent-muted">Loading the example…</p>}>
                <LiveJsx
                  source={example.jsx}
                  onError={(message) => (
                    <p className="agent-example-error" role="note">
                      <strong>Could not render this example.</strong> {message}
                    </p>
                  )}
                />
              </Suspense>
            </div>
            <span className="stage-label">Rendered with jfs-components</span>
          </div>
          <div className="agent-example-controls">
            <span className="agent-muted">Host width</span>
            <div className="segmented-control">
              <button type="button" className={fill ? '' : 'is-selected'} aria-pressed={!fill} onClick={() => setFill(false)}>
                Natural
              </button>
              <button type="button" className={fill ? 'is-selected' : ''} aria-pressed={fill} onClick={() => setFill(true)}>
                Fill
              </button>
            </div>
          </div>
        </div>
        <div className="agent-example-code">
          <p className="agent-code-label">JSX the agent receives</p>
          <pre tabIndex={0} aria-label={`JSX for ${example.purpose}`}>
            <code>{example.jsx}</code>
          </pre>
          {components.length > 0 && (
            <p className="agent-example-uses">
              <span className="agent-muted">Uses</span>
              {components.map((name) => (
                <ComponentLink id={name} known={ctx.ids} key={name}>
                  <code>{name}</code>
                </ComponentLink>
              ))}
            </p>
          )}
        </div>
      </div>
      <OriginView origin={example.from} ctx={ctx} />
      <FlagNotes flags={ctx.flagsFor(pointer)} />
    </article>
  )
}

function MarkdownFile({ pack, slug }: { pack: Pack; slug: string }) {
  const [open, setOpen] = useState(false)
  const file = useLoaded(open ? `md:${pack.source}:${pack.current}:${slug}` : 'md:closed', () =>
    open ? loadRendering(pack, slug, 'full') : Promise.resolve(null),
  )
  return (
    <details className="agent-raw" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        Markdown file <code>{renderingPath(slug, 'full')}</code>
      </summary>
      {!open ? null : file.status === 'ready' && file.value !== null ? (
        <Markdown source={file.value} />
      ) : file.status === 'ready' ? (
        <Empty>This release has no Markdown file for this entry.</Empty>
      ) : file.status === 'error' ? (
        <Empty>Could not read the file: {file.message}</Empty>
      ) : (
        <Empty>Loading…</Empty>
      )}
    </details>
  )
}

function EntryBody({ entry, pack, ctx }: { entry: AgentEntry; pack: Pack; ctx: Context }) {
  const flags = entry.status?.flags ?? []
  const facts = entry.facts
  // Facts and gaps lead for an undocumented entry: they are what it has.
  const factSections = (
    <>
      <AgentSection
        id="agent-facts" flags={ctx.flagsAt(['/facts', '/facts/props', '/facts/modes', '/facts/slots', '/facts/events'])}
        eyebrow="Facts"
        title="Props, modes, slots, events"
        intro="Generated from the package. Each fact names its source: types, runtime, evidence, or unknown."
      >
        <KindLabel kind="facts" />
        <FactTable title="Props" facts={facts?.props} path="/facts/props" ctx={ctx} />
        <FactTable title="Modes" facts={facts?.modes} path="/facts/modes" ctx={ctx} />
        <FactTable title="Slots" facts={facts?.slots} path="/facts/slots" ctx={ctx} />
        <FactTable title="Events" facts={facts?.events} path="/facts/events" ctx={ctx} />
      </AgentSection>

      <AgentSection id="agent-gaps" flags={ctx.flagsAt(['/facts/gaps'])} eyebrow="Gaps" title="What it can’t do yet" intro="The agent should never promise these.">
        {facts?.gaps?.length ? (
          <ul className="agent-gaps">
            {facts.gaps.map((gap, index) => (
              <li key={index} id={anchorFor(`/facts/gaps/${index}`)}>
                <p>{gap.text}</p>
                <p className="agent-gap-meta">
                  <SourceBadge source={gap.source} />
                  <span className="agent-checked">Checked {formatDate(gap.checkedOn)}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No known gaps.</Empty>
        )}
      </AgentSection>

    </>
  )
  return (
    <>
      {ctx.hints && factSections}
      <AgentSection
        id="agent-when" flags={ctx.flagsAt(['/useWhen', '/avoidWhen'])}
        eyebrow="When to use"
        title="Summary, use when, avoid when"
        intro="How the agent decides whether this is the right component."
      >
        <KindLabel kind="guidance" hints={ctx.hints} />
        <p className="agent-summary">{entry.summary}</p>
        <FlagNotes flags={ctx.flagsFor('/summary')} />
        <div className="agent-split">
          <div className="agent-panel is-guidance">
            <h3>Use when</h3>
            <RuleList rules={entry.useWhen} path="/useWhen" ctx={ctx} none="No use-when rules." />
          </div>
          <div className="agent-panel is-guidance">
            <h3>Avoid when</h3>
            <RuleList rules={entry.avoidWhen} path="/avoidWhen" ctx={ctx} none="No avoid-when rules." />
          </div>
        </div>
      </AgentSection>

      <AgentSection id="agent-anatomy" flags={ctx.flagsAt(['/anatomy'])} eyebrow="Anatomy" title="Parts and what they hold">
        {entry.anatomy?.length ? (
          <ol className="agent-parts">
            {entry.anatomy.map((part, index) => {
              const pointer = `/anatomy/${index}`
              return (
                <li key={index} id={anchorFor(pointer)}>
                  <div className="agent-part-head">
                    <span className="agent-part-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <h3>{part.part}</h3>
                    <span className={`agent-part-required${part.required ? ' is-required' : ''}`}>
                      {part.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p>{part.holds}</p>
                  <OriginView origin={part.from} ctx={ctx} />
                  <FlagNotes flags={ctx.flagsFor(pointer)} />
                </li>
              )
            })}
          </ol>
        ) : (
          <Empty>No anatomy in this entry.</Empty>
        )}
      </AgentSection>

      <AgentSection
        id="agent-composition" flags={ctx.flagsAt(['/allowedChildren', '/placementAdvice'])}
        eyebrow="Composition"
        title="What it can hold, and where it goes"
        intro="Allowed children are facts from the package. Placement advice is guidance from the guide, never a limit."
      >
        <div className="agent-split">
          <div className="agent-panel is-facts">
            <KindLabel kind="facts" />
            <h3>Allowed children</h3>
            {entry.allowedChildren?.length ? (
              <ul className="agent-slots">
                {entry.allowedChildren.map((slot, index) => {
                  const pointer = `/allowedChildren/${index}`
                  return (
                    <li key={index} id={anchorFor(pointer)}>
                      <div className="agent-slot-head">
                        <code className="agent-slot-name">{slot.slot}</code>
                        <SourceBadge source={slot.source} />
                      </div>
                      <p className="agent-slot-accepts">
                        <span className="agent-muted">Accepts</span>
                        {slot.accepts.length ? (
                          slot.accepts.map((id) => (
                            <ComponentLink id={id} known={ctx.ids} key={id}>
                              <code>{id}</code>
                            </ComponentLink>
                          ))
                        ) : (
                          <span className="agent-muted">nothing listed</span>
                        )}
                      </p>
                      <FlagNotes flags={ctx.flagsFor(pointer)} />
                    </li>
                  )
                })}
              </ul>
            ) : (
              <Empty>No slots with known children.</Empty>
            )}
          </div>
          <div className="agent-panel is-guidance">
            <KindLabel kind="guidance" hints={ctx.hints} />
            <h3>Placement advice</h3>
            <RuleList rules={entry.placementAdvice} path="/placementAdvice" ctx={ctx} none="No placement advice." />
          </div>
        </div>
      </AgentSection>

      <AgentSection id="agent-configuration" flags={ctx.flagsAt(['/configuration'])} eyebrow="Configuration" title="Props and modes to choose">
        <KindLabel kind="guidance" hints={ctx.hints} />
        <RuleList rules={entry.configuration} path="/configuration" ctx={ctx} none="No configuration rules." />
      </AgentSection>

      <AgentSection id="agent-content" flags={ctx.flagsAt(['/content', '/content/rules', '/content/good', '/content/bad'])} eyebrow="Content" title="What to write">
        <KindLabel kind="guidance" hints={ctx.hints} />
        <RuleList rules={entry.content?.rules} path="/content/rules" ctx={ctx} none="No content rules." />
        <div className="agent-split agent-copy-examples">
          <div className="agent-panel">
            <h3>Good</h3>
            {entry.content?.good?.length ? (
              <ul className="agent-copy-list is-good">
                {entry.content.good.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            ) : (
              <Empty>None given.</Empty>
            )}
          </div>
          <div className="agent-panel">
            <h3>Bad</h3>
            {entry.content?.bad?.length ? (
              <ul className="agent-copy-list is-bad">
                {entry.content.bad.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            ) : (
              <Empty>None given.</Empty>
            )}
          </div>
        </div>
      </AgentSection>

      <AgentSection id="agent-states" flags={ctx.flagsAt(['/states'])} eyebrow="States" title="When each state applies">
        {entry.states?.length ? (
          <ul className="agent-states">
            {entry.states.map((state, index) => {
              const pointer = `/states/${index}`
              return (
                <li key={index} id={anchorFor(pointer)}>
                  <h3>{state.state}</h3>
                  <p>{state.when}</p>
                  <OriginView origin={state.from} ctx={ctx} />
                  <FlagNotes flags={ctx.flagsFor(pointer)} />
                </li>
              )
            })}
          </ul>
        ) : (
          <Empty>No states in this entry.</Empty>
        )}
      </AgentSection>

      <AgentSection id="agent-accessibility" flags={ctx.flagsAt(['/accessibility'])} eyebrow="Accessibility" title="What keeps it usable">
        <KindLabel kind="guidance" hints={ctx.hints} />
        <RuleList rules={entry.accessibility} path="/accessibility" ctx={ctx} none="No accessibility rules." />
      </AgentSection>

      <AgentSection id="agent-dos-donts" flags={ctx.flagsAt(['/doDont'])} eyebrow="Do & Don’ts" title="Pairs the agent compares">
        {entry.doDont?.length ? (
          <ul className="agent-pairs">
            {entry.doDont.map((pair, index) => {
              const pointer = `/doDont/${index}`
              return (
                <li key={index} id={anchorFor(pointer)}>
                  <div className="agent-pair">
                    <p className="agent-pair-do">
                      <span>Do</span>
                      {pair.do}
                    </p>
                    <p className="agent-pair-dont">
                      <span>Don’t</span>
                      {pair.dont}
                    </p>
                  </div>
                  <p className="agent-pair-why">
                    <span className="agent-muted">Why</span> {pair.why}
                  </p>
                  <OriginView origin={pair.from} ctx={ctx} />
                  <FlagNotes flags={ctx.flagsFor(pointer)} />
                </li>
              )
            })}
          </ul>
        ) : (
          <Empty>No Do & Don’t pairs in this entry.</Empty>
        )}
      </AgentSection>

      <AgentSection
        id="agent-examples" flags={ctx.flagsAt(['/examples'])}
        eyebrow="Examples"
        title="Example JSX, rendered live"
        intro="Each example is the exact JSX in the entry, rendered here with the jfs-components this site installs."
      >
        {entry.examples?.length ? (
          <div className="agent-examples">
            {entry.examples.map((example, index) => (
              <ExampleCard example={example} index={index} total={entry.examples.length} ctx={ctx} key={index} />
            ))}
          </div>
        ) : (
          <Empty>No examples. The schema asks for one to three.</Empty>
        )}
      </AgentSection>

      {!ctx.hints && factSections}
      <AgentSection
        id="agent-flags"
        eyebrow="Flags"
        title="Readings someone questioned"
        intro="A flag marks an item a check or a person questioned. The agent sees the flag with the item."
      >
        {flags.length ? (
          <ul className="agent-flags">
            {flags.map((flag, index) => {
              const target = flag.field ? resolvePointer(entry, flag.field) : entry
              return (
                <li key={index}>
                  <p className="agent-flag-field">
                    <span className="agent-muted">Field</span>
                    {flag.field === '' ? (
                      <span>Whole entry</span>
                    ) : target !== undefined ? (
                      <a href={`#${anchorForField(flag.field)}`}>
                        <code>{flag.field}</code>
                      </a>
                    ) : (
                      <>
                        <code>{flag.field}</code>
                        <span className="agent-trace is-warning">Not in this entry</span>
                      </>
                    )}
                  </p>
                  <p>{flag.reason}</p>
                  <p className="agent-flag-by">
                    <span className="agent-muted">Flagged by</span> {flagBy(flag.by)}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <Empty>No flags.</Empty>
        )}
      </AgentSection>

      <AgentSection id="sources" flags={ctx.flagsAt(['/sources', '/sources/guide', '/sources/figma', '/sources/storybook'])} eyebrow="Sources" title="Links and raw files">
        <ul className="agent-source-links">
          {(['guide', 'figma', 'storybook'] as const).map((key) => (
            <li key={key}>
              <span className="agent-muted">{key === 'guide' ? 'Guide' : key === 'figma' ? 'Figma' : 'Storybook'}</span>
              {entry.sources?.[key] ? (
                <a href={entry.sources[key]!} target="_blank" rel="noreferrer">
                  {entry.sources[key]}
                </a>
              ) : (
                <span className="agent-muted">none</span>
              )}
            </li>
          ))}
        </ul>
        <details className="agent-raw">
          <summary>
            Entry JSON <code>components/{entry.slug}.json</code>
          </summary>
          <pre tabIndex={0}>
            <code>{JSON.stringify(entry, null, 2)}</code>
          </pre>
        </details>
        <MarkdownFile pack={pack} slug={entry.slug} />
      </AgentSection>
    </>
  )
}

function ReceivesCard({
  pack,
  entry,
  slug,
  ctx,
  sizes,
}: {
  pack: Pack
  entry: AgentEntry | null
  slug: string
  ctx: Context | null
  sizes: PackSizes | null
}) {
  const files: Array<[string, string]> = [
    ['rules.md', 'Shared rules'],
    ['index.json', 'Every component, for choosing'],
    [`components/${slug}.json`, 'This entry'],
    [renderingPath(slug, 'full'), 'This entry as Markdown: the full variant'],
    [renderingPath(slug, 'brief'), 'The brief: brief and graph variants'],
    [renderingPath(slug, 'links'), 'Its relationships: graph variant'],
  ]
  // Without sizes.json, list only the files every release has.
  const listed = sizes ? files.filter(([path], index) => index < 4 || sizeOf(sizes, path)) : files.slice(0, 4)
  const origins = entry ? entryOrigins(entry) : []
  const quotes = origins.filter(({ origin }) => isQuote(origin))
  const traced = ctx ? quotes.map(({ origin }) => ctx.trace(origin as QuoteOrigin)) : []
  const found = traced.filter((result) => result.status === 'found' || result.status === 'source').length
  const checked = traced.filter((result) => result.status !== 'unchecked').length
  const rules = entry
    ? [entry.useWhen, entry.avoidWhen, entry.placementAdvice, entry.configuration, entry.content?.rules, entry.accessibility].reduce(
        (sum, list) => sum + (list?.length ?? 0),
        0,
      )
    : 0
  const facts = entry ? ['props', 'modes', 'slots', 'events'].reduce((sum, key) => sum + (entry.facts?.[key as 'props']?.length ?? 0), 0) : 0
  return (
    <aside className="agent-receives" aria-label="What the agent receives">
      <p className="eyebrow">What the agent receives</p>
      <ul className="agent-receives-files">
        {listed.map(([path, note]) => {
          const size = sizeOf(sizes, path)
          return (
            <li key={path}>
              {pack.source === 'live' ? (
                <a href={packFileUrl(pack.current, path)} target="_blank" rel="noreferrer">
                  <code>{path}</code>
                </a>
              ) : (
                <code>{path}</code>
              )}
              <span>
                {note}
                {size && (
                  <>
                    {' · '}
                    <Tokens tokens={size.tokens} estimated={size.estimated} />
                  </>
                )}
              </span>
            </li>
          )
        })}
      </ul>
      {entry && (
        <dl className="agent-receives-counts">
          <div>
            <dt>Rules</dt>
            <dd>{rules}</dd>
          </div>
          <div>
            <dt>Facts</dt>
            <dd>{facts}</dd>
          </div>
          <div>
            <dt>Gaps</dt>
            <dd>{entry.facts?.gaps?.length ?? 0}</dd>
          </div>
          <div>
            <dt>Flags</dt>
            <dd>{entry.status?.flags?.length ?? 0}</dd>
          </div>
        </dl>
      )}
      {entry && quotes.length > 0 && (
        <p className="agent-receives-trace">
          {found} of {quotes.length} quoted sources match the current guide
          {checked < quotes.length ? ` (${quotes.length - checked} not checked yet)` : ''}.
        </p>
      )}
      <p className="agent-receives-links">
        <a href={agentPageHref('rules')} onClick={handleGuideNavigation}>
          Agent rules
        </a>
        <a href={agentPageHref('index')} onClick={handleGuideNavigation}>
          Agent index
        </a>
        <a href={agentPageHref('graph')} onClick={handleGuideNavigation}>
          Graph map
        </a>
        <a href={agentPageHref('overview')} onClick={handleGuideNavigation}>
          Pack overview
        </a>
      </p>
    </aside>
  )
}

function StatusLine({ pack, entry }: { pack: Pack; entry: AgentEntry }) {
  const status = entry.status
  return (
    <dl className="agent-status">
      <div>
        <dt>State</dt>
        <dd>{status?.state ? <StateChip state={status.state} /> : <span className="agent-muted">unknown</span>}</dd>
      </div>
      <div>
        <dt>Guide commit</dt>
        <dd>
          <CommitLink sha={status?.guideCommit ?? null} />
        </dd>
      </div>
      <div>
        <dt>Package</dt>
        <dd>
          <code>jfs-components {status?.packageVersion ?? '?'}</code>
        </dd>
      </div>
      <div>
        <dt>Release</dt>
        <dd>
          <code>{pack.current}</code>
          {pack.source === 'sample' && <SampleTag />}
        </dd>
      </div>
      {status?.builtAt && (
        <div>
          <dt>Built</dt>
          <dd>{formatDate(status.builtAt)}</dd>
        </div>
      )}
    </dl>
  )
}

function Notices({ entry, slug }: { entry: AgentEntry; slug: string }) {
  const notices: ReactNode[] = []
  if (entry.status?.state === 'undocumented') {
    notices.push(
      <>
        <strong>Facts only.</strong> No guide documents {entry.id}: its facts come from the package, and agents treat
        any guidance in it as a hint, not a rule.
      </>,
    )
  }
  const wholeEntry = (entry.status?.flags ?? []).filter((flag) => flag.field === '')
  for (const flag of wholeEntry) notices.push(<>{flag.reason} <span className="agent-muted">({flagBy(flag.by)})</span></>)
  const problems = entryProblems(entry)
  if (problems.length) notices.push(<>This entry does not match the schema: {problems.join(', ')}.</>)
  if (entry.slug && entry.slug !== slug) notices.push(<>This entry is for “{entry.slug}”, not “{slug}”.</>)
  if (entry.status?.packageVersion && entry.status.packageVersion !== __COIN_COMPONENTS_VERSION__) {
    notices.push(
      <>
        The entry was built for jfs-components {entry.status.packageVersion}; this site renders its examples with{' '}
        {__COIN_COMPONENTS_VERSION__}.
      </>,
    )
  }
  if (!notices.length) return null
  return (
    <ul className="agent-notices">
      {notices.map((notice, index) => (
        <li key={index}>{notice}</li>
      ))}
    </ul>
  )
}

const RENDERINGS: ReadonlyArray<readonly [Rendering, string, string]> = [
  ['full', 'Full entry', 'The full variant reads it. Below, the same entry from its JSON, with every source.'],
  ['brief', 'Brief', 'The brief and graph variants read it; a full entry only on request.'],
  ['links', 'Links', 'The graph variant reads it with the brief and graph.json.'],
]

/** Full entry, brief, or links: the renderings of this entry, with what each costs an agent. */
function RenderingSwitch({
  slug,
  sizes,
  value,
  onChange,
}: {
  slug: string
  sizes: PackSizes | null
  value: Rendering
  onChange: (value: Rendering) => void
}) {
  const note = RENDERINGS.find(([id]) => id === value)?.[2]
  return (
    <section className="agent-rendering" id="agent-rendering" aria-labelledby="agent-rendering-title">
      <p className="agent-run-label" id="agent-rendering-title">
        Rendering
      </p>
      <div className="agent-rendering-options" role="group" aria-labelledby="agent-rendering-title">
        {RENDERINGS.map(([id, label]) => {
          const path = renderingPath(slug, id)
          const size = sizeOf(sizes, path)
          // With sizes.json, a file it doesn't list is not in the release.
          const missing = !!sizes && !size && id !== 'full'
          return (
            <button
              key={id}
              type="button"
              aria-pressed={value === id}
              className={value === id ? 'is-selected' : undefined}
              disabled={missing}
              onClick={() => onChange(id)}
            >
              <span className="agent-rendering-name">{label}</span>
              <span className="agent-rendering-size">
                {size ? <Tokens tokens={size.tokens} estimated={size.estimated} /> : missing ? 'Not in this release' : 'Size not listed'}
              </span>
            </button>
          )
        })}
      </div>
      <p className="agent-rendering-note">
        <code>{renderingPath(slug, value)}</code> · {note}
      </p>
    </section>
  )
}

/** The brief or links file, as the agent receives it. */
function RenderingFile({ pack, slug, rendering }: { pack: Pack; slug: string; rendering: Exclude<Rendering, 'full'> }) {
  const file = useLoaded(`rendering:${pack.source}:${pack.current}:${slug}:${rendering}`, () => loadRendering(pack, slug, rendering))
  const path = renderingPath(slug, rendering)
  return (
    <section className="agent-section agent-rendering-file" aria-label={path}>
      {file.status === 'ready' && file.value !== null ? (
        <RawToggle label="Show" raw={file.value}>
          <Markdown source={file.value} />
        </RawToggle>
      ) : file.status === 'ready' ? (
        <Empty>
          Release <code>{pack.current}</code> has no <code>{path}</code>.
        </Empty>
      ) : file.status === 'error' ? (
        <p className="agent-error" role="alert">
          Could not read {path}: {file.message}
        </p>
      ) : (
        <p className="agent-loading" role="status">
          Loading {path}…
        </p>
      )}
    </section>
  )
}

function Hero({
  title,
  name,
  children,
  aside,
  solo,
  hints,
}: {
  title: ReactNode
  name: string
  children?: ReactNode
  aside?: ReactNode
  /** Nothing follows the hero, so it needs no rule below it. */
  solo?: boolean
  /** An undocumented entry: facts, with guidance only as hints. */
  hints?: boolean
}) {
  return (
    <section id="overview" className={`hero-section agent-hero anchor-section${solo ? ' is-solo' : ''}`}>
      <div className="hero-copy">
        {title}
        <p className="hero-lede agent-lede">
          {solo
            ? `What agents read about ${name} in the Coin agent pack.`
            : hints
              ? `What agents read about ${name}: facts from the package. No guide documents it, so any guidance is a hint.`
              : `What agents read about ${name}: guidance from the guide and facts from the package, each with its source.`}
        </p>
        {children}
      </div>
      {aside}
    </section>
  )
}

/**
 * The Agent view of a guide: the component's entry in the current agent pack
 * release, shown the way the agent receives it, with the source of every rule.
 */
export function AgentView({
  slug,
  name,
  title,
  copy,
  onPageNav,
}: {
  slug: string
  name: string
  /** Breadcrumb, title, and view switch from the page shell. */
  title: ReactNode
  copy: GuideCopy
  onPageNav: (items: AgentNavItems) => void
}) {
  const pack = useLoaded('pack', loadPack)
  const packValue = pack.status === 'ready' ? pack.value : null
  const releaseKey = packValue ? `${packValue.source}:${packValue.current}` : 'none'
  const data = useLoaded(`entry:${releaseKey}:${slug}`, async () => {
    if (!packValue) return null
    const [entry, index, sizes] = await Promise.all([
      loadEntry(packValue, slug),
      loadIndex(packValue).catch(() => null),
      loadSizes(packValue).catch(() => null),
    ])
    return { entry, index, sizes }
  })
  const [rendering, setRendering] = useUrlFilter<Rendering>('rendering', 'full', { full: null, brief: 'brief', links: 'links' })

  const ready = data.status === 'ready' ? data.value : null
  const entry = ready?.entry ?? null
  const index = ready?.index ?? null
  const sizes = ready?.sizes ?? null
  const ctx = useTraceContext(entry, slug, copy, index)
  const hints = !!ctx?.hints

  const settled = pack.status === 'error' || (pack.status === 'ready' && data.status !== 'loading')
  useEffect(() => {
    if (!settled) return
    if (!entry) onPageNav(OVERVIEW_ONLY)
    else if (rendering !== 'full') onPageNav([OVERVIEW_ONLY[0], ['agent-rendering', 'Rendering']])
    else onPageNav(entryNav(hints))
  }, [entry, hints, onPageNav, rendering, settled])

  // One hero for every state, so the view switch inside it keeps focus while the pack loads.
  let content: ReactNode
  if (pack.status === 'error' || data.status === 'error') {
    content = (
      <p className="agent-error" role="alert">
        Could not read the agent pack: {pack.status === 'error' ? pack.message : data.status === 'error' ? data.message : ''}
      </p>
    )
  } else if (!packValue || !ready) {
    content = (
      <p className="agent-loading" role="status">
        Loading the agent pack…
      </p>
    )
  } else if (!entry) {
    const listed = index?.components.find((component) => component.slug === slug)
    content = (
      <section className="agent-empty" aria-labelledby="agent-empty-title">
        <h2 id="agent-empty-title">No agent entry yet</h2>
        <p>
          Checked release <code>{packValue.current}</code>
          {packValue.source === 'sample' && <SampleTag />}: it has no entry for {name}, so agents get no
          guidance for it from the pack.
        </p>
        {listed && (
          <p>
            The release index lists <code>{listed.id}</code> as {listed.state}, but its entry file{' '}
            <code>components/{slug}.json</code> is missing.
          </p>
        )}
        <p className="agent-empty-links">
          {findGuide(slug) && (
            <a className="source-link" href={guideViewHref(slug, 'designer', 'overview')} onClick={handleGuideNavigation}>
              Read the Designer view
            </a>
          )}
          <a className="source-link" href={agentPageHref('overview')} onClick={handleGuideNavigation}>
            See every entry
          </a>
        </p>
      </section>
    )
  } else {
    content = (
      <>
        <StatusLine pack={packValue} entry={entry} />
        <Notices entry={entry} slug={slug} />
      </>
    )
  }

  const showEntry = !!(packValue && entry && ctx)
  return (
    <article className="agent-view" aria-busy={!settled ? 'true' : undefined}>
      <Hero
        title={title}
        name={name}
        solo={!showEntry}
        hints={hints}
        aside={showEntry ? <ReceivesCard pack={packValue!} entry={entry} slug={slug} ctx={ctx} sizes={sizes} /> : undefined}
      >
        {content}
      </Hero>
      {showEntry && <RenderingSwitch slug={slug} sizes={sizes} value={rendering} onChange={setRendering} />}
      {showEntry &&
        (rendering === 'full' ? (
          <EntryBody entry={entry!} pack={packValue!} ctx={ctx!} />
        ) : (
          <RenderingFile pack={packValue!} slug={slug} rendering={rendering} />
        ))}
    </article>
  )
}
