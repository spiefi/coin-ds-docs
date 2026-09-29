import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { GuideIcon, guideHref, navigateGuide } from '../GuideNavigation'
import { listGuides } from '../guides/store'
import { highlight, searchGuides, type SearchResult, type TextPart } from './matching'
import { OpenSearchContext, SearchIcon } from './SearchButton'

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

function Marked({ parts }: { parts: TextPart[] }) {
  return parts.map((part, index) => (
    <Fragment key={index}>{part.match ? <mark>{part.text}</mark> : part.text}</Fragment>
  ))
}

/** Provides the search dialog and its shortcuts: ⌘K or Ctrl+K, and / outside text fields. */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing || event.altKey) return
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey) && !event.shiftKey) {
        event.preventDefault()
        setOpen((current) => !current)
      } else if (event.key === '/' && !event.metaKey && !event.ctrlKey && !isEditable(event.target)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <OpenSearchContext.Provider value={openSearch}>
      {children}
      <SearchDialog open={open} onClose={closeSearch} />
    </OpenSearchContext.Provider>
  )
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const pressedBackdrop = useRef(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const id = useId()
  const results = useMemo(() => searchGuides(listGuides(), query), [query])
  const listId = `${id}-results`
  const optionId = (slug: string) => `${id}-${slug}`
  const activeSlug = results[active]?.guide.slug
  const searched = query.trim()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      inputRef.current?.select()
      setActive(0)
      listRef.current?.scrollTo({ top: 0 })
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Escape, the close button, and choosing a result all close the dialog natively.
  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.addEventListener('close', onClose)
    return () => dialog?.removeEventListener('close', onClose)
  }, [onClose])

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [active, results])

  const choose = (result: SearchResult | undefined) => {
    if (!result) return
    // Close first so focus returns before the new page moves it to its content.
    dialogRef.current?.close()
    navigateGuide(new URL(guideHref(result.guide.slug), window.location.href))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return
    const count = results.length
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (count) setActive((index) => (index + (event.key === 'ArrowDown' ? 1 : count - 1)) % count)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choose(results[active])
    }
  }

  const handleOptionClick = (event: MouseEvent<HTMLAnchorElement>, result: SearchResult) => {
    // Modified clicks keep their browser meaning, such as opening a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    choose(result)
  }

  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      aria-label="Search components"
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="search-field">
        <SearchIcon />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Search components"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeSlug ? optionId(activeSlug) : undefined}
          placeholder="Search components"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="go"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="search-close"
          aria-label="Close search"
          onClick={() => dialogRef.current?.close()}
        >
          <span className="search-close-key">Esc</span>
          <span className="search-close-label">Cancel</span>
        </button>
      </div>

      <p className="search-meta" role="status">
        {searched
          ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
          : `All components · ${results.length}`}
      </p>

      <div className="search-results" id={listId} role="listbox" aria-label="Components" ref={listRef}>
        {results.map((result, index) => (
          <a
            className="search-option"
            id={optionId(result.guide.slug)}
            role="option"
            aria-selected={index === active}
            href={guideHref(result.guide.slug)}
            tabIndex={-1}
            key={result.guide.slug}
            onMouseMove={() => setActive(index)}
            onClick={(event) => handleOptionClick(event, result)}
          >
            <span className="search-option-icon" aria-hidden="true">
              <GuideIcon icon={result.guide.icon} />
            </span>
            <span className="search-option-text">
              <span className="search-option-name">
                <span>
                  <Marked parts={highlight(result.guide.label, query, { name: true })} />
                </span>
                {result.alias && <span className="search-option-alias">{result.alias}</span>}
              </span>
              <span className="search-option-summary">
                <Marked parts={highlight(result.guide.summary, query)} />
              </span>
            </span>
            <svg className="search-option-enter" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M12.5 3.5v5a1.5 1.5 0 0 1-1.5 1.5H4m2.5-3L3.5 10l3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>

      {!results.length && (
        <div className="search-empty">
          <p>No components match “{searched}”.</p>
          <p>Try another name, or what you need it for, such as “select” or “menu”.</p>
        </div>
      )}

      <footer className="search-footer" aria-hidden="true">
        <span><kbd>↑</kbd><kbd>↓</kbd> to move</span>
        <span><kbd>↵</kbd> to open</span>
        <span><kbd>esc</kbd> to close</span>
      </footer>
    </dialog>
  )
}
