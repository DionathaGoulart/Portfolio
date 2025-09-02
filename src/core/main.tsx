import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { analytics } from '@features/Analytics/utils'
import { ThemeProvider } from '@features/Theme/contexts'
import '@styles/index'

// Inicializar o GA o mais cedo possível
analytics.init()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
