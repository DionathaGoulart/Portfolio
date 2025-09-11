import React from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, ExpList } from '@shared/ui'
import { ExpCardProps } from '@shared/ui/ExpCard'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the ExperienceSection component
 */
interface ExperienceSectionProps {
  /** Unique section ID for anchors and navigation */
  id?: string
}

// ================================
// Constants
// ================================

/**
 * Professional experience data organized chronologically
 * From most recent to oldest
 */
const EXPERIENCES_DATA: ExpCardProps[] = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Senior',
    company: 'TechCorp Solutions',
    period: '2023 - Atual',
    description:
      'Lidero o desenvolvimento de aplicações web modernas utilizando React, Node.js e PostgreSQL. Responsável pela arquitetura de microsserviços e implementação de CI/CD. Mentoreio desenvolvedores júnior e colaboro diretamente com stakeholders para definir requisitos técnicos.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_techcorp')
  },
  {
    id: '2',
    title: 'Desenvolvedor Full Stack',
    company: 'Digital Innovations Ltd.',
    period: '2021 - 2023',
    description:
      'Desenvolvi e mantive múltiplas aplicações web para clientes diversos. Implementei integrações com APIs de terceiros, otimizei performance de aplicações legadas e participei ativamente de code reviews. Colaborei em equipe ágil usando Scrum.',
    technologies: [
      'React',
      'Next.js',
      'Express',
      'MongoDB',
      'Firebase',
      'Tailwind'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_digital_innovations')
  },
  {
    id: '3',
    title: 'Desenvolvedor Frontend',
    company: 'StartupX',
    period: '2020 - 2021',
    description:
      'Construí interfaces de usuário responsivas e acessíveis para plataforma SaaS. Trabalhei closely com designers UX/UI para implementar designs pixel-perfect. Implementei testes automatizados e melhorei a experiência do usuário.',
    technologies: ['Vue.js', 'JavaScript', 'SCSS', 'Jest', 'Cypress', 'Figma'],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_startupx')
  },
  {
    id: '4',
    title: 'Desenvolvedor Junior',
    company: 'WebDev Agency',
    period: '2019 - 2020',
    description:
      'Iniciativa na carreira desenvolvendo sites institucionais e e-commerces. Aprendi fundamentos de desenvolvimento web, trabalhei com WordPress e PHP, e participei de projetos de refatoração de código legado.',
    technologies: ['PHP', 'WordPress', 'jQuery', 'MySQL', 'Bootstrap', 'Git'],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_webdev_agency')
  }
]

// ================================
// Custom Hooks
// ================================

/**
 * Hook for managing experience section analytics
 */
const useExperienceAnalytics = () => {
  const trackSectionView = (): void => {
    analytics.trackButtonClick('experience_section_viewed')
  }

  return { trackSectionView }
}

// ================================
// Helper Components
// ================================

/**
 * Experience section header
 */
const ExperienceHeader: React.FC = () => (
  <header className="space-y-6">
    <AnimatedContainer animationType="fade-right">
      <Title level="h2" border="bottom-start">
        Experiência{' '}
        <Title level="h2" element="span" color="primary">
          Profissional
        </Title>
      </Title>
    </AnimatedContainer>

    <AnimatedContainer animationType="zoom-out-up">
      <P size="grande" className="leading-relaxed md:max-w-md lg:max-w-2xl">
        Minha jornada profissional construindo soluções digitais inovadoras,
        desde os primeiros passos até projetos de alta complexidade.
      </P>
    </AnimatedContainer>
  </header>
)

/**
 * Professional experience timeline
 */
const ExperienceTimeline: React.FC = () => (
  <AnimatedContainer animationType="fade-up">
    <ExpList
      experiences={EXPERIENCES_DATA}
      showTimeline={true}
      defaultVariant="highlight"
      aria-label="Timeline de experiências profissionais"
    />
  </AnimatedContainer>
)

// ================================
// Main Component
// ================================

/**
 * Professional experience section with interactive timeline
 *
 * Presents professional journey in timeline format,
 * highlighting achievements, technologies used and responsibilities
 * in each position. Includes analytics tracking for interactions.
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  id = 'experiencia-profissional'
}) => {
  const { trackSectionView } = useExperienceAnalytics()

  return (
    <section
      id={id}
      aria-labelledby={`${id}-cabeçalho`}
      role="region"
      aria-label="Seção de experiência profissional"
      onLoad={trackSectionView}
    >
      <div className="space-y-12">
        <ExperienceHeader />
        <ExperienceTimeline />
      </div>
    </section>
  )
}

// ================================
// Exports
// ================================

export default ExperienceSection
