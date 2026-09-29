import { useLayoutEffect, useRef } from 'react'
import { useGuideLocation } from './GuideNavigation'
import { findGuide } from './guides/registry'
import { HomePage } from './site/HomePage'
import { SearchProvider } from './site/Search'

function App() {
  const location = useGuideLocation()
  const previousRouteRef = useRef<string | null>(null)

  useLayoutEffect(() => {
    const routeKey = `${location.pathname}${location.search}`
    const previousRoute = previousRouteRef.current
    previousRouteRef.current = routeKey

    if (!previousRoute || previousRoute === routeKey) return

    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [location.pathname, location.search])

  const requested = new URLSearchParams(location.search).get('component')
  const guide = findGuide(requested)

  return (
    <SearchProvider>
      {guide ? <guide.Component /> : <HomePage missing={requested || undefined} />}
    </SearchProvider>
  )
}

export default App
