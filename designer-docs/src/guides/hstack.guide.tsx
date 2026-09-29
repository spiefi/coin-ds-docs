import { LayoutGuidePage } from '../LayoutGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

function HStackPage() {
  return <LayoutGuidePage guide="hstack" />
}

export default defineGuide({
  slug: 'hstack',
  label: 'HStack',
  summary: 'Use HStack for a row of related content.',
  keywords: ['horizontal stack', 'row', 'layout', 'auto layout', 'spacing'],
  icon: LEGACY_ICONS.hstack,
  Component: HStackPage,
})
