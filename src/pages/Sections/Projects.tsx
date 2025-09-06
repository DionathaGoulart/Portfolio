import { useState, useEffect } from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid } from '@shared/ui'
import { FilterOption, Project } from '@shared/types'

interface ProjectsSectionProps {
  id?: string
}

// ============================================================================
// FILTROS DISPONÍVEIS
// ============================================================================

const filterOptions: FilterOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'progress', label: 'Em Progresso' }
]

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
    category: 'progress',
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
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)

  // Filtrar projetos baseado no filtro ativo
  const filteredProjects =
    activeFilter === 'todos'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter)

  // Marcar que não é mais carregamento inicial
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 2000) // Após 2s, considera que já passou o carregamento inicial

      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Handlers com analytics
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setAnimationKey((prev) => prev + 1) // ← Força re-render com nova animação
    analytics.trackButtonClick(`filter_projects_${filter}`)
  }

  const handleGithubClick = (projectId: string) => {
    analytics.trackButtonClick(`github_project_${projectId}`)
  }

  const handleDemoClick = (projectId: string) => {
    analytics.trackButtonClick(`demo_project_${projectId}`)
  }

  // Determina qual classe de animação usar
  const getGridClassName = () => {
    if (isInitialLoad) {
      return 'project-grid--initial-load'
    }
    return 'project-grid--filter-change'
  }

  return (
    <section id={id}>
      {/* Header */}
      <div className="space-y-6">
        <AnimatedContainer animationType="fade-right">
          <Title level="h2" border="bottom-start">
            Meus {''}
            <Title level="h2" element="span" color="primary">
              Projetos
            </Title>
          </Title>
        </AnimatedContainer>

        <AnimatedContainer animationType="zoom-in-left">
          <P size="grande" className="leading-relaxed md:max-w-md lg:max-w-2xl">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas
            habilidades em diferentes tecnologias e áreas de desenvolvimento.
          </P>
        </AnimatedContainer>
      </div>

      {/* Filtros */}
      <AnimatedContainer>
        <NavFilter
          className="mt-12"
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </AnimatedContainer>

      {/* Grid de Projetos */}
      <AnimatedContainer>
        <div key={animationKey} className={getGridClassName()}>
          <ProjectGrid
            projects={filteredProjects}
            onGithubClick={handleGithubClick}
            onDemoClick={handleDemoClick}
            emptyMessage="Nenhum projeto encontrado para esta categoria."
          />
        </div>
      </AnimatedContainer>
    </section>
  )
}

export default ProjectsSection
