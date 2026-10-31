// The Coin docs MCP server: a read-only view of the published agent pack.
//
// It serves the immutable releases in public/agent/ over MCP (Streamable HTTP,
// stateless, JSON responses), so Flow Visualizer and any other agent read Coin
// guidance from one place instead of keeping copies. The URL picks the release:
//   /mcp                    the current release
//   /mcp?coin=0.1.78        the newest release for that jfs-components version
//   /mcp?release=0.1.78+2   exactly that release
// It reads each release from its pack, agent-pack/packs/<release>.json.gz (see
// agent-pack/scripts/packs.mjs), so the Vercel function carries one file per
// release. Tool inputs never reach a file path: component names resolve through
// the release's index.json, and release ids must be listed in public/agent/index.json.
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { gunzipSync } from 'node:zlib'
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError } from '@modelcontextprotocol/sdk/types.js'

export const SERVER_NAME = 'coin-docs'
const SERVER_VERSION = '1.0.0'
const MAX_COMPONENTS_PER_CALL = 30
const PACKS_ROOT = fileURLToPath(new URL('../packs/', import.meta.url))
const PACKS_KEPT = 3

export class NotFound extends Error {}

// A pack unpacks to a whole release (about 5 MB), so only the few most recently used stay unpacked.
const packCache = new Map()
function packFiles(release) {
  let pending = packCache.get(release)
  if (pending) {
    packCache.delete(release)
  } else {
    pending = readFile(join(PACKS_ROOT, `${release}.json.gz`)).then((data) => JSON.parse(gunzipSync(data).toString('utf8')).files)
    pending.catch(() => packCache.delete(release))
  }
  packCache.set(release, pending)
  while (packCache.size > PACKS_KEPT) packCache.delete(packCache.keys().next().value)
  return pending
}

/** `index.json` is the releases index; any other path is `<release>/<file in that release>`. */
async function readPacked(path) {
  if (path === 'index.json') return readFile(join(PACKS_ROOT, 'index.json'), 'utf8')
  const slash = path.indexOf('/')
  const files = await packFiles(path.slice(0, slash))
  const text = files[path.slice(slash + 1)]
  if (typeof text !== 'string') throw Object.assign(new Error(`${path} is not in the release`), { code: 'ENOENT' })
  return text
}

