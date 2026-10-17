import {
  useEffect,
  useLayoutEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import {
  AGENT_PAGES,
  agentPageHref,
  guideViewHref,
  readGuideView,
  type AgentPage,
  type GuideView,
} from './agent/routes'
import { listGuides } from './guides/store'
import { SearchButton } from './site/SearchButton'

/** A registered guide slug; see src/guides/<slug>.guide.tsx. */
export type ComponentSlug = string

export type GuideLocation = Pick<Location, 'pathname' | 'search' | 'hash'> & {
  navigationType: 'initial' | 'popstate' | 'hashchange'
}

function readGuideLocation(
  navigationType: GuideLocation['navigationType'] = 'initial',
): GuideLocation {
  if (typeof window === 'undefined') {
    return { pathname: '/', search: '', hash: '', navigationType }
  }

  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    navigationType,
  }
}

export function useGuideLocation() {
  const [location, setLocation] = useState<GuideLocation>(readGuideLocation)

  useEffect(() => {
    const syncLocation = (navigationType: GuideLocation['navigationType']) =>
      setLocation(readGuideLocation(navigationType))
    const handlePopState = () => syncLocation('popstate')
    const handleHashChange = () => syncLocation('hashchange')

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return location
}

/** The guide view in the URL: Designer by default, Agent for ?view=agent. */
export function useGuideView(): GuideView {
  return readGuideView(useGuideLocation().search)
}

function locationPath(location: GuideLocation) {
  return `${location.pathname}${location.search}${location.hash}`
}

function hashTargetId(hash: string) {
  const encodedId = hash.startsWith('#') ? hash.slice(1) : hash
  if (!encodedId) return 'overview'

  try {
    return decodeURIComponent(encodedId)
  } catch {
    return encodedId
  }
}

export function useGuidePageNavigation() {
  const location = useGuideLocation()

  useLayoutEffect(() => {
    if (location.navigationType === 'hashchange') return

    const targetId = hashTargetId(location.hash)
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [
    location.hash,
    location.navigationType,
    location.pathname,
    location.search,
  ])

  return location
}

export function navigateGuide(url: URL) {
  const nextPath = `${url.pathname}${url.search}${url.hash}`
  const currentPath = locationPath(readGuideLocation())

  if (nextPath !== currentPath) {
    window.history.pushState({}, '', nextPath)
  }

  window.dispatchEvent(new Event('popstate'))
}

export function handleGuideNavigation(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  const anchor = event.currentTarget
  if (
    (anchor.target && anchor.target !== '_self') ||
    anchor.hasAttribute('download')
  ) {
    return
  }

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return

  event.preventDefault()
  navigateGuide(url)
}

export const PAGE_NAV = [
  ['overview', 'Overview'],
  ['anatomy', 'Anatomy'],
  ['configuration', 'Configuration'],
  ['states', 'States'],
  ['sizing', 'Sizing'],
  ['content', 'Content'],
  ['context', 'In context'],
  ['dos-donts', "Do & Don’ts"],
  ['sources', 'Sources'],
] as const

export const HOME_HREF = '/'

/** A guide's page; `view` keeps the Agent view when moving between guides. */
export function guideHref(slug: ComponentSlug, view: GuideView = 'designer') {
  return guideViewHref(slug, view, 'overview')
}

export function GuideIcon({ icon }: { icon: ReactNode }) {
  return (
    <svg
      className="component-icon-svg"
      viewBox="0 0 18 18"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      {icon}
    </svg>
  )
}

const AGENT_ICONS: Record<AgentPage, ReactNode> = {
  overview: (
    <path
      d="M3 3.5h12v11H3zM3 7.5h12M7.5 7.5v7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  rules: (
    <path
      d="M4.5 2.75h6.75l2.25 2.25v10.25h-9zM7 8h4M7 11h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  index: (
    <path
      d="M6.75 3C5.25 3 4.75 3.75 4.75 5v1.75C4.75 7.75 4.25 8.5 3 9c1.25.5 1.75 1.25 1.75 2.25V13c0 1.25.5 2 2 2M11.25 3c1.5 0 2 .75 2 2v1.75c0 1 .5 1.75 1.75 2.25-1.25.5-1.75 1.25-1.75 2.25V13c0 1.25-.5 2-2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  pilot: (
    <path
      d="M3 3h12v12H3zM6 9.25l2 2 4-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

const HOME_ICON = (
  <path
    d="M3 8.25 9 3.5l6 4.75V15h-4v-4H7v4H3z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
)

/**
 * `active` is the current guide's slug and `agentPage` the current pack page;
 * omit both on the home page. `view` keeps guide links in the Agent view.
 */
export function GuideSidebar({
  active,
  agentPage,
  view = 'designer',
  pageNav = PAGE_NAV,
}: {
  active?: ComponentSlug
  agentPage?: AgentPage
  view?: GuideView
  pageNav?: ReadonlyArray<readonly [string, string]>
}) {
  const home = !active && !agentPage
  return (
    <aside className="sidebar" aria-label="Documentation navigation">
      <a
        className="brand"
        href={HOME_HREF}
        aria-label="Coin documentation home"
        onClick={handleGuideNavigation}
      >
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>
          <strong>Coin</strong>
          <small>Designer docs</small>
        </span>
      </a>

      <SearchButton variant="sidebar" />

      <div className="sidebar-home">
        <a
          className={'component-link ' + (home ? 'is-active' : '')}
          href={HOME_HREF}
          aria-current={home ? 'page' : undefined}
          onClick={handleGuideNavigation}
        >
          <span className="component-icon" aria-hidden="true">
            <GuideIcon icon={HOME_ICON} />
          </span>
          Home
        </a>
      </div>

      <div className="sidebar-group sidebar-agent-group">
        <p>Agent pack</p>
        {AGENT_PAGES.map(([page, label]) => (
          <a
            className={'component-link ' + (page === agentPage ? 'is-active' : '')}
            href={agentPageHref(page)}
            aria-current={page === agentPage ? 'page' : undefined}
            onClick={handleGuideNavigation}
            key={page}
          >
            <span className="component-icon" aria-hidden="true">
              <GuideIcon icon={AGENT_ICONS[page]} />
            </span>
            {label}
          </a>
        ))}
      </div>

      <div className="sidebar-group">
        <p>
          Components <span className="nav-count">{listGuides().length}</span>
        </p>
        {listGuides().map((item) => (
          <a
            className={'component-link ' + (item.slug === active ? 'is-active' : '')}
            href={guideHref(item.slug, view)}
            aria-current={item.slug === active ? 'page' : undefined}
            onClick={handleGuideNavigation}
            key={item.slug}
          >
            <span className="component-icon" aria-hidden="true">
              <GuideIcon icon={item.icon} />
            </span>
            {item.label}
          </a>
        ))}
      </div>

      <nav className="page-nav" aria-label="On this page">
        <p>On this page</p>
        {pageNav.map(([id, label]) => (
          <a href={'#' + id} key={id}>{label}</a>
        ))}
      </nav>
      <p className="sidebar-version">Coin Components · {__COIN_COMPONENTS_VERSION__}</p>
    </aside>
  )
}

/** `sources` adds a link to the guide's Sources section; the home page has none. */
export function GuideMobileBar({ sources = true }: { sources?: boolean }) {
  return (
    <div className="mobile-bar">
      <a className="brand" href={HOME_HREF} onClick={handleGuideNavigation}>
        <span className="brand-mark" aria-hidden="true">C</span>
        <strong>Coin designer docs</strong>
      </a>
      <div className="mobile-bar-actions">
        {sources && <a href="#sources">Sources</a>}
        <SearchButton variant="icon" />
      </div>
    </div>
  )
}

/** `active` is the current guide's slug; omit it on the home page. */
export function MobileComponentNav({
  active,
  view = 'designer',
}: {
  active?: ComponentSlug
  view?: GuideView
}) {
  return (
    <nav className="mobile-component-toc" aria-label="Components">
      <span className="mobile-component-toc-label">
        Components <span className="nav-count">{listGuides().length}</span>
      </span>
      <div>
        {listGuides().map((item) => (
          <a
            className={item.slug === active ? 'is-active' : ''}
            href={guideHref(item.slug, view)}
            aria-current={item.slug === active ? 'page' : undefined}
            onClick={handleGuideNavigation}
            key={item.slug}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export function MobilePageNav({
  items = PAGE_NAV,
}: {
  items?: ReadonlyArray<readonly [string, string]>
}) {
  return (
    <nav className="mobile-toc" aria-label="Page sections">
      {items.map(([id, label]) => (
        <a href={'#' + id} key={id}>{label}</a>
      ))}
    </nav>
  )
}
