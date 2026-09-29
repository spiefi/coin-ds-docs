import { AttachedGuide } from '../AttachedGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'attached',
  label: 'Attached',
  summary: 'Add a subordinate signal to a main item without altering its footprint.',
  keywords: ['corner badge', 'overlay badge', 'indicator'],
  icon: LEGACY_ICONS.attached,
  Component: AttachedGuide,
})
