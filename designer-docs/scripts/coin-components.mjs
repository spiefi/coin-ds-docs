#!/usr/bin/env node
// Keeps the Coin components package in step with Biscuit's repository.
//
// Biscuit's repository (UPSTREAM) is the source of truth. The docs install a
// built copy from the private mirror (MIRROR): CI and Vercel cannot read
// Biscuit's repository, and npm would rebuild the package from source on every
// install. Both clones live outside this repository, in COIN_CACHE_DIR
// (default ~/.cache/coin-components).
//
//   npm run coin:status                upstream, mirror, and docs side by side
//   npm run coin:sync                  build upstream main and list what changed; pushes nothing
//   npm run coin:sync -- --ref <ref>   build a branch, tag, or commit instead of main
//   npm run coin:sync -- --push        also commit the build to the mirror, tag it, and push
//   npm run coin:use -- <tag>          point the docs at a mirror tag and npm install
//
// sync refuses to push a build it cannot prove is newer than the mirror's
// (upstream history was rewritten, or the mirror's build came from a zip):
// check the listed changes, then add --force. --trailer "<Key: value>" adds a
// trailer to the mirror commit.

import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const UPSTREAM = 'MrBiscuit/react-native-storybook-boilerplate-master'
const MIRROR = 'spiefi/coin-components'
const docs = join(fileURLToPath(import.meta.url), '..', '..')
const cache = process.env.COIN_CACHE_DIR || join(homedir(), '.cache', 'coin-components')
const upstreamDir = join(cache, 'upstream')
const mirrorDir = join(cache, 'mirror')

function fail(message) {
  console.error(message)
  process.exit(1)
}

function sh(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 1 << 28, ...options })
  if (result.error) fail(`${command}: ${result.error.message}`)
  return result
}

function run(command, args, options) {
  const result = sh(command, args, options)
  if (result.status !== 0) {
    fail([`${command} ${args.join(' ')} failed (exit ${result.status}).`, result.stderr].filter(Boolean).join('\n'))
  }
  return result.stdout?.trim() ?? ''
}

const git = (cwd, ...args) => run('git', args, { cwd })
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const short = (sha) => sha.slice(0, 7)

// Clones on first use; later runs fetch and let moved or deleted refs win.
function fetchRepo(slug, dir) {
  if (existsSync(join(dir, '.git'))) {
    git(dir, 'fetch', '--quiet', '--force', '--prune', '--prune-tags', '--tags', 'origin')
  } else {
    mkdirSync(cache, { recursive: true })
    run('git', ['clone', '--quiet', `https://github.com/${slug}.git`, dir])
  }
}

function upstreamCommit(ref) {
  for (const candidate of [`origin/${ref}`, ref]) {
    const found = sh('git', ['rev-parse', '--verify', '--quiet', `${candidate}^{commit}`], { cwd: upstreamDir })
    if (found.status !== 0) continue
    const sha = found.stdout.trim()
    const [date, subject] = git(upstreamDir, 'log', '-1', '--format=%cs%n%s', sha).split('\n')
    const { version } = JSON.parse(git(upstreamDir, 'show', `${sha}:package.json`))
    return { sha, date, subject, version }
  }
  fail(`${UPSTREAM} has no branch, tag, or commit named "${ref}".`)
}

// False when `ancestor` is missing too, e.g. after Biscuit force-pushed it away.
const contains = (sha, ancestor) =>
  sh('git', ['merge-base', '--is-ancestor', ancestor, sha], { cwd: upstreamDir }).status === 0

const commitsBetween = (from, to) => git(upstreamDir, 'log', '--format=  %h %cs %s', `${from}..${to}`)

function describeBuild(pkg) {
  if (!pkg) return 'not installed'
  const from = pkg.coinUpstream
  return from
    ? `${pkg.version}, built from ${short(from.commit)} (${from.ref}, ${from.date})`
    : `${pkg.version}, built from a source zip (no upstream commit recorded)`
}

function mirrorState() {
  const pkg = JSON.parse(git(mirrorDir, 'show', 'origin/main:package.json'))
  const tag = git(mirrorDir, 'tag', '--points-at', 'origin/main').split('\n').filter(Boolean).pop()
  return { pkg, tag: tag ?? 'untagged' }
}

function docsState() {
  const declared = readJson(join(docs, 'package.json')).dependencies['jfs-components']
  const installed = join(docs, 'node_modules', 'jfs-components', 'package.json')
  return { tag: declared.split('#')[1], installed: existsSync(installed) ? readJson(installed) : null }
}

