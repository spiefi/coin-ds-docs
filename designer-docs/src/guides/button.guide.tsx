import { ButtonGuide } from '../ButtonGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'button',
  label: 'Button',
  summary: 'Use Button when one clear action moves someone forward, confirms a choice, or completes a task.',
  keywords: ['CTA', 'call to action', 'primary button', 'secondary button', 'submit'],
  icon: LEGACY_ICONS.button,
  Component: ButtonGuide,
})
