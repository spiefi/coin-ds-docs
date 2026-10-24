#!/usr/bin/env node
// npm run build:agent-pack — assembles and checks every pilot entry, then
// writes the release to public/agent/<packVersion>/ and updates
// public/agent/index.json. packVersion is <jfs-components version>+<revision>
// (revision in agent-pack/pack.json).
//
// A committed release is never edited. If the release folder is tracked by git
// and the build would change it, the build stops: raise the revision in
// agent-pack/pack.json to make a new release. An uncommitted release folder is
// rewritten freely.
//
//   npm run build:agent-pack             # check, then write the release
//   npm run build:agent-pack -- --check  # check only; write nothing

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { assemble } from './assemble.mjs'
import { componentExports } from './facts.mjs'
import { PACK, PUBLIC_AGENT, SCHEMAS, git, readJsonIfExists, validate } from './lib.mjs'
import { briefMarkdown, componentMarkdown, linksMarkdown, llmsText, rulesMarkdown } from './render.mjs'
import { buildGraph, triple } from './graph.mjs'

const checkOnly = process.argv.includes('--check')
// --only <slug,slug>: check just those entries (with --check); a release needs every entry.
const onlyIndex = process.argv.indexOf('--only')
const only = onlyIndex >= 0 ? process.argv[onlyIndex + 1].split(',') : null
if (only && !checkOnly) {
  console.error('--only works with --check: a release is built from every entry.')
  process.exit(1)
}
const json = (value) => JSON.stringify(value, null, 2) + '\n'

function listFiles(dir, base = dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? listFiles(join(dir, item.name), base) : [relative(base, join(dir, item.name))])
}

function newestCommit(commits) {
  return [...new Set(commits)]
    .map((commit) => ({ commit, time: Number(git(['log', '-1', '--format=%ct', commit]).trim()) }))
    .sort((a, b) => b.time - a.time)[0].commit
}

function compareVersions(a, b) {
  const parse = (version) => version.split(/[.+]/).map(Number)
  const [x, y] = [parse(a), parse(b)]
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0)
  }
  return 0
}

const pack0 = readJsonIfExists(join(PACK, 'pack.json'))
const pkgVersion = JSON.parse(readFileSync(join(PACK, '..', 'node_modules/jfs-components/package.json'), 'utf8')).version
const packVersion = `${pkgVersion}+${pack0.revision}`
const releaseDir = join(PUBLIC_AGENT, packVersion)
const releasePath = relative(join(PACK, '..'), releaseDir)
const committed = git(['ls-files', '--', releasePath]).trim().length > 0
// Re-render a committed release with its own build time, so an unchanged
// release compares equal byte for byte.
const existingManifest = readJsonIfExists(join(releaseDir, 'manifest.json'))
const builtAt = committed && existingManifest ? existingManifest.builtAt : undefined

const { pkg, entries, errors } = assemble({ ...(builtAt ? { builtAt } : {}), only })
if (only) {
  for (const message of errors) console.error(`  - ${message}`)
  for (const { entry } of entries) {
    console.log(`  ${entry.slug}: ${entry.status.state}; ${entry.status.flags.length} flags`)
    for (const flag of entry.status.flags) console.log(`      ${flag.by} ${flag.field || '(entry)'}: ${flag.reason}`)
  }
  console.log(errors.length ? `\n✗ ${errors.length} problems` : '\n✓ the named entries pass the checks')
  process.exit(errors.length ? 1 : 0)
}
if (errors.length) {
  console.error(`✗ ${errors.length} problem${errors.length === 1 ? '' : 's'}; nothing written.\n`)
  for (const message of errors) console.error(`  - ${message}`)
  process.exit(1)
}

const built = entries[0].entry.status.builtAt
const counts = { documented: 0, flagged: 0, undocumented: 0, unsupported: 0 }
for (const { entry } of entries) counts[entry.status.state] += 1
const manifest = {
  schemaVersion: 1,
  packVersion,
  packageVersion: pkg.version,
  packageSource: pkg.source,
  guideCommit: newestCommit(entries.map(({ entry }) => entry.status.guideCommit).filter(Boolean)),
  builtAt: built,
  components: entries.length,
  counts,
}
const index = {
  schemaVersion: 1,
  packVersion,
  components: entries.map(({ entry }) => ({
    id: entry.id,
    slug: entry.slug,
    category: entry.category,
    tags: entry.tags,
    state: entry.status.state,
    summary: entry.summary,
    useInstead: [...new Set(entry.avoidWhen.map((rule) => rule.useInstead).filter(Boolean))],
  })),
}
const problems = [...validate('manifest', manifest).map((p) => `manifest: ${p}`), ...validate('index', index).map((p) => `index: ${p}`)]
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}

