import { useState, type ReactNode } from 'react'
import { Segment } from '../guide-kit'
import { packFileUrl, type Loaded, type Pack } from './pack'
import { SampleTag } from './parts'

// Pieces shared by the agent pack pages.

/**
 * A filter kept in the URL (?filter=…) so a filtered page can be shared. It
 * replaces the URL without a route change, so focus stays on the control.
 */
export function useUrlFilter<T extends string>(param: string, fallback: NoInfer<T>, values: Record<T, string | null>) {
  const [value, setValue] = useState<T>(() => {
    const requested = new URLSearchParams(window.location.search).get(param)
    return (Object.keys(values) as T[]).find((key) => values[key] === requested) ?? fallback
  })
  const update = (next: T) => {
    setValue(next)
    const url = new URL(window.location.href)
    if (values[next] === null) url.searchParams.delete(param)
    else url.searchParams.set(param, values[next]!)
    window.history.replaceState(window.history.state, '', url)
  }
  return [value, update] as const
}

export function Loading({ loaded, children }: { loaded: Loaded<unknown>; children: ReactNode }) {
  if (loaded.status === 'loading') {
    return (
      <p className="agent-loading" role="status">
        Loading…
      </p>
    )
  }
  if (loaded.status === 'error') {
    return (
      <p className="agent-error" role="alert">
        Could not read the agent pack: {loaded.message}
      </p>
    )
  }
  return <>{children}</>
}

export function ReleaseLine({ pack, file }: { pack: Pack; file?: string }) {
  return (
    <p className="agent-release-line">
      <span>
        Release <code>{pack.current}</code>
      </span>
      {pack.source === 'sample' && <SampleTag />}
      {file &&
        (pack.source === 'live' ? (
          <a href={packFileUrl(pack.current, file)} target="_blank" rel="noreferrer">
            <code>{file}</code>
          </a>
        ) : (
          <code>{file}</code>
        ))}
    </p>
  )
}

export function RawToggle({ label, raw, children }: { label: string; raw: string; children: ReactNode }) {
  const [mode, setMode] = useState<'Rendered' | 'Raw'>('Rendered')
  return (
    <>
      <div className="agent-page-controls">
        <Segment label={label} value={mode} options={['Rendered', 'Raw'] as const} onChange={setMode} />
      </div>
      {mode === 'Raw' ? (
        <pre className="agent-raw-file" tabIndex={0}>
          <code>{raw}</code>
        </pre>
      ) : (
        children
      )}
    </>
  )
}
