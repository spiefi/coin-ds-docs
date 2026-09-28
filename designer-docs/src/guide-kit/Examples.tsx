import type { ReactNode } from 'react'
import backdropImage from '../assets/bank-hero.png'

export function ExampleCard({
  title,
  children,
  description,
}: {
  title: string
  children: ReactNode
  description?: ReactNode
}) {
  return (
    <article className="coin-new-example-card">
      <div className="coin-new-example-stage">{children}</div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </article>
  )
}

export function DoDont({
  good,
  bad,
  goodTitle,
  badTitle,
  goodCaption,
  badCaption,
}: {
  good: ReactNode
  bad: ReactNode
  goodTitle: string
  badTitle: string
  goodCaption: string
  badCaption: string
}) {
  return (
    <div className="comparison-row coin-new-comparison-row">
      <article className="comparison-card do-card">
        <p className="comparison-label">Do</p>
        <div className="comparison-preview coin-new-comparison-preview">{good}</div>
        <h3>{goodTitle}</h3>
        <p>{goodCaption}</p>
      </article>
      <article className="comparison-card dont-card">
        <p className="comparison-label">Don’t</p>
        <div className="comparison-preview coin-new-comparison-preview">{bad}</div>
        <h3>{badTitle}</h3>
        <p>{badCaption}</p>
      </article>
    </div>
  )
}

/**
 * A positioned app-screen host for components that anchor themselves to the
 * bottom of their nearest positioned ancestor (e.g. BottomNav). `bar` is only
 * tall enough for the anchored component; `screen` adds a content area above.
 */
export function ScreenFrame({
  children,
  footer,
  size = 'screen',
}: {
  children?: ReactNode
  footer: ReactNode
  size?: 'bar' | 'screen'
}) {
  return (
    <div className={`gk-screen-frame is-${size}`}>
      {size === 'screen' && <div className="gk-screen-content">{children}</div>}
      {footer}
    </div>
  )
}

/** A photographic scene for glass components designed to sit on imagery. */
export function Backdrop({ children, size = 'compact' }: { children: ReactNode; size?: 'compact' | 'card' }) {
  return (
    <div className={`gk-backdrop is-${size}`} style={{ backgroundImage: `url(${backdropImage})` }}>
      {children}
    </div>
  )
}
