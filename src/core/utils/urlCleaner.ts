// ================================
// URL CLEANING UTILITY
// ================================

/**
 * Parâmetros de tracking comuns para remover de URLs
 * Inclui UTM parameters e outros identificadores de campanha
 */
const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid', // Google Ads
  'fbclid', // Facebook
  'msclkid', // Microsoft/Bing
  'dclid', // Google Display & Video 360
  'gclsrc', // Google Ads Source
  'gbraid', // Google Analytics Enhanced Conversions
  'wbraid' // Google Analytics Enhanced Conversions
]

// ================================
// URL CLEANING FUNCTIONS
// ================================

/**
 * Remove parâmetros UTM e de tracking da URL atual
 * Opcionalmente preserva dados de tracking para analytics antes da remoção
 *
 * @param {boolean} preserveForAnalytics - Se deve capturar dados UTM antes da remoção
 * @returns {Record<string, string> | null} Objeto com dados UTM se preservados, null caso contrário
 *
 * @example
 * ```typescript
 * // Remove parâmetros e preserva para analytics
 * const utmData = removeUTMParameters(true)
 * if (utmData) {
 *   analytics.processUTMData(utmData)
 * }
 *
 * // Remove parâmetros sem preservar
 * removeUTMParameters(false)
 * ```
 */
export const removeUTMParameters = (
  preserveForAnalytics = true
): Record<string, string> | null => {
  // Retorno antecipado para server-side rendering
  if (typeof window === 'undefined') return null

  const url = new URL(window.location.href)
  const params = url.searchParams
  const utmData: Record<string, string> = {}
  let hasTrackingParams = false

  // Captura dados UTM antes da remoção se solicitado
  if (preserveForAnalytics) {
    TRACKING_PARAMS.forEach((param) => {
      const value = params.get(param)
      if (value) {
        utmData[param] = value
      }
    })
  }

  // Remove parâmetros de tracking da URL
  TRACKING_PARAMS.forEach((param) => {
    if (params.has(param)) {
      params.delete(param)
      hasTrackingParams = true
    }
  })

  // Atualiza URL sem recarregar página se parâmetros de tracking foram encontrados
  if (hasTrackingParams) {
    const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash
    window.history.replaceState({}, '', cleanUrl)

    // Retorna dados UTM capturados para analytics
    if (preserveForAnalytics && Object.keys(utmData).length > 0) {
      return utmData
    }
  }

  return null
}
