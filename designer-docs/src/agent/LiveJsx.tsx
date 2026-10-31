import { Component, createElement, Fragment, useMemo, useState, type ComponentType, type ErrorInfo, type ReactNode } from 'react'
import * as Coin from 'jfs-components'
import { parseJsx, type JsxNode, type Value } from './jsx'

// Renders an entry's example JSX with the real jfs-components. Parsing is in
// ./jsx; anything it cannot render, such as a name that is not a
// jfs-components export, is reported instead. AgentView loads this module
// lazily, so only the Agent view pays for the whole package namespace.

const COIN = Coin as unknown as Record<string, unknown>

function resolveName(path: string[]) {
  let value: unknown = COIN
  for (const part of path) {
    if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return undefined
    value = (value as Record<string, unknown>)[part]
  }
  return value
}

const noop = () => {}

// press is what an onPress does: nothing, except inside a popup the site holds
// open (HeldPopup), where it closes the popup.
function toValue(value: Value, press: () => void = noop, name = ''): unknown {
  switch (value.kind) {
    case 'literal':
      return value.value
    case 'object':
      return Object.fromEntries(value.entries.map(([key, item]) => [key, toValue(item, press)]))
    case 'array':
      return value.items.map((item) => toValue(item, press))
    case 'function':
      return name === 'onPress' ? press : noop
    case 'jsx':
      return toElement(value.node, 0, press)
    case 'name': {
      const resolved = resolveName(value.path)
      if (resolved === undefined) throw new Error(`${value.path.join('.')} is not a jfs-components export`)
      return resolved
    }
  }
}

type ElementNode = Extract<JsxNode, { kind: 'element' }>

function elementProps(node: ElementNode, key: number, press: () => void) {
  const props: Record<string, unknown> = { key }
  for (const [name, value] of node.props) {
    // Functions can't run here. Event handlers become no-ops; other
    // functions (format or render props) are left out, so the component
    // uses its default instead of a function that returns nothing.
    if (value.kind === 'function' && !/^on[A-Z]/.test(name)) continue
    props[name] = toValue(value, press, name)
  }
  return props
}

function toElement(node: JsxNode, key: number, press: () => void = noop): ReactNode {
  switch (node.kind) {
    case 'text':
      return node.value
    case 'expression':
      return node.value ? (toValue(node.value, press) as ReactNode) : null
    case 'fragment':
      return createElement(Fragment, { key }, ...node.children.map((child, index) => toElement(child, index, press)))
    case 'element': {
      const type = resolveName(node.name.split('.'))
      if (!/^[A-Z]/.test(node.name) || (typeof type !== 'function' && typeof type !== 'object') || !type) {
        throw new Error(`<${node.name}> is not a jfs-components export`)
      }
      if (type === COIN.Popup && node.props.some(([name, value]) => name === 'open' && value.kind === 'literal')) {
        return createElement(HeldPopup, { key, node })
      }
      return createElement(
        type as Parameters<typeof createElement>[0],
        elementProps(node, key, press),
        ...node.children.map((child, index) => toElement(child, index, press)),
      )
    }
  }
}

// A Popup example is controlled: its literal open stands for the screen's
// state. Rendered as written, it would open over the whole page (React
// Native's Modal) and never close, so the site holds that state instead: the
// popup starts closed, opens from a button, and closes on the scrim, Escape
// or a button in the sheet, as the example's screen would close it.
function HeldPopup({ node }: { node: ElementNode }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const props = elementProps(node, 0, close)
  delete props.key
  return (
    <>
      <button type="button" className="agent-example-open" onClick={() => setOpen(true)}>
        Open the popup
      </button>
      {createElement(
        COIN.Popup as ComponentType<Record<string, unknown>>,
        { ...props, open, onOpenChange: (next: boolean) => setOpen(next) },
        ...node.children.map((child, index) => toElement(child, index, close)),
      )}
    </>
  )
}

/** Parses example JSX into React elements. Throws a readable error when it can't. */
export function renderJsx(source: string): ReactNode {
  return toElement(parseJsx(source), 0)
}

class ExampleBoundary extends Component<
  { children: ReactNode; onError: (message: string) => ReactNode },
  { message: string | null }
> {
  state = { message: null as string | null }

  static getDerivedStateFromError(error: unknown) {
    return { message: error instanceof Error ? error.message : String(error) }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.warn('[agent] example did not render', error, info.componentStack)
  }

  render() {
    return this.state.message ? this.props.onError(this.state.message) : this.props.children
  }
}

/** The example rendered live, or a note saying why it could not be. */
export default function LiveJsx({ source, onError }: { source: string; onError: (message: string) => ReactNode }) {
  // Parse and name errors are reported here; the boundary catches errors that
  // a Coin component throws while rendering.
  const parsed = useMemo(() => {
    try {
      return { element: renderJsx(source), message: null }
    } catch (error) {
      return { element: null, message: error instanceof Error ? error.message : String(error) }
    }
  }, [source])

  if (parsed.message !== null) return <>{onError(parsed.message)}</>
  return (
    <ExampleBoundary key={source} onError={onError}>
      {parsed.element}
    </ExampleBoundary>
  )
}
