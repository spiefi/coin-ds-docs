import type { GuideDefinition } from './define'

// Holds the registered guides. It imports no guide modules, so navigation
// and page shells can read it without creating an import cycle.

let guides: readonly GuideDefinition[] = []

export function registerGuides(list: readonly GuideDefinition[]) {
  guides = [...list].sort((a, b) => a.label.localeCompare(b.label, 'en'))
}

/** All guides in navigation order (alphabetical by label). */
export function listGuides() {
  return guides
}

/** The guide registered for a slug; undefined when there is none. */
export function findGuide(slug: string | null | undefined) {
  return guides.find((guide) => guide.slug === slug)
}
