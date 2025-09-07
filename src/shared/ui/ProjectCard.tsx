import React, { JSX } from 'react'
import { Github, ExternalLink, Clock } from 'lucide-react'
import { Button, P, Title, Tag } from '@shared/ui'
import {
  buildCardClasses,
  buildEmptyStateClasses,
  buildGridClasses,
  type ProjectCardProps,
  type ProjectGridProps,
  type Project
} from '@shared/types'
import '@styles/ui/projectcard.scss'

// ============================================================================
// CONSTANTS
// ============================================================================

const SKELETON_CARDS_COUNT = 6
const DEFAULT_EMPTY_MESSAGE = 'Nenhum projeto encontrado para esta categoria.'

// ============================================================================
// SKELETON PROJECT DATA
// ============================================================================

const createSkeletonProject = (index: number): Project => ({
  id: `skeleton-${index}`,
  title: 'Loading...',
  description: 'Loading project description...',
  image: '/placeholder.jpg',
  tags: ['Loading'],
  category: 'frontend',
  githubUrl: '#',
  demoUrl: '#'
})

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================

/**
 * Componente que renderiza um card de projeto individual
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
  const isInProgress = project.category === 'progress'

  const cardClasses = buildCardClasses(
    size,
    variant,
    loading,
    disabled,
    elevated,
    className,
    isInProgress
  )

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

  const shouldAllowInteraction = (): boolean => {
    return !disabled && !loading
  }

  const getTabIndex = (): number => {
    return shouldAllowInteraction() ? 0 : -1
  }

  return (
    <div
      className={cardClasses}
      onKeyDown={handleKeyDown}
      tabIndex={getTabIndex()}
      role="button"
      aria-label={`Projeto ${project.title}`}
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
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
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

      {/* Card Content */}
      <div className="project-card__content">
        <Title level="h3" className="project-card__title">
          {project.title}
        </Title>

        <P className="project-card__description">{project.description}</P>

        {/* Tags */}
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <Tag size="pequeno" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Action Buttons */}
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
                Demo
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PROJECT GRID COMPONENT
// ============================================================================

/**
 * Componente que renderiza uma grade de projetos
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
  const gridClasses = buildGridClasses(columns, gap, loading, className)
  const emptyStateClasses = buildEmptyStateClasses()

  const hasNoProjects = projects.length === 0
  const shouldShowEmptyState = hasNoProjects && !loading
  const shouldShowSkeletons = loading && hasNoProjects

  if (shouldShowEmptyState) {
    return (
      <div className={emptyStateClasses}>
        <P className="project-grid__empty-text">{emptyMessage}</P>
      </div>
    )
  }

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

  return (
    <div className={gridClasses}>
      {projects.map(renderProjectCard)}
      {shouldShowSkeletons && renderSkeletonCards()}
    </div>
  )
}
