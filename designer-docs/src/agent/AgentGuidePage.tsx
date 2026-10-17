import { useEffect, useState } from 'react'
import { GuideMobileBar, GuideSidebar, MobileComponentNav, MobilePageNav } from '../GuideNavigation'
import { findGuide } from '../guides/store'
import { AGENT_NAV, AgentView, type AgentNavItems } from './AgentView'
import type { GuideCopy } from './trace'
import { ViewSwitch } from './ViewSwitch'

/**
 * A guide page in the Agent view (?view=agent). ComponentGuideTemplate passes
 * the guide's copy so every quote can be checked against it; guides that
 * build their own page shell pass none, and only their summary and evidence
 * quotes are checked.
 */
export function AgentGuidePage({ slug, name, copy }: { slug: string; name: string; copy?: GuideCopy }) {
  const [pageNav, setPageNav] = useState<AgentNavItems>(AGENT_NAV)
  const summary = findGuide(slug)?.summary ?? ''

  // A passive effect, so it runs after the title effects of guides with their own shell.
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${name} · Agent view · Coin designer documentation`
    return () => {
      document.title = previousTitle
    }
  }, [name])

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
