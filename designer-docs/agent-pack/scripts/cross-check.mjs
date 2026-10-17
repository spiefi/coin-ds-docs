#!/usr/bin/env node
// Independent cross-check. For each pilot entry, a fresh agent that did not
// extract it reads the guide's copy and evidence beside the extracted entry
// and flags items that generalise one example, lose the context of an
// absolute word, read stronger than their source, or misread it. Results go to
// agent-pack/cross-check/<slug>.json with a hash of the entry they reviewed;
// the build adds them to status.flags (by: cross-check) while that hash still
// matches, and flags the entry for a fresh cross-check once it changes.
//
//   npm run agent-pack:cross-check                  # every pilot entry
//   npm run agent-pack:cross-check -- badge stack   # selected entries
//   npm run agent-pack:cross-check -- --prompt-only # write prompts, run nothing
//   npm run agent-pack:cross-check -- --model <id>  # reviewer model
//
// The reviewer is `claude -p` in an empty temporary folder with no tools and
// no settings, so it sees only the packet below.

import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assemble, entryHash } from './assemble.mjs'
import { PACK, fail, norm, showAt, writeJson } from './lib.mjs'

const args = process.argv.slice(2)
const promptOnly = args.includes('--prompt-only')
const modelIndex = args.indexOf('--model')
const model = modelIndex >= 0 ? args[modelIndex + 1] : null
const valueOf = (name) => args.indexOf(name)
const slugs = args.filter((arg, index) => !arg.startsWith('--') &&
  !(modelIndex >= 0 && index === modelIndex + 1) && !(valueOf('--concurrency') >= 0 && index === valueOf('--concurrency') + 1))

const KINDS = ['generalises-example', 'lost-context', 'stronger-than-source', 'misreads-source']

function guideCopy(snapshot) {
  const lines = [`Summary (registration): ${snapshot.summary}`, `Core principle: ${snapshot.corePrinciple}`, '']
  for (const [name, section] of Object.entries(snapshot.sections)) {
    lines.push(`## Section "${name}": ${section.title}`, section.description ? `Description: ${section.description}` : '')
    for (const block of section.blocks) lines.push(`- ${block}`)
    if (section.specimen.length) lines.push(`(Text inside the live examples: ${section.specimen.join(' | ')})`)
    lines.push('')
  }
  return lines.filter((line) => line !== undefined).join('\n')
}

const show = (from) => !from ? 'no source' : 'fact' in from ? `fact ${from.fact}` : `${from.section}: "${from.quote}"`

function entryItems(entry) {
  const lines = []
  const rule = (pointer, item) => {
    const about = item.target ? ` target=${item.target}${item.value !== undefined ? ` value=${item.value}` : ''}` : ''
    const instead = item.useInstead ? ` useInstead=${item.useInstead}` : ''
    lines.push(`${pointer} [${item.strength}]${about}${instead} ${item.text}\n    from ${show(item.from)}`)
  }
  for (const list of ['useWhen', 'avoidWhen', 'placementAdvice', 'configuration', 'accessibility']) {
    entry[list].forEach((item, index) => rule(`/${list}/${index}`, item))
  }
  entry.content.rules.forEach((item, index) => rule(`/content/rules/${index}`, item))
  lines.push(`/content/good: ${entry.content.good.map((text) => `"${text}"`).join(', ')}`)
  lines.push(`/content/bad: ${entry.content.bad.map((text) => `"${text}"`).join(', ')}`)
  entry.anatomy.forEach((part, index) => lines.push(`/anatomy/${index} part="${part.part}" alwaysPresent=${part.required} holds: ${part.holds}\n    from ${show(part.from)}`))
  entry.states.forEach((state, index) => lines.push(`/states/${index} state="${state.state}" when: ${state.when}\n    from ${show(state.from)}`))
  entry.doDont.forEach((pair, index) => lines.push(`/doDont/${index} do="${pair.do}" dont="${pair.dont}" why="${pair.why}"`))
  entry.examples.forEach((example, index) => lines.push(`/examples/${index} ${example.purpose}\n${example.jsx}\n    from ${show(example.from)}`))
  for (const list of ['props', 'modes', 'slots', 'events']) {
    entry.facts[list].forEach((fact, index) => {
      if (fact.source !== 'types') lines.push(`/facts/${list}/${index} ${fact.name} [${fact.source}${fact.checkedOn ? ` ${fact.checkedOn}` : ''}]: ${fact.description ?? ''}`)
    })
  }
  entry.facts.gaps.forEach((gap, index) => lines.push(`/facts/gaps/${index} [gap, ${gap.source} ${gap.checkedOn}]: ${gap.text}`))
  return lines.join('\n')
}

function citedFacts(entry) {
  const pointers = new Set()
  for (const list of ['useWhen', 'avoidWhen', 'placementAdvice', 'configuration', 'accessibility', 'anatomy', 'states', 'examples']) {
    for (const item of entry[list]) if (item.from && 'fact' in item.from) pointers.add(item.from.fact)
  }
  for (const item of entry.content.rules) if ('fact' in item.from) pointers.add(item.from.fact)
  return [...pointers].map((pointer) => {
    const [, , list, index] = pointer.split('/')
    return `${pointer}: ${JSON.stringify(entry.facts[list][Number(index)])}`
  }).join('\n') || '(none)'
}

