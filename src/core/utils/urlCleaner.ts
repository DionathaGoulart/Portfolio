// ================================
// URL Cleaning Utility
// ================================

// Common tracking parameters to remove from URLs
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

/**
 * Remove UTM and tracking parameters from the current URL
 * Optionally preserves tracking data for analytics before removal
 *
 * @param preserveForAnalytics - Whether to capture UTM data before removal
 * @returns UTM data object if preserved, null otherwise
 */
export const removeUTMParameters = (
  preserveForAnalytics = true
): Record<string, string> | null => {
  // Early return for server-side rendering
  if (typeof window === 'undefined') return null

  const url = new URL(window.location.href)
  const params = url.searchParams
  const utmData: Record<string, string> = {}
  let hasTrackingParams = false

  // Capture UTM data before removal if requested
  if (preserveForAnalytics) {
    TRACKING_PARAMS.forEach((param) => {
      const value = params.get(param)
      if (value) {
        utmData[param] = value
      }
    })
  }

  // Remove tracking parameters from URL
  TRACKING_PARAMS.forEach((param) => {
    if (params.has(param)) {
      params.delete(param)
      hasTrackingParams = true
    }
  })

  // Update URL without page reload if tracking params were found
  if (hasTrackingParams) {
    const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash
    window.history.replaceState({}, '', cleanUrl)
    console.log('UTM parameters removidos da URL')

    // Return captured UTM data for analytics
    if (preserveForAnalytics && Object.keys(utmData).length > 0) {
      return utmData
    }
  }

  return null
}
