#!/usr/bin/env node
// Snapshots the copy each pilot guide renders, section by section, so the
// extraction and the trace check can tell which section a quote comes from.
// Builds the site into a private temporary folder, loads each guide at 1280 px
// in headless Chrome, and writes agent-pack/copy/<slug>.json.
//
//   npm run agent-pack:copy              # every pilot guide
//   npm run agent-pack:copy -- badge     # selected guides
//
// The guide's files must be committed: the snapshot records the commit it was
// read at, and the trace check reads the same files at that commit.

import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build, preview } from 'vite'
import { chromium } from 'playwright-core'
import {
  DOCS, PACK, SECTION_NAMES, fail, guideCommitOf, loadPack, packageInfo, showAt,
  uncommittedGuideFiles, writeJson,
} from './lib.mjs'
import { readRegistration } from './source-text.mjs'

const pack = loadPack()
const requested = process.argv.slice(2)
const components = requested.length
  ? pack.components.filter((component) => requested.includes(component.slug))
  : pack.components
if (!components.length) fail(`No pilot guide matches ${requested.join(', ')}`)

for (const component of components) {
  const dirty = uncommittedGuideFiles(component)
  if (dirty.length) fail(`${component.slug}: commit these guide files first:\n  ${dirty.join('\n  ')}`)
}

/** Runs in the page: the guide's copy, by section. */
function readGuide(sectionNames) {
  const norm = (text) => String(text ?? '').replace(/\s+/g, ' ').trim()
  // react-native-web renders Coin components with generated css-* classes:
  // their text is specimen content, not guide copy.
  const inCoin = (element) => Boolean(element.closest('[class*="css-"]'))
  const hasOwnText = (element) =>
    [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
  const unique = (list) => list.filter((item, index) => item && list.indexOf(item) === index)

  function blocksOf(root, skip) {
    const blocks = []
    const specimen = []
    for (const element of root.querySelectorAll('*')) {
      if (skip && skip.contains(element)) continue
      if (!hasOwnText(element)) continue
      if (getComputedStyle(element).display === 'none') continue
      if (inCoin(element)) specimen.push(norm(element.textContent))
      else blocks.push(norm(element.textContent))
    }
    // Placeholders are example copy too (Text Input shows its prompts this way).
    for (const input of root.querySelectorAll('input[placeholder], textarea[placeholder]')) {
      if (inCoin(input) && input.placeholder) specimen.push(norm(input.placeholder))
    }
    return { blocks: unique(blocks), specimen: unique(specimen) }
  }

  const principle = document.querySelector('.principle-card')
  const links = [...document.querySelectorAll('.hero-links a')].map((link) => ({ text: norm(link.textContent), href: link.href }))
  const sections = {}
  for (const section of document.querySelectorAll('article section.doc-section[id]')) {
    const name = sectionNames[section.id] ?? section.id
    const header = section.querySelector('header.section-header')
    const { blocks, specimen } = blocksOf(section, header)
    sections[name] = {
      id: section.id,
      header: norm(header?.querySelector('.eyebrow')?.textContent),
      title: norm(header?.querySelector('h2')?.textContent),
      description: norm(
        [...(header?.querySelectorAll(':scope > p') ?? [])]
          .filter((p) => !p.classList.contains('eyebrow'))
          .map((p) => p.textContent)
          .join(' '),
      ),
      blocks,
      specimen,
      anatomy: [...section.querySelectorAll('.gk-anatomy-legend ol > li')].map((item) => ({
        part: norm(item.querySelector('b')?.textContent),
        note: norm(item.querySelector('b + span')?.textContent),
      })),
      doDont: [...section.querySelectorAll('.comparison-row')].map((row) => {
        const card = (selector) => {
          const article = row.querySelector(selector)
          return {
            title: norm(article?.querySelector('h3')?.textContent),
            caption: norm([...(article?.querySelectorAll(':scope > p:not(.comparison-label)') ?? [])].map((p) => p.textContent).join(' ')),
            specimen: [...(article?.querySelectorAll('.comparison-preview *') ?? [])]
              .filter((element) => hasOwnText(element))
              .map((element) => norm(element.textContent))
              .join(' · '),
          }
        }
        return { do: card('.do-card'), dont: card('.dont-card') }
      }),
      examples: [...section.querySelectorAll('.coin-new-example-card')].map((card) => ({
        title: norm(card.querySelector(':scope > h3')?.textContent),
        description: norm(card.querySelector(':scope > p')?.textContent),
      })),
    }
  }
  return {
    title: norm(document.querySelector('h1')?.textContent),
    summary: norm(document.querySelector('.hero-lede')?.textContent),
    corePrinciple: norm(
      [...(principle?.querySelectorAll('p') ?? [])]
        .filter((p) => !p.classList.contains('eyebrow'))
        .map((p) => p.textContent)
        .join(' '),
    ),
    figma: links.find((link) => /figma/i.test(link.text))?.href ?? null,
    storybook: links.find((link) => /storybook/i.test(link.text))?.href ?? null,
    sections,
  }
}

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'chrome' })
  } catch {
    try {
      return await chromium.launch()
    } catch {
      fail('No browser available. Install Google Chrome, or run `npx playwright-core install chromium`.')
    }
  }
}

const outDir = mkdtempSync(join(tmpdir(), 'coin-agent-pack-copy-'))
await build({ root: DOCS, logLevel: 'silent', build: { outDir, emptyOutDir: true } })
const server = await preview({
  root: DOCS,
  logLevel: 'silent',
  build: { outDir },
  preview: { host: '127.0.0.1', port: 4195, strictPort: false },
})
const baseUrl = server.resolvedUrls.local[0]
const browser = await launchBrowser()
const pkg = packageInfo()

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  for (const component of components) {
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(`${baseUrl}?component=${component.slug}`, { waitUntil: 'load' })
    await page.waitForSelector('h1', { timeout: 15000 })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(1200)
    const rendered = await page.evaluate(readGuide, SECTION_NAMES)
    await page.close()
    if (errors.length) fail(`${component.slug} threw while rendering: ${errors.join('; ')}`)

    const guideCommit = guideCommitOf(component)
    const registration = readRegistration(showAt(guideCommit, component.guideFiles[0]))
    if (!registration || registration.slug !== component.slug) {
      fail(`${component.slug}: ${component.guideFiles[0]} has no matching defineGuide() registration`)
    }
    const snapshot = {
      slug: component.slug,
      label: registration.label,
      guideCommit,
      files: component.guideFiles,
      evidence: component.evidence,
      packageVersion: pkg.version,
      renderedAt: new Date().toISOString(),
      viewport: '1280x900',
      keywords: registration.keywords ?? [],
      ...rendered,
    }
    writeJson(join(PACK, 'copy', `${component.slug}.json`), snapshot)
    const sectionCount = Object.keys(snapshot.sections).length
    console.log(`✓ ${component.slug}: ${sectionCount} sections at ${guideCommit.slice(0, 7)}`)
  }
  await context.close()
} finally {
  await browser.close()
  await server.close()
  rmSync(outDir, { recursive: true, force: true })
}

