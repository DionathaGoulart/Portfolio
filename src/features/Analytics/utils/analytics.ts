// ================================
// GLOBAL DECLARATIONS
// ================================
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// ================================
// TYPES & INTERFACES
// ================================

/**
 * UTM parameters and tracking identifiers structure
 */
interface UTMData {
  /** UTM source parameter */
  utm_source?: string
  /** UTM medium parameter */
  utm_medium?: string
  /** UTM campaign parameter */
  utm_campaign?: string
  /** UTM term parameter (keywords) */
  utm_term?: string
  /** UTM content parameter (ad content) */
  utm_content?: string
  /** Google Click Identifier */
  gclid?: string
  /** Facebook Click Identifier */
  fbclid?: string
  /** Microsoft Click Identifier */
  msclkid?: string
  /** DoubleClick Identifier */
  dclid?: string
  /** Google Click Source */
  gclsrc?: string
  /** Google Ads Broad Match Identifier */
  gbraid?: string
  /** Google Ads Exact Match Identifier */
  wbraid?: string
}

/**
 * Google Analytics event data structure
 */
interface AnalyticsEventData {
  event_category: string
  event_label?: string
  page_title?: string
  utm_source?: string
  utm_campaign?: string
  custom_parameter_1?: string
  [key: string]: any
}

// ================================
// CONSTANTS
// ================================
const TIME_THRESHOLD = 3000 // 3 seconds for section read tracking

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Safely get environment variable
 */
const getEnvVar = (key: string): string => {
  try {
    return (import.meta as any).env?.[key] || ''
  } catch {
    return ''
  }
}

/**
 * Check if running in development mode
 */
const isDev = (): boolean => {
  try {
    return (import.meta as any).env?.DEV || false
  } catch {
    return false
  }
}

// ================================
// MAIN ANALYTICS CLASS
// ================================

/**
 * Google Analytics integration with UTM tracking capabilities
 *
 * Handles initialization, event tracking, and UTM parameter processing
 * with automatic development mode detection and proper cleanup.
 */
class GoogleAnalytics {
  private readonly isEnabled: boolean
  private readonly measurementId: string
  private readonly isDevelopment: boolean
  private isInitialized: boolean = false

  // Title tracking state
  private currentTitleTimer: NodeJS.Timeout | null = null
  private lastTrackedTitle: string = ''

  // UTM data storage
  private utmData: UTMData | null = null

  constructor(measurementId?: string) {
    this.measurementId = measurementId || getEnvVar('VITE_GA_MEASUREMENT_ID')
    this.isDevelopment = isDev()
    this.isEnabled =
      typeof window !== 'undefined' &&
      !!this.measurementId &&
      !this.isDevelopment
  }

  // ================================
  // PRIVATE METHODS
  // ================================

  /**
   * Check if Google Analytics is properly loaded and initialized
   */
  private isGALoaded(): boolean {
    return (
      this.isInitialized &&
      typeof window !== 'undefined' &&
      window.dataLayer &&
      Array.isArray(window.dataLayer)
    )
  }

  /**
   * Send UTM data to Google Analytics as custom events
   */
  private trackUTMData(utmData: UTMData): void {
    if (!this.isGALoaded()) return

    // Main UTM parameters event
    window.gtag('event', 'utm_parameters_captured', {
      event_category: 'acquisition',
      utm_source: utmData.utm_source || 'direct',
      utm_medium: utmData.utm_medium || 'none',
      utm_campaign: utmData.utm_campaign || '(not set)',
      utm_term: utmData.utm_term || '(not set)',
      utm_content: utmData.utm_content || '(not set)',
      gclid: utmData.gclid || '(not set)',
      fbclid: utmData.fbclid || '(not set)',
      custom_parameter_1: 'utm_data_processed'
    })

    // Google Ads specific tracking
    if (utmData.gclid) {
      window.gtag('event', 'google_ads_click', {
        event_category: 'acquisition',
        event_label: 'google_ads',
        gclid: utmData.gclid
      })
    }

    // Facebook Ads specific tracking
    if (utmData.fbclid) {
      window.gtag('event', 'facebook_ads_click', {
        event_category: 'acquisition',
        event_label: 'facebook_ads',
        fbclid: utmData.fbclid
      })
    }

    console.log('UTM data sent to Google Analytics')
  }

