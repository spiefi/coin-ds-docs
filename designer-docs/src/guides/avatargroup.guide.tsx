import { AvatarGroupGuide } from '../AvatarGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'avatargroup',
  label: 'Avatar Group',
  summary: 'Show several people or identities as one compact visual cue.',
  keywords: ['avatar stack', 'facepile', 'people', 'users'],
  icon: LEGACY_ICONS.avatargroup,
  Component: AvatarGroupGuide,
})
