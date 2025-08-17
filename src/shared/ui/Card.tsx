import React from 'react'
import { Title } from './Title'
import { P } from './Text'
import { Tag } from './Tag'
import { Align, Size, TitleLevel } from '../types/ui'

// ============================================================================
// CARD COMPONENT - Com suporte a cores via props
// ============================================================================

// Definindo as cores disponíveis como tipo
type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'default'

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

  // Props de cor
  color?: ColorVariant
  borderColor?: ColorVariant
}

// Mapeamento das classes CSS usando suas classes customizadas
const colorVariants: Record<
  ColorVariant,
  {
    background: string
    border: string
    hover: string
  }
> = {
  default: {
    background: 'bg-theme-surface',
    border: 'border-theme-border',
    hover: 'hover:bg-theme-surface'
  },
  primary: {
    background: 'bg-theme-primary/10',
    border: 'border-theme-primary/30',
    hover: 'hover:bg-theme-primary/15'
  },
  secondary: {
    background: 'bg-theme-secondary/10',
    border: 'border-theme-secondary/30',
    hover: 'hover:bg-theme-secondary/15'
  },
  accent: {
    background: 'bg-theme-accent/10',
    border: 'border-theme-accent/30',
    hover: 'hover:bg-theme-accent/15'
  },
  success: {
    background: 'bg-theme-success/10',
    border: 'border-theme-success/30',
    hover: 'hover:bg-theme-success/15'
  },
  error: {
    background: 'bg-theme-error/10',
    border: 'border-theme-error/30',
    hover: 'hover:bg-theme-error/15'
  },
  warning: {
    background: 'bg-theme-warning/10',
    border: 'border-theme-warning/30',
    hover: 'hover:bg-theme-warning/15'
  }
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
  tags,
  color = 'default',
  borderColor
}) => {
  // Pega o esquema de cores baseado na prop color
  const colorScheme = colorVariants[color]

  // Se não especificar borderColor, usa a border do esquema da cor principal
  const finalBorderColor = borderColor
    ? colorVariants[borderColor].border
    : colorScheme.border

  const baseClasses = [
    `${colorScheme.background} border ${finalBorderColor} rounded-lg transition-theme`,
    onClick ? `cursor-pointer ${colorScheme.hover} hover:shadow-md` : ''
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
          <Title level={titleLevel} className="text-theme-text">
            {title}
          </Title>
          {subtitle && (
            <P size={subtitleSize} className="text-theme-text-secondary mt-1">
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
            <Title level="h4" className="font-semibold text-theme-text">
              {title}
            </Title>
          </div>
          {subtitle && (
            <P size="pequeno" className="text-theme-text-secondary">
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
            <Title level="h3" className="font-semibold text-theme-text">
              {title}
            </Title>
            {subtitle && (
              <P size="pequeno" className="text-theme-text-secondary">
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
