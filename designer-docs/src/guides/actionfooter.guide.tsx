import { ActionFooterGuide } from '../ActionGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'actionfooter',
  label: 'Action Footer',
  summary: 'Keep the next step close to the decision.',
  keywords: ['sticky footer', 'bottom bar', 'call to action', 'CTA', 'primary action'],
  icon: LEGACY_ICONS.actionfooter,
  Component: ActionFooterGuide,
})
