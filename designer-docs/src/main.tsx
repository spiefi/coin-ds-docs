import React from 'react'
import { createRoot } from 'react-dom/client'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import App from './App'
import './styles.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Documentation root was not found')
}

// Coin components such as DropdownInput require safe-area insets from the app
// root. A browser page has none, so provide zero insets directly: unlike
// SafeAreaProvider, this adds no wrapper element that would change page layout.
const NO_INSETS = { top: 0, right: 0, bottom: 0, left: 0 }

createRoot(root).render(
  <React.StrictMode>
    <SafeAreaInsetsContext.Provider value={NO_INSETS}>
      <App />
    </SafeAreaInsetsContext.Provider>
  </React.StrictMode>,
)
