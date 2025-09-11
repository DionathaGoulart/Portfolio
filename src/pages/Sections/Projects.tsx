import { useState, useEffect } from 'react'
import { getImage } from '@core/utils/getImage'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid } from '@shared/ui'
import { FilterOption, Project } from '@shared/types'
import defaultRaw from '@assets/images/projects/default.png'
import shortRaw from '@assets/images/projects/short.png'
import signatureRaw from '@assets/images/projects/signature.png'

// ================================
// Types & Interfaces
// ================================

/**
 * Props for the ProjectsSection component
 */
interface ProjectsSectionProps {
  /** Unique section ID for navigation/anchors */
  id?: string
}

// ================================
// Constants
// ================================

/**
 * Optimized project images with WebP conversion
 */
const PROJECT_IMAGES = {
  default: getImage(`${defaultRaw}?as=webp&width=300`),
  short: getImage(`${shortRaw}?as=webp&width=300`),
  signature: getImage(`${signatureRaw}?as=webp&width=300`)
} as const

/**
 * Available filter options for project categorization
 */
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'progress', label: 'Em Progresso' }
]

/**
 * Complete projects database with full information
 * Structured for easy filtering and display
 */
const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Encurtador de Links',
    description:
      'Aplicativo fullstack para encurtar URLs longas com estatísticas de cliques, dashboard e interface responsiva moderna.',
    image: PROJECT_IMAGES.short,
    tags: ['Angular', 'Node.js', 'MongoDB', 'Bootstrap'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/link-shortener--Angular',
    demoUrl: 'https://linkspace.dionatha.com.br/'
  },
  {
    id: '2',
    title: 'Sistema de Assinatura de Contratos',
    description:
      'Plataforma web segura para gestão e assinatura digital de documentos contratuais com painel administrativo e envio automático por email.',
    image: PROJECT_IMAGES.signature,
    tags: ['React', 'Node.js', 'Express', 'Nodemailer'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/signature-React',
    demoUrl: 'https://termos.dionatha.com.br/'
  },
  {
    id: '3',
    title: 'PetMatch - Adoção de Animais',
    description:
      'Plataforma completa para adoção responsável de animais com sistema de login, cadastro de pets, perfis de usuários e matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/username/petmatch',
    demoUrl: 'https://petmatch-demo.com'
  },
  {
    id: '4',
    title: 'Manual de Marca',
    description:
      'Plataforma completa para adoção responsável de animais com sistema de login, cadastro de pets, perfis de usuários e matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Manual',
    demoUrl: 'https://petmatch-demo.com'
  },
  {
    id: '5',
    title: 'Portifolio Minimalista',
    description:
      'Plataforma completa para adoção responsável de animais com sistema de login, cadastro de pets, perfis de usuários e matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Darkning',
    demoUrl: 'https://petmatch-demo.com'
  },
  {
    id: '6',
    title: 'Lp - Curriculo',
    description:
      'Plataforma completa para adoção responsável de animais com sistema de login, cadastro de pets, perfis de usuários e matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Portfolio',
    demoUrl: 'https://petmatch-demo.com'
  }
]

/**
 * Animation and timing configuration
 */
const ANIMATION_CONFIG = {
  initialLoadTimeout: 2000
} as const

// ================================
// Helper Functions
// ================================

/**
 * Finds a project by ID
 */
const findProjectById = (projectId: string): Project | undefined => {
  return PROJECTS_DATA.find((project) => project.id === projectId)
}

/**
 * Determines CSS class for grid animation based on state
 */
const getGridAnimationClass = (isInitialLoad: boolean): string => {
  return isInitialLoad
    ? 'project-grid--initial-load'
    : 'project-grid--filter-change'
}

/**
 * Handles external link navigation with safety checks
 */
