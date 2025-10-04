// ================================
// PROJECT SPECIFIC TYPES
// ================================

/**
 * Categorias de projeto disponíveis
 */
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'progress'

/**
 * Variantes de tamanho do card de projeto
 */
export type CardSize = 'compact' | 'medium' | 'large'

/**
 * Variantes visuais do card de projeto
 */
export type CardVar = 'default' | 'primary' | 'accent'

/**
 * Opções de colunas do grid de projeto
 */
export type GridColumns = 1 | 2 | 3 | 4 | 'responsive'

/**
 * Opções de espaçamento do grid de projeto
 */
export type GridGap = 'small' | 'medium' | 'large'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Interface de estrutura de dados do projeto
 *
 * @interface Project
 * @property {string} id - Identificador único do projeto
 * @property {string} title - Título do projeto
 * @property {string} description - Descrição do projeto
 * @property {string} image - URL da imagem do projeto ou componente
 * @property {string[]} tags - Array de tags de tecnologia
 * @property {ProjectCategory[]} categories - Array de categorias do projeto
 * @property {string} githubUrl - URL do repositório GitHub
 * @property {string} demoUrl - URL da demo ao vivo
 */
export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  categories: ProjectCategory[]
  githubUrl: string
  demoUrl: string
}

/**
 * Interface de props para o componente ProjectCard
 *
 * @interface ProjectCardProps
 * @property {Project} project - Dados do projeto para exibir
 * @property {(projectId: string) => void} onGithubClick - Manipulador de clique do botão GitHub
 * @property {(projectId: string) => void} onDemoClick - Manipulador de clique do botão Demo
 * @property {string} className - Classes CSS adicionais
 * @property {CardSize} size - Variante de tamanho do card
 * @property {CardVariant} variant - Variante visual do card
 * @property {boolean} loading - Estado de carregamento
 * @property {boolean} disabled - Estado desabilitado
 * @property {boolean} elevated - Efeito de sombra elevada
 */
export interface ProjectCardProps {
  // Conteúdo
  project: Project

  // Funcionalidade
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void

  // Aparência
  size?: CardSize
  variant?: CardVar
  loading?: boolean
  disabled?: boolean
  elevated?: boolean

  // Atributos HTML
  className?: string
}

/**
 * Interface de props para o componente ProjectGrid
 *
 * @interface ProjectGridProps
 * @property {Project[]} projects - Array de projetos para exibir
 * @property {(projectId: string) => void} onGithubClick - Manipulador de clique do botão GitHub
 * @property {(projectId: string) => void} onDemoClick - Manipulador de clique do botão Demo
 * @property {string} emptyMessage - Mensagem exibida quando não há projetos
 * @property {string} className - Classes CSS adicionais
 * @property {GridColumns} columns - Número de colunas do grid
 * @property {GridGap} gap - Espaçamento entre cards
 * @property {boolean} loading - Estado de carregamento
 */
export interface ProjectGridProps {
  // Conteúdo
  projects: Project[]
  emptyMessage?: string

  // Funcionalidade
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void

  // Layout
  columns?: GridColumns
  gap?: GridGap
  loading?: boolean

  // Atributos HTML
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Constrói classes CSS para o componente ProjectCard
 * @param {CardSize} size - Tamanho do card
 * @param {CardVar} variant - Variante do card
 * @param {boolean} loading - Estado de carregamento
 * @param {boolean} disabled - Estado desabilitado
 * @param {boolean} elevated - Efeito elevado
 * @param {string} className - Classes adicionais
 * @param {boolean} isProgress - Se é projeto em progresso
 * @returns {string} String de classes CSS
 */
export const buildCardClasses = (
  size: CardSize = 'medium',
  variant: CardVar = 'default',
  loading: boolean = false,
  disabled: boolean = false,
  elevated: boolean = false,
  className: string = '',
  isProgress: boolean = false
): string => {
  const classes = [
    'project-card',
    size !== 'medium' && `project-card--${size}`,
    variant !== 'default' && `project-card--${variant}`,
    loading && 'project-card--loading',
    disabled && 'project-card--disabled',
    elevated && 'project-card--elevated',
    isProgress && 'project-card--progress',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói classes CSS para o componente ProjectGrid
 * @param {GridColumns} columns - Número de colunas
 * @param {GridGap} gap - Espaçamento
 * @param {boolean} loading - Estado de carregamento
 * @param {string} className - Classes adicionais
 * @returns {string} String de classes CSS
 */
export const buildGridClasses = (
  columns: GridColumns = 'responsive',
  gap: GridGap = 'medium',
  loading: boolean = false,
  className: string = ''
): string => {
  const classes = [
    'project-grid',
    `project-grid--${columns}`,
    gap !== 'medium' && `project-grid--gap-${gap}`,
    loading && 'project-grid--loading',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói classes CSS para o estado vazio
 * @returns {string} String de classes CSS
 */
export const buildEmptyStateClasses = (): string => {
  return 'project-grid__empty'
}
