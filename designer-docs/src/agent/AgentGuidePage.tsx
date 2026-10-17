import { useEffect, useState } from 'react'
import { GuideMobileBar, GuideSidebar, MobileComponentNav, MobilePageNav, useGuideLocation } from '../GuideNavigation'
import { findGuide } from '../guides/store'
import { AGENT_NAV, AgentView, type AgentNavItems } from './AgentView'
import { loadIndex, loadPack, useLoaded } from './pack'
import type { GuideCopy } from './trace'
import { ViewSwitch } from './ViewSwitch'

// A passive effect, so it runs after the title effects of guides with their own shell.
function useAgentTitle(name: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${name} · Agent view · Coin designer documentation`
    return () => {
      document.title = previousTitle
    }
  }, [name])
}

/**
 * A guide page in the Agent view (?view=agent). ComponentGuideTemplate passes
 * the guide's copy so every quote can be checked against it; guides that
 * build their own page shell pass none, and only their summary and evidence
 * quotes are checked.
 */
export function AgentGuidePage({ slug, name, copy }: { slug: string; name: string; copy?: GuideCopy }) {
  const [pageNav, setPageNav] = useState<AgentNavItems>(AGENT_NAV)
  const summary = findGuide(slug)?.summary ?? ''

  useAgentTitle(name)

  const title = (
    <>
      <p className="breadcrumb">Components / {name}</p>
      <div className="hero-title-row">
        <h1>{name}</h1>
        <span className="public-badge">Public component</span>
      </div>
      <ViewSwitch slug={slug} view="agent" />
    </>
  )

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <GuideSidebar active={slug} view="agent" pageNav={pageNav} />

      <main id="main-content" className="content" tabIndex={-1}>
        <GuideMobileBar />
        <MobileComponentNav active={slug} view="agent" />
        <MobilePageNav items={pageNav} />

        <AgentView slug={slug} name={name} title={title} copy={copy ?? { summary }} onPageNav={setPageNav} />

        <footer>
          <span>Coin designer documentation</span>
          <a href="#overview">Back to top ↑</a>
        </footer>
      </main>
    </div>
  )
}

/**
 * The Agent view of a pack entry that has no guide page, such as an
 * undocumented export: /?agent=entry&slug=<slug>.
 */
export function AgentEntryPage() {
  const location = useGuideLocation()
  const slug = new URLSearchParams(location.search).get('slug') ?? ''
  const [pageNav, setPageNav] = useState<AgentNavItems>(AGENT_NAV)
  const index = useLoaded(`entry-index:${slug}`, async () => loadIndex(await loadPack()).catch(() => null))
  const listed = index.status === 'ready' ? index.value?.components.find((component) => component.slug === slug) : undefined
  const name = listed?.id ?? slug
  useAgentTitle(name)

  const title = (
    <>
      <p className="breadcrumb">Agent pack / Entry</p>
      <div className="hero-title-row">
        <h1 className="agent-entry-title">{name}</h1>
        <span className="public-badge">No guide page</span>
      </div>
    </>
  )

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <GuideSidebar agentPage="entry" pageNav={pageNav} />

      <main id="main-content" className="content" tabIndex={-1}>
        <GuideMobileBar sources={false} />
        <MobileComponentNav />
        <MobilePageNav items={pageNav} />

        <AgentView slug={slug} name={name} title={title} copy={{ summary: '' }} onPageNav={setPageNav} />

        <footer>
          <span>Coin designer documentation</span>
          <a href="#overview">Back to top ↑</a>
        </footer>
      </main>
    </div>
  )
}
