#!/usr/bin/env node
// The pilot test, version 2: does a smaller form of the guidance work as well
// as full entries, and what does each form cost in tokens?
//
// Each question runs once per variant, every run a fresh `claude -p` session
// with the same model, in a temporary folder holding only that variant's files,
// with only read and search tools (Read, Grep, Glob):
//
//   none   nothing
//   full   rules.md, index.json, components/*.md
//   brief  rules.md, index.json, components/*.brief.md (and components/*.md, to open on request)
//   graph  rules.md, index.json, graph.json, components/*.links.md, components/*.brief.md
//
// From the session's stream events the runner sums input, cache-read,
// cache-write and output tokens over all model calls, takes peakContext (the
// largest single call), and records the pack files the agent opened with Read,
// with their tokens from the release's sizes.json (coin: their sum, each file
// once), plus the number of calls and the duration. A fresh session grades each
// answer against the settled expectations without knowing the variant.
// Results: public/agent/pilot/results.json (results schema version 2).
//
// Official runs need every question's expected.settledBy: Astra settles the
// expected answers first.
//
//   npm run agent-pack:pilot -- --dry-run
//   npm run agent-pack:pilot                                  # every question, every variant
//   npm run agent-pack:pilot -- --only q04,q11 --variants brief,graph
//   npm run agent-pack:pilot -- --model <id>                  # default claude-sonnet-5-5
//   npm run agent-pack:pilot -- --smoke --only q01,q21        # unscored, at most 2 questions,
//                                                             # writes agent-pack/pilot/smoke.json

import { spawn, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, sep } from 'node:path'
import { DOCS, PACK, PUBLIC_AGENT, fail, readJson, readJsonIfExists, schemaValidator, validate, writeJson } from '../scripts/lib.mjs'

const VARIANTS = ['none', 'full', 'brief', 'graph']
const DEFAULT_MODEL = 'claude-sonnet-5-5'

const args = process.argv.slice(2)
const option = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : null }
const dryRun = args.includes('--dry-run')
const smoke = args.includes('--smoke')
const only = option('--only')?.split(',').map((id) => id.trim()).filter(Boolean) ?? null
const variants = option('--variants')?.split(',').map((v) => v.trim()) ?? VARIANTS
const model = option('--model') ?? DEFAULT_MODEL
const concurrency = Number(option('--concurrency') ?? 3)
for (const variant of variants) if (!VARIANTS.includes(variant)) fail(`unknown variant "${variant}" (${VARIANTS.join(', ')})`)
if (smoke && (!only || only.length > 2)) fail('--smoke runs at most 2 questions: name them with --only')

const questionsFile = join(PACK, 'pilot', 'questions.json')
const resultsFile = join(PUBLIC_AGENT, 'pilot', 'results.json')
const smokeFile = join(PACK, 'pilot', 'smoke.json')

// questions.json uses the results schema's question shape, without runs.
const resultsSchema = readJson(join(PACK, 'schema', 'pilot-results.schema.json'))
const questionSchema = structuredClone(resultsSchema.properties.questions.items)
delete questionSchema.properties.runs
questionSchema.required = questionSchema.required.filter((key) => key !== 'runs')
const checkQuestion = schemaValidator().compile(questionSchema)

const { questions } = readJson(questionsFile)
for (const question of questions) {
  if (!checkQuestion(question)) fail(`${question.id}: ${checkQuestion.errors.map((e) => `${e.instancePath} ${e.message}`).join('; ')}`)
}
const chosen = only ? questions.filter((question) => only.includes(question.id)) : questions
if (!chosen.length) fail(`no question matches ${only.join(', ')}`)
const unsettled = chosen.filter((question) => !question.expected.settledBy)
if (unsettled.length && !dryRun && !smoke) {
  fail(`${unsettled.length} question${unsettled.length === 1 ? ' has' : 's have'} no expected.settledBy (${unsettled.map((q) => q.id).join(', ')}).\n  Astra settles the expected answers first; then set expected.settledBy and rerun.`)
}

