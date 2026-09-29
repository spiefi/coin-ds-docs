import { AppBarGuide } from '../AppBarGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'appbar',
  label: 'App Bar',
  summary: 'Keep page identity, navigation and a few relevant actions together at the top of a view.',
  keywords: ['header', 'top bar', 'navigation bar', 'nav bar', 'toolbar', 'title bar'],
  icon: LEGACY_ICONS.appbar,
  Component: AppBarGuide,
})
