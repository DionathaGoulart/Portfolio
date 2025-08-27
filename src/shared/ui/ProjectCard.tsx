import React from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import { Tag } from '@/shared/ui/Tag'
import {
  buildCardClasses,
  buildEmptyStateClasses,
  buildGridClasses,
  ProjectCardProps,
  ProjectGridProps
} from '../types/ui/ProjectCard.types'

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================

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
  const cardClasses = buildCardClasses(
    size,
    variant,
    loading,
    disabled,
    elevated,
    className
  )

  const handleGithubClick = () => {
    if (!disabled && !loading && onGithubClick) {
      onGithubClick(project.id)
    }
  }

  const handleDemoClick = () => {
    if (!disabled && !loading && onDemoClick) {
      onDemoClick(project.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleDemoClick()
    }
  }

  return (
    <div
      className={cardClasses}
      onKeyDown={handleKeyDown}
      tabIndex={!disabled && !loading ? 0 : -1}
      role="button"
      aria-label={`Projeto ${project.title}`}
    >
      {/* Imagem do Projeto */}
      <div className="project-card__image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
        />
        <div className="project-card__image-overlay" />
      </div>

      {/* Conteúdo do Card */}
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

        {/* Botões */}
        <div className="project-card__buttons">
          <Button
            variant="outline"
            size="pequeno"
            onClick={handleGithubClick}
            disabled={disabled || loading}
          >
            <Github size={16} />
            GitHub
          </Button>

          <Button
            size="pequeno"
            onClick={handleDemoClick}
            disabled={disabled || loading}
          >
            <ExternalLink size={16} />
            Demo
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PROJECT GRID COMPONENT
// ============================================================================

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onGithubClick,
  onDemoClick,
  emptyMessage = 'Nenhum projeto encontrado para esta categoria.',
  className = '',
  columns = 'responsive', // Usa 'responsive' como padrão
  gap = 'medium',
  loading = false
}) => {
  const gridClasses = buildGridClasses(columns, gap, loading, className)
  const emptyStateClasses = buildEmptyStateClasses()

  if (projects.length === 0 && !loading) {
    return (
      <div className={emptyStateClasses}>
        <P className="project-grid__empty-text">{emptyMessage}</P>
      </div>
    )
  }

  return (
    <div className={gridClasses}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onGithubClick={onGithubClick}
          onDemoClick={onDemoClick}
          loading={loading}
        />
      ))}

      {/* Loading skeleton cards se necessário */}
      {loading &&
        projects.length === 0 &&
        Array.from(
          { length: 6 },
          (
            _,
            i // Reduzido para 6 cards skeleton
          ) => (
            <ProjectCard
              key={`skeleton-${i}`}
              project={{
                id: `skeleton-${i}`,
                title: 'Loading...',
                description: 'Loading project description...',
                image: '/placeholder.jpg',
                tags: ['Loading'],
                category: 'frontend',
                githubUrl: '#',
                demoUrl: '#'
              }}
              loading={true}
              disabled={true}
            />
          )
        )}
    </div>
  )
}