const navigateToUrl = (url: string | undefined): void => {
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

// ================================
// Custom Hooks
// ================================

/**
 * Filters projects based on active category
 * Supports projects with multiple categories
 */
const useFilteredProjects = (activeFilter: string): Project[] => {
  return activeFilter === 'todos'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((project) =>
        project.categories.includes(activeFilter as any)
      )
}

/**
 * Manages project interaction handlers with analytics
 */
const useProjectHandlers = () => {
  const handleGithubClick = (projectId: string): void => {
    analytics.trackButtonClick(`github_project_${projectId}`)
    const project = findProjectById(projectId)
    navigateToUrl(project?.githubUrl)
  }

  const handleDemoClick = (projectId: string): void => {
    analytics.trackButtonClick(`demo_project_${projectId}`)
    const project = findProjectById(projectId)

    if (project) {
      const isInProgress = project.categories.includes('progress')
      if (!isInProgress) {
        navigateToUrl(project.demoUrl)
      }
    }
  }

  return {
    handleGithubClick,
    handleDemoClick
  }
}

// ================================
// Helper Components
// ================================

/**
 * Projects section header
 */
const ProjectsHeader: React.FC = () => (
  <header className="space-y-6">
    <AnimatedContainer animationType="fade-right">
      <Title id="projetos-título" level="h2" border="bottom-start">
        Meus{' '}
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
  </header>
)

/**
 * Project filter navigation
 */
const ProjectsFilter: React.FC<{
  activeFilter: string
  onFilterChange: (filter: string) => void
}> = ({ activeFilter, onFilterChange }) => (
  <nav aria-label="Filtros de projetos por categoria" role="navigation">
    <AnimatedContainer>
      <NavFilter
        className="mt-12"
        options={FILTER_OPTIONS}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        aria-label="Selecionar categoria de projetos"
      />
    </AnimatedContainer>
  </nav>
)

/**
 * Projects grid display
 */
const ProjectsGrid: React.FC<{
  projects: Project[]
  animationKey: number
  isInitialLoad: boolean
  onGithubClick: (projectId: string) => void
  onDemoClick: (projectId: string) => void
  activeFilter: string
}> = ({
  projects,
  animationKey,
  isInitialLoad,
  onGithubClick,
  onDemoClick,
  activeFilter
}) => {
  const gridClassName = getGridAnimationClass(isInitialLoad)
  const filterLabel =
    FILTER_OPTIONS.find((opt) => opt.value === activeFilter)?.label || 'Todos'

  return (
    <main
      aria-live="polite"
      aria-label={`${projects.length} projetos encontrados na categoria ${filterLabel}`}
    >
      <AnimatedContainer>
        <div key={animationKey} className={gridClassName}>
          <ProjectGrid
            projects={projects}
            onGithubClick={onGithubClick}
            onDemoClick={onDemoClick}
            emptyMessage="Nenhum projeto encontrado para esta categoria."
          />
        </div>
      </AnimatedContainer>
    </main>
  )
}

// ================================
// Main Component
// ================================

/**
 * Projects section with filter system and responsive grid
 * Includes analytics tracking and state-based animations
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  id = 'meus-projetos'
}) => {
  // State management
  const [activeFilter, setActiveFilter] = useState<string>('todos')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)

  // Data and handlers
  const filteredProjects = useFilteredProjects(activeFilter)
  const { handleGithubClick, handleDemoClick } = useProjectHandlers()

  // Effects
  useEffect(() => {
    if (!isInitialLoad) return

    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, ANIMATION_CONFIG.initialLoadTimeout)

    return () => clearTimeout(timer)
  }, [isInitialLoad])

  // Handlers
  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter)
    setAnimationKey((prev) => prev + 1)
    analytics.trackButtonClick(`filter_projects_${filter}`)
  }

  return (
    <section id={id} aria-labelledby="lista-projetos" role="region">
      <ProjectsHeader />

      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <ProjectsGrid
        projects={filteredProjects}
        animationKey={animationKey}
        isInitialLoad={isInitialLoad}
        onGithubClick={handleGithubClick}
        onDemoClick={handleDemoClick}
        activeFilter={activeFilter}
      />
    </section>
  )
}

// ================================
// Exports
// ================================

export default ProjectsSection
