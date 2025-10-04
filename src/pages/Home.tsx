import React, { useEffect } from 'react'

import { useSectionTracking } from '@features/Analytics'
import {
  HomeSection,
  SobreSection,
  ProjectsSection,
  SkillsSection,
  ExpSection,
  ContactSection
} from '@pages/Sections'
import { HomePageProps, SectionConfig } from '@types'

// ================================
// CONSTANTS
// ================================

/**
 * Configuração das seções da página inicial
 * Define IDs e labels para navegação e tracking
 */
const HOME_PAGE_SECTIONS: SectionConfig[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre-mim', label: 'Sobre Mim' },
  { id: 'meus-projetos', label: 'Projetos' },
  { id: 'habilidades-tecnicas', label: 'Habilidades' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'contato', label: 'Contato' }
]

// ================================
// MAIN COMPONENT
// ================================

/**
 * Componente da página inicial com todas as seções do portfólio
 * Gerencia o tracking de seções e título da página dinamicamente
 *
 * @param {HomePageProps} props - Propriedades do componente
 * @returns {JSX.Element} Página inicial renderizada
 */
export function HomePage({ setSections, setPageTitle }: HomePageProps) {
  // Habilita tracking automático de seções
  useSectionTracking(HOME_PAGE_SECTIONS)

  // Configura seções e título da página
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
