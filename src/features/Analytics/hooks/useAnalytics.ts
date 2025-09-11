import { useEffect } from 'react'
import { analytics } from '../utils/analytics'

// ================================
// TYPES & INTERFACES
// ================================

/**
 * Section configuration for analytics tracking
 */
interface Section {
  /** Unique identifier for the section */
  id: string
  /** Human-readable label for the section */
  label: string
}

// ================================
// CONSTANTS
// ================================
const INTERSECTION_OPTIONS = {
  rootMargin: '-20% 0px -20% 0px',
  threshold: 0.3 // Section must be at least 30% visible
} as const

// ================================
// MAIN HOOK
// ================================

/**
 * Hook for tracking section visibility and updating page title dynamically
 *
 * @param sections - Array of sections to track with their IDs and labels
 *
 * @example
 * ```tsx
 * const sections = [
 *   { id: 'home', label: 'Home' },
 *   { id: 'about', label: 'About Me' },
 *   { id: 'projects', label: 'Projects' }
 * ]
 *
 * useSectionTracking(sections)
 * ```
 */
export const useSectionTracking = (sections: Section[]) => {
  useEffect(() => {
    // Early return if no sections to track
    if (sections.length === 0) return

    // ================================
    // INTERSECTION OBSERVER SETUP
    // ================================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        const section = sections.find((s) => s.id === sectionId)

        if (!section) return

        // Update title when section becomes visible
        if (entry.isIntersecting) {
          const newTitle = `Dionatha | ${section.label}`

          // Update page title
          document.title = newTitle

          // Start time-based tracking
          analytics.trackTitleChange(newTitle, sectionId)
        }
      })
    }, INTERSECTION_OPTIONS)

    // ================================
    // OBSERVER INITIALIZATION
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
