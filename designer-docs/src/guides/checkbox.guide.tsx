import { CheckboxGuide } from '../CheckboxGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'checkbox',
  label: 'Checkbox',
  summary: 'Use Checkbox for an independent yes-or-no choice. People can select more than one option in a set.',
  keywords: ['tick box', 'check box', 'multiple choice', 'multi-select'],
  icon: LEGACY_ICONS.checkbox,
  Component: CheckboxGuide,
})
