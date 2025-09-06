export const removeUTMParameters = (preserveForAnalytics = true) => {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const params = url.searchParams

  // Lista de parâmetros UTM e outros parâmetros de tracking comuns
  const utmParams = [
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

  // Se preserveForAnalytics for true, captura os dados antes de remover
  const utmData: Record<string, string> = {}
  if (preserveForAnalytics) {
    utmParams.forEach((param) => {
      const value = params.get(param)
      if (value) {
        utmData[param] = value
      }
    })
  }

  let hasUTMParams = false

  // Remove os parâmetros UTM
  utmParams.forEach((param) => {
    if (params.has(param)) {
      params.delete(param)
      hasUTMParams = true
    }
  })

  // Se havia parâmetros UTM, atualiza a URL sem recarregar a página
  if (hasUTMParams) {
    const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash
    window.history.replaceState({}, '', cleanUrl)
    console.log('UTM parameters removidos da URL')

    // Retorna os dados UTM para uso no analytics
    if (preserveForAnalytics && Object.keys(utmData).length > 0) {
      return utmData
    }
  }

  return null
}
