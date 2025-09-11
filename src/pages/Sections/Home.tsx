import React from 'react'
import { getImage } from '@core/utils/getImage'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Button, P, Title } from '@shared/ui'
import Light from '@assets/images/light.png'
import Dark from '@assets/images/dark.png'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the HomeSection component
 */
interface HomeSectionProps {
  /** Unique section ID for anchors and navigation */
  id?: string
}

// ================================
// Constants
// ================================

/**
 * Optimized image URLs processed with WebP optimization
 * Pre-processed for better performance
 */
const OPTIMIZED_IMAGES = {
  light: getImage(`${Light}?as=webp&width=400`),
  dark: getImage(`${Dark}?as=webp&width=400`)
} as const

/**
 * Main action buttons configuration
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
 * Scroll navigation configuration
 */
const NAVIGATION_CONFIG = {
  headerOffset: 95
} as const

// ================================
// Helper Functions
// ================================

/**
 * Handles smooth scroll to target section with offset
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
// Custom Hooks
// ================================

/**
 * Hook for managing home section navigation and analytics
 */
const useHomeNavigation = () => {
  const handleVerTrabalhos = (): void => {
    scrollToSection(
      ACTION_BUTTONS.trabalhos.targetId,
      ACTION_BUTTONS.trabalhos.analyticsEvent
    )
  }

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
// Helper Components
// ================================

/**
 * Main presentation area with title and subtitle
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
 * Main action buttons area
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
 * Hero text content area (left side)
 */
const HeroContent: React.FC = () => (
  <div className="space-y-6">
    <HeroPresentationArea />
    <HeroActionButtons />
  </div>
)

/**
 * Adaptive logo with light/dark theme support
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
// Main Component
// ================================

/**
 * Main home/hero section of the portfolio
 *
 * Presents the main introduction with name, role and call-to-actions.
 * Includes adaptive logo for light/dark themes and smooth navigation
 * to other sections. Implements analytics for interaction tracking.
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
// Exports
// ================================

export default HomeSection
