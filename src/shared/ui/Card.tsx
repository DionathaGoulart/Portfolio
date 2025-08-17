import React from 'react'
import { Title } from './Title'
import { P } from './Text'
import { Tag } from './Tag'
import {
  Align,
  Size,
  TitleLevel,
  ColorVariant,
  CardLayout,
  cardAlignClasses,
  cardColorVariants,
  cardHorizontalSizeStyles
} from '../types/ui'

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
  color?: ColorVariant
  borderColor?: ColorVariant
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
  const colorScheme = cardColorVariants[color]

  // Se não especificar borderColor, usa a border do esquema da cor principal
  const finalBorderColor = borderColor
    ? cardColorVariants[borderColor].border
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
        cardHorizontalSizeStyles[size]

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
