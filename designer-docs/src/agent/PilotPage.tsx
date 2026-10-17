import { useState } from 'react'
import { handleGuideNavigation } from '../GuideNavigation'
import { Segment } from '../guide-kit'
import { PILOT_URL, loadPilot, loadSmoke, packFileUrl, useLoaded, type Pack } from './pack'
import { Loading, useUrlFilter } from './pageParts'
import { Empty, SampleTag, Tokens, agentHrefFor, formatDate } from './parts'
import type { PilotQuestion, PilotResults, PilotRun, PilotVariant } from './types'

// The pilot results page for results schema version 2: the same questions
// answered with each variant of the pack, with tokens, calls, and time.

export const VARIANT_LABELS: Record<PilotVariant, string> = {
  none: 'No pack',
  full: 'Full entries',
  brief: 'Briefs',
  graph: 'Graph and briefs',
}

const VARIANT_NOTES: Record<PilotVariant, string> = {
  none: 'Reads nothing from the pack.',
  full: 'rules.md, index.json, and components/*.md.',
  brief: 'rules.md, index.json, and components/*.brief.md; a full .md only on request.',
  graph: 'rules.md, index.json, graph.json, components/*.links.md, and components/*.brief.md.',
}

function median(values: number[]) {
  if (!values.length) return undefined
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2)
}

/** Everything the model read as input in a run: uncached input plus cache reads and writes. */
function totalInput(run: PilotRun) {
  const tokens = run.tokens
  return (tokens?.input ?? 0) + (tokens?.cacheRead ?? 0) + (tokens?.cacheWrite ?? 0)
}

function seconds(ms: number | undefined) {
  return ms === undefined ? '–' : `${(ms / 1000).toFixed(1)} s`
}

function count(value: number | undefined) {
  return value === undefined ? '–' : value.toLocaleString('en-GB')
}

function runsFor(questions: PilotQuestion[], variant: PilotVariant) {
  return questions.flatMap((question) => (question.runs ?? []).filter((run) => run.variant === variant))
}

