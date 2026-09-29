import { createContext, useContext } from 'react'

// Search triggers. They only open the dialog, so the navigation can render
// them without importing the dialog (which imports the navigation).

export const OpenSearchContext = createContext<() => void>(() => {})

const IS_APPLE =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

/** The keyboard shortcut as people should read it. */
export const SEARCH_SHORTCUT = IS_APPLE ? '⌘K' : 'Ctrl K'

export function SearchIcon() {
  return (
    <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="m13.25 13.25 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function SearchButton({ variant }: { variant: 'sidebar' | 'hero' | 'icon' }) {
  const openSearch = useContext(OpenSearchContext)

  if (variant === 'icon') {
    return (
      <button
        type="button"
        className="search-icon-button"
        aria-label="Search components"
        aria-haspopup="dialog"
        onClick={openSearch}
      >
        <SearchIcon />
      </button>
    )
  }

  return (
    <button
      type="button"
      className={'search-trigger search-trigger-' + variant}
      aria-haspopup="dialog"
      aria-keyshortcuts={IS_APPLE ? 'Meta+K' : 'Control+K'}
      onClick={openSearch}
    >
      <SearchIcon />
      <span>{variant === 'hero' ? 'Search components' : 'Search'}</span>
      <kbd aria-hidden="true">{SEARCH_SHORTCUT}</kbd>
    </button>
  )
}
