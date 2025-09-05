import React from 'react'
import { P, Tag, TagGroup, Title } from '@shared/ui'
import { AnimatedContainer } from './Animated'

// ============================================================================
// TYPES
// ============================================================================

export interface ExpCardProps {
  // Conteúdo
  title: string
  company: string
  period: string
  description: string
  technologies: string[]

  // Aparência
  variant?: 'default' | 'highlight'
  showTimeline?: boolean

  // Interatividade
  interactive?: boolean
  onClick?: () => void

  // HTML attributes
  className?: string
  id?: string
}

export interface ExpListProps {
  experiences: ExpCardProps[]
  showTimeline?: boolean
  defaultVariant?: 'default' | 'highlight' | 'secondary' | 'accent'
  className?: string
}

// ============================================================================
// EXPERIENCE CARD COMPONENT
// ============================================================================

export const Exp: React.FC<ExpCardProps> = ({
  // Conteúdo
  title,
  company,
  period,
  description,
  technologies = [],

  // Aparência
  variant = 'default',
  showTimeline = true,

  // Interatividade
  interactive = false,
  onClick,

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================

  const isInteractive = Boolean(onClick || interactive)

  // ============================================================================
  // CLASSES CSS
  // ============================================================================

  const classes = [
    // Classe base
    'experience-card',

    // Variantes
    `experience-card--${variant}`,

    // Estados
    isInteractive && 'experience-card--interactive',

    // Timeline
    showTimeline && 'experience-card--with-timeline',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleClick = (e: React.MouseEvent) => {
    if (!isInteractive || !onClick) return
    onClick()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isInteractive || !onClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div
      className={classes}
      id={id}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
    >
      {/* Timeline dot */}
      {showTimeline && <div className="experience-card__timeline-dot" />}

      {/* Card content */}
      <div className="experience-card__content">
        {/* Header com título e período */}
        <div className="experience-card__header">
          <div className="experience-card__title-group">
            <Title
              level="h4"
              className="experience-card__title"
              weight="semibold"
            >
              {title}
            </Title>
            <Title
              level="h5"
              className="experience-card__company"
              color="primary"
              weight="medium"
            >
              {company}
            </Title>
          </div>

          <div className="experience-card__period">
            <Tag color="primary" size="pequeno">
              {period}
            </Tag>
          </div>
        </div>

        {/* Descrição */}
        <div className="experience-card__description">
          <P size="medio" color="textSecondary">
            {description}
          </P>
        </div>

        {/* Tecnologias */}
        {technologies.length > 0 && (
          <div className="experience-card__technologies">
            <TagGroup compact>
              {technologies.map((tech, index) => (
                <Tag
                  key={index}
                  color="primary"
                  variant="outline"
                  size="pequeno"
                >
                  {tech}
                </Tag>
              ))}
            </TagGroup>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// EXPERIENCE LIST COMPONENT
// ============================================================================

export const ExpList: React.FC<ExpListProps> = ({
  experiences,
  showTimeline = true,
  defaultVariant = 'default',
  className = ''
}) => {
  const classes = [
    'experience-list',
    showTimeline && 'experience-list--with-timeline',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {/* Timeline line */}
      {showTimeline && <div className="experience-list__timeline-line" />}

      {/* Experience cards */}
      <div className="experience-list__items">
        {experiences.map((experience, index) => (
          <AnimatedContainer animationType="slide-left">
            <Exp
              key={experience.id || index}
              {...experience}
              showTimeline={showTimeline}
            />
          </AnimatedContainer>
        ))}
      </div>
    </div>
  )
}
