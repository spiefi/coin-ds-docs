import { AvatarGuide } from '../AvatarGuides'
import { defineGuide } from './define'
import { LEGACY_ICONS } from './icons'

export default defineGuide({
  slug: 'avatar',
  label: 'Avatar',
  summary: 'Represent one person or account with an image or initials.',
  keywords: ['profile picture', 'profile photo', 'initials', 'monogram', 'user'],
  icon: LEGACY_ICONS.avatar,
  Component: AvatarGuide,
})
