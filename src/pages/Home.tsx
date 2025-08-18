import React, { useEffect } from 'react'
import { SectionConfig } from '@/shared'
import HomeSection from './Sections/Home'
import SobreSection from './Sections/Sobre'

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
    </div>
  )
}
