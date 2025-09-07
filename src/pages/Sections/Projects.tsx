import { useState, useEffect } from 'react'
import { analytics } from '@features/Analytics/utils'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid } from '@shared/ui'
import { FilterOption, Project } from '@shared/types'

// ================================
// INTERFACES & TYPES
// ================================

/**
 * Props para o componente ProjectsSection
 */
interface ProjectsSectionProps {
  /** ID único da seção para navegação/âncora */
  id?: string
}

// ================================
// CONSTANTES & CONFIGURAÇÕES
// ================================

/**
 * Opções de filtro disponíveis para categorizar projetos
 */
const filterOptions: FilterOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'progress', label: 'Em Progresso' }
]

/**
 * Base de dados dos projetos com informações completas
 * Estruturado para facilitar filtros e exibição
 */
const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'Uma plataforma completa de e-commerce com carrinho de compras, pagamentos e painel administrativo.',
    image: '/images/default.png',
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
    image: '/images/default.png',
    tags: ['React', 'TypeScript', 'Chart.js', 'Tailwind'],
    category: 'frontend',
    githubUrl: 'https://github.com/username/dashboard',
    demoUrl: 'https://dashboard-demo.com'
  },
  {
    id: '3',
    title: 'Sistema de Assinatura de Contratos',
    description:
      'Plataforma web segura para gestão e assinatura digital de documentos contratuais com painel administrativo e envio automático por email.',
    image: '/images/signature.png',
    tags: ['React', 'Node.js', 'Express', 'Nodemailer'],
    category: 'fullstack',
    githubUrl: 'https://github.com/DionathaGoulart/signature-React',
    demoUrl: 'https://termos.dionatha.com.br/'
  },
  {
    id: '4',
    title: 'Encurtador de Links',
    description:
      'Aplicativo fullstack para encurtar URLs longas com estatísticas de cliques, dashboard e interface responsiva moderna.',
    image: '/images/short.png',
    tags: ['Angular', 'Node.js', 'MongoDB', 'Bootstrap'],
    category: 'fullstack',
    githubUrl: 'https://github.com/DionathaGoulart/link-shortener--Angular',
    demoUrl: 'https://linkspace.dionatha.com.br/'
  },
  {
    id: '5',
    title: 'Sistema de Blog',
    description:
      'CMS completo com editor rico, sistema de comentários e otimização SEO.',
    image: '/images/default.png',
    tags: ['Next.js', 'Prisma', 'MySQL', 'MDX'],
    category: 'fullstack',
    githubUrl: 'https://github.com/username/blog',
    demoUrl: 'https://blog-demo.com'
  },
  {
    id: '6',
    title: 'PetMatch - Adoção de Animais',
    description:
      'Plataforma completa para adoção responsável de animais com sistema de login, cadastro de pets, perfis de usuários e matching inteligente.',
    image: '/images/default.png',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    category: 'progress',
    githubUrl: 'https://github.com/username/petmatch',
    demoUrl: 'https://petmatch-demo.com'
  }
]

// Tempo para considerar fim do carregamento inicial (ms)
const INITIAL_LOAD_TIMEOUT = 2000

// ================================
// HOOKS & HELPERS
// ================================

/**
 * Filtra projetos baseado na categoria ativa
 */
const useFilteredProjects = (activeFilter: string): Project[] => {
  return activeFilter === 'todos'
    ? projectsData
    : projectsData.filter((project) => project.category === activeFilter)
}

/**
 * Determina a classe CSS para animação do grid baseado no estado
 */
const getGridAnimationClass = (isInitialLoad: boolean): string => {
  return isInitialLoad
    ? 'project-grid--initial-load'
    : 'project-grid--filter-change'
}

// ================================
// COMPONENTE PRINCIPAL
// ================================

/**
 * Seção de projetos com sistema de filtros e grid responsivo
 * Inclui analytics tracking e animações baseadas em estado
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  id = 'meus-projetos'
}) => {
  // ================================
  // ESTADO LOCAL
  // ================================

  const [activeFilter, setActiveFilter] = useState<string>('todos')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)

  // ================================
  // DADOS COMPUTADOS
  // ================================

  const filteredProjects = useFilteredProjects(activeFilter)
  const gridClassName = getGridAnimationClass(isInitialLoad)

  // ================================
  // EFEITOS
  // ================================

  /**
   * Marca fim do carregamento inicial após timeout
   * Necessário para diferenciar animações de primeira carga vs filtros
   */
  useEffect(() => {
    if (!isInitialLoad) return

    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, INITIAL_LOAD_TIMEOUT)

    return () => clearTimeout(timer)
  }, [isInitialLoad])

  // ================================
  // HANDLERS
  // ================================

  /**
   * Manipula mudança de filtro com analytics e animação
   */
  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter)
    setAnimationKey((prev) => prev + 1) // Força re-render para nova animação
    analytics.trackButtonClick(`filter_projects_${filter}`)
  }

  /**
   * Manipula clique no link do GitHub com analytics
   */
  const handleGithubClick = (projectId: string): void => {
    analytics.trackButtonClick(`github_project_${projectId}`)
  }

  /**
   * Manipula clique no link de demo com analytics
   */
  const handleDemoClick = (projectId: string): void => {
    analytics.trackButtonClick(`demo_project_${projectId}`)
  }

  // ================================
  // RENDER
  // ================================

  return (
    <section id={id} aria-labelledby="lista-projetos" role="region">
      {/* ================================ */}
      {/* CABEÇALHO DA SEÇÃO */}
      {/* ================================ */}
      <header className="space-y-6">
        <AnimatedContainer animationType="fade-right">
          <Title id="projetos-título" level="h2" border="bottom-start">
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
      </header>

      {/* ================================ */}
      {/* NAVEGAÇÃO POR FILTROS */}
      {/* ================================ */}
      <nav aria-label="Filtros de projetos por categoria" role="navigation">
        <AnimatedContainer>
          <NavFilter
            className="mt-12"
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            aria-label="Selecionar categoria de projetos"
          />
        </AnimatedContainer>
      </nav>

      {/* ================================ */}
      {/* GRID DE PROJETOS */}
      {/* ================================ */}
      <main
        aria-live="polite"
        aria-label={`${filteredProjects.length} projetos encontrados na categoria ${
          filterOptions.find((opt) => opt.value === activeFilter)?.label ||
          'Todos'
        }`}
      >
        <AnimatedContainer>
          <div key={animationKey} className={gridClassName}>
            <ProjectGrid
              projects={filteredProjects}
              onGithubClick={handleGithubClick}
              onDemoClick={handleDemoClick}
              emptyMessage="Nenhum projeto encontrado para esta categoria."
            />
          </div>
        </AnimatedContainer>
      </main>
    </section>
  )
}

// ================================
// EXPORTAÇÃO
// ================================

export default ProjectsSection
