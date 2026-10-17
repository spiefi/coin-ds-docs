import { useLayoutEffect, useState, type ReactNode } from 'react'
import {
  GuideMobileBar,
  GuideSidebar,
  MobileComponentNav,
  handleGuideNavigation,
  useGuidePageNavigation,
} from '../GuideNavigation'
import { Segment } from '../guide-kit'
import { Markdown } from './Markdown'
import {
  PILOT_URL,
  loadEntry,
  loadIndex,
  loadManifest,
  loadPack,
  loadPilot,
  loadRules,
  packFileUrl,
  useLoaded,
  type Loaded,
  type Pack,
} from './pack'
import { CommitLink, ComponentLink, Empty, SampleTag, StateChip, formatDate, guideSlugFor } from './parts'
import { AGENT_PAGES, agentPageHref, guideViewHref, type AgentPage } from './routes'
import type { AgentEntry, EntryState, IndexComponent, PilotQuestion, PilotRun } from './types'
import './agent.css'

const PAGE_COPY: Record<AgentPage, { title: string; lede: string }> = {
  overview: {
    title: 'Pack overview',
    lede: 'Every component in the current agent pack release, with its state, its flags, and the guide commit it was built from.',
  },
  rules: {
    title: 'Agent rules',
    lede: 'The shared rules every agent reads before any component entry, exactly as the release publishes them.',
  },
  index: {
    title: 'Agent index',
    lede: 'What agents scan to choose a component: one row per component, with the components to use instead.',
  },
  pilot: {
    title: 'Pilot results',
    lede: 'The same questions answered with and without the agent pack, checked against answers people settled.',
  },
}

/**
 * A filter kept in the URL (?filter=…) so a filtered page can be shared. It
 * replaces the URL without a route change, so focus stays on the control.
 */
function useUrlFilter<T extends string>(param: string, fallback: NoInfer<T>, values: Record<T, string | null>) {
  const [value, setValue] = useState<T>(() => {
    const requested = new URLSearchParams(window.location.search).get(param)
    return (Object.keys(values) as T[]).find((key) => values[key] === requested) ?? fallback
  })
  const update = (next: T) => {
    setValue(next)
    const url = new URL(window.location.href)
    if (values[next] === null) url.searchParams.delete(param)
    else url.searchParams.set(param, values[next]!)
    window.history.replaceState(window.history.state, '', url)
  }
  return [value, update] as const
}

function Loading({ loaded, children }: { loaded: Loaded<unknown>; children: ReactNode }) {
  if (loaded.status === 'loading') {
    return (
      <p className="agent-loading" role="status">
        Loading…
      </p>
    )
  }
  if (loaded.status === 'error') {
    return (
      <p className="agent-error" role="alert">
        Could not read the agent pack: {loaded.message}
      </p>
    )
  }
  return <>{children}</>
}

function ReleaseLine({ pack, file }: { pack: Pack; file?: string }) {
  return (
    <p className="agent-release-line">
      <span>
        Release <code>{pack.current}</code>
      </span>
      {pack.source === 'sample' && <SampleTag />}
      {file &&
        (pack.source === 'live' ? (
          <a href={packFileUrl(pack.current, file)} target="_blank" rel="noreferrer">
            <code>{file}</code>
          </a>
        ) : (
          <code>{file}</code>
        ))}
    </p>
  )
}

function RawToggle({ label, raw, children }: { label: string; raw: string; children: ReactNode }) {
  const [mode, setMode] = useState<'Rendered' | 'Raw'>('Rendered')
  return (
    <>
      <div className="agent-page-controls">
        <Segment label={label} value={mode} options={['Rendered', 'Raw'] as const} onChange={setMode} />
      </div>
      {mode === 'Raw' ? (
        <pre className="agent-raw-file" tabIndex={0}>
          <code>{raw}</code>
        </pre>
      ) : (
        children
      )}
    </>
  )
}

