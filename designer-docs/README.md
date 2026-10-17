# Coin designer documentation

A documentation site for designers. Each guide explains one public Coin
component with live `jfs-components` examples: overview and playground,
anatomy, configuration, states, sizing, content, in-context use, Do & Don'ts,
and sources.

## How the site is built

| Path | Role |
| --- | --- |
| `src/guides/<slug>.guide.tsx` | Registers one guide: slug, label, summary, search keywords, icon, page component. Navigation (alphabetical), routes (`/?component=<slug>`), page titles, the component count, and search come from these files. |
| `src/guide-kit/` | Shared documentation chrome: `Anatomy`, `Sources`, `Segment`, `ExampleCard`, `DoDont`. Start with its [README](src/guide-kit/README.md). |
| `src/ComponentGuideTemplate.tsx` | The page shell used by guides. |
| `src/site/` | Site chrome outside the guides: the home page at `/`, an onboarding introduction to Coin with live examples (also shown for an unknown `?component=`), component search (⌘K or Ctrl K, `/`, or the Search buttons), and their CSS in `site.css`. |
| `src/agent/` | The agent views of the Coin agent pack: the Designer / Agent switch on every guide page (`?view=agent`), the Agent view of each component's pack entry (also at `/?agent=entry&slug=<slug>` for entries without a guide page), and the shared pack pages at `/?agent=overview`, `graph`, `rules`, `index`, and `pilot`. Types for the pack files are in `types.ts`; until the pack is published under `public/agent/`, every agent page reads the fixtures in `fixtures/` and says “Sample data”. |
| `public/` | Favicons (`favicon.svg`, with `favicon.ico` and `apple-touch-icon.png` rendered from it). |
| `docs/evidence/<slug>.md` | Verified package, Figma, Storybook, API, and accessibility evidence per guide ([index](docs/evidence/README.md)). |
| `scripts/check-guides.mjs` | Guardrails run by `npm run build`. |

Guides use the kit and add no CSS. The build fails if a guide adds CSS, draws
its own anatomy, pastes Storybook story URLs, defines its own segmented
control, or reads the route itself.

## Agent views

Every guide page has a Designer / Agent switch. Designer is the guide as
designers read it. Agent shows exactly what agents receive from the Coin
agent pack for that component: its guidance (each rule with its strength and
the guide sentence it came from), facts with their sources, examples rendered
live with `jfs-components`, gaps, and flags. Each quoted source is checked
against the guide as it is now, so a reviewer can tell a docs problem from an
extraction problem.

The Agent view also switches between the three renderings agents read, each
labelled with its token size: the full entry, the brief, and the links. An
undocumented entry shows its facts first, with any guidance marked as hints.
The graph map draws the relationships between components and lists them in a
table; the overview shows what each file costs in tokens; and the pilot
results compare the variants (no pack, full, brief, graph) on pass rate and
tokens.

The views read `/agent/index.json` and then, from the current release,
`components/<slug>.json`, `.md`, `.brief.md`, and `.links.md`, `index.json`,
`manifest.json`, `rules.md`, `graph.json`, and `sizes.json`, plus
`/agent/pilot/results.json` (schema version 2). The pack pipeline owns those
files and their schemas; the views only read them, and say plainly when a
release lacks one. A page whose component has no entry says “No agent entry
yet” and names the release it checked.

## Local development

```sh
npm install
npm run dev
```

In development, each anatomy diagram checks itself and warns in the console
with a `[guide-kit]` prefix; `window.__guideKit` lists every diagram's issues.

## Checks

```sh
npm run verify
```

`verify` runs `build` (typecheck, guide check, Vite build) and then
`test:browser`, which loads the home page, search, the agent views, and every
guide in headless Chrome at 1280 px and 390 px (`npm run test:browser home`
checks only the home page and search; `npm run test:browser agent` only the
agent views). It needs Google Chrome (or
`npx playwright-core install chromium`).
Vercel runs only `build`; run `verify` before committing.

## Deployment

Push to `main`. The GitHub Actions workflow
[`designer-docs.yml`](../.github/workflows/designer-docs.yml) runs
`npm run verify` and, only if it passes, deploys to Vercel production
(<https://coin-designer-docs.vercel.app>). Pull requests get the same checks
and a preview deployment. Do not deploy by hand, so the live site always
matches `main`. The workflow uses the `VERCEL_TOKEN` repository secret.

## Source boundary

Examples use public `jfs-components` exports configured through supported
props, variants, slots, and modes. Documentation chrome (stages, pins, marks,
legends, controls) lives outside the components and never styles them.
Breadcrumbs is not in the released package; its examples are labelled
code-rendered documentation references built from public primitives, with
links to the canonical Storybook stories.
