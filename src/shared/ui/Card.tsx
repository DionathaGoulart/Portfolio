import React from 'react'
import { Title } from './Title'
import { P } from './Text'
import {
  CardProps,
  ContainerProps,
  CONFIGS,
  buildClasses,
  buildContainerClasses
} from '@shared/types'

const HorizontalCard: React.FC<Omit<CardProps, 'onClick'>> = ({
  title,
  subtitle,
  icon,
  size = 'medio'
}) => {
  const { titleLevel, subtitleSize } = CONFIGS[size]
  return (
    <div className="card__content">
      <div className="card__text">
        <Title level={titleLevel}>{title}</Title>
        {subtitle && <P size={subtitleSize}>{subtitle}</P>}
      </div>
      {icon && <span className="card__icon">{icon}</span>}
    </div>
  )
}

export const Card: React.FC<CardProps> = (props) => {
  const {
    onClick,
    disabled = false,
    loading = false,
    children,
    ...rest
  } = props

  const handleClick = () => !disabled && !loading && onClick?.()
  const handleKey = (e: React.KeyboardEvent) => {
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      !disabled &&
      !loading &&
      onClick
    ) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={buildClasses(props)}
      onClick={handleClick}
      onKeyDown={handleKey}
      tabIndex={onClick && !disabled ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {children || <HorizontalCard {...rest} />}
    </div>
  )
}

export const CardsContainer: React.FC<ContainerProps> = ({
  type = 'grid',
  columns = 2,
  compact = false,
  className = '',
  children
}) => (
  <div className={buildContainerClasses({ type, columns, compact, className })}>
    {children}
  </div>
)
