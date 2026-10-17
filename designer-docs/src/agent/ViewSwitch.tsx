import { useEffect, useRef, type MouseEvent } from 'react'
import { handleGuideNavigation } from '../GuideNavigation'
import { guideViewHref, type GuideView } from './routes'
import './agent.css'

const VIEWS: ReadonlyArray<readonly [GuideView, string, string]> = [
  ['designer', 'Designer', 'The guide for designers'],
  ['agent', 'Agent', 'What agents read'],
]

// The app moves focus to the page after every route change. When someone
// switches view from the keyboard, give focus back to the switch instead, so
// they can switch again or tab on from where they were.
let focusAfterSwitch: GuideView | null = null

/**
 * Designer / Agent switch for a guide page. Each view is a link, so the view
 * lives in the URL (?view=agent) and works with the keyboard, history, and new
 * tabs.
 */
export function ViewSwitch({ slug, view }: { slug: string; view: GuideView }) {
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (focusAfterSwitch !== view) return
    focusAfterSwitch = null
    activeRef.current?.focus({ preventScroll: true })
  }, [view])

  const select = (next: GuideView) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (next === view) {
      event.preventDefault()
      return
    }
    // Pointer clicks report detail 1 or more; Enter on a focused link reports 0.
    focusAfterSwitch = event.detail === 0 ? next : null
    handleGuideNavigation(event)
  }

  return (
    <nav className="agent-view-switch" aria-label="Page view">
      <span className="agent-view-switch-label" aria-hidden="true">
        View
      </span>
      <div className="agent-view-switch-options">
        {VIEWS.map(([id, label, description]) => (
          <a
            key={id}
            ref={id === view ? activeRef : undefined}
            href={guideViewHref(slug, id)}
            aria-current={id === view ? 'page' : undefined}
            className={id === view ? 'is-active' : undefined}
            title={description}
            onClick={select(id)}
          >
            {label}
            <span className="agent-visually-hidden"> view: {description}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
