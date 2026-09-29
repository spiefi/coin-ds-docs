import { AccordionGuide } from '../AccordionGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'accordion',
  label: 'Accordion',
  summary: 'Reveal supporting details when people need them, while keeping the page easy to scan.',
  keywords: ['collapsible', 'expandable', 'disclosure', 'FAQ'],
  icon: LEGACY_ICONS.accordion,
  Component: AccordionGuide,
})
