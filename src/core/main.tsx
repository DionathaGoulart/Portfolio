import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { analytics } from '@features/Analytics/utils'
import { ThemeProvider } from '@features/Theme/contexts'
import { removeUTMParameters } from '@core/utils/urlCleaner'

import '@styles/index'

// ================================
// Application Initialization
// ================================

// Capture UTM data before cleaning the URL for analytics
const utmData = removeUTMParameters(true)

// Process UTM data in analytics if available
if (utmData) {
  analytics.processUTMData(utmData)
  console.log('Dados UTM processados:', utmData)
}

// Initialize Google Analytics
analytics.init()

// ================================
// React Application Mount
// ================================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
