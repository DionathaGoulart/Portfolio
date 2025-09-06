// features/Analytics/hooks/useUTMData.ts

import { analytics } from '../utils'

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

export const useUTMData = (): UTMData | null => {
  return analytics.getUTMData()
}

// Hook para verificar se o usuário veio de uma campanha específica
export const useIsFromCampaign = (campaignName?: string): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData) return false

  // Se não especificar campanha, retorna true se houver qualquer UTM
  if (!campaignName) {
    return !!(utmData.utm_source || utmData.utm_campaign)
  }

  // Verificar campanha específica
  return utmData.utm_campaign?.toLowerCase() === campaignName.toLowerCase()
}

// Hook para verificar se veio de ads pagos
export const useIsFromPaidAds = (): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData) return false

  return !!(
    utmData.gclid || // Google Ads
    utmData.fbclid || // Facebook Ads
    utmData.msclkid || // Microsoft Ads
    (utmData.utm_medium &&
      ['cpc', 'ppc', 'paid'].includes(utmData.utm_medium.toLowerCase()))
  )
}

// Hook para verificar fonte específica
export const useIsFromSource = (source: string): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData?.utm_source) return false

  return utmData.utm_source.toLowerCase() === source.toLowerCase()
}
