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
import { componentMarkdown, llmsText, rulesMarkdown } from './render.mjs'

const checkOnly = process.argv.includes('--check')
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

const { pkg, entries, errors } = assemble(builtAt ? { builtAt } : {})
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
  guideCommit: newestCommit(entries.map(({ entry }) => entry.status.guideCommit)),
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
const files = new Map([
  ['manifest.json', json(manifest)],
  ['index.json', json(index)],
  ['rules.md', rulesMarkdown({ packVersion, packageVersion: pkg.version, packageSource: pkg.source, entries: entries.map((record) => record.entry) })],
  ['llms.txt', llmsText({
    packVersion,
    packageVersion: pkg.version,
    entries: entries.map((record) => record.entry),
    otherComponents: componentExports().filter((name) => !pilotIds.has(name)),
  })],
])
for (const record of entries) {
  files.set(`components/${record.entry.slug}.json`, json(record.entry))
  files.set(`components/${record.entry.slug}.md`, componentMarkdown(record.entry, { packVersion, outsidePilot: record.outsidePilot }))
}
for (const name of SCHEMAS) {
  files.set(`schema/${name}.schema.json`, readFileSync(join(PACK, 'schema', `${name}.schema.json`), 'utf8'))
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
  console.log(`  ${entry.status.state === 'documented' ? '✓' : '⚑'} ${entry.slug.padEnd(12)} ${entry.status.state}${summary ? ` (${summary})` : ''}`)
}
const outside = [...new Set(entries.flatMap((record) => record.outsidePilot))]
if (outside.length) console.log(`  useInstead targets outside the pilot: ${outside.join(', ')}`)

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