function SummaryTable({ results, scored }: { results: PilotResults; scored: boolean }) {
  return (
    <div className="agent-table-scroll">
      <table className="agent-table agent-pilot-summary">
        <caption className="agent-visually-hidden">Results per variant, with medians per run</caption>
        <thead>
          <tr>
            <th scope="col" rowSpan={2}>
              Variant
            </th>
            <th scope="col" rowSpan={2}>
              Pass rate
            </th>
            <th scope="colgroup" colSpan={5} className="agent-th-group">
              Median per run
            </th>
          </tr>
          <tr>
            <th scope="col">Input tokens</th>
            <th scope="col">Peak context</th>
            <th scope="col">Coin tokens</th>
            <th scope="col">Calls</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {results.variants.map((variant) => {
            const runs = runsFor(results.questions, variant)
            const passed = runs.filter((run) => run.pass).length
            const estimated = runs.some((run) => run.tokens?.coinEstimated)
            const coin = median(runs.map((run) => run.tokens?.coin ?? 0))
            return (
              <tr key={variant}>
                <th scope="row">
                  <span className="agent-variant">{VARIANT_LABELS[variant] ?? variant}</span>
                  <span className="agent-variant-note">{VARIANT_NOTES[variant]}</span>
                </th>
                <td>
                  {scored && runs.length ? (
                    <span className="agent-pass-rate">
                      <strong>{Math.round((passed / runs.length) * 100)}%</strong> {passed}/{runs.length}
                    </span>
                  ) : (
                    <span className="agent-muted">{scored ? '–' : 'Unscored'}</span>
                  )}
                </td>
                <td>{count(median(runs.map(totalInput)))}</td>
                <td>{count(median(runs.map((run) => run.tokens?.peakContext ?? 0)))}</td>
                <td>{coin === undefined ? '–' : <Tokens tokens={coin} estimated={estimated} unit={false} />}</td>
                <td>{count(median(runs.map((run) => run.calls)))}</td>
                <td>{seconds(median(runs.map((run) => run.durationMs)))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** A pack file the agent read, with its tokens, linked to the file and to the component's Agent view. */
function ReadFile({ file, tokens, pack, release }: { file: string; tokens: number; pack: Pack; release: string }) {
  const clean = file.replace(/^\/?agent\//, '').replace(/^\/+/, '')
  const versioned = /^\d+\.\d+\.\d+\+[^/]+\//.test(clean)
  const url = versioned ? `/agent/${clean}` : packFileUrl(release, clean)
  const component = /components\/([\w-]+?)(\.brief|\.links)?\.(json|md)$/.exec(clean)?.[1]
  const agentHref = component ? agentHrefFor(component) : undefined
  return (
    <li>
      {pack.source === 'live' ? (
        <a href={url} target="_blank" rel="noreferrer">
          <code>{file}</code>
        </a>
      ) : (
        <code>{file}</code>
      )}
      <span className="agent-muted">{tokens.toLocaleString('en-GB')}</span>
      {agentHref && (
        <a className="agent-row-link" href={agentHref} onClick={handleGuideNavigation}>
          Agent view
        </a>
      )}
    </li>
  )
}

function Question({
  question,
  variants,
  pack,
  release,
  scored,
}: {
  question: PilotQuestion
  variants: PilotVariant[]
  pack: Pack
  release: string
  scored: boolean
}) {
  const { expected } = question
  const runs = variants.flatMap((variant) => (question.runs ?? []).filter((run) => run.variant === variant))
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
          {(
            [
              ['Valid answers', expected.validAnswers],
              ['Required', expected.required],
              ['Recommended', expected.recommended],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                {items.length ? (
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="agent-muted">–</span>
                )}
              </dd>
            </div>
          ))}
          <div>
            <dt>Settled by</dt>
            <dd>{expected.settledBy ?? <span className="agent-muted">Not settled yet</span>}</dd>
          </div>
        </dl>
      </div>
      <div className="agent-table-scroll">
        <table className="agent-table agent-run-table">
          <caption className="agent-visually-hidden">Runs for {question.id}</caption>
          <thead>
            <tr>
              <th scope="col">Variant</th>
              <th scope="col">Result</th>
              <th scope="col">Missed</th>
              <th scope="col">Files read (tokens)</th>
              <th scope="col">Tokens</th>
              <th scope="col">Answer</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run, index) => (
              <tr key={`${run.variant}-${index}`} className={scored && !run.pass ? 'is-failed' : undefined}>
                <th scope="row">{VARIANT_LABELS[run.variant] ?? run.variant}</th>
                <td>
                  {scored ? (
                    <span className={`agent-verdict ${run.pass ? 'is-pass' : 'is-fail'}`}>{run.pass ? 'Pass' : 'Fail'}</span>
                  ) : (
                    <span className="agent-muted">Unscored</span>
                  )}
                </td>
                <td>
                  {run.failed.length ? (
                    <ul className="agent-missed">
                      {run.failed.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="agent-muted">–</span>
                  )}
                  {run.notes && <p className="agent-run-notes">{run.notes}</p>}
                </td>
                <td>
                  {run.read.length ? (
                    <ul className="agent-read-files">
                      {run.read.map((read) => (
                        <ReadFile file={read.file} tokens={read.tokens} pack={pack} release={release} key={read.file} />
                      ))}
                    </ul>
                  ) : (
                    <span className="agent-muted">None</span>
                  )}
                </td>
                <td>
                  <dl className="agent-run-tokens">
                    <div>
                      <dt>Input</dt>
                      <dd>{count(totalInput(run))}</dd>
                    </div>
                    <div>
                      <dt>Peak</dt>
                      <dd>{count(run.tokens?.peakContext)}</dd>
                    </div>
                    <div>
                      <dt>Coin</dt>
                      <dd>
                        {run.tokens?.coinEstimated ? '≈' : ''}
                        {count(run.tokens?.coin)}
                      </dd>
                    </div>
                    <div>
                      <dt>Calls</dt>
                      <dd>{count(run.calls)}</dd>
                    </div>
                    <div>
                      <dt>Time</dt>
                      <dd>{seconds(run.durationMs)}</dd>
                    </div>
                  </dl>
                </td>
                <td>
                  <details className="agent-answer-details">
                    <summary>Answer</summary>
                    <pre className="agent-answer" tabIndex={0}>
                      <code>{run.answer}</code>
                    </pre>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </li>
  )
}

function Results({ results, pack, scored }: { results: PilotResults; pack: Pack; scored: boolean }) {
  const [filter, setFilter] = useUrlFilter('filter', 'All', { All: null, 'Failed with a pack variant': 'failed' })
  const questions = results.questions ?? []
  const failedWithPack = (question: PilotQuestion) =>
    (question.runs ?? []).some((run) => run.variant !== 'none' && !run.pass)
  const shown = filter === 'All' || !scored ? questions : questions.filter(failedWithPack)

  return (
    <>
      <dl className="agent-manifest">
        <div>
          <dt>Model</dt>
          <dd>{results.model}</dd>
        </div>
        <div>
          <dt>Run</dt>
          <dd>{formatDate(results.runAt)}</dd>
        </div>
        <div>
          <dt>Pack</dt>
          <dd>
            <code>{results.packVersion}</code>
          </dd>
        </div>
        <div>
          <dt>Questions</dt>
          <dd>{questions.length}</dd>
        </div>
      </dl>
      {results.packVersion !== pack.current && (
        <p className="agent-notices-single">
          These results are for pack <code>{results.packVersion}</code>; the current release is <code>{pack.current}</code>.
        </p>
      )}
      <SummaryTable results={results} scored={scored} />
      <p className="agent-page-note agent-table-note">
        Input counts uncached input, cache reads, and cache writes together. Peak context is the largest single model call.
        Coin tokens are the pack files the agent read, each counted once; ≈ marks estimates.
      </p>
      {scored && (
        <div className="agent-page-controls">
          <Segment label="Show" value={filter} options={['All', 'Failed with a pack variant'] as const} onChange={setFilter} />
          <p className="agent-muted" role="status">
            {shown.length} of {questions.length} questions
          </p>
        </div>
      )}
      {shown.length ? (
        <ol className="agent-questions">
          {shown.map((question) => (
            <Question
              question={question}
              variants={results.variants}
              pack={pack}
              release={results.packVersion}
              scored={scored}
              key={question.id}
            />
          ))}
        </ol>
      ) : (
        <Empty>Every question passed with every pack variant.</Empty>
      )}
    </>
  )
}

function isV2(value: unknown): value is PilotResults {
  return !!value && typeof value === 'object' && (value as { schemaVersion?: unknown }).schemaVersion === 2
}

export function PilotPage({ pack }: { pack: Pack }) {
  const results = useLoaded(`pilot:${pack.source}:${pack.current}`, () => loadPilot(pack))
  const smoke = useLoaded('pilot:smoke', loadSmoke)
  const smokeValue = smoke.status === 'ready' && smoke.value && isV2(smoke.value.results) ? smoke.value.results : null
  const smokeLabel = smoke.status === 'ready' ? smoke.value?.label : null
  const [run, setRun] = useState<'Scored run' | 'Smoke test (unscored)'>('Scored run')
  const value = results.status === 'ready' ? results.value : null
  const showSmoke = run !== 'Scored run' && smokeValue

  return (
    <>
      <p className="agent-release-line">
        <span>
          Release <code>{pack.current}</code>
        </span>
        {pack.source === 'sample' && <SampleTag />}
        {value && !showSmoke && (pack.source === 'live' ? (
          <a href={PILOT_URL} target="_blank" rel="noreferrer">
            <code>{PILOT_URL}</code>
          </a>
        ) : (
          <code>pilot/results.json</code>
        ))}
      </p>
      {smokeValue && (
        <div className="agent-page-controls">
          <Segment label="Run" value={run} options={['Scored run', 'Smoke test (unscored)'] as const} onChange={setRun} />
        </div>
      )}
      {showSmoke ? (
        <>
          <p className="agent-notices-single">
            <strong>Unscored.</strong> Smoke test from <code>agent-pack/pilot/smoke.json</code>. It measures tokens, calls,
            and time; its answers were not graded, so it has no pass rate.
            {smokeLabel && <span className="agent-smoke-label"> {smokeLabel}</span>}
          </p>
          <Results results={smokeValue} pack={pack} scored={false} />
        </>
      ) : (
        <Loading loaded={results}>
          {isV2(value) ? (
            <Results results={value} pack={pack} scored />
          ) : value ? (
            <Empty>
              This results file uses schema version {String((value as { schemaVersion?: unknown }).schemaVersion)}; this
              page reads version 2.
            </Empty>
          ) : (
            <Empty>No pilot results yet. The test run writes them to {PILOT_URL}.</Empty>
          )}
        </Loading>
      )}
    </>
  )
}
