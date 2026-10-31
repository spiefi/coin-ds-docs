#!/usr/bin/env node
// npm run agent-pack:packs — packs every release in public/agent/ into one
// gzipped file for the MCP server: agent-pack/packs/<release>.json.gz, beside a
// copy of public/agent/index.json.
//
// The server's Vercel function used to carry every file of every release, and
// so did the site: two full copies per release, past Vercel's 15,000-file limit
// for one deployment. Now the function carries one pack per release and the
// site only the current release (agent-pack/scripts/trim-site.mjs).
//
// Packs are made from the committed releases and are not committed themselves:
// on install (postinstall), so they are there whenever Vercel traces the
// function's files, and again by build:agent-pack and test:mcp. The trace finds
// them from server.mjs's reads; an includeFiles entry for them in vercel.json
// kept them out. Only Node built-ins here: this runs inside npm install.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const PUBLIC_AGENT = fileURLToPath(new URL('../../public/agent/', import.meta.url))
export const PACKS = fileURLToPath(new URL('../packs/', import.meta.url))

function listFiles(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) =>
    item.isDirectory() ? listFiles(join(dir, item.name), base) : [relative(base, join(dir, item.name)).split(sep).join('/')])
}

/** Writes a pack for every listed release and removes packs of releases no longer listed. */
export function writePacks() {
  const indexFile = join(PUBLIC_AGENT, 'index.json')
  if (!existsSync(indexFile)) return null
  const index = readFileSync(indexFile, 'utf8')
  const { releases } = JSON.parse(index)
  mkdirSync(PACKS, { recursive: true })
  let bytes = 0
  for (const release of releases) {
    const dir = join(PUBLIC_AGENT, release)
    const files = Object.fromEntries(listFiles(dir).sort().map((path) => [path, readFileSync(join(dir, path), 'utf8')]))
    const packed = gzipSync(JSON.stringify({ schemaVersion: 1, release, files }))
    writeFileSync(join(PACKS, `${release}.json.gz`), packed)
    bytes += packed.length
  }
  writeFileSync(join(PACKS, 'index.json'), index)
  const wanted = new Set([...releases.map((release) => `${release}.json.gz`), 'index.json'])
  for (const name of readdirSync(PACKS)) if (!wanted.has(name)) rmSync(join(PACKS, name), { recursive: true, force: true })
  return { releases: releases.length, bytes }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const packed = writePacks()
  if (packed) console.log(`✓ Packed ${packed.releases} releases for the MCP server: agent-pack/packs/ (${(packed.bytes / 1e6).toFixed(1)} MB)`)
}
