import { useEffect } from 'react'
import { analytics } from '../utils/analytics'

// Hook simplificado apenas para tracking de seções
export const useSectionTracking = (
  sections: { id: string; label: string }[]
) => {
  useEffect(() => {
    if (sections.length === 0) return

    const sectionTimes = new Map<string, number>()
    const trackedSections = new Set<string>() // Para evitar múltiplos tracks da mesma seção

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          const section = sections.find((s) => s.id === sectionId)

          if (!section) return

          if (entry.isIntersecting) {
            // Seção entrou na viewport
            sectionTimes.set(sectionId, Date.now())

            // Só rastrear uma vez por seção durante a sessão
            if (!trackedSections.has(sectionId)) {
              analytics.trackSectionView(sectionId, section.label)
              trackedSections.add(sectionId)
            }
          } else if (sectionTimes.has(sectionId)) {
            // Seção saiu da viewport
            sectionTimes.delete(sectionId)
          }
        })
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3 // Seção deve estar pelo menos 30% visível
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
  }, [sections])
}
