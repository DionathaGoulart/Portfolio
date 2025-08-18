import React from 'react'
import { Title } from './Title'
import { P } from './Text'
import { Tag } from './Tag'
import {
  CardProps,
  CardsContainerProps,
  CARD_HORIZONTAL_CONFIGS,
  buildCardClasses,
  buildCardsContainerClasses
} from '@shared/types'

// ============================================================================
// CARD LAYOUTS
// ============================================================================

const HorizontalCard: React.FC<Omit<CardProps, 'layout'>> = ({
  title,
  subtitle,
  size = 'medio'
}) => {
  const { titleLevel, subtitleSize } = CARD_HORIZONTAL_CONFIGS[size]

  return (
    <>
      <Title level={titleLevel} className="text-theme-text">
        {title}
      </Title>
      {subtitle && (
        <P size={subtitleSize} className="text-theme-text-secondary mt-1">
          {subtitle}
        </P>
      )}
    </>
  )
}

const WithIconCard: React.FC<Omit<CardProps, 'layout'>> = ({
  title,
  subtitle,
  icon
}) => (
  <>
    <div className="card--with-icon__header">
      {icon && <span className="card--with-icon__header-icon">{icon}</span>}
      <Title level="h4" className="font-semibold text-theme-text">
        {title}
      </Title>
    </div>
    {subtitle && (
      <P size="pequeno" className="text-theme-text-secondary">
        {subtitle}
      </P>
    )}
  </>
)

const VariedCard: React.FC<Omit<CardProps, 'layout'>> = ({
  title,
  subtitle,
  description,
  date,
  tags
}) => (
  <>
    {date && (
      <div className="card--varied__badge">
        <Tag color="secondary">{date}</Tag>
      </div>
    )}
    <div className="card--varied__content">
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
        <div className="card--varied__tags">
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      )}
    </div>
  </>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const Card: React.FC<CardProps> = (props) => {
  const {
    layout,
    onClick,
    disabled = false,
    loading = false,
    children,
    ...restProps
  } = props

  const cardClasses = buildCardClasses(props)

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      !disabled &&
      !loading &&
      onClick
    ) {
      event.preventDefault()
      onClick()
    }
  }

  const renderContent = () => {
    if (children) return children

    switch (layout) {
      case 'horizontal':
        return <HorizontalCard {...restProps} />
      case 'with-icon':
        return <WithIconCard {...restProps} />
      case 'varied':
        return <VariedCard {...restProps} />
      default:
        return null
    }
  }

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick && !disabled ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {renderContent()}
    </div>
  )
}

// ============================================================================
// CARDS CONTAINER
// ============================================================================

export const CardsContainer: React.FC<CardsContainerProps> = ({
  type = 'grid',
  columns = 2,
  compact = false,
  className = '',
  children
}) => {
  const containerClasses = buildCardsContainerClasses({
    type,
    columns,
    compact,
    className
  })

  return <div className={containerClasses}>{children}</div>
}
