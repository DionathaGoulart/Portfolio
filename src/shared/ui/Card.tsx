import React from 'react'
import { Title } from './Title'
import { P, Span } from './Text'
import { Tag } from './Tag'

type CardLayout = 'horizontal' | 'with-icon' | 'varied'
type HorizontalCardSize = 'pequeno' | 'medio' | 'grande'
type CardAlign = 'start' | 'center' | 'end'

interface CardProps {
  layout: CardLayout
  title: string
  subtitle?: string
  align?: CardAlign
  className?: string
  onClick?: () => void
  size?: HorizontalCardSize
  icon?: React.ReactNode
  date?: string
  description?: string
  tags?: string[]
}

const horizontalSizeStyles = {
  pequeno: {
    container: 'min-h-16',
    titleLevel: 'h4' as 'h4',
    subtitleLevel: 'h5' as 'h5',
    padding: 'p-3'
  },
  medio: {
    container: 'min-h-20',
    titleLevel: 'h3' as 'h3',
    subtitleLevel: 'h4' as 'h4',
    padding: 'p-4'
  },
  grande: {
    container: 'min-h-24',
    titleLevel: 'h2' as 'h2',
    subtitleLevel: 'h3' as 'h3',
    padding: 'p-5'
  }
}

const alignClasses: Record<CardAlign, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

export const Card: React.FC<CardProps> = ({
  layout,
  title,
  subtitle,
  align = 'start',
  className,
  onClick,
  size = 'medio',
  icon,
  date,
  description,
  tags
}) => {
  const baseClasses = `theme-bg-surface theme-border border rounded-lg p-6 theme-transition ${onClick ? 'cursor-pointer hover:theme-bg-surface-hover hover:shadow-md' : ''}`

  switch (layout) {
    case 'horizontal': {
      const { container, titleLevel, subtitleLevel, padding } =
        horizontalSizeStyles[size]
      return (
        <div
          onClick={onClick}
          className={`${baseClasses} flex flex-col justify-center ${alignClasses[align]} ${container} ${padding} ${className}`}
        >
          <Title level={titleLevel} className="theme-text-primary">
            {title}
          </Title>
          {subtitle && (
            <P size="pequeno" className="theme-text-secondary mt-1">
              {subtitle}
            </P>
          )}
        </div>
      )
    }

    case 'with-icon':
      return (
        <div onClick={onClick} className={`${baseClasses} ${className}`}>
          <div className="flex items-center gap-2 mb-2">
            {icon && <span>{icon}</span>}
            <Title level="h4" className="font-semibold theme-text-primary">
              {title}
            </Title>
          </div>
          {subtitle && (
            <P size="pequeno" color="text-secondary">
              {subtitle}
            </P>
          )}
        </div>
      )

    case 'varied':
      return (
        <div
          onClick={onClick}
          className={`${baseClasses} rounded-2xl relative ${className}`}
        >
          {date && (
            <div className="absolute top-4 right-4">
              <Tag color="secondary">{date}</Tag>
            </div>
          )}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Title level="h3" color="text" className="font-semibold">
                {title}
              </Title>
              {/* Removido o Span de data daqui */}
            </div>
            {subtitle && (
              <P size="pequeno" color="text-secondary" className="mt-1">
                {subtitle}
              </P>
            )}
            {description && <P size="pequeno">{description}</P>}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
      )

    default:
      return null
  }
}
