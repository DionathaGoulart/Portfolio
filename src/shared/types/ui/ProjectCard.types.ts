// ============================================================================
// PROJECT CARD TYPES
// ============================================================================

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: ProjectCategory
  githubUrl: string
  demoUrl: string
}

export interface ProjectCardProps {
  project: Project
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void
  className?: string
  size?: 'compact' | 'medium' | 'large'
  variant?: 'default' | 'primary' | 'accent'
  loading?: boolean
  disabled?: boolean
  elevated?: boolean
}

export interface ProjectGridProps {
  projects: Project[]
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void
  emptyMessage?: string
  className?: string
  columns?: 1 | 2 | 3 | 4 | 'responsive'
  gap?: 'small' | 'medium' | 'large'
  loading?: boolean
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

export const buildCardClasses = (
  size: 'compact' | 'medium' | 'large' = 'medium',
  variant: 'default' | 'primary' | 'accent' = 'default',
  loading: boolean = false,
  disabled: boolean = false,
  elevated: boolean = false,
  className = ''
): string => {
  const classes = [
    'project-card',
    size !== 'medium' && `project-card--${size}`,
    variant !== 'default' && `project-card--${variant}`,
    loading && 'project-card--loading',
    disabled && 'project-card--disabled',
    elevated && 'project-card--elevated',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildGridClasses = (
  columns: 1 | 2 | 3 | 4 | 'responsive' = 'responsive',
  gap: 'small' | 'medium' | 'large' = 'medium',
  loading: boolean = false,
  className = ''
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

export const buildEmptyStateClasses = (): string => {
  return 'project-grid__empty'
}
