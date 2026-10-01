# Coin DS — agent instructions

This repository contains one thing: the Coin DS designer documentation site
in `designer-docs/` (live at <https://coin-designer-docs.vercel.app>).

- For any work on the site, follow `designer-docs/AGENTS.md`.
- To build or revise component guides, use the `coin-component-docs` skill.
  Its source is `skills/coin-component-docs/`; after editing it, run
  `sh skills/install.sh` to update the Claude Code and Codex copies.
- Docs worker agents: `.claude/agents/coin-docs-worker.md` (Claude Code) and
  `.codex/agents/coin_docs_worker.toml` (Codex).
- Before creating or assigning a Coin Workflow ticket, read `TICKET-OWNERS.md` for who
  owns which kind of ticket.

The former product app (Buy Gold flow and other screens) and its screen
tooling were removed on 26 September 2026. They are preserved on the local
branch `archive/product-app`.

## Coin components package

Biscuit's private repository
`MrBiscuit/react-native-storybook-boilerplate-master` is the source of truth
for Coin components (package
`@jio-finance-platform-and-service-ltd/jfs-components`). Agents only read it;
component changes go to Biscuit as tickets.

The docs install a built copy, as `jfs-components`, from the private mirror
`spiefi/coin-components` (a git dependency pinned to a tag). The mirror exists
because CI and Vercel cannot read Biscuit's repository, and because npm would
otherwise rebuild the package from source on every install. Public
`jfs-components` stopped at 0.1.60. Keep the package private: never publish it
to npm or copy it into this public repository.

`designer-docs/scripts/coin-components.mjs` keeps the mirror in step. Run it
from `designer-docs/`; its clones live in `~/.cache/coin-components`.

- `npm run coin:status` compares Biscuit's `main`, the mirror, and the docs,
  and lists upstream commits that the mirror does not have yet.
- `npm run coin:sync` builds Biscuit's `main` (or `-- --ref <branch|tag|commit>`)
  and lists the changed source files and the guides to re-test. It pushes
  nothing.
- `npm run coin:sync -- --push` commits that build to the mirror as
  `v<version>`, or `v<version>-<commit>` when the version was not bumped, and
  pushes it. It refuses when it cannot prove the build is newer than the
  mirror's (Biscuit rewrote `main`, or the mirror's build came from a zip):
  check the listed changes, then add `--force`.
- `npm run coin:use -- <tag>` points `designer-docs/package.json` at a mirror
  tag and runs `npm install`. Run `npm run verify` next.

A fix counts as delivered only when it is on Biscuit's `main`. If he sends a
zip instead, ask him to push it: a zip build cannot be traced to a commit.

### Fix and test loop

1. Coin gaps found while documenting go to Biscuit as Component Bug tickets
   (see `TICKET-OWNERS.md`).
2. When he reports fixes, run `npm run coin:status`, then `npm run coin:sync`.
3. Push the build to the mirror with the user's go-ahead.
4. On a branch, `npm run coin:use -- <tag>`, then `npm run verify`. Re-test
   every ticket he marked fixed against its
   `designer-docs/docs/evidence/<slug>.md`, starting with the guides
   `coin:sync` listed. Update the evidence and guide copy that the fix
   changes.
5. Add a work note with the result to each ticket (`coin-workflow` MCP),
   saying plainly which fixes failed. Never complete Biscuit's contribution,
   and move tickets only when the user asks: failed fixes usually go back to
   In-Progress; only people can move tickets to Done. Release through `main`
   as usual.

CI reads the mirror with the read-only deploy key in the
`COIN_COMPONENTS_DEPLOY_KEY` repository secret, and deploys a prebuilt site
because Vercel's build servers cannot read the private repo.

## Releasing

Push to `main`. `.github/workflows/designer-docs.yml` runs `npm run verify`
and deploys to Vercel only if it passes. Never deploy by hand.

## GitHub publishing

- Use the repository's Git credentials for branches, commits, and pushes.
  An invalid `gh auth status` alone is not a blocker: first check access with
  `git ls-remote origin HEAD`.
- Ask the user to reauthenticate only after Git remote access fails.
- Never write access tokens, credentials, or secrets into repository files.
  The Vercel token lives only in the `VERCEL_TOKEN` repository secret.
