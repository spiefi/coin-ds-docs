import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
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
 * `full` is a taller phone screen whose children fill it (a flex column), for
 * components that are a whole screen themselves (e.g. FullscreenModal).
 * `surface="dark"` stands in for dark media behind white-on-dark components.
 */
export function ScreenFrame({
  children,
  footer,
  size = 'screen',
  surface = 'light',
}: {
  children?: ReactNode
  footer?: ReactNode
  size?: 'bar' | 'screen' | 'full'
  surface?: 'light' | 'dark'
}) {
  return (
    <div className={`gk-screen-frame is-${size}${surface === 'dark' ? ' is-dark' : ''}`}>
      {size === 'screen' && <div className="gk-screen-content">{children}</div>}
      {size === 'full' && children}
      {footer}
    </div>
  )
}

/**
 * A white panel for light grey components (such as a #f5f5f5 pill or field)
 * that disappear on the grey example stages. Lays children out in a row like
 * a host; `width` matches the host widths.
 */
export function Surface({ children, width }: { children: ReactNode; width?: 'wide' | 'narrow' }) {
  return <div className={`gk-surface${width ? ` is-${width}` : ''}`}>{children}</div>
}

/** A photographic scene for glass components designed to sit on imagery. */
export function Backdrop({ children, size = 'compact' }: { children: ReactNode; size?: 'compact' | 'card' }) {
  return (
    <div className={`gk-backdrop is-${size}`} style={{ backgroundImage: `url(${backdropImage})` }}>
      {children}
    </div>
  )
}

/**
 * Shows a component at its natural width and scales it down only when the
 * host is narrower, for components with a fixed minimum width (e.g. OTP).
 * Interaction still works; a "Shown at N%" tag marks a scaled view.
 */
export function FitWidth({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [fit, setFit] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return
    const measure = () => {
      const width = inner.offsetWidth
      const height = inner.offsetHeight
      const scale = width > outer.clientWidth && width > 0 ? outer.clientWidth / width : 1
      setFit((current) =>
        Math.abs(current.scale - scale) < 0.001 && current.height === height ? current : { scale, height },
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  const scaled = fit.scale < 1
  return (
    <div className="gk-fit">
      <div className="gk-fit-box" ref={outerRef} style={{ height: scaled ? fit.height * fit.scale : undefined }}>
        <div className="gk-fit-inner" ref={innerRef} style={{ transform: scaled ? `scale(${fit.scale})` : undefined }}>
          {children}
        </div>
      </div>
      {scaled && <span className="gk-fit-zoom">Shown at {Math.round(fit.scale * 100)}%</span>}
    </div>
  )
}
