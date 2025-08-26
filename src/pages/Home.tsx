import { useEffect } from 'react'

import HomeSection from './Sections/Home'
import SobreSection from './Sections/Sobre'
import { useSectionTracking } from '@/features/Analytics/hooks/useAnalytics'
import { SectionConfig } from '@/shared/types'
import ProjectsSection from './Sections/Projects'

interface HomePageProps {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}

export function HomePage({ setSections, setPageTitle }: HomePageProps) {
  const homePageSections: SectionConfig[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre-mim', label: 'Sobre Mim' },
    { id: 'meus-projetos', label: 'Projetos' },
    { id: 'fale-comigo', label: 'Contato' }
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
    </div>
  )
}