const pilotIds = new Set(entries.map(({ entry }) => entry.id))
const components = componentExports()
const allEntries = entries.map((record) => record.entry)
const graph = buildGraph({ packVersion, entries: allEntries, componentNames: components })
const files = new Map([
  ['manifest.json', json(manifest)],
  ['index.json', json(index)],
  ['rules.md', rulesMarkdown({
    packVersion,
    packageVersion: pkg.version,
    packageSource: pkg.source,
    entries: allEntries,
    otherComponents: components.filter((name) => !pilotIds.has(name)),
    building: readFileSync(join(PACK, 'building.md'), 'utf8'),
  })],
  ['llms.txt', llmsText({ packVersion, packageVersion: pkg.version, entries: allEntries })],
  ['graph.json', json(graph)],
])
for (const record of entries) {
  const { entry } = record
  files.set(`components/${entry.slug}.json`, json(entry))
  files.set(`components/${entry.slug}.md`, componentMarkdown(entry, { packVersion, outsidePilot: record.outsidePilot }))
  files.set(`components/${entry.slug}.brief.md`, briefMarkdown(entry, { packVersion }))
  files.set(`components/${entry.slug}.links.md`, linksMarkdown(entry, graph, { packVersion, triple }))
}
for (const name of SCHEMAS) {
  files.set(`schema/${name}.schema.json`, readFileSync(join(PACK, 'schema', `${name}.schema.json`), 'utf8'))
}

// sizes.json lists every release file, itself included: settle its own size by iterating.
const TOKENIZER = 'estimate: chars/3.5'
const tokensOf = (text) => Math.ceil([...text].length / 3.5)
const sizeRow = (path, text) => ({ path, bytes: Buffer.byteLength(text, 'utf8'), tokens: tokensOf(text), estimated: true })
let sizesText = ''
for (let round = 0; round < 5; round++) {
  const rows = [...files].map(([path, text]) => sizeRow(path, text))
  rows.push(sizeRow('sizes.json', sizesText))
  rows.sort((a, b) => a.path.localeCompare(b.path))
  const next = json({ schemaVersion: 1, packVersion, tokenizer: TOKENIZER, files: rows })
  if (next === sizesText) break
  sizesText = next
}
const sizes = JSON.parse(sizesText)
files.set('sizes.json', sizesText)
for (const [schema, value] of [['graph', graph], ['sizes', sizes]]) {
  const found = validate(schema, value)
  if (found.length) {
    console.error(`${schema}: ${found.join('; ')}`)
    process.exit(1)
  }
}

// Immutability.
const existing = listFiles(releaseDir)
const same = existing.length === files.size &&
  [...files].every(([path, content]) => existsSync(join(releaseDir, path)) && readFileSync(join(releaseDir, path), 'utf8') === content)
if (committed && !same) {
  const changed = [...files.keys()].filter((path) => !existsSync(join(releaseDir, path)) || readFileSync(join(releaseDir, path), 'utf8') !== files.get(path))
  console.error(`✗ Release ${packVersion} is committed and never edited, but this build changes ${changed.join(', ') || 'its file list'}.\n  Raise "revision" in agent-pack/pack.json to make a new release.`)
  process.exit(1)
}

// The releases index.
const releasesFile = join(PUBLIC_AGENT, 'index.json')
const releases = readJsonIfExists(releasesFile, { schemaVersion: 1, current: packVersion, releases: [] })
const list = [...new Set([...releases.releases, packVersion])].sort(compareVersions)
const nextReleases = { schemaVersion: 1, current: list[list.length - 1], releases: list }
for (const problem of validate('releases', nextReleases)) {
  console.error(`releases index: ${problem}`)
  process.exit(1)
}

for (const { entry } of entries) {
  const kinds = entry.status.flags.reduce((acc, flag) => ({ ...acc, [flag.by]: (acc[flag.by] ?? 0) + 1 }), {})
  const summary = Object.entries(kinds).map(([by, n]) => `${n} ${by}`).join(', ')
  console.log(`  ${entry.status.state === 'documented' ? '✓' : entry.status.state === 'undocumented' ? '·' : '⚑'} ${entry.slug.padEnd(12)} ${entry.status.state}${summary ? ` (${summary})` : ''}`)
}
const outside = [...new Set(entries.flatMap((record) => record.outsidePilot))]
if (outside.length) console.log(`  useInstead targets outside the pilot: ${outside.join(', ')}`)

const tokens = (path) => sizes.files.find((row) => row.path === path)?.tokens ?? 0
const median = (list) => { const sorted = [...list].sort((a, b) => a - b); return sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : 0 }
const perEntry = (suffix) => entries.map(({ entry }) => tokens(`components/${entry.slug}${suffix}`))
console.log(`  graph: ${graph.nodes.length} nodes, ${graph.edges.length} edges`)
console.log(`  tokens (${TOKENIZER}): menu rules.md + index.json ${tokens('rules.md') + tokens('index.json')}; per component median full ${median(perEntry('.md'))}, brief ${median(perEntry('.brief.md'))}, links ${median(perEntry('.links.md'))}`)

if (checkOnly) {
  console.log(`\n✓ ${entries.length} entries pass the checks (release ${packVersion} ${same ? 'is up to date' : 'would change'}).`)
  process.exit(0)
}
if (same) {
  console.log(`\n✓ Release ${packVersion} is up to date.`)
} else {
  rmSync(releaseDir, { recursive: true, force: true })
  for (const [path, content] of files) {
    mkdirSync(dirname(join(releaseDir, path)), { recursive: true })
    writeFileSync(join(releaseDir, path), content)
  }
  console.log(`\n✓ Wrote release ${packVersion} (${files.size} files) to ${releasePath}/`)
}
if (JSON.stringify(nextReleases) !== JSON.stringify(readJsonIfExists(releasesFile))) {
  writeFileSync(releasesFile, json(nextReleases))
  console.log(`✓ public/agent/index.json: current ${nextReleases.current}`)
}
