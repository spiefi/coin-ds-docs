import { ButtonGroupGuide } from '../ButtonGroupGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'buttongroup',
  label: 'Button Group',
  summary: 'Keep a few related actions in one row with shared spacing and modes.',
  keywords: ['button row', 'button bar', 'actions'],
  icon: LEGACY_ICONS.buttongroup,
  Component: ButtonGroupGuide,
})
