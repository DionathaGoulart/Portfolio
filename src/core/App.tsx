import { JSX } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './router'
import { appRoutes } from '@/core/router/routes'

// ================================
// Main Application Component
// ================================

/**
 * Root App component
 * Sets up routing with React Router and renders the application
 */
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter routes={appRoutes} />
    </BrowserRouter>
  )
}

export default App
