// Routes for the agent views. Guide pages take ?view=agent; the shared pack
// pages live at /?agent=<page>. Query routes keep /agent/ free for the pack's
// published files.

export type GuideView = 'designer' | 'agent'

export const AGENT_PAGES = [
  ['overview', 'Pack overview'],
  ['rules', 'Agent rules'],
  ['index', 'Agent index'],
  ['pilot', 'Pilot results'],
] as const

export type AgentPage = (typeof AGENT_PAGES)[number][0]

export function readGuideView(search: string): GuideView {
  return new URLSearchParams(search).get('view') === 'agent' ? 'agent' : 'designer'
}

/** The requested shared pack page, or undefined when the route is not one. */
export function readAgentPage(search: string): AgentPage | undefined {
  const requested = new URLSearchParams(search).get('agent')
  if (requested === null) return undefined
  return AGENT_PAGES.find(([page]) => page === requested)?.[0] ?? 'overview'
}

export function agentPageHref(page: AgentPage, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ agent: page, ...params })
  return `/?${query.toString()}`
}

/** A guide page in a view. Designer is the default, so its URL has no view. */
export function guideViewHref(slug: string, view: GuideView, hash?: string) {
  const query = view === 'agent' ? `?component=${slug}&view=agent` : `?component=${slug}`
  return `/${query}${hash ? `#${hash}` : ''}`
}
