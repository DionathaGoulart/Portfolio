import React from 'react'
import { analytics } from '@features/Analytics/utils'
import { Title, P, ExpList } from '@shared/ui'
import { ExpCardProps } from '@shared/ui/ExpCard'

interface ExperienceSectionProps {
  id?: string
}

// ============================================================================
// DADOS DAS EXPERIÊNCIAS
// ============================================================================

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
    // Removido variant - será aplicado o defaultVariant da lista
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

// ============================================================================
// EXPERIENCE SECTION COMPONENT
// ============================================================================

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  id = 'experiencia-profissional'
}) => {
  // Handlers com analytics
  const handleSectionView = () => {
    analytics.trackButtonClick('experience_section_viewed')
  }

  return (
    <section id={id} onLoad={handleSectionView}>
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <Title level="h2" border="bottom-start">
            experiência {''}
            <Title level="h2" element="span" color="primary">
              profissional
            </Title>
          </Title>

          <P size="grande" className="max-w-2xl leading-relaxed">
            Minha jornada profissional construindo soluções digitais inovadoras,
            desde os primeiros passos até projetos de alta complexidade.
          </P>
        </div>

        {/* Timeline de Experiências */}
        <ExpList
          experiences={experiencesData}
          showTimeline={true}
          defaultVariant="highlight"
        />
      </div>
    </section>
  )
}

export default ExperienceSection
