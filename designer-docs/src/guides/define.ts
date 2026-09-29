import type { ComponentType, ReactNode } from 'react'

export type GuideDefinition = {
  /** Route slug, /?component=<slug>. Must match the file name <slug>.guide.tsx. */
  slug: string
  /** Readable display name. Used for the navigation and the page title. */
  label: string
  /**
   * One sentence on when to use the component. The page lede (through
   * ComponentGuideTemplate) and search show it.
   */
  summary: string
  /** Other words people may search for, such as common names for the same pattern. */
  keywords?: readonly string[]
  /** Children of an 18×18 SVG used as the navigation icon. */
  icon: ReactNode
  Component: ComponentType
}

export function defineGuide(guide: GuideDefinition) {
  return guide
}
