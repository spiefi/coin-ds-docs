import { LayoutGuidePage } from '../LayoutGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

function StackPage() {
  return <LayoutGuidePage guide="stack" />
}

export default defineGuide({
  slug: 'stack',
  label: 'Stack',
  summary: 'Use Stack when a public component slot needs one token-driven gap and an intentional vertical or horizontal direction.',
  keywords: ['layout', 'spacing', 'gap', 'slot', 'auto layout'],
  icon: LEGACY_ICONS.stack,
  Component: StackPage,
})
