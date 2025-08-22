import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@/shared/contexts/ThemeContext'

import '@styles/index'
import { analytics } from '@/features/Analytics/utils/analytics'

// Inicializar o GA o mais cedo possível
analytics.init()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
