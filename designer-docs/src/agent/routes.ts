// Routes for the agent views. Guide pages take ?view=agent; the shared pack
// pages live at /?agent=<page>. Query routes keep /agent/ free for the pack's
// published files.

export type GuideView = 'designer' | 'agent'

/** Pack pages in the navigation. */
export const AGENT_PAGES = [
  ['overview', 'Pack overview'],
  ['graph', 'Graph map'],
  ['rules', 'Agent rules'],
  ['index', 'Agent index'],
  ['pilot', 'Pilot results'],
] as const

export type AgentPage = (typeof AGENT_PAGES)[number][0]

/**
 * Every pack route: the navigation pages, plus `entry`, the Agent view of an
 * entry that has no guide page (/?agent=entry&slug=<slug>).
 */
export type AgentRoute = AgentPage | 'entry'

export function readGuideView(search: string): GuideView {
  return new URLSearchParams(search).get('view') === 'agent' ? 'agent' : 'designer'
}

/** The requested pack route, or undefined when the URL is not one. */
export function readAgentPage(search: string): AgentRoute | undefined {
  const requested = new URLSearchParams(search).get('agent')
  if (requested === null) return undefined
  if (requested === 'entry') return 'entry'
  return AGENT_PAGES.find(([page]) => page === requested)?.[0] ?? 'overview'
}

export function agentPageHref(page: AgentRoute, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ agent: page, ...params })
  return `/?${query.toString()}`
}

/** A guide page in a view. Designer is the default, so its URL has no view. */
export function guideViewHref(slug: string, view: GuideView, hash?: string) {
  const query = view === 'agent' ? `?component=${slug}&view=agent` : `?component=${slug}`
  return `/${query}${hash ? `#${hash}` : ''}`
}

/** The Agent view of an entry without a guide page. */
export function entryHref(slug: string, hash?: string) {
  return `${agentPageHref('entry', { slug })}${hash ? `#${hash}` : ''}`
}
