import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { analytics } from '@features/Analytics/utils'
import { ThemeProvider } from '@features/Theme/contexts'
import { removeUTMParameters } from '@core/utils/urlCleaner'
import '@styles/index'

// Capturar dados UTM antes de limpar a URL
const utmData = removeUTMParameters(true)

// Processar dados UTM no analytics (se houver)
if (utmData) {
  analytics.processUTMData(utmData)
  console.log('Dados UTM processados:', utmData)
}

// Inicializar o GA
analytics.init()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
