import { useEffect } from 'react'
import { analytics } from '../utils/analytics'

// Hook personalizado para usar no React
export const useAnalytics = () => {
  useEffect(() => {
    analytics.init()
  }, [])

  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackSectionView: analytics.trackSectionView.bind(analytics),
    trackSectionEngagement: analytics.trackSectionEngagement.bind(analytics)
  }
}

// Hook para rastrear seções automaticamente
export const useSectionTracking = (
  sections: { id: string; label: string }[]
) => {
  const { trackSectionView, trackSectionEngagement } = useAnalytics()

  useEffect(() => {
    if (sections.length === 0) return

    const sectionTimes = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          const section = sections.find((s) => s.id === sectionId)

          if (!section) return

          if (entry.isIntersecting) {
            // Seção entrou na viewport
            sectionTimes.set(sectionId, Date.now())
            trackSectionView(sectionId, section.label)
          } else if (sectionTimes.has(sectionId)) {
            // Seção saiu da viewport - calcular tempo gasto
            const startTime = sectionTimes.get(sectionId)!
            const timeSpent = Date.now() - startTime

            // Só rastrear se ficou mais de 2 segundos
            if (timeSpent > 2000) {
              trackSectionEngagement(sectionId, timeSpent)
            }

            sectionTimes.delete(sectionId)
          }
        })
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.5
      }
    )

    // Observar todas as seções
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
      sectionTimes.clear()
    }
  }, [sections, trackSectionView, trackSectionEngagement])
}
