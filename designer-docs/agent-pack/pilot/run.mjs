#!/usr/bin/env node
// The with-and-without pilot test. Each question in questions.json runs twice,
// each time in a fresh `claude -p` session in its own empty folder:
//
//   with the pack:    the installed package's types (node_modules/jfs-components)
//                     plus the current release in ./coin-agent-pack/
//   without the pack: the package's types only
//
// A third fresh session grades each answer against the settled expectations
// without being told which run it is. Results go to
// public/agent/pilot/results.json (rewritten on every run; with --only, the
// other questions keep their last results), with the pack files the with-pack
// agent read. Transcripts go to agent-pack/pilot/runs/ (not committed).
//
// The test does not run until every question's expected.settledBy is set:
// Astra settles the expected answers first.
//
//   npm run agent-pack:pilot -- --dry-run          # show the plan; run nothing
//   npm run agent-pack:pilot                       # run every question
//   npm run agent-pack:pilot -- --only q04,q11     # rerun some questions
//   npm run agent-pack:pilot -- --model <id>       # answering and grading model
//   npm run agent-pack:pilot -- --baseline none    # without-pack agent gets no package either
//   npm run agent-pack:pilot -- --concurrency 4

import { spawn, spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, sep } from 'node:path'
import { DOCS, PACK, PUBLIC_AGENT, fail, readJson, readJsonIfExists, schemaValidator, validate, writeJson } from '../scripts/lib.mjs'

const args = process.argv.slice(2)
const option = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : null }
const dryRun = args.includes('--dry-run')
const only = option('--only')?.split(',').map((id) => id.trim()).filter(Boolean) ?? null
const model = option('--model')
const baseline = option('--baseline') ?? 'package'
const concurrency = Number(option('--concurrency') ?? 3)
if (!['package', 'none'].includes(baseline)) fail('--baseline is "package" or "none"')

const PACK_DIR = 'coin-agent-pack'
const questionsFile = join(PACK, 'pilot', 'questions.json')
const resultsFile = join(PUBLIC_AGENT, 'pilot', 'results.json')

// questions.json uses the results schema's question shape, without the runs.
const resultsSchema = readJson(join(PACK, 'schema', 'pilot-results.schema.json'))
const questionSchema = structuredClone(resultsSchema.$defs.question)
delete questionSchema.properties.withPack
delete questionSchema.properties.withoutPack
questionSchema.required = questionSchema.required.filter((key) => !['withPack', 'withoutPack'].includes(key))
questionSchema.properties.expected = resultsSchema.$defs.expected
const checkQuestion = schemaValidator().compile(questionSchema)

const { questions } = readJson(questionsFile)
for (const question of questions) {
  if (!checkQuestion(question)) fail(`${question.id}: ${checkQuestion.errors.map((e) => `${e.instancePath} ${e.message}`).join('; ')}`)
}
const chosen = only ? questions.filter((question) => only.includes(question.id)) : questions
if (!chosen.length) fail(`no question matches ${only.join(', ')}`)
const unsettled = chosen.filter((question) => !question.expected.settledBy)
if (unsettled.length && !dryRun) {
  fail(`${unsettled.length} question${unsettled.length === 1 ? ' has' : 's have'} no expected.settledBy (${unsettled.map((q) => q.id).join(', ')}).\n  Astra settles the expected answers first; then set expected.settledBy and rerun.`)
}

const releases = readJson(join(PUBLIC_AGENT, 'index.json'))
const packVersion = releases.current
const releaseDir = join(PUBLIC_AGENT, packVersion)
if (!existsSync(join(releaseDir, 'manifest.json'))) fail(`release ${packVersion} is not built; run npm run build:agent-pack`)
const installed = readJson(join(DOCS, 'node_modules/jfs-components/package.json')).version
if (readJson(join(releaseDir, 'manifest.json')).packageVersion !== installed) {
  fail(`release ${packVersion} is for jfs-components ${readJson(join(releaseDir, 'manifest.json')).packageVersion}, but ${installed} is installed`)
}

