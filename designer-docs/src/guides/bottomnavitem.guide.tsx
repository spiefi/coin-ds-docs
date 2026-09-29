import { BottomNavItemGuide } from '../BottomNavItemGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'bottomnavitem',
  label: 'Bottom Nav Item',
  summary: 'Show one top-level destination in the bottom navigation bar with an icon and a short label.',
  keywords: ['tab bar item', 'navigation item'],
  icon: LEGACY_ICONS.bottomnavitem,
  Component: BottomNavItemGuide,
})