  /**
   * Add UTM context to event data if available
   */
  private addUTMContext(eventData: AnalyticsEventData): AnalyticsEventData {
    if (this.utmData?.utm_source) {
      eventData.utm_source = this.utmData.utm_source
      eventData.utm_campaign = this.utmData.utm_campaign || '(not set)'
    }
    return eventData
  }

  // ================================
  // PUBLIC METHODS
  // ================================

  /**
   * Initialize Google Analytics with UTM support
   *
   * Sets up GA4, configures initial parameters, and processes stored UTM data
   */
  init(): void {
    if (!this.isEnabled) {
      console.log('Analytics disabled (development or missing measurement ID)')
      return
    }

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    // Initialize gtag function
    window.dataLayer = window.dataLayer || []
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args)
    }

    window.gtag('js', new Date())

    // Basic GA configuration
    const config: any = {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    }

    // Include UTM data in initial configuration if available
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

    console.log('Google Analytics initialized:', this.measurementId)

    // Send UTM data if it was processed before initialization
    if (this.utmData) {
      this.trackUTMData(this.utmData)
    }
  }

  /**
   * Process and store UTM data for tracking
   *
   * @param utmData - UTM parameters object
   */
  processUTMData(utmData: UTMData): void {
    if (!utmData || Object.keys(utmData).length === 0) return

    this.utmData = utmData

    const logMessage = this.isDevelopment
      ? 'UTM data captured (dev mode):'
      : 'UTM data processed:'

    console.log(logMessage, utmData)

    // Send UTM data immediately if GA is already initialized
    if (this.isGALoaded()) {
      this.trackUTMData(utmData)
    }
  }

  /**
   * Track title changes with time-based engagement tracking
   *
   * @param newTitle - New page title
   * @param sectionId - Optional section identifier
   */
  trackTitleChange(newTitle: string, sectionId?: string): void {
    if (!this.isEnabled) {
      console.log('Title change (dev):', newTitle)
      return
    }

    // Clear existing timer
    if (this.currentTitleTimer) {
      clearTimeout(this.currentTitleTimer)
      this.currentTitleTimer = null
    }

    // Skip if title hasn't changed
    if (newTitle === this.lastTrackedTitle) return

    // Set timer for engagement tracking
    this.currentTitleTimer = setTimeout(() => {
      if (document.title === newTitle && newTitle !== this.lastTrackedTitle) {
        this.lastTrackedTitle = newTitle

        if (!this.isGALoaded()) return

        const eventData: AnalyticsEventData = {
          event_category: 'engagement',
          event_label: sectionId || 'unknown_section',
          page_title: newTitle,
          custom_parameter_1: 'read_3_seconds'
        }

        window.gtag('event', 'section_read', this.addUTMContext(eventData))

        console.log('Section read for 3+ seconds:', newTitle)
      }
    }, TIME_THRESHOLD)
  }

  /**
   * Track button click events
   *
   * @param buttonName - Name/identifier of the clicked button
   */
  trackButtonClick(buttonName: string): void {
    if (!this.isEnabled) {
      console.log('Button click (dev):', buttonName)
      return
    }

    if (!this.isGALoaded()) return

    const eventData: AnalyticsEventData = {
      event_category: 'engagement',
      event_label: buttonName
    }

    window.gtag('event', 'click', this.addUTMContext(eventData))
  }

  /**
   * Get current UTM data
   *
   * @returns Current UTM data or null if not available
   */
  getUTMData(): UTMData | null {
    return this.utmData
  }

  /**
   * Clear title tracking timer
   *
   * Used for cleanup when components unmount
   */
  clearTitleTimer(): void {
    if (this.currentTitleTimer) {
      clearTimeout(this.currentTitleTimer)
      this.currentTitleTimer = null
    }
  }
}

// ================================
// EXPORTS
// ================================

/**
 * Global analytics instance
 *
 * Pre-configured Google Analytics instance ready for use across the application
 */
export const analytics = new GoogleAnalytics()
