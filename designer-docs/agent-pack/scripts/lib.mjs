// Shared helpers for the Coin agent pack scripts: paths, git, JSON, schema
// validation, and the text normalisation the trace check relies on.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

export const PACK = join(fileURLToPath(import.meta.url), '..', '..')
export const DOCS = join(PACK, '..')
export const PUBLIC_AGENT = join(DOCS, 'public', 'agent')
export const SCHEMAS = ['entry', 'manifest', 'index', 'releases', 'graph', 'sizes', 'pilot-results']

/** Guide section ids (`<section id>`) and the `from.section` name each maps to. */
export const SECTION_NAMES = {
  anatomy: 'anatomy',
  configuration: 'configuration',
  states: 'states',
  sizing: 'sizing',
  content: 'content',
  context: 'inContext',
  'dos-donts': 'doDont',
  sources: 'sources',
}

/**
 * Sections a `from.quote` may cite: the entry schema's list, plus the guide's
 * Sources note, whose body the extraction reads like any other section.
 */
export const CITABLE_SECTIONS = [
  'summary', 'corePrinciple', 'anatomy', 'configuration', 'states', 'sizing',
  'content', 'inContext', 'doDont', 'sources', 'evidence',
]

export const norm = (text) => String(text ?? '').replace(/\s+/g, ' ').trim()

export function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}

export function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n')
}

export function readJsonIfExists(file, fallback = null) {
  return existsSync(file) ? readJson(file) : fallback
}

export function git(args) {
  return execFileSync('git', args, { cwd: DOCS, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
}

export function loadPack() {
  return readJson(join(PACK, 'pack.json'))
}

/** Every file a component's guidance is read from: registration, page, evidence. */
export function guideSourceFiles(component) {
  return [...component.guideFiles, component.evidence]
}

/** The last commit that changed any of the component's guide files. */
export function guideCommitOf(component) {
  return git(['log', '-1', '--format=%H', '--', ...guideSourceFiles(component)]).trim()
}

/** Guide files with uncommitted changes (a snapshot must come from a commit). */
export function uncommittedGuideFiles(component) {
  return git(['status', '--porcelain', '--', ...guideSourceFiles(component)])
    .split('\n')
    .filter(Boolean)
}

/** A file's content at a commit; paths are relative to designer-docs/. */
export function showAt(commit, file) {
  return git(['show', `${commit}:./${file}`])
}

export function headCommit() {
  return git(['rev-parse', 'HEAD']).trim()
}

/** The installed jfs-components package: version, where it came from, upstream commit. */
export function packageInfo() {
  const installed = readJson(join(DOCS, 'node_modules/jfs-components/package.json'))
  const declared = readJson(join(DOCS, 'package.json')).dependencies['jfs-components']
  const lock = readJson(join(DOCS, 'package-lock.json')).packages['node_modules/jfs-components']
  const upstream = installed.coinUpstream
  const mirrorCommit = lock?.resolved?.split('#')[1] ?? 'unknown'
  return {
    name: installed.name,
    version: installed.version,
    declared,
    source:
      `${declared} (mirror commit ${mirrorCommit}` +
      (upstream ? `; built from ${upstream.repository}@${upstream.commit.slice(0, 7)}, ${upstream.date})` : ')'),
  }
}

let ajvInstance
export function schemaValidator() {
  if (!ajvInstance) {
    ajvInstance = new Ajv2020({ allErrors: true, strict: true })
    addFormats(ajvInstance)
    for (const name of SCHEMAS) {
      ajvInstance.addSchema(readJson(join(PACK, 'schema', `${name}.schema.json`)), name)
    }
  }
  return ajvInstance
}

/** Validates against a pack schema; returns readable error strings. */
export function validate(schema, data) {
  const ajv = schemaValidator()
  const check = ajv.getSchema(schema)
  if (check(data)) return []
  return check.errors.map((error) => `${error.instancePath || '/'} ${error.message}${
    error.params?.additionalProperty ? ` (${error.params.additionalProperty})` : ''}`)
}

/** RFC 6901 JSON pointer lookup. */
export function pointerGet(root, pointer) {
  if (pointer === '') return root
  if (!pointer.startsWith('/')) return undefined
  let node = root
  for (const raw of pointer.slice(1).split('/')) {
    const key = raw.replace(/~1/g, '/').replace(/~0/g, '~')
    if (node == null || typeof node !== 'object' || !(key in node)) return undefined
    node = node[key]
  }
  return node
}

export function fail(message) {
  console.error(`\n✗ ${message}`)
  process.exit(1)
}
