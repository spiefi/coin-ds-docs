// Tests the Coin docs MCP server with the official MCP client, over HTTP, against
// the releases in public/agent/, read from their packs. Run from designer-docs/: npm run test:mcp
//   --serve [port]   keep a local server running instead (default port 8787), for
//                    trying it from an agent: claude mcp add --transport http coin-docs http://127.0.0.1:8787/mcp
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { handleMcpHttp } from './server.mjs'

const serveFlag = process.argv.indexOf('--serve')
const http = createServer((req, res) => {
  handleMcpHttp(req, res).catch((error) => {
    console.error(error)
    if (!res.headersSent) res.writeHead(500).end()
  })
})
await new Promise((resolve) => http.listen(serveFlag >= 0 ? Number(process.argv[serveFlag + 1] ?? 8787) : 0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${http.address().port}/mcp`

if (serveFlag >= 0) {
  console.log(`Coin docs MCP server on ${base} (add ?coin=<version> or ?release=<id>). Ctrl-C stops it.`)
} else {
  try {
    await run()
    console.log('Coin docs MCP server: all checks passed.')
  } finally {
    http.close()
  }
}

async function connect(query = '') {
  const client = new Client({ name: 'coin-docs-test', version: '1.0.0' })
  await client.connect(new StreamableHTTPClientTransport(new URL(`${base}${query}`)))
  return client
}

function textOf(result) {
  return result.content.map((part) => part.text).join('\n')
}

async function run() {
  const releases = JSON.parse(await (await import('node:fs/promises')).readFile(new URL('../../public/agent/index.json', import.meta.url), 'utf8'))
  const current = releases.current
  const coinVersion = current.split('+')[0]

  const client = await connect(`?coin=${coinVersion}`)
  assert.equal(client.getServerVersion()?.name, 'coin-docs')
  assert.match(client.getInstructions() ?? '', new RegExp(`Coin agent pack ${current.replace('+', '\\+')}`), 'instructions name the newest release for that Coin version')

  const { tools } = await client.listTools()
  assert.deepEqual(tools.map(({ name }) => name).sort(), ['briefs', 'components', 'entry', 'links', 'releases', 'rules'])
  assert.ok(tools.every((tool) => tool.annotations?.readOnlyHint === true), 'every tool is read-only')

  assert.match(textOf(await client.callTool({ name: 'rules', arguments: {} })), /^# Coin agent pack: rules for agents/)

  const index = JSON.parse(textOf(await client.callTool({ name: 'components', arguments: {} })))
  assert.equal(index.packVersion, current)
  assert.ok(index.components.some(({ id }) => id === 'AppBar'))

  const briefs = textOf(await client.callTool({ name: 'briefs', arguments: { components: ['AppBar', 'benefit card', 'appbar', 'NoSuchThing'] } }))
  assert.equal(briefs.match(/^# AppBar \(brief\)/gm)?.length, 1, 'a component asked for twice comes back once')
  assert.match(briefs, /^# BenefitCard \(brief\)/m, 'names match regardless of case and spaces')
  assert.match(briefs, /No entry in .* for: NoSuchThing\./)

  const entry = JSON.parse(textOf(await client.callTool({ name: 'entry', arguments: { component: 'AppBar', format: 'json' } })))
  assert.equal(entry.id, 'AppBar')
  assert.match(textOf(await client.callTool({ name: 'entry', arguments: { component: 'Button' } })), /^# Button/m)
  const missing = await client.callTool({ name: 'entry', arguments: { component: 'NoSuchThing' } })
  assert.equal(missing.isError, true)

  assert.match(textOf(await client.callTool({ name: 'links', arguments: { components: ['AppBar'] } })), /AppBar —usedWith→ IconButton/)

  const served = JSON.parse(textOf(await client.callTool({ name: 'releases', arguments: {} })))
  assert.equal(served.releases.find(({ served }) => served)?.release, current)

  await assert.rejects(client.callTool({ name: 'briefs', arguments: { components: [] } }), /components/)
  await assert.rejects(client.callTool({ name: 'no-such-tool', arguments: {} }), /Unknown tool/)
  await client.close()

  // An exact older release is served as it is: contract v1 had no briefs.
  if (releases.releases.includes('0.1.78+1')) {
    const old = await connect('?release=0.1.78%2B1')
    assert.match(old.getInstructions() ?? '', /0\.1\.78\+1/)
    assert.match(textOf(await old.callTool({ name: 'briefs', arguments: { components: ['Button'] } })), /has no brief for: Button\. Use the entry tool\./)
    await old.close()
  }

  // The default is the current release.
  const fallback = await connect()
  assert.match(fallback.getInstructions() ?? '', new RegExp(current.replace('+', '\\+')))
  await fallback.close()

  // A release that does not exist fails at connection, loudly.
  for (const query of ['?coin=9.9.9', '?release=0.0.0%2B1', '?release=..%2F..%2Fpackage.json']) {
    const response = await fetch(`${base}${query}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' })
    })
    assert.equal(response.status, 404, query)
  }
  assert.equal((await fetch(base)).status, 405, 'GET is not offered')
}
