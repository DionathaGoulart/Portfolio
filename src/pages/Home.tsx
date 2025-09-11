import { useEffect } from 'react'
import { useSectionTracking } from '@/features/Analytics/hooks/useAnalytics'
import {
  HomeSection,
  SobreSection,
  ProjectsSection,
  SkillsSection,
  ExpSection,
  ContactSection
} from '@pages/Sections'
import { SectionConfig } from '@shared/types'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the HomePage component
 */
interface HomePageProps {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}

// ================================
// Constants
// ================================

const HOME_PAGE_SECTIONS: SectionConfig[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre-mim', label: 'Sobre Mim' },
  { id: 'meus-projetos', label: 'Projetos' },
  { id: 'habilidades-tecnicas', label: 'Habilidades' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'contato', label: 'Contato' }
]

// ================================
// Main Component
// ================================

/**
 * HomePage component - Main landing page with all sections
 * Handles section tracking and page title management
 */
export function HomePage({ setSections, setPageTitle }: HomePageProps) {
  // Enable automatic section tracking
  useSectionTracking(HOME_PAGE_SECTIONS)

  useEffect(() => {
    setSections(HOME_PAGE_SECTIONS)
    setPageTitle('Dionatha')

    return () => {
      setSections([])
    }
  }, [setSections, setPageTitle])

  return (
    <div className="space-y-80">
      <HomeSection id="inicio" />
      <SobreSection id="sobre-mim" />
      <ProjectsSection id="meus-projetos" />
      <SkillsSection id="habilidades-tecnicas" />
      <ExpSection id="experiencia" />
      <ContactSection id="contato" />
    </div>
  )
}
