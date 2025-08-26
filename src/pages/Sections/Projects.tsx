import { useState } from 'react'
import { analytics } from '@/features/Analytics/utils/analytics'
import { Button } from '@/shared/ui/Button'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import { Github, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile'
  githubUrl: string
  demoUrl: string
}

interface ProjectsSectionProps {
  id?: string
}

// Dados de exemplo dos projetos
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

const filterOptions = [
  { value: 'todos', label: 'todos' },
  { value: 'frontend', label: 'frontend' },
  { value: 'backend', label: 'backend' },
  { value: 'fullstack', label: 'fullstack' },
  { value: 'mobile', label: 'mobile' }
]

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  id = 'meus-projetos'
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos')

  const filteredProjects =
    activeFilter === 'todos'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter)

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
        <nav className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all duration-200
                ${
                  activeFilter === option.value
                    ? 'bg-theme-primary text-theme-textSecondary shadow-lg'
                    : 'bg-theme-surface text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </nav>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group theme-surface rounded-2xl overflow-hidden theme-shadow hover:theme-shadow-lg transition-all duration-300 hover:scale-105"
            >
              {/* Imagem do Projeto */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <Title
                  level="h3"
                  className="mb-3 group-hover:text-theme-primary transition-colors"
                >
                  {project.title}
                </Title>

                <P className="mb-4 line-clamp-3">{project.description}</P>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-theme-primary/10 text-theme-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botões */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="pequeno"
                    onClick={() => handleGithubClick(project.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    GitHub
                  </Button>

                  <Button
                    variant="solid"
                    size="pequeno"
                    onClick={() => handleDemoClick(project.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há projetos */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <P className="text-theme-text/60">
              Nenhum projeto encontrado para esta categoria.
            </P>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
