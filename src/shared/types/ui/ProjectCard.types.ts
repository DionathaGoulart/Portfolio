// ============================================================================
// PROJECT CARD TYPES
// ============================================================================

import { ReactElement, ReactNode } from 'react'

/**
 * Categorias disponíveis para projetos
 */
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'progress'

/**
 * Interface que define a estrutura de um projeto
 */
export interface Project {
  id: string
  title: string
  description: string
  image: string | ReactNode
  tags: string[]
  category: ProjectCategory
  githubUrl: string
  demoUrl: string
}

/**
 * Props do componente ProjectCard
 */
export interface ProjectCardProps {
  /** Dados do projeto a ser exibido */
  project: Project
  /** Callback executado ao clicar no botão GitHub */
  onGithubClick?: (projectId: string) => void
  /** Callback executado ao clicar no botão Demo */
  onDemoClick?: (projectId: string) => void
  /** Classes CSS adicionais */
  className?: string
  /** Tamanho do card */
  size?: CardSize
  /** Variante visual do card */
  variant?: CardVariant
  /** Se o card está em estado de loading */
  loading?: boolean
  /** Se o card está desabilitado */
  disabled?: boolean
  /** Se o card deve ter sombra elevada */
  elevated?: boolean
}

/**
 * Props do componente ProjectGrid
 */
export interface ProjectGridProps {
  /** Lista de projetos a serem exibidos */
  projects: Project[]
  /** Callback executado ao clicar no botão GitHub */
  onGithubClick?: (projectId: string) => void
  /** Callback executado ao clicar no botão Demo */
  onDemoClick?: (projectId: string) => void
  /** Mensagem exibida quando não há projetos */
  emptyMessage?: string
  /** Classes CSS adicionais */
  className?: string
  /** Número de colunas do grid */
  columns?: GridColumns
  /** Espaçamento entre os cards */
  gap?: GridGap
  /** Se o grid está em estado de loading */
  loading?: boolean
}

// ============================================================================
// AUXILIARY TYPES
// ============================================================================

type CardSize = 'compact' | 'medium' | 'large'
type CardVariant = 'default' | 'primary' | 'accent'
type GridColumns = 1 | 2 | 3 | 4 | 'responsive'
type GridGap = 'small' | 'medium' | 'large'

// ============================================================================
// CLASS BUILDERS
// ============================================================================

/**
 * Constrói as classes CSS para o ProjectCard
 * @param size - Tamanho do card
 * @param variant - Variante visual do card
 * @param loading - Se está carregando
 * @param disabled - Se está desabilitado
 * @param elevated - Se deve ter sombra elevada
 * @param className - Classes adicionais
 * @param isProgress - Se é um projeto em progresso
 * @returns String com as classes CSS
 */
export const buildCardClasses = (
  size: CardSize = 'medium',
  variant: CardVariant = 'default',
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
 * Constrói as classes CSS para o ProjectGrid
 * @param columns - Número de colunas
 * @param gap - Espaçamento entre cards
 * @param loading - Se está carregando
 * @param className - Classes adicionais
 * @returns String com as classes CSS
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
 * Constrói as classes CSS para o estado vazio do grid
 * @returns String com as classes CSS
 */
export const buildEmptyStateClasses = (): string => {
  return 'project-grid__empty'
}