function answerPrompt(question, withPack) {
  const context = [
    'You are helping a designer and a developer build a screen with Coin, the Jio Finance design system.',
    baseline === 'package' || withPack
      ? 'Its React Native components are the jfs-components package, installed here at ./node_modules/jfs-components (type declarations under lib/typescript).'
      : 'Its React Native components are the jfs-components package (not installed here).',
    withPack
      ? `The Coin agent pack for this package version is in ./${PACK_DIR}/. Start with ./${PACK_DIR}/llms.txt and ./${PACK_DIR}/rules.md.`
      : '',
    'Work only from the files in this folder. Answer the question below: name the components, props and modes you would use, with JSX where it helps, and say plainly when something cannot be done with Coin.',
  ].filter(Boolean).join(' ')
  return `${context}\n\nQuestion: ${question.question}\n`
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
  const cli = ['-p', '--output-format', 'stream-json', '--verbose', '--tools', tools, '--setting-sources', '', '--strict-mcp-config', '--no-session-persistence']
  if (model) cli.push('--model', model)
  return new Promise((resolve, reject) => {
    const child = spawn('claude', cli, { cwd, stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (chunk) => { out += chunk })
    child.stderr.on('data', (chunk) => { err += chunk })
    child.on('close', (status) => {
      const events = out.split('\n').filter(Boolean).flatMap((line) => { try { return [JSON.parse(line)] } catch { return [] } })
      const result = events.findLast((event) => event.type === 'result')
      if (status !== 0 || !result) return reject(new Error(`claude exited ${status}: ${(err || out).slice(0, 800)}`))
      const toolUses = events.filter((event) => event.type === 'assistant')
        .flatMap((event) => event.message?.content ?? [])
        .filter((part) => part.type === 'tool_use')
      resolve({ text: result.result ?? '', toolUses, transcript: out })
    })
    child.stdin.end(prompt)
  })
}

/** Pack files the agent opened or searched, relative to the pack folder. */
function packFilesRead(toolUses, workspace) {
  const packRoot = join(workspace, PACK_DIR)
  const read = new Set()
  for (const use of toolUses) {
    const input = use.input ?? {}
    const paths = [input.file_path, input.path].filter(Boolean)
    for (const path of paths) {
      const absolute = path.startsWith('/') ? path : join(workspace, path)
      if (absolute === packRoot || absolute.startsWith(packRoot + sep)) {
        read.add(`${use.name === 'Read' ? '' : `${use.name}: `}${relative(packRoot, absolute) || '.'}`)
      }
    }
    if (use.name === 'Glob' && String(input.pattern ?? '').includes(PACK_DIR)) read.add(`Glob: ${input.pattern}`)
  }
  return [...read].sort()
}

function workspace(withPack) {
  const dir = mkdtempSync(join(tmpdir(), 'coin-pilot-'))
  if (withPack || baseline === 'package') {
    const target = join(dir, 'node_modules/jfs-components')
    mkdirSync(target, { recursive: true })
    cpSync(join(DOCS, 'node_modules/jfs-components/package.json'), join(target, 'package.json'))
    cpSync(join(DOCS, 'node_modules/jfs-components/lib/typescript'), join(target, 'lib/typescript'), { recursive: true })
  }
  if (withPack) cpSync(releaseDir, join(dir, PACK_DIR), { recursive: true })
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

async function runOne(question, withPack) {
  const dir = workspace(withPack)
  try {
    const answer = await claude(answerPrompt(question, withPack), { cwd: dir, tools: 'Read,Grep,Glob' })
    const grade = parseGrade((await claude(gradePrompt(question, answer.text), { cwd: dir, tools: '' })).text)
    mkdirSync(transcripts, { recursive: true })
    writeFileSync(join(transcripts, `${question.id}-${withPack ? 'with' : 'without'}.jsonl`), answer.transcript)
    return {
      answer: answer.text,
      read: withPack ? packFilesRead(answer.toolUses, dir) : [],
      pass: grade.pass,
      failed: grade.failed,
      notes: grade.notes,
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

if (dryRun) {
  const probe = spawnSync('claude', ['--version'], { encoding: 'utf8' })
  console.log(`Pilot test plan (dry run): pack ${packVersion}, jfs-components ${installed}, baseline "${baseline}", model ${model ?? 'default'}`)
  console.log(`claude CLI: ${probe.status === 0 ? probe.stdout.trim() : 'NOT FOUND'}`)
  console.log(`${chosen.length} questions × 2 runs, each graded by a fresh session (${chosen.length * 4} claude sessions).`)
  console.log(`Unsettled: ${unsettled.length ? unsettled.map((q) => q.id).join(', ') : 'none'}`)
  console.log(`\nWith-pack prompt for ${chosen[0].id}:\n${answerPrompt(chosen[0], true)}`)
  console.log(`Without-pack prompt for ${chosen[0].id}:\n${answerPrompt(chosen[0], false)}`)
  process.exit(0)
}

const previous = readJsonIfExists(resultsFile)
const results = new Map((previous?.packVersion === packVersion ? previous.questions : []).map((q) => [q.id, q]))
const queue = chosen.flatMap((question) => [[question, true], [question, false]])
const runs = new Map()
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (queue.length) {
    const [question, withPack] = queue.shift()
    const run = await runOne(question, withPack)
    runs.set(`${question.id}:${withPack}`, run)
    console.log(`  ${question.id} ${withPack ? 'with   ' : 'without'} ${run.pass ? 'pass' : 'FAIL'}${run.read.length ? ` · read ${run.read.join(', ')}` : ''}`)
  }
}))
for (const question of chosen) {
  results.set(question.id, { ...question, withPack: runs.get(`${question.id}:true`), withoutPack: runs.get(`${question.id}:false`) })
}
const output = {
  schemaVersion: 1,
  packVersion,
  runAt,
  questions: questions.filter((question) => results.has(question.id)).map((question) => results.get(question.id)),
}
const problems = validate('pilot-results', output)
if (problems.length) fail(`results do not match the schema:\n  ${problems.join('\n  ')}`)
writeJson(resultsFile, output)
const tally = (key) => output.questions.filter((question) => question[key].pass).length
console.log(`\n✓ ${relative(DOCS, resultsFile)}: with the pack ${tally('withPack')}/${output.questions.length} pass, without ${tally('withoutPack')}/${output.questions.length}`)
