// The release steps of "Publish approved guides", talking to the DuetWorks board through its MCP
// with the DUETWORKS_BOARD_KEY secret (it may only read and update tickets). The workflow checks
// this file's SHA-256 before running it, so the reviewed workflow pins this exact script.
//
//   check <confirmation> <tickets>   the board confirms the batch is unchanged and names each approved commit
//   pick                             the commits to put on main: each ticket's, up to its approved commit
//   mark <main commit> <request>     marks exactly the checked tickets Live, at their checked versions
//
// Files live in RUNNER_TEMP: batch.json (from check, completed by pick) and commits (from pick).
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const env = process.env;
const temp = env.RUNNER_TEMP ?? ".";
const batchFile = join(temp, "batch.json");
const commitsFile = join(temp, "commits");

function fail(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const gitOk = (...args) => { try { execFileSync("git", args, { stdio: "ignore" }); return true; } catch { return false; } };

/** One MCP tool call to the board; a refusal ends the step with the board's own words. */
async function board(tool, args) {
  if (!env.DUETWORKS_MCP_URL || !env.DUETWORKS_BOARD_KEY) fail("DUETWORKS_MCP_URL and the DUETWORKS_BOARD_KEY secret are needed to talk to the board.");
  const response = await fetch(env.DUETWORKS_MCP_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${env.DUETWORKS_BOARD_KEY}`, "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: args } }),
  });
  const text = await response.text();
  const data = (response.headers.get("content-type") ?? "").includes("text/event-stream")
    ? text.split("\n").find((line) => line.startsWith("data:"))?.slice(5).trim() ?? ""
    : text;
  let message;
  try { message = JSON.parse(data); } catch { fail(`The board answered ${response.status} to ${tool}.`); }
  const payload = message?.result?.content?.find((part) => part.type === "text")?.text;
  let result;
  try { result = payload ? JSON.parse(payload) : null; } catch { result = null; }
  if (!response.ok || message.error || message.result?.isError || !result) fail(`The board refused ${tool}: ${result?.error ?? message?.error?.message ?? `HTTP ${response.status}`}`);
  return result;
}

async function check(confirmation, tickets) {
  const batch = await board("get_publish_batch", { confirmation });
  const refs = tickets.split(/\s+/).filter(Boolean);
  if (JSON.stringify(batch.tickets.map((ticket) => ticket.ref)) !== JSON.stringify(refs)) fail(`The board's batch (${batch.tickets.map((ticket) => ticket.ref).join(" ")}) isn't the one this run was started for (${refs.join(" ")}). Nothing was published.`);
  for (const ticket of batch.tickets) {
    if (ticket.repo !== env.GITHUB_REPOSITORY) fail(`${ticket.ref} was approved at a commit in ${ticket.repo}, not in this repository.`);
    if (!/^[0-9a-f]{40}$/.test(ticket.commit) || !/^#\d+$/.test(ticket.ref)) fail(`The board's record for ${ticket.ref} isn't valid.`);
  }
  writeFileSync(batchFile, JSON.stringify(batch, null, 2));
  console.log(`The board confirmed ${refs.join(" ")} (flow “${batch.flow.name}” v${batch.flow.version}).`);
}

function pick() {
  const batch = JSON.parse(readFileSync(batchFile, "utf8"));
  const chosen = new Set();
  for (const ticket of batch.tickets) {
    const line = `Ticket: ${ticket.ref}`;
    if (!gitOk("merge-base", "--is-ancestor", ticket.commit, "origin/docs-next")) fail(`The approved commit for ${ticket.ref} (${ticket.commit.slice(0, 7)}) isn't on docs-next.`);
    if (!git("log", "-1", "--format=%B", ticket.commit).split("\n").some((text) => text.trim() === line)) fail(`The approved commit for ${ticket.ref} (${ticket.commit.slice(0, 7)}) doesn't say "${line}".`);
    // The ticket's commits up to the approved one, leaving out changes main already has. Later commits wait for their own review.
    const own = git("log", "--format=%H", "--no-merges", "--cherry-pick", "--right-only", `--grep=^${line}$`, `origin/main...${ticket.commit}`).split("\n").filter(Boolean);
    if (!own.length) fail(`Nothing to publish for ${ticket.ref}: main already has its approved version.`);
    // A guide ticket never changes how releases run; the workflow and this script change only by review.
    for (const commit of own) {
      if (git("show", "--name-only", "--format=", commit).split("\n").some((file) => file.trim().startsWith(".github/"))) fail(`${ticket.ref}'s commit ${commit.slice(0, 7)} changes .github/, which a guide ticket can't publish.`);
    }
    own.forEach((commit) => chosen.add(commit));
    const guide = own.flatMap((commit) => git("show", "--name-only", "--format=", commit).split("\n"))
      .map((file) => /^designer-docs\/src\/guides\/([\w-]+)\.guide\.tsx$/.exec(file.trim())?.[1]).find(Boolean);
    ticket.url = guide ? `${env.DOCS_SITE_URL}/?component=${guide}` : `${env.DOCS_SITE_URL}/`;
  }
  // In docs-next order, so each cherry-pick lands on what it was written on.
  const ordered = git("rev-list", "--reverse", "origin/main..origin/docs-next").split("\n").filter((commit) => chosen.has(commit));
  if (ordered.length !== chosen.size) fail("Some approved commits aren't on docs-next. Nothing was published.");
  writeFileSync(commitsFile, ordered.join("\n"));
  writeFileSync(batchFile, JSON.stringify(batch, null, 2));
  console.log("Publishing:");
  for (const commit of ordered) console.log(`  ${git("log", "-1", "--format=%h %s", commit)}`);
}

async function mark(mainCommit, request) {
  const batch = JSON.parse(readFileSync(batchFile, "utf8"));
  if (!/^[0-9a-f]{40}$/.test(mainCommit)) fail("The published main commit isn't a full commit hash.");
  await board("mark_published", {
    tickets: batch.tickets.map((ticket) => ({ taskId: ticket.taskId, url: ticket.url, expectedVersion: ticket.version })),
    commit: mainCommit,
    idempotencyKey: `github-publish-${request}`,
  });
  for (const ticket of batch.tickets) console.log(`${ticket.ref} is live: ${ticket.url}`);
}

const [command, ...args] = process.argv.slice(2);
if (command === "check") await check(args[0] ?? "", args[1] ?? "");
else if (command === "pick") pick();
else if (command === "mark") await mark(args[0] ?? "", args[1] ?? "");
else fail(`Unknown step “${command}”.`);
