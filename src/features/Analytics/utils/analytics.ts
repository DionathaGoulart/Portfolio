// utils/analytics.ts - Versão simplificada com tracking de título por tempo + botões

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

  // Controle de tempo para tracking do título
  private currentTitleTimer: NodeJS.Timeout | null = null
  private lastTrackedTitle: string = ''
  private readonly TIME_THRESHOLD = 3000 // 3 segundos

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

  // Método para rastrear permanência por tempo no título
  trackTitleChange(newTitle: string, sectionId?: string) {
    if (!this.isEnabled) {
      console.log('Title change (dev):', newTitle)
      return
    }

    // Limpar timer anterior se existir
    if (this.currentTitleTimer) {
      clearTimeout(this.currentTitleTimer)
      this.currentTitleTimer = null
    }

    // Se o título não mudou, não fazer nada
    if (newTitle === this.lastTrackedTitle) {
      return
    }

    // Definir timer para rastrear após 3 segundos
    this.currentTitleTimer = setTimeout(() => {
      // Verificar se o título ainda é o mesmo após 3 segundos
      if (document.title === newTitle && newTitle !== this.lastTrackedTitle) {
        this.lastTrackedTitle = newTitle

        // Enviar evento de leitura da seção
        window.gtag('event', 'section_read', {
          event_category: 'engagement',
          event_label: sectionId || 'unknown_section',
          page_title: newTitle,
          custom_parameter_1: 'read_3_seconds'
        })

        console.log('Seção lida por 3+ segundos:', newTitle)
      }
    }, this.TIME_THRESHOLD)
  }

  // Rastrear cliques em botões (mantido como estava)
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

  // Método para limpar timers quando necessário
  clearTitleTimer() {
    if (this.currentTitleTimer) {
      clearTimeout(this.currentTitleTimer)
      this.currentTitleTimer = null
    }
  }
}

export const analytics = new GoogleAnalytics()