function status() {
  fetchRepo(UPSTREAM, upstreamDir)
  fetchRepo(MIRROR, mirrorDir)
  const main = upstreamCommit('main')
  const mirror = mirrorState()
  const current = docsState()

  console.log(`Upstream  ${UPSTREAM} main: ${short(main.sha)} (${main.date}), version ${main.version}`)
  console.log(`          ${main.subject}`)
  console.log(`Mirror    ${MIRROR} newest: ${mirror.tag}, ${describeBuild(mirror.pkg)}`)
  console.log(`Docs      ${current.tag}, installed ${describeBuild(current.installed)}\n`)

  if (current.tag !== mirror.tag) {
    console.log(
      `The docs use ${current.tag}; the mirror's newest build is ${mirror.tag}. ` +
        `Switch with npm run coin:use -- ${mirror.tag} (with the user's go-ahead).`,
    )
  }
  const built = mirror.pkg.coinUpstream?.commit
  if (!built) {
    console.log(
      "The mirror's newest build came from a source zip, so it cannot be compared by commit. " +
        'npm run coin:sync builds upstream main and lists what differs; it pushes nothing.',
    )
  } else if (built === main.sha) {
    console.log('The mirror is up to date with upstream main.')
  } else if (contains(main.sha, built)) {
    console.log(`Upstream main has commits the mirror does not:\n${commitsBetween(built, main.sha)}`)
    console.log('npm run coin:sync builds them and lists what changed.')
  } else {
    console.log(
      `Upstream main does not contain ${short(built)}, the mirror's build commit: Biscuit rewrote ` +
        'main or moved it back. npm run coin:sync compares the two; check before pushing.',
    )
  }
}

function files(dir, root = dir, found = new Map()) {
  if (!existsSync(dir)) return found
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files(path, root, found)
    else found.set(relative(root, path), readFileSync(path))
  }
  return found
}

// Lists the source files the new build changes against the mirror's newest
// build, and the guides named after a changed component folder or file.
function report(mirror, pkg, pkgDir) {
  const before = files(join(mirrorDir, 'src'))
  const after = files(join(pkgDir, 'src'))
  const changes = []
  for (const [name, data] of after) {
    if (!before.has(name)) changes.push({ kind: 'added', name })
    else if (!before.get(name).equals(data)) changes.push({ kind: 'changed', name })
  }
  for (const name of before.keys()) if (!after.has(name)) changes.push({ kind: 'removed', name })
  changes.sort((a, b) => a.name.localeCompare(b.name))

  console.log(`\nSource changes against ${mirror.tag} (${mirror.pkg.version} → ${pkg.version}): ${changes.length} file(s)`)
  for (const { kind, name } of changes.slice(0, 80)) {
    let lines = ''
    if (kind === 'changed') {
      const numstat = sh('git', ['diff', '--no-index', '--numstat', join(mirrorDir, 'src', name), join(pkgDir, 'src', name)])
      const [added, removed] = numstat.stdout.split('\t')
      lines = ` (+${added} −${removed} lines)`
    }
    console.log(`  ${kind.padEnd(8)} ${name}${lines}`)
  }
  if (changes.length > 80) console.log(`  …and ${changes.length - 80} more`)
  console.log(`  Before: ${join(mirrorDir, 'src')}\n  After:  ${join(pkgDir, 'src')}`)
  for (const field of ['dependencies', 'peerDependencies']) {
    if (JSON.stringify(mirror.pkg[field] ?? {}) !== JSON.stringify(pkg[field] ?? {})) {
      console.log(`  ${field} changed: compare package.json before switching the docs.`)
    }
  }

  const slugs = new Set(
    readdirSync(join(docs, 'src', 'guides'))
      .filter((file) => file.endsWith('.guide.tsx'))
      .map((file) => file.replace('.guide.tsx', '')),
  )
  const affected = new Set(
    changes
      .flatMap(({ name }) => name.split('/'))
      .map((part) => part.replace(/\..*$/, '').toLowerCase())
      .filter((slug) => slugs.has(slug)),
  )
  console.log(
    affected.size
      ? `Guides to re-test: ${[...affected].sort().join(', ')}`
      : 'No guide is named after a changed file; npm run verify still checks every guide.',
  )
}

