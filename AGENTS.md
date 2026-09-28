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

The docs install `jfs-components` from the private GitHub repo
`spiefi/coin-components` (a git dependency pinned to a `v<version>` tag).
New versions are no longer on public npm; public `jfs-components` stopped at
0.1.60. Keep the package private: never publish it to npm or copy it into this
public repository.

To add a version Biscuit shares as a source zip:

1. Unpack it outside this repository, run
   `npm ci --ignore-scripts --legacy-peer-deps`, then `npx bob build`.
2. `npm pack --ignore-scripts`, unpack the tarball, remove the `prepare` script
   from its `package.json` (so git installs do not rebuild), commit it to
   `spiefi/coin-components`, tag it `v<version>`, and push the tag.
3. With the user's authorization, point `designer-docs/package.json` at the
   new tag (`github:spiefi/coin-components#v<version>`), run `npm install`
   and `npm run verify`.

CI reads the package with the read-only deploy key in the
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
