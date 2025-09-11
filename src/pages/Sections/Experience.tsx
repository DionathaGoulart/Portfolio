import React from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, ExpList } from '@shared/ui'
import { ExpCardProps } from '@shared/types/ui/ExpCard.types'

// ================================
// INTERFACES E TIPOS
// ================================

/**
 * Props do componente ExperienceSection
 */
interface ExperienceSectionProps {
  /** ID único da seção para âncoras e navegação */
  id?: string
}

// ================================
// DADOS E CONFIGURAÇÕES
// ================================

/**
 * Dados das experiências profissionais organizadas cronologicamente
 * Do mais recente para o mais antigo
 */
const experiencesData: ExpCardProps[] = [
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
// HOOKS E FUNÇÕES AUXILIARES
// ================================

/**
 * Hook para gerenciar analytics da seção de experiência
 */
const useExperienceAnalytics = () => {
  const trackSectionView = (): void => {
    analytics.trackButtonClick('experience_section_viewed')
  }

  return { trackSectionView }
}

// ================================
// COMPONENTES
// ================================

/**
 * Cabeçalho da seção de experiência profissional
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
 * Timeline de experiências profissionais
 */
const ExperienceTimeline: React.FC = () => (
  <AnimatedContainer animationType="fade-up">
    <ExpList
      experiences={experiencesData}
      showTimeline={true}
      defaultVariant="highlight"
      aria-label="Timeline de experiências profissionais"
    />
  </AnimatedContainer>
)

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Seção de experiência profissional com timeline interativa
 *
 * Apresenta a trajetória profissional em formato de timeline,
 * destacando conquistas, tecnologias utilizadas e responsabilidades
 * em cada posição. Inclui rastreamento de analytics para interações.
 *
 * @param props - Propriedades do componente
 * @returns JSX.Element
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

export default ExperienceSection