const releases = readJson(join(PUBLIC_AGENT, 'index.json'))
const packVersion = releases.current
const releaseDir = join(PUBLIC_AGENT, packVersion)
if (!existsSync(join(releaseDir, 'sizes.json'))) fail(`release ${packVersion} has no sizes.json; run npm run build:agent-pack`)
const manifest = readJson(join(releaseDir, 'manifest.json'))
const installed = readJson(join(DOCS, 'node_modules/jfs-components/package.json')).version
if (manifest.packageVersion !== installed) fail(`release ${packVersion} is for jfs-components ${manifest.packageVersion}, but ${installed} is installed`)
const sizes = readJson(join(releaseDir, 'sizes.json'))
const sizeOf = new Map(sizes.files.map((row) => [row.path, row.tokens]))
const coinEstimated = sizes.tokenizer.startsWith('estimate') || sizes.files.some((row) => row.estimated)

/** The release files a variant may read. */
function variantFiles(variant) {
  const components = readdirSync(join(releaseDir, 'components'))
  const pick = (suffix) => components.filter((file) => file.endsWith(suffix)).map((file) => `components/${file}`)
  const full = pick('.md').filter((file) => !file.endsWith('.brief.md') && !file.endsWith('.links.md'))
  switch (variant) {
    case 'none': return []
    case 'full': return ['rules.md', 'index.json', ...full]
    case 'brief': return ['rules.md', 'index.json', ...pick('.brief.md'), ...full]
    case 'graph': return ['rules.md', 'index.json', 'graph.json', ...pick('.links.md'), ...pick('.brief.md')]
  }
  return []
}

const GUIDE = {
  none: 'You have no Coin documentation here; answer from what you know.',
  full: 'This folder is the Coin agent pack: rules.md, index.json, and one full entry per component in components/<slug>.md. Start with rules.md and index.json, then read only the entries you need.',
  brief: 'This folder is the Coin agent pack: rules.md, index.json, and a short brief per component in components/<slug>.brief.md. Start with rules.md and index.json and read the briefs you need. Open a full entry, components/<slug>.md, only when a brief does not answer.',
  graph: 'This folder is the Coin agent pack: rules.md, index.json, graph.json (how components relate), and for each component components/<slug>.links.md (its neighbours) and components/<slug>.brief.md. Start with rules.md and index.json, follow the links to related components, and read the briefs you need.',
}

function answerPrompt(question, variant) {
  return [
    `You are helping a designer and a developer build a screen with Coin, the Jio Finance design system (its React Native components are the jfs-components package, version ${installed}).`,
    GUIDE[variant],
    variant === 'none' ? '' : 'Work only from the files in this folder.',
    'Answer the question below: name the components, props and modes you would use, with JSX where it helps, and say plainly when something cannot be done with Coin.',
    '',
    `Question: ${question.question}`,
    '',
  ].filter((line, index) => line !== '' || index > 3).join('\n')
}

function gradePrompt(question, answer) {
  return `You grade one answer to a question about Coin, the Jio Finance design system (React Native package jfs-components). Judge it only against the expectations below, which reviewers settled from the Coin documentation. Do not use your own view of what is best.

Question: ${question.question}

Valid answers (the answer must match at least one, in substance):
${question.expected.validAnswers.map((item) => `- ${item}`).join('\n')}

Required (the answer fails if it breaks any of these):
${question.expected.required.map((item) => `- ${item}`).join('\n') || '- (none)'}

Recommended (missing one does not fail the answer, but list it):
${question.expected.recommended.map((item) => `- ${item}`).join('\n') || '- (none)'}

The answer:
<<<
${answer}
>>>

pass is true only when the answer matches a valid answer and meets every required item. failed lists every valid-answer mismatch, required item and recommended item the answer misses, each prefixed "valid:", "required:" or "recommended:", quoting the expectation.
Answer with JSON only: {"pass": true|false, "failed": ["..."], "notes": "one or two sentences"}`
}

