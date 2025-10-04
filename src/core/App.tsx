import React, { JSX } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter, appRoutes } from '@core'

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
