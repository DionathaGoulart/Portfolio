// features/Analytics/utils/index.ts - Versão atualizada com UTM

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface UTMData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  dclid?: string
  gclsrc?: string
  gbraid?: string
  wbraid?: string
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
  private isInitialized: boolean = false

  // Controle de tempo para tracking do título
  private currentTitleTimer: NodeJS.Timeout | null = null
  private lastTrackedTitle: string = ''
  private readonly TIME_THRESHOLD = 3000 // 3 segundos

  // Armazenar dados UTM para uso posterior
  private utmData: UTMData | null = null

  constructor(measurementId?: string) {
    this.measurementId = measurementId || getEnvVar('VITE_GA_MEASUREMENT_ID')
    this.isDevelopment = isDev()
    this.isEnabled =
      typeof window !== 'undefined' &&
      !!this.measurementId &&
      !this.isDevelopment
  }

  // Verificar se o Google Analytics foi realmente carregado
  private isGALoaded(): boolean {
    return (
      this.isInitialized &&
      typeof window !== 'undefined' &&
      window.dataLayer &&
      Array.isArray(window.dataLayer)
    )
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
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args)
    }

    window.gtag('js', new Date())

    // Configuração básica do GA
    const config: any = {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    }

    // Se temos dados UTM, incluir na configuração inicial
    if (this.utmData) {
      if (this.utmData.utm_source)
        config.campaign_source = this.utmData.utm_source
      if (this.utmData.utm_medium)
        config.campaign_medium = this.utmData.utm_medium
      if (this.utmData.utm_campaign)
        config.campaign_name = this.utmData.utm_campaign
      if (this.utmData.utm_term) config.campaign_term = this.utmData.utm_term
      if (this.utmData.utm_content)
        config.campaign_content = this.utmData.utm_content
    }

    window.gtag('config', this.measurementId, config)
    this.isInitialized = true

    console.log('Google Analytics inicializado:', this.measurementId)

    // Se havia dados UTM, enviar evento personalizado
    if (this.utmData) {
      this.trackUTMData(this.utmData)
    }
  }

  // Método para processar e armazenar dados UTM
  processUTMData(utmData: UTMData) {
    if (!utmData || Object.keys(utmData).length === 0) return

    this.utmData = utmData

    if (!this.isDevelopment) {
      console.log('Dados UTM processados:', utmData)
    } else {
      console.log('Dados UTM capturados (dev mode):', utmData)
    }

    // Se o GA já foi inicializado, enviar os dados imediatamente
    if (this.isGALoaded()) {
      this.trackUTMData(utmData)
    }
  }

  // Enviar dados UTM para o GA como evento personalizado
  private trackUTMData(utmData: UTMData) {
    if (!this.isGALoaded()) return

    // Evento personalizado com dados UTM
    window.gtag('event', 'utm_parameters_captured', {
      event_category: 'acquisition',
      utm_source: utmData.utm_source || 'direct',
      utm_medium: utmData.utm_medium || 'none',
      utm_campaign: utmData.utm_campaign || '(not set)',
      utm_term: utmData.utm_term || '(not set)',
      utm_content: utmData.utm_content || '(not set)',
      // Dados de cliques pagos
      gclid: utmData.gclid || '(not set)',
      fbclid: utmData.fbclid || '(not set)',
      custom_parameter_1: 'utm_data_processed'
    })

    // Se houver gclid (Google Ads), enviar evento específico
    if (utmData.gclid) {
      window.gtag('event', 'google_ads_click', {
        event_category: 'acquisition',
        event_label: 'google_ads',
        gclid: utmData.gclid
      })
    }

    // Se houver fbclid (Facebook), enviar evento específico
    if (utmData.fbclid) {
      window.gtag('event', 'facebook_ads_click', {
        event_category: 'acquisition',
        event_label: 'facebook_ads',
        fbclid: utmData.fbclid
      })
    }

    console.log('Dados UTM enviados para Google Analytics')
  }

  // Método para rastrear permanência por tempo no título
  trackTitleChange(newTitle: string, sectionId?: string) {
    if (!this.isEnabled) {
      console.log('Title change (dev):', newTitle)
      return
    }

    if (this.currentTitleTimer) {
      clearTimeout(this.currentTitleTimer)
      this.currentTitleTimer = null
    }

    if (newTitle === this.lastTrackedTitle) {
      return
    }

    this.currentTitleTimer = setTimeout(() => {
      if (document.title === newTitle && newTitle !== this.lastTrackedTitle) {
        this.lastTrackedTitle = newTitle

        if (!this.isGALoaded()) return

        // Incluir dados UTM no evento de seção lida se disponível
        const eventData: any = {
          event_category: 'engagement',
          event_label: sectionId || 'unknown_section',
          page_title: newTitle,
          custom_parameter_1: 'read_3_seconds'
        }

        // Adicionar contexto UTM se disponível
        if (this.utmData?.utm_source) {
          eventData.utm_source = this.utmData.utm_source
          eventData.utm_campaign = this.utmData.utm_campaign || '(not set)'
        }

        window.gtag('event', 'section_read', eventData)

        console.log('Seção lida por 3+ segundos:', newTitle)
      }
    }, this.TIME_THRESHOLD)
  }

  // Rastrear cliques em botões
  trackButtonClick(buttonName: string) {
    if (!this.isEnabled) {
      console.log('Button click (dev):', buttonName)
      return
    }

    if (!this.isGALoaded()) return

    const eventData: any = {
      event_category: 'engagement',
      event_label: buttonName
    }

    // Adicionar contexto UTM se disponível
    if (this.utmData?.utm_source) {
      eventData.utm_source = this.utmData.utm_source
      eventData.utm_campaign = this.utmData.utm_campaign || '(not set)'
    }

    window.gtag('event', 'click', eventData)
  }

  // Método para obter dados UTM atuais
  getUTMData(): UTMData | null {
    return this.utmData
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