function claude(prompt, { cwd, tools }) {
  const cli = ['-p', '--output-format', 'stream-json', '--verbose', '--model', model, '--tools', tools,
    '--setting-sources', '', '--strict-mcp-config', '--no-session-persistence']
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const child = spawn('claude', cli, { cwd, stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (chunk) => { out += chunk })
    child.stderr.on('data', (chunk) => { err += chunk })
    child.on('close', (status) => {
      const durationMs = Date.now() - started
      const events = out.split('\n').filter(Boolean).flatMap((line) => { try { return [JSON.parse(line)] } catch { return [] } })
      const result = events.findLast((event) => event.type === 'result')
      if (status !== 0 || !result) return reject(new Error(`claude exited ${status}: ${(err || out).slice(0, 800)}`))
      resolve({ text: result.result ?? '', events, result, durationMs, transcript: out })
    })
    child.stdin.end(prompt)
  })
}

/** Token use over every model call in a session's stream events. */
export function usageOf(events) {
  // An API call's assistant message can arrive as several events (one per
  // content block) sharing a message id; keep the last usage seen per id.
  const calls = new Map()
  for (const event of events) {
    if (event.type !== 'assistant' || !event.message?.usage) continue
    calls.set(event.message.id ?? `call-${calls.size}`, event.message.usage)
  }
  const totals = { input: 0, cacheRead: 0, cacheWrite: 0, output: 0, peakContext: 0 }
  for (const usage of calls.values()) {
    const input = usage.input_tokens ?? 0
    const cacheRead = usage.cache_read_input_tokens ?? 0
    const cacheWrite = usage.cache_creation_input_tokens ?? 0
    totals.input += input
    totals.cacheRead += cacheRead
    totals.cacheWrite += cacheWrite
    totals.output += usage.output_tokens ?? 0
    totals.peakContext = Math.max(totals.peakContext, input + cacheRead + cacheWrite)
  }
  return { ...totals, calls: calls.size }
}

/** Pack files the agent opened with Read, relative to the variant folder, each once. */
export function filesRead(events, workspace) {
  const read = new Set()
  for (const event of events) {
    if (event.type !== 'assistant') continue
    for (const part of event.message?.content ?? []) {
      if (part.type !== 'tool_use' || part.name !== 'Read') continue
      const path = String(part.input?.file_path ?? '')
      const absolute = path.startsWith('/') ? path : join(workspace, path)
      if (absolute.startsWith(workspace + sep)) read.add(relative(workspace, absolute).split(sep).join('/'))
    }
  }
  return [...read].sort().map((file) => ({ file, tokens: sizeOf.get(file) ?? 0 }))
}

function workspace(variant) {
  // realpath-free: mkdtemp under the OS temp folder; macOS reports /private/var/...
  const dir = mkdtempSync(join(tmpdir(), `coin-pilot-${variant}-`))
  for (const file of variantFiles(variant)) {
    mkdirSync(join(dir, file, '..'), { recursive: true })
    cpSync(join(releaseDir, file), join(dir, file))
  }
  return dir
}

function parseGrade(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  const value = JSON.parse(text.slice(start, end + 1))
  return { pass: Boolean(value.pass), failed: (value.failed ?? []).map(String), notes: String(value.notes ?? '') }
}

const runAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const transcripts = join(PACK, 'pilot', 'runs', runAt.replace(/:/g, '-'))

