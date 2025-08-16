import React from 'react'

import { Title } from './Title'
import { P } from './Text'
import { Tag } from './Tag'
import { Align, Size, TitleLevel } from '../types/ui'

// ============================================================================
// CARD COMPONENT - Otimizado e harmonizado
// ============================================================================

type CardLayout = 'horizontal' | 'with-icon' | 'varied'

interface CardProps {
  layout: CardLayout
  title: string
  subtitle?: string
  align?: Align
  className?: string
  onClick?: () => void
  size?: Size
  icon?: React.ReactNode
  date?: string
  description?: string
  tags?: string[]
  children?: React.ReactNode
}

// Tamanhos harmonizados para cards horizontais
const horizontalSizeStyles: Record<
  Size,
  {
    container: string
    titleLevel: TitleLevel
    subtitleSize: Size
    padding: string
  }
> = {
  pequeno: {
    container: 'min-h-16',
    titleLevel: 'h5',
    subtitleSize: 'pequeno',
    padding: 'p-3'
  },
  medio: {
    container: 'min-h-20',
    titleLevel: 'h4',
    subtitleSize: 'pequeno',
    padding: 'p-4'
  },
  grande: {
    container: 'min-h-24',
    titleLevel: 'h3',
    subtitleSize: 'medio',
    padding: 'p-5'
  }
}

// Classes de alinhamento para cards
const cardAlignClasses: Record<Align, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

export const Card: React.FC<CardProps> = ({
  layout,
  title,
  subtitle,
  align = 'start',
  className = '',
  onClick,
  size = 'medio',
  icon,
  date,
  description,
  tags
}) => {
  const baseClasses = [
    'theme-bg-surface theme-border border rounded-lg theme-transition',
    onClick ? 'cursor-pointer hover:theme-bg-surface-hover hover:shadow-md' : ''
  ]
    .filter(Boolean)
    .join(' ')

  switch (layout) {
    case 'horizontal': {
      const { container, titleLevel, subtitleSize, padding } =
        horizontalSizeStyles[size]

      return (
        <div
          onClick={onClick}
          className={`${baseClasses} flex flex-col justify-center ${cardAlignClasses[align]} ${container} ${padding} ${className}`}
        >
          <Title level={titleLevel} className="theme-text-primary">
            {title}
          </Title>
          {subtitle && (
            <P size={subtitleSize} className="theme-text-secondary mt-1">
              {subtitle}
            </P>
          )}
        </div>
      )
    }

    case 'with-icon':
      return (
        <div onClick={onClick} className={`${baseClasses} p-6 ${className}`}>
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
          className={`${baseClasses} p-6 rounded-2xl relative ${className}`}
        >
          {date && (
            <div className="absolute top-4 right-4">
              <Tag color="secondary">{date}</Tag>
            </div>
          )}
          <div className="space-y-4">
            <Title level="h3" color="text" className="font-semibold">
              {title}
            </Title>
            {subtitle && (
              <P size="pequeno" color="text-secondary">
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
