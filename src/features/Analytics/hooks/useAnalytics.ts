// Hook atualizado para usar o novo sistema de tracking
// hooks/useAnalytics.ts
import { useEffect } from 'react'
import { analytics } from '../utils/analytics'

export const useSectionTracking = (
  sections: { id: string; label: string }[]
) => {
  useEffect(() => {
    if (sections.length === 0) return

    // Observer para detectar mudanças de seção
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          const section = sections.find((s) => s.id === sectionId)

          if (!section) return

          // Quando uma seção fica visível, atualizar o título
          if (entry.isIntersecting) {
            const newTitle = `Dionatha | ${section.label}`

            // Atualizar título da página
            document.title = newTitle

            // Iniciar tracking por tempo
            analytics.trackTitleChange(newTitle, sectionId)
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
      analytics.clearTitleTimer() // Limpar timer quando o componente desmontar
    }
  }, [sections])
}
