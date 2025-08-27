import { useState } from 'react'
import { analytics } from '@/features/Analytics/utils/analytics'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import { Project } from '@/shared/types/ui/ProjectCard.types'
import { ProjectGrid } from '@/shared/ui/ProjectCard'
import { NavFilter } from '@/shared/ui/NavFilter'

interface ProjectsSectionProps {
  id?: string
}

// ============================================================================
// DADOS DOS PROJETOS
// ============================================================================

const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'Uma plataforma completa de e-commerce com carrinho de compras, pagamentos e painel administrativo.',
    image: '/images/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    githubUrl: 'https://github.com/username/ecommerce',
    demoUrl: 'https://ecommerce-demo.com'
  },
  {
    id: '2',
    title: 'Dashboard Analytics',
    description:
      'Dashboard interativo para análise de dados com gráficos em tempo real e relatórios personalizados.',
    image: '/images/projects/dashboard.jpg',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
    category: 'frontend',
    githubUrl: 'https://github.com/username/dashboard',
    demoUrl: 'https://dashboard-demo.com'
  },
  {
    id: '3',
    title: 'API RESTful',
    description:
      'API robusta com autenticação JWT, documentação Swagger e testes automatizados.',
    image: '/images/projects/api.jpg',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    category: 'backend',
    githubUrl: 'https://github.com/username/api',
    demoUrl: 'https://api-docs.com'
  },
  {
    id: '4',
    title: 'App Fitness',
    description:
      'Aplicativo mobile para acompanhamento de treinos e dietas com sincronização na nuvem.',
    image: '/images/projects/fitness.jpg',
    tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'mobile',
    githubUrl: 'https://github.com/username/fitness-app',
    demoUrl: 'https://fitness-app-demo.com'
  },
  {
    id: '5',
    title: 'Sistema de Blog',
    description:
      'CMS completo com editor rico, sistema de comentários e otimização SEO.',
    image: '/images/projects/blog.jpg',
    tags: ['Next.js', 'Prisma', 'MySQL', 'MDX'],
    category: 'fullstack',
    githubUrl: 'https://github.com/username/blog',
    demoUrl: 'https://blog-demo.com'
  },
  {
    id: '6',
    title: 'Landing Page',
    description:
      'Landing page moderna e responsiva com animações suaves e alta conversão.',
    image: '/images/projects/landing.jpg',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    category: 'frontend',
    githubUrl: 'https://github.com/username/landing',
    demoUrl: 'https://landing-demo.com'
  }
]

// ============================================================================
// PROJECTS SECTION COMPONENT
// ============================================================================

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  id = 'meus-projetos'
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos')

  // Filtrar projetos baseado no filtro ativo
  const filteredProjects =
    activeFilter === 'todos'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter)

  // Handlers com analytics
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    analytics.trackButtonClick(`filter_projects_${filter}`)
  }

  const handleGithubClick = (projectId: string) => {
    analytics.trackButtonClick(`github_project_${projectId}`)
  }

  const handleDemoClick = (projectId: string) => {
    analytics.trackButtonClick(`demo_project_${projectId}`)
  }

  return (
    <section id={id}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="space-y-6">
          <Title level="h2" border="bottom-start">
            meus projetos
          </Title>

          <P size="grande" className="max-w-lg leading-relaxed">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas
            habilidades em diferentes tecnologias e áreas de desenvolvimento.
          </P>
        </div>

        {/* Filtros */}
        <NavFilter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Grid de Projetos */}
        <ProjectGrid
          projects={filteredProjects}
          onGithubClick={handleGithubClick}
          onDemoClick={handleDemoClick}
          emptyMessage="Nenhum projeto encontrado para esta categoria."
        />
      </div>
    </section>
  )
}

export default ProjectsSection
