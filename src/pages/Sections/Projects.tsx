import React, { useState, useEffect } from 'react'
import { analytics } from '@features/Analytics'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid } from '@shared'
import {
  Project,
  FilterOption,
  ProjectsSectionProps,
  ProjectsFilterProps,
  ProjectsGridProps
} from '@types'
import defaultRaw from '@assets/images/projects/default.png'
import shortRaw from '@assets/images/projects/short.jpeg'
import signatureRaw from '@assets/images/projects/signature.jpeg'
import darkLinksRaw from '@assets/images/projects/dark-links.jpeg'
import darkPortfolioRaw from '@assets/images/projects/dark-portfolio.jpeg'
import containnerPortfolioRaw from '@assets/images/projects/containner-portfolio.jpeg'
import CatalogoRaw from '@assets/images/projects/catalogo.jpeg'
import ManualRaw from '@assets/images/projects/manual.jpeg'
import AmpareRaw from '@assets/images/projects/ampare.jpeg'

// ================================
// Constants
// ================================

/**
 * Optimized project images with WebP conversion
 */
const PROJECT_IMAGES = {
  default: `${defaultRaw}?as=webp&width=300`,
  short: `${shortRaw}?as=webp&width=300`,
  signature: `${signatureRaw}?as=webp&width=300`,
  darkLinks: `${darkLinksRaw}?as=webp&width=300`,
  darkPortfolio: `${darkPortfolioRaw}?as=webp&width=300`,
  containnerPortfolio: `${containnerPortfolioRaw}?as=webp&width=300`,
  Catalogo: `${CatalogoRaw}?as=webp&width=300`,
  Manual: `${ManualRaw}?as=webp&width=300`,
  Ampare: `${AmpareRaw}?as=webp&width=300`
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
    title: 'Portfolio Branding',
    description:
      'Portfolio especializado em branding com projetos criativos e comparação visual.',
    image: PROJECT_IMAGES.containnerPortfolio,
    tags: ['React', 'TypeScript', 'Tailwind', 'Google Analytics'],
    categories: ['frontend'],
    githubUrl: 'https://github.com/containner-archived/Containner',
    demoUrl: 'https://containner.netlify.app'
  },
  {
    id: '2',
    title: 'Portfolio Artístico',
    description:
      'Portfolio  com design minimalista, galeria de imagens, tema claro/escuro e performance otimizada.',
    image: PROJECT_IMAGES.darkPortfolio,
    tags: ['React', 'TypeScript', 'Tailwind', 'Google Analytics', 'EmailJS'],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Dark-Portifolio',
    demoUrl: 'https://dark.art.br'
  },
  {
    id: '3',
    title: 'Encurtador de Links',
    description:
      'Plataforma moderna de encurtamento de URLs com interface intuitiva.',
    image: PROJECT_IMAGES.short,
    tags: [
      'Angular',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Bootstrap 5'
    ],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/link-shortener--Angular',
    demoUrl: 'https://linkspace.dionatha.com.br'
  },
  {
    id: '4',
    title: 'Assinatura Digital',
    description:
      'Plataforma de assinatura de contratos com geração de PDF e envio automático por email.',
    image: PROJECT_IMAGES.signature,
    tags: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Express'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/signature-React',
    demoUrl: 'https://termos.dionatha.com.br'
  },
  {
    id: '5',
    title: 'Linktree Profissional',
    description:
      'Linktree profissional com temas, analytics integrado, suporte multilíngue e design minimalista.',
    image: PROJECT_IMAGES.darkLinks,
    tags: ['React', 'TypeScript', 'Tailwind', 'Google Analytics'],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Dark-Links',
    demoUrl: 'https://links.dark.art.br'
  },
  {
    id: '6',
    title: 'Catálogo de Produtos',
    description:
      'Catálogo moderno de produtos com sincronização automática entre api do Tiny ER e integração WhatsApp.',
    image: PROJECT_IMAGES.Catalogo,
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/Catalog',
    demoUrl: 'https://detcheler.com.br'
  },
  {
    id: '7',
    title: 'Manual de Marca',
    description:
      'Manual de identidade visual da marca interativo com navegação fluida e para facil entendimento sobre a marca.',
    image: PROJECT_IMAGES.Manual,
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Manual',
    demoUrl: 'https://manual-vextro.vercel.app'
  },
  {
    id: '8',
    title: 'Sistema de Adesão',
    description:
      'Sistema completo para geração e envio de contratos de adesão a benefícios com formulário multi-step e assinatura digital.',
    image: PROJECT_IMAGES.Ampare,
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PDF-lib'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/PDF-From',
    demoUrl: 'https://ampare.org.br/termos'
  },
  {
    id: '9',
    title: 'Adoção de Pets',
    description:
      'Plataforma para adoção responsável de animais com sistema de matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/Pets',
    demoUrl: ''
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
        project.categories.includes(
          activeFilter as Project['categories'][number]
        )
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
        Projetos desenvolvidos durante minha jornada de aprendizado e trabalhos
        freelance, mostrando domínio prático em diferentes tecnologias e
        cenários.
      </P>
    </AnimatedContainer>
  </header>
)

/**
 * Project filter navigation
 */
const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  activeFilter,
  onFilterChange
}) => (
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
const ProjectsGrid: React.FC<ProjectsGridProps> = ({
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
