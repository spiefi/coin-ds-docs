import { LayoutGuidePage } from '../LayoutGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

function BreadcrumbsPage() {
  return <LayoutGuidePage guide="breadcrumbs" />
}

export default defineGuide({
  slug: 'breadcrumbs',
  label: 'Breadcrumbs',
  summary: 'Use Breadcrumbs when people need a compact path back through a hierarchy.',
  keywords: ['path', 'trail', 'hierarchy', 'back navigation'],
  icon: LEGACY_ICONS.breadcrumbs,
  Component: BreadcrumbsPage,
})
