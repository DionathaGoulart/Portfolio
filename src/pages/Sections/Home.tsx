import React from 'react'

import { analytics } from '@features/Analytics/'
import { AnimatedContainer, Button, P, Title } from '@shared'
import Light from '@assets/images/light.png'
import Dark from '@assets/images/dark.png'
import { HomeSectionProps } from '@types'

// ================================
// CONSTANTS
// ================================

/**
 * URLs de imagens otimizadas processadas com WebP
 * Pré-processadas para melhor performance
 */
const OPTIMIZED_IMAGES = {
  light: `${Light}?as=webp&width=400`,
  dark: `${Dark}?as=webp&width=400`
} as const

/**
 * Configuração dos botões de ação principais
 */
const ACTION_BUTTONS = {
  trabalhos: {
    text: 'Ver Trabalhos',
    variant: 'solid' as const,
    targetId: 'meus-projetos',
    analyticsEvent: 'ver_trabalhos'
  },
  contato: {
    text: 'Contato',
    variant: 'outline' as const,
    targetId: 'contato',
    analyticsEvent: 'contato'
  }
} as const

/**
 * Configuração de navegação por scroll
 */
const NAVIGATION_CONFIG = {
  headerOffset: 95
} as const

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Manipula scroll suave para seção alvo com offset
 * @param {string} targetId - ID da seção alvo
 * @param {string} analyticsEvent - Evento de analytics para tracking
 */
const scrollToSection = (targetId: string, analyticsEvent: string): void => {
  analytics.trackButtonClick(analyticsEvent)

  const targetSection = document.getElementById(targetId)
  if (targetSection) {
    const elementPosition = targetSection.getBoundingClientRect().top
    const offsetPosition =
      elementPosition + window.pageYOffset - NAVIGATION_CONFIG.headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// ================================
// CUSTOM HOOKS
// ================================

/**
 * Hook para gerenciar navegação e analytics da seção inicial
 * @returns {object} Handlers para navegação
 */
const useHomeNavigation = () => {
  /**
   * Manipula navegação para seção de trabalhos
   */
  const handleVerTrabalhos = (): void => {
    scrollToSection(
      ACTION_BUTTONS.trabalhos.targetId,
      ACTION_BUTTONS.trabalhos.analyticsEvent
    )
  }

  /**
   * Manipula navegação para seção de contato
   */
  const handleContato = (): void => {
    scrollToSection(
      ACTION_BUTTONS.contato.targetId,
      ACTION_BUTTONS.contato.analyticsEvent
    )
  }

  return {
    handleVerTrabalhos,
    handleContato
  }
}

// ================================
// HELPER COMPONENTS
// ================================

/**
 * Área principal de apresentação com título e subtítulo
 * @returns {JSX.Element} Área de apresentação renderizada
 */
const HeroPresentationArea: React.FC = () => (
  <div className="space-y-6">
    <AnimatedContainer animationType="fade-right">
      <Title variant="hero" level="h1" uppercase>
        dionatha <br />
        <Title variant="hero" level="h1" element="span" color="primary">
          goulart
        </Title>
      </Title>
    </AnimatedContainer>

    <AnimatedContainer animationType="fade-up-right">
      <Title level="h3" className="font-normal">
        desenvolvedor fullstack
      </Title>
    </AnimatedContainer>

    <AnimatedContainer animationType="zoom-out-up">
      <P size="grande" className="leading-relaxed md:max-w-md lg:max-w-none">
        Desenvolvedor fullstack em início de carreira com experiência prática em projetos reais e forte capacidade de aprendizado.
      </P>
    </AnimatedContainer>
  </div>
)

/**
 * Área dos botões de ação principais
 * @returns {JSX.Element} Botões de ação renderizados
 */
const HeroActionButtons: React.FC = () => {
  const { handleVerTrabalhos, handleContato } = useHomeNavigation()

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:justify-center md:justify-start">
      <AnimatedContainer animationType="fade-up-right">
        <Button
          variant={ACTION_BUTTONS.trabalhos.variant}
          size="grande"
          onClick={handleVerTrabalhos}
          className="w-full sm:w-auto"
          aria-label="Ver meus trabalhos e projetos"
        >
          {ACTION_BUTTONS.trabalhos.text}
        </Button>
      </AnimatedContainer>

      <AnimatedContainer animationType="fade-up-left">
        <Button
          variant={ACTION_BUTTONS.contato.variant}
          size="grande"
          onClick={handleContato}
          className="w-full sm:w-auto"
          aria-label="Entrar em contato comigo"
        >
          {ACTION_BUTTONS.contato.text}
        </Button>
      </AnimatedContainer>
    </div>
  )
}

/**
 * Área de conteúdo de texto do hero (lado esquerdo)
 * @returns {JSX.Element} Conteúdo do hero renderizado
 */
const HeroContent: React.FC = () => (
  <div className="space-y-6">
    <HeroPresentationArea />
    <HeroActionButtons />
  </div>
)

/**
 * Logo adaptativo com suporte a temas claro/escuro
 * @returns {JSX.Element} Logo adaptativo renderizado
 */
const AdaptiveLogo: React.FC = () => (
  <AnimatedContainer animationType="zoom-in-left">
    <div className="hidden lg:flex justify-end">
      <img
        src={OPTIMIZED_IMAGES.light}
        alt="Logo GD - Dionatha Goulart"
        className="block dark:hidden w-96 h-96"
        width={384}
        height={384}
      />
      <img
        src={OPTIMIZED_IMAGES.dark}
        alt="Logo GD - Dionatha Goulart"
        className="hidden dark:block w-96 h-96"
        width={384}
        height={384}
      />
    </div>
  </AnimatedContainer>
)

// ================================
// MAIN COMPONENT
// ================================

/**
 * Seção principal/hero do portfólio
 *
 * Apresenta a introdução principal com nome, função e call-to-actions.
 * Inclui logo adaptativo para temas claro/escuro e navegação suave
 * para outras seções. Implementa analytics para tracking de interações.
 *
 * @param {HomeSectionProps} props - Propriedades do componente
 * @returns {JSX.Element} Seção inicial renderizada
 */
const HomeSection: React.FC<HomeSectionProps> = ({ id = 'home' }) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-cabeçalho`}
      role="banner"
      aria-label="Seção principal de apresentação"
    >
      <div className="grid lg:grid-cols-2">
        <HeroContent />
        <AdaptiveLogo />
      </div>
    </section>
  )
}

// ================================
// EXPORTS
// ================================

export default HomeSection
