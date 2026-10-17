# Coin agent pack (pilot)

A versioned, machine-readable companion to the designer guides, for agents:
Flow Visualizer's assistant, Claude Code doing design-to-code, and review
agents. It is built here from the same guides and the installed
`jfs-components`, so an agent reads guidance that matches the package.

Release `0.1.78+1` covered six pilot components. Release `0.1.78+2` is a flow
kit for a short flow (for example a personal loan: offers, offer details,
apply, confirmation). It has 21 entries from designer guides and 9
`undocumented` entries for public primitives that have no guide (Screen,
Text, Title, Card, ListItem, ListGroup, Icon, Image, Divider): facts only,
guidance as hints.

## Where things are

| Path | What it is |
| --- | --- |
| `schema/` | The JSON schemas (entry, manifest, index, releases, graph, sizes, pilot-results v2). Shared with the site's Designer and Agent views; do not change them here alone. |
| `pack.json` | The components (export id, slug, category, guide files, evidence file; or `undocumented: true` with a checked Storybook link) and the release `revision`. |
| `copy/<slug>.json` | Generated: the copy each guide renders, by section, and the commit it was read at. |
| `guidance/<slug>.json` | Extracted: the guidance read from the guide, every item with the exact sentence it came from. For an undocumented entry: an optional summary taken verbatim from the component's JSDoc, an example, and any hints, each resting on a fact. The only hand-written input. |
| `cross-check/<slug>.json` | Generated: the independent cross-check of each entry, with the hash of the entry it reviewed. |
| `reviews/<slug>.json` | Optional, by people: flags to add, and cross-check flags to dismiss with a reason. |
| `pilot/questions.json` | The test questions and expected answers (draft until settled). |
| `pilot/run.mjs` | The test runner (four variants, token measurements). |
| `pilot/smoke.json` | An unscored measurement smoke test: proof that the token numbers work, not a result. |
| `scripts/` | The pipeline. |
| `../public/agent/<packVersion>/` | A release: `manifest.json`, `index.json`, `rules.md`, `llms.txt`, `graph.json`, `sizes.json`, `components/<slug>.json`, `.md`, `.brief.md` and `.links.md`, `schema/`. Never edited once committed. |
| `../public/agent/index.json` | The list of releases and the current one. |
| `../public/agent/pilot/results.json` | The last test run. |

## Commands (from `designer-docs/`)

```sh
npm run agent-pack:copy                  # snapshot the guides' rendered copy (after a guide changes)
npm run build:agent-pack -- --check      # assemble and check every entry; write nothing
npm run agent-pack:cross-check           # independent cross-check (claude -p), all or named slugs
npm run build:agent-pack                 # check, then write the release and the releases index
npm run agent-pack:pilot -- --dry-run    # show the test plan
npm run agent-pack:pilot                 # run the test (only once the answers are settled)
npm run agent-pack:pilot -- --smoke --only q01,q21   # unscored measurement smoke test (2 questions at most)
node agent-pack/scripts/show-facts.mjs <slug>        # the facts an extraction can name
npm run build:agent-pack -- --check --only <slug>    # check some entries while extracting
```

## Release outputs (contract v2)

- `components/<slug>.brief.md`: the short form, generated from the entry
  JSON (about 650–950 tokens for a guide entry). Summary; use when and avoid
  when (with `useInstead`); placement; key rules, required first, capped at
  eight; one example; props and modes at a glance; gaps; the state, and a
  pointer to the full entry. No quotes, flags or full facts.
- `components/<slug>.links.md`: the entry's neighbourhood in the graph, one
  triple per line, outgoing and incoming.
- `graph.json`: derived by code from the entries (`scripts/graph.mjs`):
  `useInstead` from avoidWhen; `placedIn` from placement rules that name an
  exact component export; `slotAccepts` from slots whose accepted type names
  a component export (none in 0.1.78: every node slot is `ReactNode`);
  `usedWith` from components in the same example. Each edge's `source`
  points into the from-component's entry.
- `sizes.json`: every release file, itself included, with bytes and tokens.
  No token-counting API key is available here, so tokens are estimated at
  chars/3.5 and marked `estimated: true`.

## Test variants

