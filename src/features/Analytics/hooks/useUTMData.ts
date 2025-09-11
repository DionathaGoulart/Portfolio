import { analytics } from '../utils'

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

// ================================
// CONSTANTS
// ================================
const PAID_AD_MEDIUMS = ['cpc', 'ppc', 'paid'] as const

// ================================
// MAIN HOOKS
// ================================

/**
 * Hook to retrieve UTM data from analytics
 *
 * @returns UTM data object or null if no data available
 *
 * @example
 * ```tsx
 * const utmData = useUTMData()
 * if (utmData?.utm_source) {
 *   console.log('Traffic source:', utmData.utm_source)
 * }
 * ```
 */
export const useUTMData = (): UTMData | null => {
  return analytics.getUTMData()
}

/**
 * Hook to check if user came from a specific campaign
 *
 * @param campaignName - Optional campaign name to check against
 * @returns true if from specified campaign, or any campaign if no name provided
 *
 * @example
 * ```tsx
 * const isFromSummer2024 = useIsFromCampaign('summer2024')
 * const isFromAnyCampaign = useIsFromCampaign()
 * ```
 */
export const useIsFromCampaign = (campaignName?: string): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData) return false

  // If no campaign specified, return true if any UTM data exists
  if (!campaignName) {
    return !!(utmData.utm_source || utmData.utm_campaign)
  }

  // Check specific campaign (case-insensitive)
  return utmData.utm_campaign?.toLowerCase() === campaignName.toLowerCase()
}

/**
 * Hook to check if user came from paid advertising
 *
 * @returns true if traffic originated from paid ads (Google, Facebook, Microsoft, etc.)
 *
 * @example
 * ```tsx
 * const isFromAds = useIsFromPaidAds()
 * if (isFromAds) {
 *   // Show paid traffic specific content
 * }
 * ```
 */
export const useIsFromPaidAds = (): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData) return false

  return !!(
    utmData.gclid || // Google Ads
    utmData.fbclid || // Facebook Ads
    utmData.msclkid || // Microsoft Ads
    (utmData.utm_medium &&
      PAID_AD_MEDIUMS.includes(utmData.utm_medium.toLowerCase() as any))
  )
}

/**
 * Hook to check if user came from a specific traffic source
 *
 * @param source - The source to check against (e.g., 'google', 'facebook')
 * @returns true if traffic came from the specified source
 *
 * @example
 * ```tsx
 * const isFromGoogle = useIsFromSource('google')
 * const isFromFacebook = useIsFromSource('facebook')
 * ```
 */
export const useIsFromSource = (source: string): boolean => {
  const utmData = analytics.getUTMData()

  if (!utmData?.utm_source) return false

  return utmData.utm_source.toLowerCase() === source.toLowerCase()
}