function sync({ ref, push, force, trailers }) {
  fetchRepo(UPSTREAM, upstreamDir)
  fetchRepo(MIRROR, mirrorDir)
  const target = upstreamCommit(ref)
  const mirror = mirrorState()
  const built = mirror.pkg.coinUpstream?.commit
  if (built === target.sha) {
    console.log(`The mirror's newest build, ${mirror.tag}, is already ${short(target.sha)}.`)
    return
  }

  console.log(`Building ${UPSTREAM} ${ref} at ${short(target.sha)} (${target.date}): ${target.subject}`)
  git(upstreamDir, 'checkout', '--quiet', '--force', '--detach', target.sha)
  git(upstreamDir, 'clean', '--quiet', '-dfx')
  // Biscuit's publish workflow, minus install scripts (patch-package only
  // patches his local dependencies).
  run('npm', ['ci', '--ignore-scripts', '--legacy-peer-deps', '--no-audit', '--no-fund'], {
    cwd: upstreamDir,
    stdio: 'inherit',
  })
  run(join(upstreamDir, 'node_modules', '.bin', 'bob'), ['build'], { cwd: upstreamDir, stdio: 'inherit' })

  // A built package needs no scripts. Any install-time script makes npm
  // install the whole upstream toolchain each time it installs the mirror, and
  // npm pack runs `prepare` (a second build) even with --ignore-scripts.
  run('npm', ['pkg', 'delete', 'scripts'], { cwd: upstreamDir })
  const out = mkdtempSync(join(tmpdir(), 'coin-components-'))
  run('npm', ['pack', '--ignore-scripts', '--pack-destination', out], { cwd: upstreamDir })
  const tarball = readdirSync(out).find((file) => file.endsWith('.tgz'))
  run('tar', ['-xzf', join(out, tarball), '-C', out])
  const pkgDir = join(out, 'package')
  for (const entry of ['lib/commonjs/index.js', 'lib/module/index.js', 'lib/typescript/src/index.d.ts']) {
    if (!existsSync(join(pkgDir, entry))) fail(`The build has no ${entry}.`)
  }

  const pkg = readJson(join(pkgDir, 'package.json'))
  pkg.coinUpstream = { repository: UPSTREAM, ref, commit: target.sha, date: target.date }
  writeFileSync(join(pkgDir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`)

  git(mirrorDir, 'checkout', '--quiet', '--force', '--detach', 'origin/main')
  git(mirrorDir, 'clean', '--quiet', '-dfx')
  report(mirror, pkg, pkgDir)

  const provablyNewer = built && contains(target.sha, built)
  if (provablyNewer) {
    console.log(`\nUpstream commits since ${mirror.tag}:\n${commitsBetween(built, target.sha)}`)
  } else {
    console.log(
      built
        ? `\nWarning: ${ref} does not contain ${short(built)}, the commit behind ${mirror.tag}. ` +
            `Biscuit rewrote history, or ${ref} is older.`
        : `\nWarning: ${mirror.tag} was built from a source zip, so nothing proves ${ref} is newer. ` +
            'Removed fixes in the changes above mean it is older.',
    )
  }

  let tag = `v${pkg.version}`
  if (git(mirrorDir, 'tag', '--list', tag)) tag = `${tag}-${short(target.sha)}`
  if (git(mirrorDir, 'tag', '--list', tag)) fail(`${MIRROR} already has ${tag}.`)
  if (!push) {
    console.log(`\nDry run: nothing was pushed. --push commits this build to ${MIRROR} as ${tag}.`)
    return
  }
  if (!provablyNewer && !force) fail('\nNot pushed: check the changes above, then rerun with --push --force.')

  for (const entry of readdirSync(mirrorDir)) {
    if (entry !== '.git') rmSync(join(mirrorDir, entry), { recursive: true, force: true })
  }
  cpSync(pkgDir, mirrorDir, { recursive: true })
  git(mirrorDir, 'add', '--all')
  const message = [
    `jfs-components ${pkg.version} (built package)`,
    '',
    `Built from ${UPSTREAM}@${target.sha}`,
    `(${ref}, ${target.date}): ${target.subject}`,
    '',
    'Built with react-native-builder-bob and packed with npm pack. package.json',
    'has no scripts, so git installs neither rebuild nor run install scripts;',
    'its coinUpstream field records the upstream commit.',
  ].join('\n')
  git(mirrorDir, 'commit', '--quiet', '-m', message, ...trailers.flatMap((trailer) => ['--trailer', trailer]))
  git(mirrorDir, 'tag', tag)
  git(mirrorDir, 'push', '--quiet', '--atomic', 'origin', 'HEAD:refs/heads/main', `refs/tags/${tag}`)
  console.log(`\nPushed ${tag} to ${MIRROR}. Point the docs at it with npm run coin:use -- ${tag}.`)
}

function use(tag) {
  if (!tag) fail('Usage: npm run coin:use -- <mirror tag>')
  fetchRepo(MIRROR, mirrorDir)
  if (!git(mirrorDir, 'tag', '--list', tag)) fail(`${MIRROR} has no tag ${tag}.`)
  // Name the package explicitly: after only a package.json change, npm keeps
  // the git commit already in the lockfile.
  run('npm', ['install', '--no-audit', '--no-fund', `jfs-components@github:${MIRROR}#${tag}`], {
    cwd: docs,
    stdio: 'inherit',
  })
  const { installed } = docsState()
  const expected = JSON.parse(git(mirrorDir, 'show', `${tag}:package.json`)).version
  if (installed?.version !== expected) fail(`Installed ${installed?.version}, expected ${expected} from ${tag}.`)
  console.log(`\nThe docs now use ${tag}: ${describeBuild(installed)}. Next: npm run verify.`)
}

function parse(args) {
  const options = { ref: 'main', push: false, force: false, trailers: [], positional: [] }
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--push') options.push = true
    else if (arg === '--force') options.force = true
    else if (arg === '--ref' || arg === '--trailer') {
      const value = args[++i]
      if (!value) fail(`${arg} needs a value.`)
      if (arg === '--ref') options.ref = value
      else options.trailers.push(value)
    } else if (arg.startsWith('--')) fail(`Unknown option ${arg}.`)
    else options.positional.push(arg)
  }
  return options
}

const [command, ...args] = process.argv.slice(2)
const options = parse(args)
if (command === 'status') status()
else if (command === 'sync') sync(options)
else if (command === 'use') use(options.positional[0])
else fail('Usage: coin-components.mjs status | sync [--ref <ref>] [--push] [--force] | use <tag>')