function prompt({ entry, snapshot, evidence }) {
  return `You are an independent reviewer for the Coin agent pack, a machine-readable guide to Coin design-system components for AI agents. Another agent read the designer guide below and extracted the entry below from it. You did not write the entry. Your job is to find where the entry misstates the guide.

An automated trace check has already confirmed that every quoted "from" sentence appears verbatim in the named guide section. It cannot tell whether the item reads the sentence correctly. That is your job.

Flag an item when it:
1. generalises-example: turns one example, fixture or illustration into a general rule.
2. lost-context: drops the context or condition that limits the source, especially around an absolute word (must, never, always, only, required), or applies it more widely than the source does.
3. stronger-than-source: reads stronger than its source. Strength "required" means a constraint everywhere; it needs a package fact or an absolute word whose context applies everywhere. "recommended" means follow unless asked otherwise; "discouraged" means avoid. Also flag wording such as "never" or "always" that the source does not use.
4. misreads-source: says something the cited text (or cited fact, or the evidence) does not support, or adds a claim about props, values, behaviour or components that nothing cited supports.

Do not flag: rewording that keeps the meaning; style; things the guide does not cover; facts read from the package types (not shown here, and not the extraction's work).
Check the evidence-based facts and gaps too (the /facts/... lines): they must say what the evidence file says, no more.

Answer with JSON only, no prose before or after:
{"flags":[{"field":"<the item's JSON pointer, exactly as listed>","kind":"${KINDS.join('|')}","reason":"One or two sentences, quoting the guide where it helps."}],"notes":"Anything a human reviewer should know, or an empty string."}
Return {"flags":[],"notes":""} if nothing is wrong.

=== GUIDE: ${snapshot.label} (rendered copy, by section) ===
${guideCopy(snapshot)}
=== EVIDENCE FILE (docs/evidence) ===
${evidence}
=== ENTRY: ${entry.id} (extracted items, by JSON pointer) ===
Summary: ${entry.summary}
${entryItems(entry)}

Facts cited by "from fact" items:
${citedFacts(entry)}
`
}

function runClaude(text) {
  const cwd = mkdtempSync(join(tmpdir(), 'coin-cross-check-'))
  const cli = ['-p', '--output-format', 'json', '--tools', '', '--setting-sources', '', '--strict-mcp-config', '--no-session-persistence']
  if (model) cli.push('--model', model)
  return new Promise((resolve, reject) => {
    const child = spawn('claude', cli, { cwd, stdio: ['pipe', 'pipe', 'pipe'] })
    let out = ''
    let err = ''
    child.stdout.on('data', (chunk) => { out += chunk })
    child.stderr.on('data', (chunk) => { err += chunk })
    child.on('close', (status) => {
      rmSync(cwd, { recursive: true, force: true })
      if (status !== 0) return reject(new Error(`claude exited ${status}: ${err || out}`))
      try {
        const result = JSON.parse(out)
        resolve({ text: result.result ?? '', model: result.modelUsage ? Object.keys(result.modelUsage).join(', ') : (model ?? 'default') })
      } catch (error) {
        reject(new Error(`unreadable claude output: ${error.message}\n${out.slice(0, 500)}`))
      }
    })
    child.stdin.end(text)
  })
}

function parseReview(text) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end < start) throw new Error(`no JSON in the reviewer's answer:\n${text.slice(0, 400)}`)
  const value = JSON.parse(text.slice(start, end + 1))
  if (!Array.isArray(value.flags)) throw new Error('the answer has no flags array')
  return value
}

const { entries, errors } = assemble({ only: slugs.length ? slugs : null })
if (errors.length) fail(`fix the build problems first:\n  ${errors.join('\n  ')}`)
// Undocumented entries have no guide to check against.
const chosen = entries.filter((record) => !record.undocumented)
if (!chosen.length) fail(`no pilot entry matches ${slugs.join(', ')}`)

const queue = [...chosen]
const concurrency = Number(args[args.indexOf('--concurrency') + 1]) || 5
async function review({ component, snapshot, entry }) {
  const evidence = showAt(snapshot.guideCommit, component.evidence)
  const text = prompt({ entry, snapshot, evidence })
  if (promptOnly) {
    await writeFile(join(PACK, `.cross-check-${component.slug}.prompt.txt`), text)
    console.log(`  wrote agent-pack/.cross-check-${component.slug}.prompt.txt`)
    return
  }
  const started = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
  const answer = await runClaude(text)
  const review = parseReview(answer.text)
  const flags = []
  for (const flag of review.flags) {
    const kind = KINDS.includes(flag.kind) ? flag.kind : 'misreads-source'
    flags.push({ field: flag.field, reason: `${kind}: ${norm(flag.reason)}` })
  }
  writeJson(join(PACK, 'cross-check', `${component.slug}.json`), {
    slug: component.slug,
    entryHash: entryHash(entry),
    guideCommit: snapshot.guideCommit,
    checkedAt: started,
    reviewer: { tool: 'claude -p (fresh session: no tools, no settings, empty folder)', model: answer.model },
    flags,
    notes: norm(review.notes ?? ''),
  })
  console.log(`  ${component.slug}: ${flags.length} flag${flags.length === 1 ? '' : 's'}`)
}
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (queue.length) await review(queue.shift())
}))
