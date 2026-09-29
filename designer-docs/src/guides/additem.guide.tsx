import { AddItemGuide } from '../ActionGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'additem',
  label: 'Add Item',
  summary: 'Add an attachment and show what was chosen.',
  keywords: ['upload', 'attachment', 'attach file'],
  icon: LEGACY_ICONS.additem,
  Component: AddItemGuide,
})
