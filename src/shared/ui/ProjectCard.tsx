import React, { JSX } from 'react'
import { Github, ExternalLink, Clock } from 'lucide-react'
import { Button, P, Title, Tag } from '@shared'
import { ProjectCardProps, ProjectGridProps, Project } from '@types'
import '@styles/ui/projectcard.scss'

// ================================
// CONSTANTS
// ================================

const SKELETON_CARDS_COUNT = 6
const DEFAULT_EMPTY_MESSAGE = 'Nenhum projeto encontrado para esta categoria.'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Generates content-based CSS classes for dynamic styling
 */
const getContentClasses = (project: Project): string => {
  const classes: string[] = []

  // Title classification (based on length)
  if (project.title.length <= 25) {
    classes.push('card-title--1-line')
  } else if (project.title.length <= 50) {
    classes.push('card-title--2-lines')
  }

  // Description classification
  if (project.description.length <= 120) {
    classes.push('card-description--short')
  } else if (project.description.length <= 240) {
    classes.push('card-description--medium')
  } else {
    classes.push('card-description--long')
  }

  // Tags classification
  if (project.tags.length <= 3) {
    classes.push('card-tags--single-row')
  } else {
    classes.push('card-tags--double-row')
  }

  return classes.join(' ')
}

/**
 * Determines content variant based on total content length
 */
const getContentVariant = (
  project: Project
): 'short-content' | 'medium-content' | 'long-content' => {
  const totalLength = project.title.length + project.description.length

  if (totalLength <= 150) return 'short-content'
  if (totalLength <= 300) return 'medium-content'
  return 'long-content'
}

/**
 * Determines tags variant based on quantity
 */
const getTagsVariant = (project: Project): 'few-tags' | 'many-tags' => {
  return project.tags.length <= 3 ? 'few-tags' : 'many-tags'
}

/**
 * Checks if project is in progress
 */
const isProjectInProgress = (project: Project): boolean => {
  return project.categories.includes('progress')
}

/**
 * Gets primary category for CSS classification with priority order
 */
const getPrimaryCategory = (project: Project): string => {
  const categoryPriority = ['progress', 'fullstack', 'backend', 'frontend']

  for (const priority of categoryPriority) {
    if (
      project.categories.includes(priority as Project['categories'][number])
    ) {
      return priority
    }
  }

  return project.categories[0] || 'frontend'
}

/**
 * Generates category-based CSS classes
 */
const getCategoryClasses = (project: Project): string => {
  const classes: string[] = []

  // Add primary category class
  const primaryCategory = getPrimaryCategory(project)
  classes.push(`project-card--${primaryCategory}`)

  // Add multi-category classes if applicable
  if (project.categories.length > 1) {
    classes.push('project-card--multi-category')
    project.categories.forEach((category) => {
      classes.push(`project-card--has-${category}`)
    })
  }

  return classes.join(' ')
}

/**
 * Builds CSS classes for project card
 */
