import React from 'react'
import { Title } from './Title'
import { P } from './Text'
import { Tag } from './Tag'
import {
  CardProps,
  getCardClasses,
  cardHorizontalSizeStyles
} from '@shared/types'

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
  borderColor,
  disabled = false,
  loading = false,
  elevated = false,
  compact = false
}) => {
  const cardClasses = getCardClasses(
    layout,
    color,
    size,
    align,
    onClick,
    disabled,
    loading,
    elevated,
    compact,
    borderColor,
    className
  )

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  switch (layout) {
    case 'horizontal': {
      const { titleLevel, subtitleSize } = cardHorizontalSizeStyles[size]

      return (
        <div
          onClick={handleClick}
          className={cardClasses}
          tabIndex={onClick && !disabled ? 0 : undefined}
          role={onClick ? 'button' : undefined}
          aria-disabled={disabled}
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
        <div
          onClick={handleClick}
          className={cardClasses}
          tabIndex={onClick && !disabled ? 0 : undefined}
          role={onClick ? 'button' : undefined}
          aria-disabled={disabled}
        >
          <div className="card-icon-header">
            {icon && <span className="card-icon">{icon}</span>}
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
          onClick={handleClick}
          className={cardClasses}
          tabIndex={onClick && !disabled ? 0 : undefined}
          role={onClick ? 'button' : undefined}
          aria-disabled={disabled}
        >
          {date && (
            <div className="card-date-badge">
              <Tag color="secondary">{date}</Tag>
            </div>
          )}
          <div className="card-content">
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
              <div className="card-tags">
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
