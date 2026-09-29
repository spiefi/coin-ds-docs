import { BrandChipGuide } from '../BrandChipGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'brandchip',
  label: 'Brand Chip',
  summary: 'Use Brand Chip to identify a linked brand or account with an avatar and a short label.',
  keywords: ['chip', 'logo', 'bank', 'merchant', 'linked account'],
  icon: LEGACY_ICONS.brandchip,
  Component: BrandChipGuide,
})