| Variant | The agent's folder holds |
| --- | --- |
| `none` | nothing |
| `full` | rules.md, index.json, components/*.md |
| `brief` | rules.md, index.json, components/*.brief.md, and components/*.md to open only when a brief does not answer |
| `graph` | rules.md, index.json, graph.json, components/*.links.md, components/*.brief.md |

Every run is a fresh `claude -p` session with the same model (default
`claude-sonnet-5-5`), `--output-format stream-json --verbose`, and only
Read, Grep and Glob. Tokens are summed over its model calls from the stream
events (an assistant message's usage, once per message id). `peakContext` is
the largest single call. `read` lists the pack files opened with Read, with
their tokens from `sizes.json`; `coin` is their sum, each file once (a Grep
over a file is not counted as reading it).

## How an entry is made

1. **Copy.** `agent-pack:copy` builds the site, opens each pilot guide at
   1280 px in headless Chrome, and records its copy section by section:
   summary, core principle, each section's title, description and text,
   anatomy parts, Do and Don't pairs, and the text inside the live examples.
   The guide files must be committed; the snapshot records the commit.
2. **Facts** (`scripts/facts.mjs`, source `types`). From the installed
   package's type declarations: each prop's type, allowed values, required,
   description, and the default its component source declares; slots and what
   each accepts (`allowedChildren`); events; and the mode collections the
   package's own metadata (`FIGMA_COMPONENT_MODES`, `FIGMA_MODES`) says the
   component reads, with each collection's default mode. Inherited React
   Native props are one fact each (`...ViewProps`). Fields of row types such
   as `BenefitCardItem` are facts named `BenefitCardItem.title`.
3. **Guidance** (`guidance/<slug>.json`). Read from the guide and its
   `docs/evidence/<slug>.md` by an agent. Every rule, anatomy part, state,
   pair and example carries `from`: the section and the exact sentence, or the
   fact it rests on (`"props:button"`, written into the entry as a JSON
   pointer). The file also adds `evidence` facts (with `checkedOn`) and
   `gaps`, each with its evidence quote. Nothing is invented: a section the
   guide does not cover stays empty and is flagged.
4. **Checks** (`scripts/assemble.mjs`, run by every build):
   - *Trace.* Every quote is in the named section of the rendered guide and
     in the guide's source files at the recorded commit (evidence quotes: in
     the evidence file at that commit). Fact pointers resolve.
   - *Strength.* A quote with *must, never, always, only* or *required*
     needs a recorded scope: `everywhere`, `contextual` or `ambiguous`.
     `required` needs a package fact, or an absolute word whose scope is
     `everywhere`. `ambiguous` is flagged and never `required`.
   - *Consistency.* Each entry is valid against the schema. Prop, mode and
     component names in guidance exist in the facts or the package exports;
     `target` and `value` match a real prop or mode and its values;
     `useInstead` names an export; every example type-checks against
     `jfs-components`.
   Any failure stops the build.
5. **Cross-check** (`agent-pack:cross-check`). A fresh `claude -p` session
   with no tools and no settings reads the guide's copy and evidence beside
   the entry, and flags items that generalise one example, lose the context of
   an absolute word, read stronger than their source, or misread it. Its flags
   enter `status.flags` with `by: "cross-check"` while the entry is unchanged;
   once the entry changes, the entry is flagged until the cross-check runs
   again.
6. **Release.** `build:agent-pack` writes `public/agent/<version>+<revision>/`.
   A committed release is never edited: if the build would change one, it
   stops; raise `revision` in `pack.json`.

## Flags and state

An entry is `flagged` while any flag remains, `documented` otherwise. Each flag
points at the item it concerns (`field`, a JSON pointer; empty means the whole
entry) and says who raised it:

- `trace-check`: the automated checks. An absolute word whose scope is
  ambiguous; evidence or a Sources note checked on another package version;
  a guidance section the guide leaves empty; an entry not cross-checked in
  its current form.
- `cross-check`: the independent reviewer.
- `human`: `reviews/<slug>.json`, `{ "flags": [{ "field", "reason" }] }`. The
  same file dismisses a cross-check flag that is wrong:
  `{ "dismissed": [{ "field", "reason", "by", "why" }] }`, where `field` and
  `reason` repeat the flag exactly.

## Reviewing a result (the loop)

1. Inspect a test result in `public/agent/pilot/results.json`: the answer, the
   expectations it missed, and the pack files the agent read (`read`).
2. Open what it read: the entry's Markdown or JSON in the release, and the
   item's `from` sentence in the guide.
3. Decide where the problem is:
   - **The guide** is wrong or unclear: fix the guide on `main` the usual
     way, then `npm run agent-pack:copy -- <slug>` and re-extract the
     changed sections in `guidance/<slug>.json`.
   - **The extraction** misread it: edit `guidance/<slug>.json`.
   - **The agent** ignored correct guidance: look at `rules.md` (in
     `scripts/render.mjs`) or the question.
4. Rerun what is affected: `npm run agent-pack:cross-check -- <slug>`, raise
   `revision` in `pack.json` if the release is committed,
   `npm run build:agent-pack`, then
   `npm run agent-pack:pilot -- --only <question ids>`.

## The pilot test

`pilot/questions.json` holds 30 questions (choose, configure, compose, spot a
gap): q01–q20 from the first round and q21–q30 for the flow kit, with
expected answers drafted from the documentation (the answers Coin allows, the
required constraints, and the recommendations, listed apart). Astra settles
them through the owner by setting `expected.settledBy` on each; the runner
refuses an official run until every question is settled. A full run is 30
questions × 4 variants, each graded by a fresh session: 240 sessions of plan
usage. `--only` and `--variants` rerun part of it; other questions keep their
last results when the pack version and model match.

## Decisions made in this POC

- **Sources notes are citable** (section `sources`): the guide's Sources body
  is part of the guide. When it names an older package version, items citing
  it are flagged like stale evidence.
- **`types` facts include declared defaults** read from the component's
  shipped source (`{ label = 'Button' }`), noted in each description.
- **anatomy `required`** means the part is always present (false for an
  optional prop or slot).
- **Exports without an entry** are listed in `llms.txt` as undocumented in
  this pack, so an agent does not mistake "not in the pilot" for "not in
  Coin". The index lists only entries.
- **Package version** comparisons for stale evidence use the version
  (`0.1.78`), not the build; the build is kept in `guidance/<slug>.json`.