// Releases never change once committed, so files can stay cached for the life of the process.
const fileCache = new Map()
function readText(path) {
  if (!fileCache.has(path)) {
    const pending = readPacked(path)
    pending.catch(() => fileCache.delete(path))
    fileCache.set(path, pending)
  }
  return fileCache.get(path)
}
const readJson = async (path) => JSON.parse(await readText(path))
async function readOptional(path) {
  try {
    return await readText(path)
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

const revision = (release) => Number(release.split('+')[1] ?? 0)

/** Picks the release a connection serves from the URL's `release` or `coin` parameter. */
export async function resolveRelease(searchParams) {
  const releases = await readJson('index.json')
  const exact = searchParams.get('release')
  const coin = searchParams.get('coin')
  if (exact) {
    if (!releases.releases.includes(exact)) throw new NotFound(`Release ${exact} is not published. Published: ${releases.releases.join(', ')}.`)
    return exact
  }
  if (coin) {
    const matching = []
    for (const release of releases.releases) {
      const manifest = await readJson(`${release}/manifest.json`)
      if (manifest.packageVersion === coin) matching.push(release)
    }
    if (matching.length === 0) throw new NotFound(`No release describes jfs-components ${coin}. Published: ${releases.releases.join(', ')}.`)
    return matching.sort((a, b) => revision(b) - revision(a))[0]
  }
  return releases.current
}

async function loadRelease(release) {
  const [manifest, index, rules] = await Promise.all([
    readJson(`${release}/manifest.json`),
    readJson(`${release}/index.json`),
    readText(`${release}/rules.md`)
  ])
  return { id: release, manifest, index, rules }
}

const normalise = (name) => String(name).toLowerCase().replace(/[^a-z0-9]/g, '')

/** Resolves names such as "BenefitCard", "benefitcard" or "Benefit Card" to index entries; unknown names are returned apart. */
function resolveComponents(release, names) {
  const bySlug = new Map()
  for (const entry of release.index.components) {
    bySlug.set(normalise(entry.slug), entry)
    bySlug.set(normalise(entry.id), entry)
  }
  const found = []
  const unknown = []
  for (const name of names) {
    const entry = bySlug.get(normalise(name))
    if (!entry) unknown.push(String(name))
    else if (!found.includes(entry)) found.push(entry)
  }
  return { found, unknown }
}

function unknownNote(release, unknown) {
  if (unknown.length === 0) return ''
  return `\n\nNo entry in ${release.id} for: ${unknown.join(', ')}. The components tool lists every entry; rules lists the exports this pack does not cover.`
}

function componentList(args) {
  const raw = args?.components
  const names = typeof raw === 'string' ? [raw] : raw
  if (!Array.isArray(names) || names.length === 0 || names.some((name) => typeof name !== 'string' || !name.trim())) {
    throw new McpError(ErrorCode.InvalidParams, '`components` must be a list of component names, for example ["AppBar", "Button"].')
  }
  if (names.length > MAX_COMPONENTS_PER_CALL) throw new McpError(ErrorCode.InvalidParams, `At most ${MAX_COMPONENTS_PER_CALL} components per call.`)
  return names
}

const text = (value) => ({ content: [{ type: 'text', text: value }] })
const componentsInput = {
  type: 'object',
  properties: {
    components: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      maxItems: MAX_COMPONENTS_PER_CALL,
      description: 'Component names as in the components list, for example ["AppBar", "Button"].'
    }
  },
  required: ['components'],
  additionalProperties: false
}
const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

const TOOLS = [
  {
    name: 'rules',
    description: 'How agents use Coin and this pack, and the Coin exports it does not cover. Read once, first.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { title: 'Coin rules', ...readOnly },
    run: async (release) => text(release.rules)
  },
  {
    name: 'components',
    description: 'Every Coin component in this release as JSON: id, slug, category, tags, state, one-line summary and useInstead.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { title: 'Coin components', ...readOnly },
    run: async (release) => text(JSON.stringify(release.index))
  },
  {
    name: 'briefs',
    description: 'Short briefs (about 700 tokens each) for one or more components: when to use, placement, key rules, an example, props and modes. Ask for every component you plan to use in one call.',
    inputSchema: componentsInput,
    annotations: { title: 'Coin component briefs', ...readOnly },
    run: async (release, args) => {
      const { found, unknown } = resolveComponents(release, componentList(args))
      const parts = []
      const missing = []
      for (const entry of found) {
        const brief = await readOptional(`${release.id}/components/${entry.slug}.brief.md`)
        if (brief) parts.push(brief.trim())
        else missing.push(entry.id)
      }
      const noBriefs = missing.length ? `\n\nRelease ${release.id} has no brief for: ${missing.join(', ')}. Use the entry tool.` : ''
      return text(parts.join('\n\n---\n\n') + noBriefs + unknownNote(release, unknown))
    }
  },
  {
    name: 'entry',
    description: 'One component’s full entry: every fact, rule, source quote, flag and gap. Use only when its brief does not answer.',
    inputSchema: {
      type: 'object',
      properties: {
        component: { type: 'string', description: 'A component name, for example "AppBar".' },
        format: { type: 'string', enum: ['markdown', 'json'], description: 'markdown (default) or the entry JSON.' }
      },
      required: ['component'],
      additionalProperties: false
    },
    annotations: { title: 'Coin component entry', ...readOnly },
    run: async (release, args) => {
      if (typeof args?.component !== 'string' || !args.component.trim()) throw new McpError(ErrorCode.InvalidParams, '`component` must be a component name.')
      const format = args.format ?? 'markdown'
      if (format !== 'markdown' && format !== 'json') throw new McpError(ErrorCode.InvalidParams, '`format` must be markdown or json.')
      const { found, unknown } = resolveComponents(release, [args.component])
      if (found.length === 0) return { ...text(unknownNote(release, unknown).trim()), isError: true }
      return text(await readText(`${release.id}/components/${found[0].slug}.${format === 'json' ? 'json' : 'md'}`))
    }
  },
  {
    name: 'links',
    description: 'How one or more components relate to others (useInstead, placedIn, slotAccepts, usedWith), one edge per line.',
    inputSchema: componentsInput,
    annotations: { title: 'Coin component links', ...readOnly },
    run: async (release, args) => {
      const { found, unknown } = resolveComponents(release, componentList(args))
      const parts = []
      const missing = []
      for (const entry of found) {
        const links = await readOptional(`${release.id}/components/${entry.slug}.links.md`)
        if (links) parts.push(links.trim())
        else missing.push(entry.id)
      }
      const noLinks = missing.length ? `\n\nRelease ${release.id} has no links for: ${missing.join(', ')}.` : ''
      return text(parts.join('\n\n---\n\n') + noLinks + unknownNote(release, unknown))
    }
  },
  {
    name: 'releases',
    description: 'The published pack releases, the jfs-components version each describes, and which one this connection serves.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: { title: 'Coin pack releases', ...readOnly },
    run: async (release) => {
      const releases = await readJson('index.json')
      const rows = []
      for (const id of releases.releases) {
        const manifest = await readJson(`${id}/manifest.json`)
        rows.push({
          release: id,
          packageVersion: manifest.packageVersion,
          packageSource: manifest.packageSource,
          builtAt: manifest.builtAt,
          counts: manifest.counts,
          current: id === releases.current,
          served: id === release.id
        })
      }
      return text(JSON.stringify({ releases: rows }))
    }
  }
]

function instructionsFor(release) {
  return [
    `Coin agent pack ${release.id}, for jfs-components ${release.manifest.packageVersion} only.`,
    'Read rules first, unless your app already gave them to you. Pick components from components, then call briefs once with every component you plan to use. Call entry only when a brief does not answer.',
    'Paths in the pack map to tools: components/<slug>.brief.md is briefs, components/<slug>.md is entry, components/<slug>.links.md is links.'
  ].join('\n')
}

function createServer(release) {
  const server = new Server({ name: SERVER_NAME, version: SERVER_VERSION }, { capabilities: { tools: {} }, instructions: instructionsFor(release) })
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS.map(({ run, ...tool }) => tool)
  }))
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = TOOLS.find(({ name }) => name === request.params.name)
    if (!tool) throw new McpError(ErrorCode.MethodNotFound, `Unknown tool ${request.params.name}.`)
    const args = request.params.arguments ?? {}
    // What each agent read, in the deployment's runtime logs.
    if (process.env.VERCEL) console.log(JSON.stringify({ mcp: SERVER_NAME, tool: tool.name, release: release.id, components: args.components ?? args.component ?? null }))
    return tool.run(release, args)
  })
  return server
}

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers })
  res.end(JSON.stringify(body))
}

async function readBody(req) {
  if (req.body !== undefined) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : undefined
}

/** Handles one HTTP request to /mcp (Node request and response, as on Vercel or node:http). */
export async function handleMcpHttp(req, res) {
  const url = new URL(req.url ?? '/', 'http://localhost')
  if (req.method !== 'POST') {
    sendJson(res, 405, {
      error: 'The Coin docs MCP server takes MCP requests over POST only.',
      add: `claude mcp add --transport http ${SERVER_NAME} https://coin-designer-docs.vercel.app/mcp`
    }, { Allow: 'POST' })
    return
  }
  let release
  try {
    release = await loadRelease(await resolveRelease(url.searchParams))
  } catch (error) {
    if (error instanceof NotFound) return sendJson(res, 404, { error: error.message })
    throw error
  }
  let body
  try {
    body = await readBody(req)
  } catch {
    return sendJson(res, 400, { jsonrpc: '2.0', error: { code: ErrorCode.ParseError, message: 'The request body is not JSON.' }, id: null })
  }
  const server = createServer(release)
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true })
  res.on('close', () => {
    transport.close()
    server.close()
  })
  await server.connect(transport)
  await transport.handleRequest(req, res, body)
}
