// ================================
// ANALYTICS TYPES & INTERFACES
// ================================

/**
 * Estrutura de parâmetros UTM e identificadores de tracking
 *
 * @interface UTMData
 * @property {string} utm_source - Parâmetro UTM source
 * @property {string} utm_medium - Parâmetro UTM medium
 * @property {string} utm_campaign - Parâmetro UTM campaign
 * @property {string} utm_term - Parâmetro UTM term (keywords)
 * @property {string} utm_content - Parâmetro UTM content (ad content)
 * @property {string} gclid - Google Click Identifier
 * @property {string} fbclid - Facebook Click Identifier
 * @property {string} msclkid - Microsoft Click Identifier
 * @property {string} dclid - DoubleClick Identifier
 * @property {string} gclsrc - Google Click Source
 * @property {string} gbraid - Google Ads Broad Match Identifier
 * @property {string} wbraid - Google Ads Exact Match Identifier
 */
export interface UTMData {
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

/**
 * Estrutura de dados de evento do Google Analytics
 *
 * @interface AnalyticsEventData
 * @property {string} event_category - Categoria do evento
 * @property {string} event_label - Label do evento
 * @property {string} page_title - Título da página
 * @property {string} utm_source - Fonte UTM
 * @property {string} utm_campaign - Campanha UTM
 * @property {string} custom_parameter_1 - Parâmetro customizado
 * @property {any} [key] - Outros parâmetros dinâmicos
 */
export interface AnalyticsEventData {
  event_category: string
  event_label?: string
  page_title?: string
  utm_source?: string
  utm_campaign?: string
  custom_parameter_1?: string
  [key: string]: unknown
}

/**
 * Configuração de seção para tracking de analytics
 *
 * @interface Section
 * @property {string} id - Identificador único da seção
 * @property {string} label - Label legível para humanos
 */
export interface Section {
  id: string
  label: string
}

// ================================
// GLOBAL DECLARATIONS
// ================================

/**
 * Extensão da interface Window para Google Analytics
 */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}
