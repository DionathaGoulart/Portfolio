declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export interface GAPageView {
  page_title: string
  page_location: string
  page_path?: string
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
  }

  trackPageView(pageData: GAPageView) {
    if (!this.isEnabled) {
      return
    }

    window.gtag('config', this.measurementId, {
      page_title: pageData.page_title,
      page_location: pageData.page_location,
      page_path: pageData.page_path || window.location.pathname
    })
  }

  trackEvent(event: GAEvent) {
    if (!this.isEnabled) {
      return
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    })
  }

  trackButtonClick(buttonName: string, section?: string) {
    this.trackEvent({
      action: 'click',
      category: 'engagement',
      label: section ? `${buttonName}_${section}` : buttonName
    })
  }

  trackSectionView(sectionId: string, sectionLabel: string) {
    this.trackPageView({
      page_title: `Dionatha | ${sectionLabel}`,
      page_location: `${window.location.origin}/#${sectionId}`,
      page_path: `/#${sectionId}`
    })

    this.trackEvent({
      action: 'section_view',
      category: 'navigation',
      label: sectionId
    })
  }

  trackSectionEngagement(sectionId: string, timeSpent: number) {
    this.trackEvent({
      action: 'section_engagement',
      category: 'engagement',
      label: sectionId,
      value: Math.round(timeSpent / 1000)
    })
  }
}

export const analytics = new GoogleAnalytics()