async function runOne(question, variant) {
  const dir = workspace(variant)
  try {
    const answer = await claude(answerPrompt(question, variant), { cwd: dir, tools: 'Read,Grep,Glob' })
    mkdirSync(transcripts, { recursive: true })
    writeFileSync(join(transcripts, `${question.id}-${variant}.jsonl`), answer.transcript)
    // Paths in tool calls may use the resolved temp path (/private/var/... on macOS).
    const resolvedDir = spawnSync('realpath', [dir], { encoding: 'utf8' }).stdout.trim() || dir
    const readList = [...filesRead(answer.events, dir), ...filesRead(answer.events, resolvedDir)]
      .filter((item, index, list) => list.findIndex((other) => other.file === item.file) === index)
    const usage = usageOf(answer.events)
    const grade = smoke
      ? { pass: false, failed: [], notes: 'Unscored smoke run: not graded.' }
      : parseGrade((await claude(gradePrompt(question, answer.text), { cwd: dir, tools: '' })).text)
    return {
      variant,
      answer: answer.text,
      read: readList,
      pass: grade.pass,
      failed: grade.failed,
      notes: grade.notes,
      tokens: {
        input: usage.input,
        cacheRead: usage.cacheRead,
        cacheWrite: usage.cacheWrite,
        output: usage.output,
        peakContext: usage.peakContext,
        coin: readList.reduce((sum, item) => sum + item.tokens, 0),
        coinEstimated,
      },
      calls: usage.calls,
      durationMs: answer.durationMs,
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

if (dryRun) {
  const probe = spawnSync('claude', ['--version'], { encoding: 'utf8' })
  console.log(`Pilot test plan (dry run): pack ${packVersion}, jfs-components ${installed}, model ${model}`)
  console.log(`claude CLI: ${probe.status === 0 ? probe.stdout.trim() : 'NOT FOUND'}`)
  console.log(`${chosen.length} questions × ${variants.length} variants (${variants.join(', ')}), each graded by a fresh session: ${chosen.length * variants.length * 2} claude sessions.`)
  for (const variant of variants) {
    const files = variantFiles(variant)
    const tokens = files.reduce((sum, file) => sum + (sizeOf.get(file) ?? 0), 0)
    console.log(`  ${variant.padEnd(5)} ${files.length} files available, ${tokens} tokens if all were read (${sizes.tokenizer})`)
  }
  console.log(`Unsettled: ${unsettled.length ? unsettled.map((q) => q.id).join(', ') : 'none'}`)
  console.log(`\nPrompt (brief) for ${chosen[0].id}:\n${answerPrompt(chosen[0], 'brief')}`)
  process.exit(0)
}

const previous = readJsonIfExists(resultsFile)
const keep = !smoke && previous?.schemaVersion === 2 && previous.packVersion === packVersion && previous.model === model
const byId = new Map((keep ? previous.questions : []).map((question) => [question.id, question]))
const queue = chosen.flatMap((question) => variants.map((variant) => [question, variant]))
const runs = new Map()
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (queue.length) {
    const [question, variant] = queue.shift()
    const run = await runOne(question, variant)
    runs.set(`${question.id}:${variant}`, run)
    const t = run.tokens
    console.log(`  ${question.id} ${variant.padEnd(5)} ${smoke ? 'unscored' : run.pass ? 'pass' : 'FAIL'} · ${run.calls} calls · peak ${t.peakContext} · in ${t.input} + cache ${t.cacheRead}/${t.cacheWrite} · out ${t.output} · coin ${t.coin} · ${run.read.length} files · ${Math.round(run.durationMs / 1000)} s`)
  }
}))
for (const question of chosen) {
  const earlier = byId.get(question.id)?.runs ?? []
  const fresh = variants.map((variant) => runs.get(`${question.id}:${variant}`))
  const merged = [...earlier.filter((run) => !variants.includes(run.variant)), ...fresh]
    .sort((a, b) => VARIANTS.indexOf(a.variant) - VARIANTS.indexOf(b.variant))
  byId.set(question.id, { id: question.id, kind: question.kind, question: question.question, expected: question.expected, runs: merged })
}
const output = {
  schemaVersion: 2,
  packVersion,
  runAt,
  model,
  variants: VARIANTS.filter((variant) => [...byId.values()].some((q) => q.runs.some((run) => run.variant === variant))),
  questions: questions.filter((question) => byId.has(question.id)).map((question) => byId.get(question.id)),
}
const problems = validate('pilot-results', output)
if (problems.length) fail(`results do not match the schema:\n  ${problems.join('\n  ')}`)
if (smoke) {
  writeJson(smokeFile, {
    label: 'UNSCORED measurement smoke test. Not graded and not a test result: it only shows that the token numbers work. Expected answers are not settled.',
    results: output,
  })
  console.log(`\n✓ ${relative(DOCS, smokeFile)} (unscored)`)
} else {
  writeJson(resultsFile, output)
  console.log(`\n✓ ${relative(DOCS, resultsFile)}`)
}
