import { AutoplayControlGuide } from '../AutoplayControlGuide'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'autoplaycontrol',
  label: 'Autoplay Control',
  summary: 'Let people pause and resume content that advances on its own, such as a slideshow.',
  keywords: ['play', 'pause', 'carousel', 'slideshow'],
  icon: LEGACY_ICONS.autoplaycontrol,
  Component: AutoplayControlGuide,
})
