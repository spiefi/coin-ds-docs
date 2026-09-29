#!/usr/bin/env node
// Headless browser test for the designer docs. Builds the site into a private
// temporary folder (so parallel runs never collide), serves it, and loads every guide (or only the slugs passed as arguments) at
// 1280 and 390 px in headless Chrome. A guide fails if it does not render,
// its title does not match the navigation, its Anatomy self-check reports an
// issue, its pins do not match its legend rows, the page scrolls sideways, or
// the page throws. A full run also checks the home page: the navigation lists
// and counts every guide, the live mode example responds, search finds and
// opens a guide, and an unknown guide lands home.
//
//   npm run test:browser            # home page, search, and every guide
//   npm run test:browser badge      # selected guides
//   npm run test:browser home       # home page and search only

import { mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build, preview } from 'vite'
import { chromium } from 'playwright-core'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const WIDTHS = [1280, 390]
const PAGES_IN_PARALLEL = 4

const requested = process.argv.slice(2)
const allSlugs = readdirSync(join(root, 'src/guides'))
  .filter((file) => file.endsWith('.guide.tsx'))
  .map((file) => file.replace('.guide.tsx', ''))
const checkHomePage = !requested.length || requested.includes('home')
const slugs = requested.length ? requested.filter((slug) => slug !== 'home') : allSlugs

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'chrome' })
  } catch {
    try {
      return await chromium.launch()
    } catch {
      console.error(
        'No browser available. Install Google Chrome, or run `npx playwright-core install chromium`.',
      )
      process.exit(1)
    }
  }
}

const outDir = mkdtempSync(join(tmpdir(), 'coin-docs-test-'))
await build({ root, logLevel: 'silent', build: { outDir, emptyOutDir: true } })
const server = await preview({
  root,
  logLevel: 'silent',
  build: { outDir },
  preview: { host: '127.0.0.1', port: 4190, strictPort: false },
})
const baseUrl = server.resolvedUrls.local[0]
const browser = await launchBrowser()
const failures = []

