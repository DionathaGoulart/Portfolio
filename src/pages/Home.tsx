// HomePage.tsx
import React, { useEffect } from 'react'
import { SectionConfig } from '@/shared'
import HomeSection from './Sections/Home'
import SobreSection from './Sections/Sobre'

// 1. Definir a interface de props da página
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

  // 2. Usa um useEffect para configurar o layout
  useEffect(() => {
    // Envia a lista de seções para o RouteRenderer
    setSections(homePageSections)

    // Define o título inicial da página
    setPageTitle('Dionatha')

    // Função de limpeza: Opcional, mas útil para resetar ao sair da página
    return () => {
      setSections([])
    }
  }, [setSections, setPageTitle]) // Dependências garantem que o efeito roda se as setters mudarem

  return (
    <>
      <HomeSection id="inicio" />
      <SobreSection id="sobre-mim" />
    </>
  )
}
