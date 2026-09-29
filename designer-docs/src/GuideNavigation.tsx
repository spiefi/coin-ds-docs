import {
  useEffect,
  useLayoutEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
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

export function guideHref(slug: ComponentSlug) {
  return `/?component=${slug}#overview`
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

const HOME_ICON = (
  <path
    d="M3 8.25 9 3.5l6 4.75V15h-4v-4H7v4H3z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
)

/** `active` is the current guide's slug; omit it on the home page. */
export function GuideSidebar({
  active,
  pageNav = PAGE_NAV,
}: {
  active?: ComponentSlug
  pageNav?: ReadonlyArray<readonly [string, string]>
}) {
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
          className={'component-link ' + (active ? '' : 'is-active')}
          href={HOME_HREF}
          aria-current={active ? undefined : 'page'}
          onClick={handleGuideNavigation}
        >
          <span className="component-icon" aria-hidden="true">
            <GuideIcon icon={HOME_ICON} />
          </span>
          Home
        </a>
      </div>

      <div className="sidebar-group">
        <p>
          Components <span className="nav-count">{listGuides().length}</span>
        </p>
        {listGuides().map((item) => (
          <a
            className={'component-link ' + (item.slug === active ? 'is-active' : '')}
            href={guideHref(item.slug)}
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
export function MobileComponentNav({ active }: { active?: ComponentSlug }) {
  return (
    <nav className="mobile-component-toc" aria-label="Components">
      <span className="mobile-component-toc-label">
        Components <span className="nav-count">{listGuides().length}</span>
      </span>
      <div>
        {listGuides().map((item) => (
          <a
            className={item.slug === active ? 'is-active' : ''}
            href={guideHref(item.slug)}
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

export function MobilePageNav() {
  return (
    <nav className="mobile-toc" aria-label="Page sections">
      {PAGE_NAV.map(([id, label]) => (
        <a href={'#' + id} key={id}>{label}</a>
      ))}
    </nav>
  )
}
