// Vercel function behind https://coin-designer-docs.vercel.app/mcp (see vercel.json).
// The server itself is agent-pack/mcp/server.mjs.
import { handleMcpHttp } from '../agent-pack/mcp/server.mjs'

export default async function handler(req, res) {
  await handleMcpHttp(req, res)
}