function RulesPage({ pack }: { pack: Pack }) {
  const rules = useLoaded(`rules:${pack.source}:${pack.current}`, () => loadRules(pack))
  return (
    <>
      <ReleaseLine pack={pack} file="rules.md" />
      <Loading loaded={rules}>
        {rules.status === 'ready' && rules.value !== null ? (
          <RawToggle label="Show" raw={rules.value}>
            <Markdown source={rules.value} />
          </RawToggle>
        ) : (
          <Empty>
            Release <code>{pack.current}</code> has no <code>rules.md</code>.
          </Empty>
        )}
      </Loading>
    </>
  )
}

function IndexPage({ pack }: { pack: Pack }) {
  const index = useLoaded(`index:${pack.source}:${pack.current}`, () => loadIndex(pack))
  const value = index.status === 'ready' ? index.value : null
  const ids = new Map((value?.components ?? []).map((component) => [component.id, component.slug]))
  return (
    <>
      <ReleaseLine pack={pack} file="index.json" />
      <p className="agent-page-note">Categories help agents find components. They never limit what a component can hold.</p>
      <Loading loaded={index}>
        {value ? (
          <RawToggle label="Show" raw={JSON.stringify(value, null, 2)}>
            <div className="agent-table-scroll">
              <table className="agent-table agent-index-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Category</th>
                    <th scope="col">Tags</th>
                    <th scope="col">State</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Use instead</th>
                  </tr>
                </thead>
                <tbody>
                  {value.components.map((component) => (
                    <tr key={component.id}>
                      <th scope="row">
                        <ComponentLink id={component.id} known={ids}>
                          <code>{component.id}</code>
                        </ComponentLink>
                      </th>
                      <td>{component.category}</td>
                      <td>
                        <span className="agent-values">
                          {component.tags.map((tag) => (
                            <code key={tag}>{tag}</code>
                          ))}
                        </span>
                      </td>
                      <td>
                        <StateChip state={component.state} />
                      </td>
                      <td>{component.summary}</td>
                      <td>
                        {component.useInstead.length ? (
                          <span className="agent-values">
                            {component.useInstead.map((id) => (
                              <ComponentLink id={id} known={ids} key={id}>
                                <code>{id}</code>
                              </ComponentLink>
                            ))}
                          </span>
                        ) : (
                          <span className="agent-muted">–</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RawToggle>
        ) : (
          <Empty>
            Release <code>{pack.current}</code> has no <code>index.json</code>.
          </Empty>
        )}
      </Loading>
    </>
  )
}

type OverviewRow = { component: IndexComponent; entry: AgentEntry | null | 'error' }

const STATES: EntryState[] = ['documented', 'flagged', 'undocumented', 'unsupported']

function OverviewPage({ pack }: { pack: Pack }) {
  const [filter, setFilter] = useUrlFilter('filter', 'All', { All: null, Flagged: 'flagged' })
  const data = useLoaded(`overview:${pack.source}:${pack.current}`, async () => {
    const [manifest, index] = await Promise.all([loadManifest(pack), loadIndex(pack)])
    // The index has no flag counts or guide commits, so read every entry.
    const rows: OverviewRow[] = await Promise.all(
      (index?.components ?? []).map(async (component) => ({
        component,
        entry: await loadEntry(pack, component.slug).catch(() => 'error' as const),
      })),
    )
    return { manifest, index, rows }
  })
  const value = data.status === 'ready' ? data.value : null
  const flagCount = (row: OverviewRow) => (row.entry && row.entry !== 'error' ? row.entry.status?.flags?.length ?? 0 : 0)
  const isFlagged = (row: OverviewRow) => row.component.state === 'flagged' || flagCount(row) > 0
  const rows = value?.rows.filter((row) => filter === 'All' || isFlagged(row)) ?? []
  const ids = new Map((value?.index?.components ?? []).map((component) => [component.id, component.slug]))

  return (
    <>
      <ReleaseLine pack={pack} file="manifest.json" />
      <Loading loaded={data}>
        {value?.manifest && (
          <dl className="agent-manifest">
            <div>
              <dt>Package</dt>
              <dd>
                <code>jfs-components {value.manifest.packageVersion}</code>
              </dd>
            </div>
            <div>
              <dt>Package source</dt>
              <dd>
                <code>{value.manifest.packageSource}</code>
              </dd>
            </div>
            <div>
              <dt>Guide commit</dt>
              <dd>
                <CommitLink sha={value.manifest.guideCommit} />
              </dd>
            </div>
            <div>
              <dt>Built</dt>
              <dd>{formatDate(value.manifest.builtAt)}</dd>
            </div>
            <div>
              <dt>Releases</dt>
              <dd>
                {pack.releases.releases.map((release) => (
                  <code key={release}>{release}</code>
                ))}
              </dd>
            </div>
          </dl>
        )}
        {value?.manifest && (
          <ul className="agent-counts" aria-label="Components by state">
            <li>
              <strong>{value.manifest.components}</strong>
              <span>Components</span>
            </li>
            {STATES.map((state) => (
              <li key={state} className={`is-${state}`}>
                <strong>{value.manifest!.counts?.[state] ?? 0}</strong>
                <span>
                  <StateChip state={state} />
                </span>
              </li>
            ))}
          </ul>
        )}
        {value?.index ? (
          <>
            <div className="agent-page-controls">
              <Segment
                label="Show"
                value={filter}
                options={['All', 'Flagged'] as const}
                onChange={setFilter}
              />
              <p className="agent-muted" role="status">
                {rows.length} of {value.rows.length} components
              </p>
            </div>
            {rows.length ? (
              <div className="agent-table-scroll">
                <table className="agent-table agent-overview-table">
                  <thead>
                    <tr>
                      <th scope="col">Component</th>
                      <th scope="col">Category</th>
                      <th scope="col">State</th>
                      <th scope="col">Flags</th>
                      <th scope="col">Guide commit</th>
                      <th scope="col">Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const { component, entry } = row
                      const slug = guideSlugFor(component.id, ids)
                      return (
                        <tr key={component.id} className={isFlagged(row) ? 'is-flagged' : undefined}>
                          <th scope="row">
                            <ComponentLink id={component.id} known={ids}>
                              <code>{component.id}</code>
                            </ComponentLink>
                          </th>
                          <td>{component.category}</td>
                          <td>
                            <StateChip state={component.state} />
                          </td>
                          <td>
                            {entry === 'error' ? (
                              <span className="agent-trace is-warning">Unreadable</span>
                            ) : entry ? (
                              <span className={flagCount(row) ? 'agent-flag-count' : 'agent-muted'}>{flagCount(row)}</span>
                            ) : (
                              <span className="agent-muted">–</span>
                            )}
                          </td>
                          <td>
                            {entry && entry !== 'error' ? (
                              <CommitLink sha={entry.status?.guideCommit ?? null} />
                            ) : (
                              <span className="agent-muted">–</span>
                            )}
                          </td>
                          <td>
                            {entry && entry !== 'error' ? (
                              pack.source === 'live' ? (
                                <a href={packFileUrl(pack.current, `components/${component.slug}.json`)} target="_blank" rel="noreferrer">
                                  <code>{component.slug}.json</code>
                                </a>
                              ) : (
                                <code>{component.slug}.json</code>
                              )
                            ) : (
                              <span className="agent-trace is-warning">Missing</span>
                            )}
                            {slug && entry && entry !== 'error' && (
                              <a className="agent-row-link" href={guideViewHref(slug, 'agent', 'overview')} onClick={handleGuideNavigation}>
                                Agent view
                              </a>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty>No flagged components in this release.</Empty>
            )}
          </>
        ) : (
          <Empty>
            Release <code>{pack.current}</code> has no <code>index.json</code>.
          </Empty>
        )}
      </Loading>
    </>
  )
}

/** A pack file the agent read, linked to the file and, for entries, to the component's Agent view. */
function ReadFile({ path, pack, release }: { path: string; pack: Pack; release: string }) {
  const clean = path.replace(/^\/?agent\//, '').replace(/^\/+/, '')
  const versioned = /^\d+\.\d+\.\d+\+[^/]+\//.test(clean)
  const url = versioned ? `/agent/${clean}` : packFileUrl(release, clean)
  const component = /components\/([\w-]+)\.(json|md)$/.exec(clean)?.[1]
  const slug = component ? guideSlugFor(component) : undefined
  return (
    <li>
      {pack.source === 'live' ? (
        <a href={url} target="_blank" rel="noreferrer">
          <code>{path}</code>
        </a>
      ) : (
        <code>{path}</code>
      )}
      {slug && (
        <a className="agent-row-link" href={guideViewHref(slug, 'agent', 'overview')} onClick={handleGuideNavigation}>
          Agent view
        </a>
      )}
    </li>
  )
}

function RunCard({ title, run, pack, release }: { title: string; run: PilotRun; pack: Pack; release: string }) {
  return (
    <div className={`agent-run ${run.pass ? 'is-pass' : 'is-fail'}`}>
      <div className="agent-run-head">
        <h4>{title}</h4>
        <span className={`agent-verdict ${run.pass ? 'is-pass' : 'is-fail'}`}>{run.pass ? 'Pass' : 'Fail'}</span>
      </div>
      <p className="agent-run-label">Answer</p>
      <pre className="agent-answer" tabIndex={0}>
        <code>{run.answer}</code>
      </pre>
      <p className="agent-run-label">Files read</p>
      {run.read.length ? (
        <ul className="agent-read-files">
          {run.read.map((path) => (
            <ReadFile path={path} pack={pack} release={release} key={path} />
          ))}
        </ul>
      ) : (
        <Empty>None.</Empty>
      )}
      {run.failed.length > 0 && (
        <>
          <p className="agent-run-label">Missed</p>
          <ul className="agent-missed">
            {run.failed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {run.notes && (
        <>
          <p className="agent-run-label">Notes</p>
          <p className="agent-run-notes">{run.notes}</p>
        </>
      )}
    </div>
  )
}

function Question({ question, pack, release }: { question: PilotQuestion; pack: Pack; release: string }) {
  const { expected } = question
  return (
    <li className="agent-question" id={`question-${question.id}`}>
      <div className="agent-question-head">
        <span className="agent-kind-chip">{question.kind}</span>
        <code className="agent-muted">{question.id}</code>
      </div>
      <h3>{question.question}</h3>
      <div className="agent-expected">
        <p className="agent-run-label">Expected</p>
        <dl>
          <div>
            <dt>Valid answers</dt>
            <dd>
              <ul>
                {expected.validAnswers.map((answer) => (
                  <li key={answer}>{answer}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Required</dt>
            <dd>
              {expected.required.length ? (
                <ul>
                  {expected.required.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span className="agent-muted">–</span>
              )}
            </dd>
          </div>
          <div>
            <dt>Recommended</dt>
            <dd>
              {expected.recommended.length ? (
                <ul>
                  {expected.recommended.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span className="agent-muted">–</span>
              )}
            </dd>
          </div>
          <div>
            <dt>Settled by</dt>
            <dd>{expected.settledBy ?? <span className="agent-muted">Not settled yet</span>}</dd>
          </div>
        </dl>
      </div>
      <div className="agent-runs">
        <RunCard title="With the pack" run={question.withPack} pack={pack} release={release} />
        <RunCard title="Without the pack" run={question.withoutPack} pack={pack} release={release} />
      </div>
    </li>
  )
}

function PilotPage({ pack }: { pack: Pack }) {
  const [filter, setFilter] = useUrlFilter('filter', 'All', { All: null, 'Failed with pack': 'failed' })
  const results = useLoaded(`pilot:${pack.source}:${pack.current}`, () => loadPilot(pack))
  const value = results.status === 'ready' ? results.value : null
  const questions = value?.questions ?? []
  const shown = filter === 'All' ? questions : questions.filter((question) => !question.withPack.pass)
  const withPack = questions.filter((question) => question.withPack.pass).length
  const withoutPack = questions.filter((question) => question.withoutPack.pass).length

  return (
    <>
      <p className="agent-release-line">
        <span>
          Release <code>{pack.current}</code>
        </span>
        {pack.source === 'sample' && <SampleTag />}
        {value && (
          <>
            <span>
              Run {formatDate(value.runAt)} on pack <code>{value.packVersion}</code>
            </span>
            {pack.source === 'live' ? (
              <a href={PILOT_URL} target="_blank" rel="noreferrer">
                <code>{PILOT_URL}</code>
              </a>
            ) : (
              <code>pilot/results.json</code>
            )}
          </>
        )}
      </p>
      <Loading loaded={results}>
        {value ? (
          <>
            {value.packVersion !== pack.current && (
              <p className="agent-notices-single">
                These results are for pack <code>{value.packVersion}</code>; the current release is{' '}
                <code>{pack.current}</code>.
              </p>
            )}
            <ul className="agent-counts agent-pilot-counts" aria-label="Pilot score">
              <li className="is-documented">
                <strong>
                  {withPack}/{questions.length}
                </strong>
                <span>Passed with the pack</span>
              </li>
              <li className="is-unsupported">
                <strong>
                  {withoutPack}/{questions.length}
                </strong>
                <span>Passed without it</span>
              </li>
            </ul>
            <div className="agent-page-controls">
              <Segment
                label="Show"
                value={filter}
                options={['All', 'Failed with pack'] as const}
                onChange={setFilter}
              />
              <p className="agent-muted" role="status">
                {shown.length} of {questions.length} questions
              </p>
            </div>
            {shown.length ? (
              <ol className="agent-questions">
                {shown.map((question) => (
                  <Question question={question} pack={pack} release={value.packVersion} key={question.id} />
                ))}
              </ol>
            ) : (
              <Empty>Every question passed with the pack.</Empty>
            )}
          </>
        ) : (
          <Empty>No pilot results yet. The test run writes them to {PILOT_URL}.</Empty>
        )}
      </Loading>
    </>
  )
}

function AgentPagesNav({ page }: { page: AgentPage }) {
  return (
    <nav className="agent-pages-nav" aria-label="Agent pack pages">
      {AGENT_PAGES.map(([id, label]) => (
        <a
          key={id}
          href={agentPageHref(id)}
          aria-current={id === page ? 'page' : undefined}
          className={id === page ? 'is-active' : undefined}
          onClick={handleGuideNavigation}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

/** A shared agent pack page: overview, rules, index, or pilot results. */
export function AgentPackPage({ page }: { page: AgentPage }) {
  const pack = useLoaded('pack', loadPack)
  useGuidePageNavigation()
  const copy = PAGE_COPY[page]

  useLayoutEffect(() => {
    const previousTitle = document.title
    document.title = `${copy.title} · Coin designer documentation`
    return () => {
      document.title = previousTitle
    }
  }, [copy.title])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <GuideSidebar agentPage={page} pageNav={[['overview', copy.title]]} />

      <main id="main-content" className="content" tabIndex={-1}>
        <GuideMobileBar sources={false} />
        <MobileComponentNav />

        <article className="agent-page">
          <section id="overview" className="agent-page-hero anchor-section">
            <p className="eyebrow">Coin agent pack</p>
            <h1 className="agent-page-title">{copy.title}</h1>
            <p className="hero-lede agent-page-lede">{copy.lede}</p>
            <AgentPagesNav page={page} />
          </section>
          <section className="agent-page-body" aria-label={copy.title}>
            <Loading loaded={pack}>
              {pack.status === 'ready' &&
                (page === 'rules' ? (
                  <RulesPage pack={pack.value} />
                ) : page === 'index' ? (
                  <IndexPage pack={pack.value} />
                ) : page === 'pilot' ? (
                  <PilotPage pack={pack.value} />
                ) : (
                  <OverviewPage pack={pack.value} />
                ))}
            </Loading>
          </section>
        </article>

        <footer>
          <span>Coin designer documentation</span>
          <a href="#overview">Back to top ↑</a>
        </footer>
      </main>
    </div>
  )
}
