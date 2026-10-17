#!/usr/bin/env node
// Headless browser test for the designer docs. Builds the site into a private
// temporary folder (so parallel runs never collide), serves it, and loads every guide (or only the slugs passed as arguments) at
// 1280 and 390 px in headless Chrome. A guide fails if it does not render,
// its title does not match the navigation, its Anatomy self-check reports an
// issue, its pins do not match its legend rows, the page scrolls sideways, or
// the page throws. A full run also checks the home page: the navigation lists
// and counts every guide, the live mode example responds, search finds and
// opens a guide, and an unknown guide lands home. It also checks the agent
// views: the Designer / Agent switch (by keyboard), the Agent view of Badge
// and of a guide with its own page shell, and the four agent pack pages.
//
//   npm run test:browser            # home page, search, agent views, and every guide
//   npm run test:browser badge      # selected guides
//   npm run test:browser home       # home page and search only
//   npm run test:browser agent      # agent views only

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
const checkAgent = !requested.length || requested.includes('agent')
const slugs = requested.length ? requested.filter((slug) => slug !== 'home' && slug !== 'agent') : allSlugs

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

const AGENT_PAGES = [
  ['overview', 'Pack overview'],
  ['graph', 'Graph map'],
  ['rules', 'Agent rules'],
  ['index', 'Agent index'],
  ['pilot', 'Pilot results'],
]

/** Waits until an agent page has read the pack, then reports what it shows. */
async function readAgentPage(page) {
  await page.waitForSelector('h1', { timeout: 15000 })
  await page.waitForFunction(
    () => !document.querySelector('.agent-loading, [aria-busy="true"]'),
    null,
    { timeout: 15000 },
  )
  await page.waitForTimeout(600)
  return page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent?.trim(),
    active: document.querySelector('.sidebar [aria-current="page"]')?.textContent?.trim(),
    view: document.querySelector('.agent-view-switch [aria-current="page"]')?.textContent?.trim(),
    sections: document.querySelectorAll('.agent-view .agent-section').length,
    empty: !!document.querySelector('.agent-empty'),
    exampleErrors: [...document.querySelectorAll('.agent-example-error')].map((note) => note.textContent),
    errors: [...document.querySelectorAll('.agent-error')].map((note) => note.textContent),
    scrollWidth: document.documentElement.scrollWidth,
  }))
}

