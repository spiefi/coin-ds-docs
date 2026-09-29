import { ActionTileGuide } from '../ActionGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'actiontile',
  label: 'Action Tile',
  summary: 'A compact shortcut to one destination.',
  keywords: ['shortcut', 'quick action', 'tile', 'icon tile'],
  icon: LEGACY_ICONS.actiontile,
  Component: ActionTileGuide,
})
