// ================================
// PROJECT SPECIFIC TYPES
// ================================

/**
 * Available project categories
 */
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'progress'

/**
 * Project card size variants
 */
export type CardSize = 'compact' | 'medium' | 'large'

/**
 * Project card visual variants
 */
export type CardVar = 'default' | 'primary' | 'accent'

/**
 * Project grid column options
 */
export type GridColumns = 1 | 2 | 3 | 4 | 'responsive'

/**
 * Project grid gap spacing options
 */
export type GridGap = 'small' | 'medium' | 'large'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Project data structure interface
 *
 * @interface Project
 * @property {string} id - Unique project identifier
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string} image - Project image URL or component
 * @property {string[]} tags - Array of technology tags
 * @property {ProjectCategory[]} categories - Array of project categories
 * @property {string} githubUrl - GitHub repository URL
 * @property {string} demoUrl - Live demo URL
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
 * Props interface for the ProjectCard component
 *
 * @interface ProjectCardProps
 * @property {Project} project - Project data to display
 * @property {(projectId: string) => void} onGithubClick - GitHub button click handler
 * @property {(projectId: string) => void} onDemoClick - Demo button click handler
 * @property {string} className - Additional CSS classes
 * @property {CardSize} size - Card size variant
 * @property {CardVariant} variant - Card visual variant
 * @property {boolean} loading - Loading state
 * @property {boolean} disabled - Disabled state
 * @property {boolean} elevated - Elevated shadow effect
 */
export interface ProjectCardProps {
  // Content
  project: Project

  // Functionality
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void

  // Appearance
  size?: CardSize
  variant?: CardVar
  loading?: boolean
  disabled?: boolean
  elevated?: boolean

  // HTML attributes
  className?: string
}

/**
 * Props interface for the ProjectGrid component
 *
 * @interface ProjectGridProps
 * @property {Project[]} projects - Array of projects to display
 * @property {(projectId: string) => void} onGithubClick - GitHub button click handler
 * @property {(projectId: string) => void} onDemoClick - Demo button click handler
 * @property {string} emptyMessage - Message displayed when no projects
 * @property {string} className - Additional CSS classes
 * @property {GridColumns} columns - Number of grid columns
 * @property {GridGap} gap - Spacing between cards
 * @property {boolean} loading - Loading state
 */
export interface ProjectGridProps {
  // Content
  projects: Project[]
  emptyMessage?: string

  // Functionality
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void

  // Layout
  columns?: GridColumns
  gap?: GridGap
  loading?: boolean

  // HTML attributes
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Builds CSS classes for the ProjectCard component
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
 * Builds CSS classes for the ProjectGrid component
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
 * Builds CSS classes for the empty state
 */
export const buildEmptyStateClasses = (): string => {
  return 'project-grid__empty'
}
