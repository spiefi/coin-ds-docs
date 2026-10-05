// Marks the published tickets Live on the DuetWorks board, each with its guide's live link, through
// the board's MCP (mark_published). The board key may only update tickets.
// Usage: node .github/scripts/mark-published.mjs <file of published docs-next commits> "<#57 #61>" <main commit>
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const [commitsFile, tickets, mainCommit] = process.argv.slice(2);
const { DOCS_SITE_URL: site, DUETWORKS_MCP_URL: endpoint, DUETWORKS_BOARD_KEY: key, GITHUB_RUN_ID: runId = "local" } = process.env;
if (!site || !endpoint || !key) {
  console.error("::error::DOCS_SITE_URL, DUETWORKS_MCP_URL and the DUETWORKS_BOARD_KEY secret are needed to mark the tickets live.");
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const commits = readFileSync(commitsFile, "utf8").split(/\s+/).filter(Boolean);

// Each ticket's live link is its guide's page; a ticket that changed no guide links the site.
const published = tickets.split(/\s+/).filter(Boolean).map((ref) => {
  const own = commits.filter((commit) => git("log", "-1", "--format=%B", commit).split("\n").some((line) => line.trim() === `Ticket: ${ref}`));
  const guide = own.flatMap((commit) => git("show", "--name-only", "--format=", commit).split("\n"))
    .map((file) => /^designer-docs\/src\/guides\/([\w-]+)\.guide\.tsx$/.exec(file.trim())?.[1])
    .find(Boolean);
  return { taskId: ref, url: guide ? `${site}/?component=${guide}` : `${site}/` };
});

const response = await fetch(endpoint, {
  method: "POST",
  headers: { authorization: `Bearer ${key}`, "content-type": "application/json", accept: "application/json, text/event-stream" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1, method: "tools/call",
    params: { name: "mark_published", arguments: { tickets: published, commit: mainCommit, idempotencyKey: `github-publish-${runId}` } },
  }),
});
const text = await response.text();
const data = (response.headers.get("content-type") ?? "").includes("text/event-stream")
  ? text.split("\n").find((line) => line.startsWith("data:"))?.slice(5).trim() ?? ""
  : text;
let result;
try { result = JSON.parse(data); } catch { /* reported below */ }
if (!response.ok || !result || result.error || result.result?.isError) {
  const reason = result?.error?.message ?? result?.result?.content?.map((part) => part.text).join(" ") ?? `HTTP ${response.status}`;
  console.error(`::error::The board didn't mark the tickets live: ${reason}`);
  process.exit(1);
}
for (const ticket of published) console.log(`${ticket.taskId} is live: ${ticket.url}`);