const buildCardClasses = (
  size: string,
  variant: string,
  loading: boolean,
  disabled: boolean,
  elevated: boolean,
  className: string,
  isInProgress: boolean,
  contentVariant?: string,
  tagsVariant?: string,
  contentClasses?: string,
  categoryClasses?: string
): string => {
  const classes = [
    'project-card',
    `project-card--${size}`,
    `project-card--${variant}`,
    loading && 'project-card--loading',
    disabled && 'project-card--disabled',
    elevated && 'project-card--elevated',
    isInProgress && 'project-card--progress',
    contentVariant && `project-card--${contentVariant}`,
    tagsVariant && `project-card--${tagsVariant}`,
    contentClasses,
    categoryClasses,
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Builds CSS classes for project grid
 */
const buildGridClasses = (
  columns: string | number,
  gap: string,
  loading: boolean,
  className: string
): string => {
  const classes = [
    'project-grid',
    typeof columns === 'number'
      ? `project-grid--${columns}`
      : `project-grid--${columns}`,
    `project-grid--gap-${gap}`,
    loading && 'project-grid--loading',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Creates skeleton project data for loading states
 */
const createSkeletonProject = (index: number): Project => ({
  id: `skeleton-${index}`,
  title: 'Loading Project Title...',
  description:
    'Loading project description that will be replaced with actual content when data loads...',
  image: '/placeholder.jpg',
  tags: ['Loading', 'Skeleton', 'Placeholder'],
  categories: ['frontend'],
  githubUrl: '#',
  demoUrl: '#'
})

// ================================
// PROJECT CARD COMPONENT
// ================================

/**
 * Project card component that displays individual project information
 * with interactive buttons and progress indicators
 *
 * @component ProjectCard
 * @param {ProjectCardProps} props - Project card configuration props
 * @returns {React.FC<ProjectCardProps>} Rendered project card component
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onGithubClick,
  onDemoClick,
  className = '',
  size = 'medium',
  variant = 'default',
  loading = false,
  disabled = false,
  elevated = false
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const isInProgress = isProjectInProgress(project)
  const contentClasses = !loading ? getContentClasses(project) : ''
  const contentVariant = !loading
    ? getContentVariant(project)
    : 'medium-content'
  const tagsVariant = !loading ? getTagsVariant(project) : 'few-tags'
  const categoryClasses = !loading ? getCategoryClasses(project) : ''
  const displayTags = project.tags.slice(0, 6)
  const remainingTagsCount = project.tags.length - 6

  const cardClasses = buildCardClasses(
    size,
    variant,
    loading,
    disabled,
    elevated,
    className,
    isInProgress,
    contentVariant,
    tagsVariant,
    contentClasses,
    categoryClasses
  )

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleGithubClick = (): void => {
    if (shouldAllowInteraction() && onGithubClick) {
      onGithubClick(project.id)
    }
  }

  const handleDemoClick = (): void => {
    if (shouldAllowInteraction() && onDemoClick && !isInProgress) {
      onDemoClick(project.id)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isInProgress) {
        handleDemoClick()
      }
    }
  }

  // ================================
  // UTILITY FUNCTIONS
  // ================================

  const shouldAllowInteraction = (): boolean => {
    return !disabled && !loading
  }

  const getTabIndex = (): number => {
    return shouldAllowInteraction() ? 0 : -1
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div
      className={cardClasses}
      onKeyDown={handleKeyDown}
      tabIndex={getTabIndex()}
      role="button"
      aria-label={`Projeto ${project.title}`}
      data-categories={project.categories.join(',')}
    >
      {/* Progress Badge */}
      {isInProgress && (
        <div className="project-card__progress-badge">
          <Clock size={12} />
          <span>Em Progresso</span>
        </div>
      )}

      {/* Image Container */}
      <div className="project-card__image-container">
        {typeof project.image === 'string' ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-card__image"
            loading="lazy"
          />
        ) : (
          project.image
        )}
        <div className="project-card__image-overlay" />

        {/* Progress overlay for visual indication */}
        {isInProgress && (
          <div className="project-card__progress-overlay">
            <div className="project-card__progress-indicator">
              <Clock size={24} />
            </div>
          </div>
        )}
      </div>

      {/* Card Content - Fixed Grid Structure */}
      <div className="project-card__content">
        <Title level="h3" align="center" className="project-card__title">
          {project.title}
        </Title>

        <P className="project-card__description">{project.description}</P>

        {/* Tags with fixed height */}
        <div className="project-card__tags">
          {displayTags.map((tag) => (
            <Tag size="pequeno" key={tag}>
              {tag}
            </Tag>
          ))}
          {remainingTagsCount > 0 && (
            <Tag size="pequeno" variant="outline">
              +{remainingTagsCount}
            </Tag>
          )}
        </div>

        {/* Action Buttons with fixed height */}
        <div className="project-card__buttons">
          <Button
            variant="outline"
            size="pequeno"
            onClick={handleGithubClick}
            disabled={!shouldAllowInteraction()}
          >
            <Github size={16} />
            GitHub
          </Button>

          <Button
            size="pequeno"
            onClick={handleDemoClick}
            disabled={!shouldAllowInteraction() || isInProgress}
            variant={isInProgress ? 'outline' : 'solid'}
          >
            {isInProgress ? (
              <>
                <Clock size={16} />
                Em Breve
              </>
            ) : (
              <>
                <ExternalLink size={16} />
                Site
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ================================
// PROJECT GRID COMPONENT
// ================================

/**
 * Grid container component for displaying multiple project cards
 * with responsive layout and loading states
 *
 * @component ProjectGrid
 * @param {ProjectGridProps} props - Project grid configuration props
 * @returns {React.FC<ProjectGridProps>} Rendered project grid component
 */
export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onGithubClick,
  onDemoClick,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  className = '',
  columns = 'responsive',
  gap = 'medium',
  loading = false
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const gridClasses = buildGridClasses(columns, gap, loading, className)
  const emptyStateClasses = 'project-grid__empty'
  const hasNoProjects = projects.length === 0
  const shouldShowEmptyState = hasNoProjects && !loading
  const shouldShowSkeletons = loading && hasNoProjects

  // ================================
  // RENDER HELPERS
  // ================================

  const renderProjectCard = (project: Project): JSX.Element => (
    <ProjectCard
      key={project.id}
      project={project}
      onGithubClick={onGithubClick}
      onDemoClick={onDemoClick}
      loading={loading}
    />
  )

  const renderSkeletonCards = (): JSX.Element[] => {
    return Array.from({ length: SKELETON_CARDS_COUNT }, (_, index) => (
      <ProjectCard
        key={`skeleton-${index}`}
        project={createSkeletonProject(index)}
        loading={true}
        disabled={true}
      />
    ))
  }

  // ================================
  // EARLY RETURNS
  // ================================

  if (shouldShowEmptyState) {
    return (
      <div className={emptyStateClasses}>
        <P className="project-grid__empty-text">{emptyMessage}</P>
      </div>
    )
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div className={gridClasses}>
      {projects.map(renderProjectCard)}
      {shouldShowSkeletons && renderSkeletonCards()}
    </div>
  )
}
