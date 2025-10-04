import { useEffect } from 'react'

import { analytics } from '../utils/analytics'
import { Section } from '../types'

// ================================
// CONSTANTS
// ================================

/**
 * Opções para o Intersection Observer
 * Define quando uma seção é considerada visível
 */
const INTERSECTION_OPTIONS = {
  rootMargin: '-20% 0px -20% 0px',
  threshold: 0.3 // Seção deve estar pelo menos 30% visível
} as const

// ================================
// ANALYTICS HOOK
// ================================

/**
 * Hook para tracking de visibilidade de seções e atualização dinâmica do título da página
 * Usa Intersection Observer para detectar quando seções entram na viewport
 * e atualiza o título da página automaticamente
 *
 * @param {Section[]} sections - Array de seções para trackear com seus IDs e labels
 *
 * @example
 * ```tsx
 * const sections = [
 *   { id: 'home', label: 'Home' },
 *   { id: 'about', label: 'Sobre Mim' },
 *   { id: 'projects', label: 'Projetos' }
 * ]
 *
 * useSectionTracking(sections)
 * ```
 */
export const useSectionTracking = (sections: Section[]): void => {
  useEffect(() => {
    // Retorno antecipado se não há seções para trackear
    if (sections.length === 0) return

    // ================================
    // CONFIGURAÇÃO DO INTERSECTION OBSERVER
    // ================================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        const section = sections.find((s) => s.id === sectionId)

        if (!section) return

        // Atualiza título quando seção se torna visível
        if (entry.isIntersecting) {
          const newTitle = `Dionatha | ${section.label}`

          // Atualiza título da página
          document.title = newTitle

          // Inicia tracking baseado em tempo
          analytics.trackTitleChange(newTitle, sectionId)
        }
      })
    }, INTERSECTION_OPTIONS)

    // ================================
    // INICIALIZAÇÃO DO OBSERVER
    // ================================
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    // ================================
    // CLEANUP
    // ================================
    return () => {
      observer.disconnect()
      analytics.clearTitleTimer()
    }
  }, [sections])
}
