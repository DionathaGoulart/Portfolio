import React, { useState, useEffect } from 'react'
import { analytics } from '@features/Analytics'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid, Modal } from '@shared'
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
import HelldiversRaw from '@assets/images/projects/helldivers.jpeg'
import XRCardRaw from '@assets/images/projects/xrcard.jpeg'

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
  Ampare: `${AmpareRaw}?as=webp&width=300`,
  Helldivers: `${HelldiversRaw}?as=webp&width=300`,
  XRCard: `${XRCardRaw}?as=webp&width=300`
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
 * Projects are ordered by value/impression (most impressive first)
 */
const PROJECTS_DATA: Project[] = [
  {
    id: 'dark-ecosystem',
    title: 'Dark Ecosystem',
    subtitle: 'Monorepo Platform',
    description:
      'Ecossistema digital completo unificando Portfólio, Link-in-Bio e Dashboard Administrativo. Gerenciado via TurboRepo para máxima eficiência e compartilhamento de código.',
    image: PROJECT_IMAGES.darkPortfolio,
    tags: [
      'TurboRepo',
      'Next.js 14',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
      'CI/CD'
    ],
    categories: ['frontend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/Dark',
    demoUrl: 'https://dark.art.br',
    details: {
      purpose:
        'Unificar minha presença digital sob uma arquitetura única e escalável. O ecossistema serve como um hub central que integra meu portfólio pessoal, uma plataforma de links (Dark Links) e um painel administrativo para gestão de conteúdo, tudo operando em sincronia.',
      why:
        'A gestão de repositórios separados tornou-se ineficiente. A migração para um Monorepo com TurboRepo permitiu centralizar configurações, compartilhar componentes de UI e tipagens entre projetos, demonstrando na prática habilidades de arquitetura de software de nível empresarial.',
      challenges:
        'Configurar o pipeline de build do TurboRepo para garantir cache eficiente e execução paralela. Desenvolver um Design System compartilhado que funcionasse perfeitamente entre diferentes aplicações Next.js. Gerenciar autenticação centralizada e multi-tenancy com Supabase.',
      results:
        'Um ecossistema robusto onde o compartilhamento de código reduziu o tempo de desenvolvimento em 40%. Atualizações na biblioteca de UI são propagadas instantaneamente para todos os apps. Deploy automatizado e simultâneo de todas as aplicações via Vercel.'
    }
  },
  {
    id: '1',
    title: 'Helldivers 2',
    subtitle: 'Community Armory',
    description:
      'A ferramenta definitiva para jogadores de Helldivers 2. Gerenciamento completo de loadouts, análise de stats e banco de dados de equipamentos com autenticação via Discord/Google.',
    image: PROJECT_IMAGES.Helldivers,
    tags: [
      'Next.js',
      'Django Rest Framework',
      'Python',
      'PostgreSQL',
      'OAuth2',
      'Redis'
    ],
    categories: ['fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/Helldivers',
    demoUrl: 'https://gooddivers.dionatha.com.br',
    details: {
      purpose:
        'Prover uma plataforma onde jogadores podem organizar estrategicamente seus equipamentos. O jogo original não oferece ferramentas para salvar "builds" ou visualizar estatísticas combinadas, uma lacuna que este projeto preenche.',
      why:
        'Como jogador ativo, senti a frustração de reconfigurar equipamentos manualmente para cada missão. Desenvolvi o sistema para resolver essa dor real da comunidade, focando em UX para gamers.',
      challenges:
        'Integração complexa entre um frontend moderno em Next.js e um backend robusto em Django. Implementação de cache agressivo com Redis para lidar com picos de acesso da comunidade. Sistema de autenticação OAuth seguro integrando múltiplas plataformas.',
      results:
        'Uma aplicação Fullstack completa, com milhares de combinações de loadouts possíveis. A arquitetura desacoplada permite que o frontend seja extremamente rápido (Edge) enquanto o backend processa dados complexos com a robustez do Python.'
    }
  },
  {
    id: '2',
    title: 'Ampare',
    subtitle: 'Legal Automation',
    description:
      'Solução Enterprise para automação jurídica. Transforma o preenchimento de formulários em contratos PDF legais assinados digitalmente e enviados automaticamente.',
    image: PROJECT_IMAGES.Ampare,
    tags: ['React', 'Node.js', 'PDF-Lib', 'Nodemailer', 'Enterprise'],
    categories: ['fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/PDF-From',
    demoUrl: 'https://ampare.org.br/termos',
    private: true,
    details: {
      purpose:
        'Automatizar o fluxo burocrático de contratação da Ampare. O sistema elimina a necessidade de redação manual de contratos, garantindo padronização jurídica e agilidade no fechamento de negócios.',
      why:
        'O processo manual consumia horas da equipe e era propenso a erros humanos. A automação reduz o tempo de geração de contratos de 30 minutos para 2 minutos.',
      challenges:
        'Mapeamento preciso de campos dinâmicos no PDF. Garantir a validade jurídica da assinatura digital capturada via web. Sistema de retry e garantia de entrega de emails com anexos sensíveis.',
      results:
        'Redução drástica no tempo operacional da equipe jurídica. O sistema processa centenas de contratos mensalmente com taxa de erro zero, oferecendo uma experiência profissional e confiável para os clientes finais.'
    }
  },
  {
    id: '3',
    title: 'Detcheler',
    subtitle: 'E-commerce Sync',
    description:
      'Catálogo digital inteligente integrado ao ERP. Sincronização em tempo real de estoque e preços com TinyERP, focado em vendas via WhatsApp.',
    image: PROJECT_IMAGES.Catalogo,
    tags: [
      'React',
      'Node.js',
      'TinyERP API',
      'MongoDB',
      'Zustand',
      'WhatsApp API'
    ],
    categories: ['fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/Catalog',
    demoUrl: 'https://detcheler.com.br',
    details: {
      purpose:
        'Modernizar o processo de vendas B2B/B2C, permitindo que clientes montem pedidos com base no estoque real do ERP, sem a complexidade de um e-commerce tradicional.',
      why:
        'O cliente precisava de uma vitrine online que refletisse o estoque físico instantaneamente, mas queria manter o fechamento da venda humanizado via WhatsApp.',
      challenges:
        'Lidar com Rate Limits e inconsistências da API do TinyERP. Implementar um carrinho de compras persistente (local-first) que não perde dados se o usuário fechar o navegador. Otimização de imagens de produtos em larga escala.',
      results:
        'Aumento de 300% na captação de pedidos digitais. A sincronização automática eliminou o problema de venda de produtos sem estoque e facilitou o trabalho da equipe de vendas.'
    }
  },
  {
    id: '4',
    title: 'Assinatura',
    subtitle: 'Digital Signatures',
    description:
      'Plataforma SaaS para gestão de assinaturas digitais. Criação de templates, coleta de assinaturas biométricas e rastreabilidade documental.',
    image: PROJECT_IMAGES.signature,
    tags: [
      'React',
      'Canvas API',
      'Node.js',
      'JWT',
      'SaaS'
    ],
    categories: ['fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/signature-React',
    demoUrl: 'https://termos.dionatha.com.br',
    details: {
      purpose:
        'Democratizar o acesso a assinaturas digitais simples e seguras. Uma alternativa leve e direta aos grandes players do mercado, focada em pequenos negócios.',
      why:
        'Muitas soluções de assinatura são complexas e caras. Este projeto visa oferecer a funcionalidade core (assinar e validar) com a melhor experiência de usuário possível.',
      challenges:
        'Implementação de um Canvas de alta precisão para captura de assinatura manuscrita que funcione bem em mobile e desktop. Geração de hash criptográfico para garantir a imutabilidade do documento assinado.',
      results:
        'Uma ferramenta ágil que permite fechar acordos em segundos. O Canvas responsivo proporciona uma experiência de assinatura natural, quase como papel e caneta.'
    }
  },
  {
    id: '5',
    title: 'LinkSpace',
    subtitle: 'URL Analytics',
    description:
      'Encurtador de URLs corporativo com Dashboard de Analytics. Acompanhe cliques, geolocalização e dispositivos em tempo real.',
    image: PROJECT_IMAGES.short,
    tags: [
      'Angular 17',
      'Node.js',
      'MongoDB Aggregations',
      'Bootstrap',
      'Chart.js'
    ],
    categories: ['fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/link-shortener--Angular',
    demoUrl: 'https://linkspace.dionatha.com.br',
    details: {
      purpose:
        'Oferecer insights detalhados sobre o tráfego de links compartilhados. Mais do que encurtar, a ferramenta visa entender o comportamento da audiência.',
      why:
        'Projeto concebido para explorar o poder do Angular moderno combinado com um backend de alta performance para processamento de dados analíticos.',
      challenges:
        'Processar dados de cliques em tempo real sem degradar a performance do redirecionamento. Criar visualizações de dados (charts) intuitivas e responsivas no Angular.',
      results:
        'Sistema capaz de lidar com alto volume de redirecionamentos. O Dashboard entrega métricas valiosas para marketing, permitindo decisões baseadas em dados.'
    }
  },
  {
    id: '7',
    title: 'Containner',
    subtitle: 'Design Portfolio',
    description:
      'Showcase imersivo para agência de branding. Features interativas como gerador de patterns SVG e comparação de imagens Before/After.',
    image: PROJECT_IMAGES.containnerPortfolio,
    tags: [
      'React',
      'Vite',
      'SVG Manipulation',
      'Framer Motion',
      'Interactive Design'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/containner-archived/Containner',
    demoUrl: 'https://containner.netlify.app',
    details: {
      purpose:
        'Traduzir a identidade visual arrojada da marca Containner para o ambiente web. O site não é apenas uma galeria, é uma extensão da experiência de marca.',
      why:
        'Marcas de design exigem apresentações de alto nível. Sites estáticos não eram suficientes para demonstrar a profundidade do trabalho de branding realizado.',
      challenges:
        'Manipulação complexa de SVG em tempo real para o gerador de padrões. Otimização de assets de alta resolução para manter o First Contentful Paint baixo. Animações de transição de página fluidas.',
      results:
        'Um site premiado visualmente que retém o usuário. O gerador de patterns tornou-se uma ferramenta divertida que aumenta o engajamento e o tempo de permanência na página.'
    }
  },
  {
    id: '9',
    title: 'Manual Vextro',
    subtitle: 'Interactive Guidelines',
    description:
      'Documentação de marca viva. Substitui o PDF estático por um site interativo com navegação inteligente e exemplos de aplicação animados.',
    image: PROJECT_IMAGES.Manual,
    tags: [
      'React',
      'Intersection Observer',
      'Tailwind CSS',
      'Typography',
      'UX/UI'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Manual',
    demoUrl: 'https://manual-vextro.vercel.app',
    details: {
      purpose:
        'Facilitar o uso correto da marca por parceiros e colaboradores. Tornar a consulta às regras de design rápida, intuitiva e acessível de qualquer lugar.',
      why:
        'Manuais em PDF são difíceis de navegar e atualizar. Uma solução web garante que todos tenham sempre acesso à versão mais recente das diretrizes.',
      challenges:
        'Implementar um sistema de "Spy Scroll" preciso para a navegação lateral. Renderizar fontes customizadas e layouts complexos de tipografia garantindo consistência entre browsers.',
      results:
        'Adoção massiva pela equipe interna. A redução de erros na aplicação da marca foi notável, pois os assets e regras estão a um clique de distância.'
    }
  },
  {
    id: '10',
    title: 'Adoção de Pets',
    subtitle: 'Social Impact',
    description:
      'Plataforma para conectar abrigos e adotantes. Sistema de "Matching" que utiliza critérios de perfil para sugerir o pet ideal.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'Collaborative Filtering', 'Mobile First'],
    categories: ['fullstack', 'progress'],
    githubUrl: 'https://github.com/DionathaGoulart/Pets',
    demoUrl: '',
    details: {
      purpose:
        'Usar tecnologia para resolver o problema de abandono animal. O objetivo é reduzir a taxa de devolução de animais adotados através de um matching mais assertivo.',
      why:
        'Muitas adoções falham por incompatibilidade de estilo de vida. O algoritmo propõe resolver isso analisando dados do adotante e comportamento do animal.',
      challenges:
        'Desenvolver um algoritmo de recomendação eficaz com dados limitados. Criar uma interface empática que transmita a personalidade dos animais.',
      results:
        'Projeto em fase avançada de desenvolvimento. MVP validado com ONGs locais, demonstrando grande potencial de impacto social.'
    }
  },
  {
    id: '12',
    title: 'GoodDay',
    subtitle: 'Mental Health Tracker',
    description:
      'App Mobile para autocuidado e monitoramento de humor. Arquitetura Local-First para privacidade total dos dados sensíveis do usuário.',
    image: PROJECT_IMAGES.default,
    tags: ['Flutter', 'Dart', 'Hive DB', 'Clean Architecture', 'Mobile'],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/good_day',
    demoUrl: '',
    details: {
      purpose:
        'Prover uma ferramenta privada e acessível para gestão da saúde emocional. Foca em identificar padrões de comportamento que influenciam o bem-estar.',
      why:
        'A maioria dos apps da categoria exige login e armazena dados na nuvem. GoodDay foi criado com a filosofia "Privacy by Design", mantendo tudo no dispositivo.',
      challenges:
        'Implementação de gráficos complexos em Flutter/Dart. Otimização do banco de dados local (Hive) para consultas rápidas de históricos longos.',
      results:
        'Um app fluido, bonito e seguro. A performance nativa do Flutter garante uma experiência de uso suave, incentivando o registro diário.'
    }
  },
  {
    id: '13',
    title: 'Finances',
    subtitle: 'Personal Wealth',
    description:
      'Dashboard financeiro focado em privacidade. Análise de gastos, projeção de metas e categorização inteligente sem compartilhar dados bancários.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Data Visualization', 'Local Storage', 'PWA'],
    categories: ['frontend'],
    githubUrl: '',
    demoUrl: '',
    private: true,
    details: {
      purpose:
        'Oferecer clareza financeira total. O sistema permite visualizar para onde o dinheiro está indo através de gráficos interativos e relatórios mensais.',
      why:
        'Apps bancários são limitados e apps de terceiros vendem dados. Eu precisava de uma solução que fosse poderosa como uma planilha, mas com a UX de um app moderno.',
      challenges:
        'Criar uma interface de input de dados ultra-rápida (para não desencorajar o uso). Cálculos de projeção financeira complexos no frontend.',
      results:
        'Controle total sobre a vida financeira. A visualização clara dos dados permitiu identificar gargalos no orçamento e otimizar investimentos pessoais.'
    }
  },
  {
    id: '0',
    title: 'XR Card',
    subtitle: 'High Conversion LP',
    description:
      'Landing Page de alta performance para Fintech. Focada em conversão, SEO e acessibilidade, seguindo rigorosos padrões de Design System.',
    image: PROJECT_IMAGES.XRCard,
    tags: [
      'React',
      'Vite',
      'SEO Optimization',
      'Analytics',
      'A/B Testing'
    ],
    categories: ['frontend'],
    githubUrl: '',
    demoUrl: 'https://www.xrcard.com.br',
    private: true,
    details: {
      purpose:
        'Maximizar a conversão de visitantes em clientes. Cada pixel foi pensado para guiar o usuário através do funil de vendas com o mínimo de atrito.',
      why:
        'O cliente precisava modernizar sua presença digital para competir com bancos digitais. A performance e a estética eram requisitos não-negociáveis.',
      challenges:
        'Implementar animações complexas que não prejudicassem o Core Web Vitals. Garantir acessibilidade plena (WCAG) para um público amplo.',
      results:
        'Landing Page com pontuação 100/100 no Lighthouse. Aumento significativo na taxa de conversão e retenção de usuários após o redesign.'
    }
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
const ProjectsGrid: React.FC<ProjectsGridProps & { onCardClick?: (projectId: string) => void }> = ({
  projects,
  animationKey,
  isInitialLoad,
  onGithubClick,
  onDemoClick,
  onCardClick,
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
            onCardClick={onCardClick}
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleCardClick = (projectId: string): void => {
    const project = findProjectById(projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
      analytics.trackButtonClick(`view_project_details_${projectId}`)
    }
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setSelectedProject(null)
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
        onCardClick={handleCardClick}
        activeFilter={activeFilter}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  )
}

// ================================
// Exports
// ================================

export default ProjectsSection
