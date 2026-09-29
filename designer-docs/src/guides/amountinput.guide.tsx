import { AmountInputGuide } from '../AmountInputGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'amountinput',
  label: 'Amount Input',
  summary: 'Make monetary entry primary while keeping optional detail close.',
  keywords: ['money', 'currency', 'price', 'text field', 'input', 'rupee'],
  icon: LEGACY_ICONS.amountinput,
  Component: AmountInputGuide,
})