async function checkAgentViews(context, width) {
  const visit = async (label, path, check) => {
    const { page, errors } = await watchedPage(context)
    const problems = []
    const expect = (ok, problem) => ok || problems.push(problem)
    try {
      await page.goto(baseUrl + path, { waitUntil: 'load' })
      const shown = await readAgentPage(page)
      expect(!shown.errors.length, `shows an error: ${shown.errors.join(' ')}`)
      expect(shown.scrollWidth <= width, `page scrolls sideways (${shown.scrollWidth}px)`)
      await check(shown, expect, page)
    } catch (error) {
      problems.push(`did not complete: ${error.message.split('\n')[0]}`)
    } finally {
      problems.push(...errors.map((error) => `runtime error: ${error}`))
      if (problems.length) failures.push({ guide: `${label} @ ${width}px`, problems })
      await page.close()
    }
  }

  // Badge: an entry (the sample until the pack is published) or the empty state.
  await visit('agent view: badge', '?component=badge&view=agent', (shown, expect) => {
    expect(shown.title === 'Badge', `title is "${shown.title}"`)
    expect(shown.view?.startsWith('Agent'), 'the switch does not mark Agent as current')
    if (width >= 1024) expect(shown.active === 'Badge', `navigation marks "${shown.active}"`)
    expect(shown.sections >= 10 || shown.empty, 'shows neither the entry nor the empty state')
    expect(!shown.exampleErrors.length, `examples did not render: ${shown.exampleErrors.join(' | ')}`)
  })

  // A guide with its own page shell reaches the same view.
  await visit('agent view: button', '?component=button&view=agent', (shown, expect) => {
    expect(shown.title === 'Button', `title is "${shown.title}"`)
    expect(shown.view?.startsWith('Agent'), 'the switch does not mark Agent as current')
    expect(shown.sections >= 10 || shown.empty, 'shows neither the entry nor the empty state')
  })

  // The Full / Brief / Links switch changes the rendering without leaving the page.
  await visit('agent view: renderings', '?component=badge&view=agent', async (shown, expect, page) => {
    if (shown.empty) return
    const brief = page.locator('.agent-rendering-options button', { hasText: 'Brief' })
    if (await brief.isDisabled()) return
    await brief.click()
    await page.waitForFunction(() => new URLSearchParams(location.search).get('rendering') === 'brief', null, { timeout: 5000 })
    await page.waitForFunction(() => !document.querySelector('.agent-loading'), null, { timeout: 15000 })
    const rendered = await page.evaluate(() => ({
      pressed: document.querySelector('.agent-rendering-options [aria-pressed="true"]')?.textContent,
      body: !!document.querySelector('.agent-rendering-file .agent-markdown, .agent-rendering-file .agent-empty-line'),
    }))
    expect(rendered.pressed?.startsWith('Brief'), 'the Brief rendering is not selected')
    expect(rendered.body, 'the brief neither rendered nor said it is missing')
  })

  // An entry without a guide page has its own Agent view.
  await visit('agent entry page', '?agent=entry&slug=badge', (shown, expect) => {
    expect(shown.title === 'Badge', `title is "${shown.title}"`)
    expect(shown.sections >= 10 || shown.empty, 'shows neither the entry nor the empty state')
  })

  // The graph map offers its table of edges as the alternative view.
  await visit('graph map: table', '?agent=graph&show=table', async (shown, expect, page) => {
    const table = await page.evaluate(() => ({
      rows: document.querySelectorAll('.agent-edge-table tbody tr').length,
      missing: document.querySelector('.agent-page-body .agent-empty-line')?.textContent ?? '',
    }))
    expect(table.rows > 0 || /no graph\.json|No relationships/.test(table.missing), 'shows neither the edge table nor why it is missing')
  })

  // Selecting a component on the map opens its Agent view.
  await visit('graph map: open a node', '?agent=graph', async (shown, expect, page) => {
    const node = page.locator('a.agent-node').first()
    if (!(await node.count())) return
    await node.click()
    await page.waitForFunction(
      () => new URLSearchParams(location.search).get('view') === 'agent' || new URLSearchParams(location.search).get('agent') === 'entry',
      null,
      { timeout: 5000 },
    )
  })

  for (const [id, title] of AGENT_PAGES) {
    await visit(`agent page: ${id}`, `?agent=${id}`, (shown, expect) => {
      expect(shown.title === title, `title is "${shown.title}", not "${title}"`)
      if (width >= 1024) expect(shown.active === title, `navigation marks "${shown.active}"`)
    })
  }

  // The switch works from the keyboard and keeps focus on itself.
  if (width >= 1024) {
    await visit('view switch', '?component=badge', async (shown, expect, page) => {
      expect(shown.view?.startsWith('Designer'), 'Designer is not the default view')
      await page.focus('.agent-view-switch a:not([aria-current])')
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => new URLSearchParams(location.search).get('view') === 'agent', null, { timeout: 5000 })
      const after = await readAgentPage(page)
      expect(after.view?.startsWith('Agent'), 'Enter did not switch to the Agent view')
      const focused = await page.evaluate(() => document.activeElement?.closest('.agent-view-switch') !== null)
      expect(focused, 'focus left the switch after switching view')
      await page.keyboard.press('Shift+Tab')
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => !new URLSearchParams(location.search).has('view'), null, { timeout: 5000 })
      const back = await page.evaluate(() => document.querySelectorAll('#anatomy .gk-anatomy').length)
      expect(back === 1, 'switching back did not restore the Designer view')
    })
  }
}

try {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    if (checkHomePage) await checkHome(context, width)
    if (checkAgent) await checkAgentViews(context, width)
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
const checked = [
  checkHomePage && 'home page and search',
  checkAgent && 'agent views',
  slugs.length && `${slugs.length} guides`,
]
console.log(`Browser test passed · ${checked.filter(Boolean).join(' + ')} × ${WIDTHS.join(' and ')} px`)
