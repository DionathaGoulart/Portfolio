import React from 'react'
import { getImage } from '@core/utils/getImage'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Button, P, Title } from '@shared/ui'
import Light from '@assets/images/light.png'
import Dark from '@assets/images/dark.png'

// ================================
// INTERFACES E TIPOS
// ================================

/**
 * Props do componente HomeSection
 */
interface HomeSectionProps {
  /** ID único da seção para âncoras e navegação */
  id?: string
}

// ================================
// CONSTANTES E CONFIGURAÇÕES
// ================================

/**
 * URLs das imagens processadas com otimização WebP
 * Pré-processadas para melhor performance
 */
const OPTIMIZED_IMAGES = {
  light: getImage(`${Light}?as=webp&width=400`),
  dark: getImage(`${Dark}?as=webp&width=400`)
} as const

/**
 * Configuração dos botões de ação principal
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

// ================================
// HOOKS E FUNÇÕES AUXILIARES
// ================================

/**
 * Hook para gerenciar navegação e analytics da seção home
 */
const useHomeNavigation = () => {
  const handleScrollToSection = (targetId: string, analyticsEvent: string) => {
    analytics.trackButtonClick(analyticsEvent)

    const targetSection = document.getElementById(targetId)
    if (targetSection) {
      // Offset para compensar header fixo e dar espaçamento extra
      const headerOffset = 95
      const elementPosition = targetSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleVerTrabalhos = (): void => {
    handleScrollToSection(
      ACTION_BUTTONS.trabalhos.targetId,
      ACTION_BUTTONS.trabalhos.analyticsEvent
    )
  }

  const handleContato = (): void => {
    handleScrollToSection(
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
// COMPONENTES
// ================================

/**
 * Área de apresentação principal com título e subtítulo
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
        Desenvolvedor apaixonado por criar soluções digitais inovadoras,
        combinando design elegante com código limpo e funcional.
      </P>
    </AnimatedContainer>
  </div>
)

/**
 * Área de botões de ação principal
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
 * Área de conteúdo textual do hero (lado esquerdo)
 */
const HeroContent: React.FC = () => (
  <div className="space-y-6">
    <HeroPresentationArea />
    <HeroActionButtons />
  </div>
)

/**
 * Logo adaptativo com suporte a tema claro/escuro
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
// COMPONENTE PRINCIPAL
// ================================

/**
 * Seção home/hero principal do portfólio
 *
 * Apresenta a introdução principal com nome, função e call-to-actions.
 * Inclui logo adaptativo para temas claro/escuro e navegação suave
 * para outras seções. Implementa analytics para rastreamento de interações.
 *
 * @param props - Propriedades do componente
 * @returns JSX.Element
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
        {/* Lado esquerdo - Conteúdo textual */}
        <HeroContent />

        {/* Lado direito - Logo adaptativo */}
        <AdaptiveLogo />
      </div>
    </section>
  )
}

export default HomeSection
