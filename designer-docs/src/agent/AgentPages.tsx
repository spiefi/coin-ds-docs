import { useLayoutEffect, type ReactNode } from 'react'
import {
  GuideMobileBar,
  GuideSidebar,
  MobileComponentNav,
  handleGuideNavigation,
  useGuidePageNavigation,
} from '../GuideNavigation'
import { Segment } from '../guide-kit'
import { GraphPage } from './GraphPage'
import { Markdown } from './Markdown'
import {
  loadEntry,
  loadIndex,
  loadManifest,
  loadPack,
  loadRules,
  loadSizes,
  packFileUrl,
  renderingPath,
  sizeOf,
  useLoaded,
  type Pack,
} from './pack'
import { Loading, RawToggle, ReleaseLine, useUrlFilter } from './pageParts'
import { CommitLink, ComponentLink, Empty, StateChip, Tokens, agentHrefFor, formatDate } from './parts'
import { PilotPage } from './PilotPage'
import { AGENT_PAGES, agentPageHref, type AgentPage } from './routes'
import type { AgentEntry, EntryState, IndexComponent, PackSizes, SizedFile } from './types'
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
  graph: {
    title: 'Graph map',
    lede: 'How the components in the pack relate: which to use instead, where each goes, what its slots accept, and what it is used with.',
  },
  pilot: {
    title: 'Pilot results',
    lede: 'The same questions answered with no pack and with each form of it, checked against answers people settled, with what each answer cost in tokens.',
  },
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

function FileSize({ file, unit = true }: { file: SizedFile | undefined; unit?: boolean }) {
  return file ? <Tokens tokens={file.tokens} estimated={file.estimated} unit={unit} /> : <span className="agent-muted">–</span>
}

/** What every agent loads before any entry, and what each variant adds. */
function SizesSummary({ sizes, pack }: { sizes: PackSizes | null; pack: Pack }) {
  if (!sizes) {
    return (
      <p className="agent-page-note">
        Release <code>{pack.current}</code> has no <code>sizes.json</code>, so token sizes are not shown.
      </p>
    )
  }
  const rules = sizeOf(sizes, 'rules.md')
  const index = sizeOf(sizes, 'index.json')
  const graph = sizeOf(sizes, 'graph.json')
  const menu = (rules?.tokens ?? 0) + (index?.tokens ?? 0)
  const estimated = sizes.files.some((file) => file.estimated)
  const files: Array<[string, SizedFile | undefined, string]> = [
    ['rules.md', rules, 'Shared rules'],
    ['index.json', index, 'Every component, for choosing'],
    ['graph.json', graph, 'The graph variant also loads this'],
  ]
  return (
    <section className="agent-sizes" aria-labelledby="agent-sizes-title">
      <h2 id="agent-sizes-title">What agents load</h2>
      <p className="agent-sizes-tokenizer">
        Tokens counted with <strong>{sizes.tokenizer}</strong>
        {estimated && <span className="agent-muted"> · ≈ marks estimated values</span>}
      </p>
      <div className="agent-sizes-grid">
        <div className="agent-sizes-menu">
          <p className="agent-run-label">Always loaded</p>
          <p className="agent-sizes-total">
            <Tokens tokens={menu} estimated={!!(rules?.estimated || index?.estimated)} />
          </p>
          <p className="agent-muted">rules.md and index.json, read before any entry.</p>
        </div>
        <ul className="agent-sizes-files">
          {files.map(([path, file, note]) => (
            <li key={path}>
              <code>{path}</code>
              <span className="agent-muted">{note}</span>
              <FileSize file={file} />
            </li>
          ))}
        </ul>
      </div>
      <p className="agent-page-note">
        Per component, the table below gives each rendering: full (<code>components/&lt;slug&gt;.md</code>), brief, and links.
      </p>
    </section>
  )
}

function OverviewPage({ pack }: { pack: Pack }) {
  const [filter, setFilter] = useUrlFilter('filter', 'All', { All: null, Flagged: 'flagged' })
  const data = useLoaded(`overview:${pack.source}:${pack.current}`, async () => {
    const [manifest, index, sizes] = await Promise.all([loadManifest(pack), loadIndex(pack), loadSizes(pack).catch(() => null)])
    // The index has no flag counts or guide commits, so read every entry.
    const rows: OverviewRow[] = await Promise.all(
      (index?.components ?? []).map(async (component) => ({
        component,
        entry: await loadEntry(pack, component.slug).catch(() => 'error' as const),
      })),
    )
    return { manifest, index, rows, sizes }
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
        <SizesSummary sizes={value?.sizes ?? null} pack={pack} />
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
                      <th scope="col">Full tokens</th>
                      <th scope="col">Brief tokens</th>
                      <th scope="col">Links tokens</th>
                      <th scope="col">Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const { component, entry } = row
                      const agentHref = agentHrefFor(component.id, ids)
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
                          {(['full', 'brief', 'links'] as const).map((rendering) => (
                            <td key={rendering}>
                              <FileSize file={sizeOf(value.sizes, renderingPath(component.slug, rendering))} unit={false} />
                            </td>
                          ))}
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
                            {agentHref && entry && entry !== 'error' && (
                              <a className="agent-row-link" href={agentHref} onClick={handleGuideNavigation}>
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

/** A shared agent pack page: overview, graph map, rules, index, or pilot results. */
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
                ) : page === 'graph' ? (
                  <GraphPage pack={pack.value} />
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
