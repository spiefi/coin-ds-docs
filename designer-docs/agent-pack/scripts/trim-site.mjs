#!/usr/bin/env node
// Runs after vite build (npm run build): the site keeps only the current
// release under dist/agent/. Every release stays committed in public/agent/,
// and agents read older ones through the MCP server, from its packs
// (agent-pack/scripts/packs.mjs). Copying every release made the deployment
// pass Vercel's 15,000-file limit.
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST_AGENT = fileURLToPath(new URL('../../dist/agent/', import.meta.url))
const indexFile = join(DIST_AGENT, 'index.json')
if (existsSync(indexFile)) {
  const { current, releases } = JSON.parse(readFileSync(indexFile, 'utf8'))
  const older = releases.filter((release) => release !== current)
  for (const release of older) rmSync(join(DIST_AGENT, release), { recursive: true, force: true })
  console.log(`✓ dist/agent/: the current release ${current}; ${older.length} older ones are served by the MCP server only`)
}
