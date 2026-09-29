import { BadgeGuide } from '../BadgeGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'badge',
  label: 'Badge',
  summary: 'Use a Badge to make a short status, category, or count easy to scan beside the content it describes.',
  keywords: ['tag', 'label', 'pill', 'status', 'lozenge', 'count'],
  icon: LEGACY_ICONS.badge,
  Component: BadgeGuide,
})
