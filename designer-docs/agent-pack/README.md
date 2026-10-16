# Coin agent pack (pilot)

A versioned, machine-readable companion to the designer guides, for agents:
Flow Visualizer's assistant, Claude Code doing design-to-code, and review
agents. It is built here from the same guides and the installed
`jfs-components`, so an agent reads guidance that matches the package.

This proof of concept covers six components: Button, TextInput, Badge,
Accordion, Stack and BenefitCard.

## Where things are

| Path | What it is |
| --- | --- |
| `schema/` | The five JSON schemas (entry, manifest, index, releases, pilot-results). Shared with the site's Designer and Agent views; do not change them here alone. |
| `pack.json` | The pilot components (export id, slug, category, guide files, evidence file) and the release `revision`. |
| `copy/<slug>.json` | Generated: the copy each guide renders, by section, and the commit it was read at. |
| `guidance/<slug>.json` | Extracted: the guidance read from the guide, every item with the exact sentence it came from. The only hand-written input. |
| `cross-check/<slug>.json` | Generated: the independent cross-check of each entry, with the hash of the entry it reviewed. |
| `reviews/<slug>.json` | Optional, by people: flags to add, and cross-check flags to dismiss with a reason. |
| `pilot/questions.json` | The with-and-without test questions and expected answers (draft until settled). |
| `pilot/run.mjs` | The test runner. |
| `scripts/` | The pipeline. |
| `../public/agent/<packVersion>/` | A release: `manifest.json`, `index.json`, `rules.md`, `llms.txt`, `components/<slug>.json` and `.md`, `schema/`. Never edited once committed. |
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
```

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

`pilot/questions.json` holds 20 questions (choose, configure, compose, spot a
gap) with expected answers drafted from the documentation: the answers Coin
allows, the required constraints, and the recommendations, listed apart.
Astra settles them through the owner; set `expected.settledBy` on each. The
runner refuses to start until every question is settled.

Each question then runs twice, in fresh `claude -p` sessions in empty
folders: with the pack (the current release in `./coin-agent-pack/`, plus the
package's type declarations) and without it (the type declarations only;
`--baseline none` gives that run nothing). A third fresh session grades each
answer against the expectations without knowing which run it is. The with-pack
run records which pack files the agent read. A full run is 80 sessions of plan
usage; `--only` reruns some questions.

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
