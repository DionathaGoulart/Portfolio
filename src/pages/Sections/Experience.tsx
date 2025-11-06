import React from 'react'
import { analytics } from '@features/Analytics'
import { AnimatedContainer, Title, P, ExpList } from '@shared'
import { ExpCardProps, ExperienceSectionProps } from '@types'

// ================================
// DADOS E CONFIGURAÇÕES
// ================================

/**
 * Dados das experiências profissionais organizadas cronologicamente
 * Do mais recente para o mais antigo
 */
const experiencesData: ExpCardProps[] = [
  {
    id: '3',
    title: 'Desenvolvedor Fullstack',
    company: 'Parcer',
    period: 'Jan 2025 - Nov 2025',
    description:
      'Atuei como desenvolvedor fullstack em projetos específicos, especializado em tecnologias modernas como React, Next.js, TypeScript e Node.js. Desenvolvi interfaces responsivas e modernas, criei APIs RESTful robustas e implementei soluções completas do frontend ao backend. Colaborei diretamente com a equipe para levantamento de requisitos, arquitetura de sistemas e entrega de soluções personalizadas de alta qualidade.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'Django',
      'Docker',
      'Tailwind CSS',
      'Git'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_parcer')
  },
  {
    id: '4',
    title: 'Desenvolvedor Fullstack',
    company: 'Freelancer Autônomo',
    period: 'Jun 2023 - Presente',
    description:
      'Atuo como desenvolvedor fullstack freelancer autônomo, especializado em criar soluções completas e escaláveis para diversos clientes. Desenvolvo aplicações web modernas desde o frontend até APIs robustas, utilizando tecnologias de ponta como React, Next.js, TypeScript, Node.js e Django. Arquitetando e implementando sistemas complexos, integrando APIs, otimizando performance e entregando soluções de alta qualidade que geram valor real para os negócios dos clientes.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Django',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Express.js',
      'Tailwind CSS',
      'Docker',
      'Git'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_freelancer')
  },
  {
    id: '2',
    title: 'Suporte Técnico Nível 2',
    company: 'Cybernetrs',
    period: 'Mar 2023 - Out 2024',
    description:
      'Atuei como Suporte Técnico Nível 2, desenvolvendo competências técnicas e analíticas essenciais para resolução de problemas complexos. Investiguei e resolvi problemas de infraestrutura de rede, mantive documentação técnica detalhada e utilizei ferramentas especializadas para monitoramento contínuo de performance. Esta experiência me proporcionou uma base sólida em troubleshooting, análise de sistemas e comunicação técnica eficaz.',
    technologies: [
      'Monitoramento de Sistemas',
      'Debugging',
      'Documentação Técnica',
      'Gestão de Infraestrutura',
      'Análise de Performance',
      'Resolução de Problemas'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_cybernetrs')
  },
  {
    id: '1',
    title: 'Auxiliar de Escritório em Geral',
    company: 'Condomínio da Estação Rodoviária de Porto Alegre',
    period: 'Set 2021 - Ago 2022',
    description:
      'Atuei como Auxiliar de Escritório em ambiente corporativo de alto fluxo, desenvolvendo competências organizacionais e de atendimento essenciais. Gerenciei comunicações telefônicas, organizei arquivos físicos e digitais, executei tarefas administrativas e coordenei compromissos da equipe em ambiente de alta demanda. Esta experiência foi fundamental para desenvolver habilidades de organização, comunicação e trabalho sob pressão.',
    technologies: [
      'Atendimento ao Cliente',
      'Gestão de Dados',
      'Processos Administrativos',
      'Organização',
      'Multitarefa',
      'Comunicação Eficaz'
    ],
    interactive: true,
    onClick: () => analytics.trackButtonClick('experience_estacao_rodoviaria')
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
        Trajetória profissional construída através de experiência prática em
        projetos reais. Da transição de carreira à especialização em
        desenvolvimento fullstack, transformando desafios em soluções técnicas
        robustas e entregando valor para clientes através de código de qualidade.
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
    >
      <div className="space-y-12">
        <ExperienceHeader />
        <ExperienceTimeline />
      </div>
    </section>
  )
}

export default ExperienceSection
