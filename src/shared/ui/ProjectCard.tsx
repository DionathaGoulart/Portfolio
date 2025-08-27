import React from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import { Tag } from '@/shared/ui/Tag'
import {
  buildButtonClasses,
  buildButtonsContainerClasses,
  buildCardClasses,
  buildCardContentClasses,
  buildCardDescriptionClasses,
  buildCardImageClasses,
  buildCardTitleClasses,
  buildEmptyStateClasses,
  buildGridClasses,
  buildImageClasses,
  buildImageOverlayClasses,
  buildTagsContainerClasses,
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
  className = ''
}) => {
  const cardClasses = buildCardClasses(className)
  const imageContainerClasses = buildCardImageClasses()
  const imageClasses = buildImageClasses()
  const overlayClasses = buildImageOverlayClasses()
  const contentClasses = buildCardContentClasses()
  const titleClasses = buildCardTitleClasses()
  const descriptionClasses = buildCardDescriptionClasses()
  const tagsContainerClasses = buildTagsContainerClasses()
  const buttonsContainerClasses = buildButtonsContainerClasses()
  const buttonClasses = buildButtonClasses()

  const handleGithubClick = () => {
    if (onGithubClick) {
      onGithubClick(project.id)
    }
  }

  const handleDemoClick = () => {
    if (onDemoClick) {
      onDemoClick(project.id)
    }
  }

  return (
    <div className={cardClasses}>
      {/* Imagem do Projeto */}
      <div className={imageContainerClasses}>
        <img src={project.image} alt={project.title} className={imageClasses} />
        <div className={overlayClasses} />
      </div>

      {/* Conteúdo do Card */}
      <div className={contentClasses}>
        <Title level="h3" className={titleClasses}>
          {project.title}
        </Title>

        <P className={descriptionClasses}>{project.description}</P>

        {/* Tags */}
        <div className={tagsContainerClasses}>
          {project.tags.map((tag) => (
            <Tag size="pequeno" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Botões */}
        <div className={buttonsContainerClasses}>
          <Button
            variant="outline"
            size="pequeno"
            onClick={handleGithubClick}
            className={buttonClasses}
          >
            <Github size={16} />
            GitHub
          </Button>

          <Button
            size="pequeno"
            onClick={handleDemoClick}
            className={buttonClasses}
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
  className = ''
}) => {
  const gridClasses = buildGridClasses(className)
  const emptyStateClasses = buildEmptyStateClasses()

  if (projects.length === 0) {
    return (
      <div className={emptyStateClasses}>
        <P className="text-theme-text/60">{emptyMessage}</P>
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
        />
      ))}
    </div>
  )
}
