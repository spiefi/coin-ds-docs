import { Component, createElement, Fragment, useMemo, type ErrorInfo, type ReactNode } from 'react'
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

function toValue(value: Value): unknown {
  switch (value.kind) {
    case 'literal':
      return value.value
    case 'object':
      return Object.fromEntries(value.entries.map(([key, item]) => [key, toValue(item)]))
    case 'array':
      return value.items.map(toValue)
    case 'function':
      return noop
    case 'jsx':
      return toElement(value.node, 0)
    case 'name': {
      const resolved = resolveName(value.path)
      if (resolved === undefined) throw new Error(`${value.path.join('.')} is not a jfs-components export`)
      return resolved
    }
  }
}

function toElement(node: JsxNode, key: number): ReactNode {
  switch (node.kind) {
    case 'text':
      return node.value
    case 'expression':
      return node.value ? (toValue(node.value) as ReactNode) : null
    case 'fragment':
      return createElement(Fragment, { key }, ...node.children.map(toElement))
    case 'element': {
      const type = resolveName(node.name.split('.'))
      if (!/^[A-Z]/.test(node.name) || (typeof type !== 'function' && typeof type !== 'object') || !type) {
        throw new Error(`<${node.name}> is not a jfs-components export`)
      }
      const props: Record<string, unknown> = { key }
      for (const [name, value] of node.props) props[name] = toValue(value)
      return createElement(type as Parameters<typeof createElement>[0], props, ...node.children.map(toElement))
    }
  }
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