/** A new page that records runtime errors, console errors, and failed requests. */
async function watchedPage(context) {
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    // Failed requests are reported with their URL by the response handler.
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource')) {
      errors.push(message.text())
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url().replace(baseUrl, '/')}`)
  })
  return { page, errors }
}

async function checkGuide(context, slug, width) {
  const { page, errors } = await watchedPage(context)
  try {
    await page.goto(`${baseUrl}?component=${slug}`, { waitUntil: 'load' })
    await page.waitForSelector('h1', { timeout: 15000 })
    await page.evaluate(() => document.fonts.ready)
    // Anatomy reports after its layout settles (about 600 ms).
    await page.waitForTimeout(1200)
    const result = await page.evaluate(() => {
      const kit = window.__guideKit ?? {}
      return {
        title: document.querySelector('h1')?.textContent?.trim(),
        active: document.querySelector('.sidebar [aria-current="page"]')?.textContent?.trim(),
        issues: Object.values(kit).flat(),
        anatomies: document.querySelectorAll('#anatomy .gk-anatomy').length,
        pins: document.querySelectorAll('#anatomy .gk-anatomy-stage .gk-anatomy-pin').length,
        legend: document.querySelectorAll('#anatomy .gk-anatomy-legend ol > li').length,
        scrollWidth: document.documentElement.scrollWidth,
      }
    })
    const problems = [...result.issues]
    if (width >= 1024 && result.title !== result.active) {
      problems.push(`title "${result.title}" does not match navigation "${result.active}"`)
    }
    if (result.anatomies !== 1) problems.push(`${result.anatomies} anatomy diagrams (expected 1)`)
    if (result.pins !== result.legend) problems.push(`${result.pins} pins for ${result.legend} legend rows`)
    if (result.scrollWidth > width) problems.push(`page scrolls sideways (${result.scrollWidth}px)`)
    problems.push(...errors.map((error) => `runtime error: ${error}`))
    if (problems.length) failures.push({ guide: `${slug} @ ${width}px`, problems })
  } catch (error) {
    failures.push({ guide: `${slug} @ ${width}px`, problems: [`did not load: ${error.message}`] })
  } finally {
    await page.close()
  }
}

async function checkHome(context, width) {
  const { page, errors } = await watchedPage(context)
  const problems = []
  const expect = (ok, problem) => ok || problems.push(problem)
  try {
    await page.goto(baseUrl, { waitUntil: 'load' })
    await page.waitForSelector('h1', { timeout: 15000 })
    const home = await page.evaluate(() => ({
      title: document.title,
      active: document.querySelector('.sidebar [aria-current="page"]')?.textContent?.trim(),
      listed: [...document.querySelectorAll('.sidebar .component-link[href*="component="]')].map(
        (link) => new URL(link.href).searchParams.get('component'),
      ),
      count: document.querySelector('.sidebar .nav-count')?.textContent,
      scrollWidth: document.documentElement.scrollWidth,
    }))
    expect(home.title === 'Coin designer documentation', `home title is "${home.title}"`)
    if (width >= 1024) expect(home.active === 'Home', `navigation marks "${home.active}" instead of Home`)
    const missing = allSlugs.filter((slug) => !home.listed.includes(slug))
    expect(!missing.length, `navigation does not list ${missing.join(', ')}`)
    expect(home.count === String(allSlugs.length), `component count shows ${home.count}, not ${allSlugs.length}`)
    expect(home.scrollWidth <= width, `home page scrolls sideways (${home.scrollWidth}px)`)

    // The live mode example switches its Button to Dark.
    await page.locator('.home-demo').getByRole('button', { name: 'Dark', exact: true }).click()
    const dark = await page.$eval('.home-demo-stage', (stage) => stage.classList.contains('is-dark'))
    expect(dark, 'the Color Mode control did not switch the live example to Dark')
    for (const icon of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) {
      // Unknown paths fall back to index.html, so check that an image came back.
      const response = await page.request.get(baseUrl + icon)
      const type = response.headers()['content-type'] ?? ''
      expect(response.ok() && type.startsWith('image/'), `${icon} is not served as an image (${response.status()} ${type})`)
    }

    // Search: open it the way people would at this width, find, and open a guide.
    if (width >= 1024) await page.keyboard.press('Control+K')
    else await page.click('.mobile-bar .search-icon-button')
    await page.waitForSelector('.search-dialog[open] input:focus', { timeout: 5000 })
    await page.keyboard.type('drop')
    await page.waitForFunction(() => document.querySelector('.search-meta')?.textContent?.endsWith('results'))
    const found = await page.$$eval('.search-option .search-option-name > span:first-child', (names) =>
      names.map((name) => name.textContent),
    )
    expect(
      found.slice(0, 3).join() === 'Dropdown,Dropdown Input,Dropdown Menu',
      `search for "drop" found ${found.join(', ') || 'nothing'}`,
    )
    const dialogWidth = await page.$eval('.search-dialog', (dialog) => dialog.getBoundingClientRect().right)
    expect(dialogWidth <= width, `search dialog is wider than the page (${dialogWidth}px)`)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'Dropdown Input', null, { timeout: 5000 })
    const opened = await page.evaluate(() => ({
      component: new URLSearchParams(location.search).get('component'),
      open: document.querySelector('.search-dialog')?.open,
    }))
    expect(opened.component === 'dropdowninput' && !opened.open, 'choosing a search result did not open its guide')

    // An unknown guide lands on the home page with a notice.
    await page.goto(`${baseUrl}?component=not-a-guide`, { waitUntil: 'load' })
    await page.waitForSelector('.home-notice', { timeout: 15000 })
  } catch (error) {
    problems.push(`did not complete: ${error.message.split('\n')[0]}`)
  } finally {
    problems.push(...errors.map((error) => `runtime error: ${error}`))
    if (problems.length) failures.push({ guide: `home page @ ${width}px`, problems })
    await page.close()
  }
}

try {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    if (checkHomePage) await checkHome(context, width)
    const queue = [...slugs]
    await Promise.all(
      Array.from({ length: PAGES_IN_PARALLEL }, async () => {
        while (queue.length) await checkGuide(context, queue.shift(), width)
      }),
    )
    await context.close()
  }
} finally {
  await browser.close()
  await server.close()
  rmSync(outDir, { recursive: true, force: true })
}

if (failures.length) {
  console.error(`Browser test failed (${failures.length}):`)
  for (const failure of failures) {
    console.error(`  • ${failure.guide}`)
    for (const problem of failure.problems) console.error(`      - ${problem}`)
  }
  process.exit(1)
}
const checked = [checkHomePage && 'home page and search', slugs.length && `${slugs.length} guides`]
console.log(`Browser test passed · ${checked.filter(Boolean).join(' + ')} × ${WIDTHS.join(' and ')} px`)
