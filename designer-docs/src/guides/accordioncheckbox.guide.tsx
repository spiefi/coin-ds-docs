import { AccordionCheckboxGuide } from '../AccordionCheckboxGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'accordioncheckbox',
  label: 'Accordion Checkbox',
  summary: 'Group related choices behind a clear heading. People can select the group and open its options independently.',
  keywords: ['collapsible', 'expandable', 'nested options', 'grouped checkboxes'],
  icon: LEGACY_ICONS.accordioncheckbox,
  Component: AccordionCheckboxGuide,
})
