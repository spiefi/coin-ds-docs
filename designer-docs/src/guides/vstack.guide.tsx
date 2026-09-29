import { LayoutGuidePage } from '../LayoutGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

function VStackPage() {
  return <LayoutGuidePage guide="vstack" />
}

export default defineGuide({
  slug: 'vstack',
  label: 'VStack',
  summary: 'Use VStack for page flow, grouped details, and ordered content.',
  keywords: ['vertical stack', 'column', 'layout', 'auto layout', 'spacing'],
  icon: LEGACY_ICONS.vstack,
  Component: VStackPage,
})
