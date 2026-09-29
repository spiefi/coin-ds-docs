import { CheckboxItemGuide } from '../CheckboxItemGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'checkboxitem',
  label: 'Checkbox Item',
  summary: 'Use Checkbox Item for a selectable row with a clear label and, when needed, a supporting action.',
  keywords: ['checkbox row', 'selectable row', 'list item', 'option row'],
  icon: LEGACY_ICONS.checkboxitem,
  Component: CheckboxItemGuide,
})
