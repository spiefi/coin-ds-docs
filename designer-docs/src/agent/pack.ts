import { useEffect, useState } from 'react'
import sampleEntry from './fixtures/badge.json'
import sampleIndex from './fixtures/index.json'
import sampleManifest from './fixtures/manifest.json'
import sampleResults from './fixtures/results.json'
import sampleRules from './fixtures/rules.md?raw'
import type { AgentEntry, Manifest, PackIndex, PilotResults, Releases } from './types'

// Reads the published agent pack from /agent/. Until the pipeline publishes
// /agent/index.json, every page reads the fixtures in ./fixtures and says
// "Sample data".

export type Pack = {
  /** live: files under /agent/. sample: the fixtures, because /agent/index.json is missing. */
  source: 'live' | 'sample'
  releases: Releases
  /** The release every page reads. */
  current: string
}

const SAMPLE: Pack = {
  source: 'sample',
  releases: { schemaVersion: 1, current: sampleIndex.packVersion, releases: [sampleIndex.packVersion] },
  current: sampleIndex.packVersion,
}

const SAMPLE_ENTRIES: Record<string, AgentEntry> = {
  [sampleEntry.slug]: sampleEntry as AgentEntry,
}

/** A file that is not there. Static hosts answer 404; the dev server answers with index.html. */
class MissingFile extends Error {}

const requests = new Map<string, Promise<unknown>>()

function fetchOnce<T>(url: string, read: (response: Response) => Promise<T>): Promise<T> {
  let request = requests.get(url) as Promise<T> | undefined
  if (!request) {
    request = fetch(url).then((response) => {
      const type = response.headers.get('content-type') ?? ''
      if (!response.ok || type.includes('text/html')) throw new MissingFile(url)
      return read(response)
    })
    requests.set(url, request)
  }
  return request
}

const fetchJson = <T>(url: string) => fetchOnce<T>(url, (response) => response.json() as Promise<T>)
const fetchText = (url: string) => fetchOnce(url, (response) => response.text())

/** Turns a missing file into null; other failures (bad JSON, network) still throw. */
async function orNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request
  } catch (error) {
    if (error instanceof MissingFile) return null
    throw error
  }
}

/** URL of a file in a published release, e.g. packFileUrl('0.1.78+1', 'rules.md'). */
export function packFileUrl(release: string, path: string) {
  return `/agent/${release}/${path.replace(/^\/+/, '')}`
}

export const RELEASES_URL = '/agent/index.json'
export const PILOT_URL = '/agent/pilot/results.json'

let packRequest: Promise<Pack> | undefined

export function loadPack(): Promise<Pack> {
  packRequest ??= orNull(fetchJson<Releases>(RELEASES_URL)).then((releases) =>
    releases && typeof releases.current === 'string'
      ? { source: 'live' as const, releases, current: releases.current }
      : SAMPLE,
  )
  return packRequest
}

/** The component's entry in the current release, or null when it has none. */
export async function loadEntry(pack: Pack, slug: string): Promise<AgentEntry | null> {
  if (pack.source === 'sample') return SAMPLE_ENTRIES[slug] ?? null
  return orNull(fetchJson<AgentEntry>(packFileUrl(pack.current, `components/${slug}.json`)))
}

export async function loadIndex(pack: Pack): Promise<PackIndex | null> {
  if (pack.source === 'sample') return sampleIndex as PackIndex
  return orNull(fetchJson<PackIndex>(packFileUrl(pack.current, 'index.json')))
}

export async function loadManifest(pack: Pack): Promise<Manifest | null> {
  if (pack.source === 'sample') return sampleManifest as Manifest
  return orNull(fetchJson<Manifest>(packFileUrl(pack.current, 'manifest.json')))
}

export async function loadRules(pack: Pack): Promise<string | null> {
  if (pack.source === 'sample') return sampleRules
  return orNull(fetchText(packFileUrl(pack.current, 'rules.md')))
}

export async function loadPilot(pack: Pack): Promise<PilotResults | null> {
  if (pack.source === 'sample') return sampleResults as PilotResults
  return orNull(fetchJson<PilotResults>(PILOT_URL))
}

export type Loaded<T> =
  | { status: 'loading' }
  | { status: 'ready'; value: T }
  | { status: 'error'; message: string }

/** Runs `load` whenever `key` changes and keeps the latest result. */
export function useLoaded<T>(key: string, load: () => Promise<T>): Loaded<T> {
  const [state, setState] = useState<{ key: string; loaded: Loaded<T> }>({
    key,
    loaded: { status: 'loading' },
  })

  useEffect(() => {
    let current = true
    load().then(
      (value) => current && setState({ key, loaded: { status: 'ready', value } }),
      (error: unknown) =>
        current &&
        setState({
          key,
          loaded: { status: 'error', message: error instanceof Error ? error.message : String(error) },
        }),
    )
    return () => {
      current = false
    }
    // `load` is recreated every render; `key` says when it reads something new.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return state.key === key ? state.loaded : { status: 'loading' }
}
