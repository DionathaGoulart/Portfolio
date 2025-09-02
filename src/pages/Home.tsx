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

interface HomePageProps {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}

export function HomePage({ setSections, setPageTitle }: HomePageProps) {
  const homePageSections: SectionConfig[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre-mim', label: 'Sobre Mim' },
    { id: 'meus-projetos', label: 'Projetos' },
    { id: 'habilidades-tecnicas', label: 'Habilidades' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'contato', label: 'Contato' }
  ]

  // TRACKING: Ativar tracking automático das seções
  useSectionTracking(homePageSections)

  useEffect(() => {
    setSections(homePageSections)
    setPageTitle('Dionatha')
    return () => {
      setSections([])
    }
  }, [setSections, setPageTitle])

  return (
    <div className="space-y-72">
      <HomeSection id="inicio" />
      <SobreSection id="sobre-mim" />
      <ProjectsSection id="meus-projetos" />
      <SkillsSection id="habilidades-tecnicas" />
      <ExpSection id="experiencia" />
      <ContactSection id="contato" />
    </div>
  )
}
