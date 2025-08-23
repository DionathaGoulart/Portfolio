declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const getEnvVar = (key: string): string => {
  try {
    return (import.meta as any).env?.[key] || ''
  } catch {
    return ''
  }
}

const isDev = (): boolean => {
  try {
    return (import.meta as any).env?.DEV || false
  } catch {
    return false
  }
}

class GoogleAnalytics {
  private isEnabled: boolean
  private measurementId: string
  private isDevelopment: boolean

  constructor(measurementId?: string) {
    this.measurementId = measurementId || getEnvVar('VITE_GA_MEASUREMENT_ID')
    this.isDevelopment = isDev()
    this.isEnabled =
      typeof window !== 'undefined' &&
      !!this.measurementId &&
      !this.isDevelopment
  }

  init() {
    if (!this.isEnabled) {
      console.log(
        'Analytics desabilitado (desenvolvimento ou sem measurement ID)'
      )
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('config', this.measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    })

    console.log('Google Analytics inicializado:', this.measurementId)
  }

  // SIMPLIFICADO: Apenas rastrear cliques em botões
  trackButtonClick(buttonName: string) {
    if (!this.isEnabled) {
      console.log('Button click (dev):', buttonName)
      return
    }

    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: buttonName
    })
  }

  // SIMPLIFICADO: Apenas rastrear quando seções são visualizadas
  trackSectionView(sectionId: string, sectionLabel: string) {
    if (!this.isEnabled) {
      console.log('Section view (dev):', sectionId, sectionLabel)
      return
    }

    // Atualizar o título da página virtual
    window.gtag('config', this.measurementId, {
      page_title: `Dionatha | ${sectionLabel}`,
      page_location: `${window.location.origin}/#${sectionId}`,
      page_path: `/#${sectionId}`
    })

    // Evento de visualização de seção
    window.gtag('event', 'page_view', {
      event_category: 'navigation',
      event_label: sectionId
    })
  }
}

export const analytics = new GoogleAnalytics()
