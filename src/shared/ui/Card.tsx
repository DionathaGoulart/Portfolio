import React from 'react'
import { ExternalLink } from 'lucide-react'

import { Title, P } from '@shared'
import {
  CardProps,
  ContainerProps,
  CONFIGS,
  buildClasses,
  buildContainerClasses,
  HorizontalCardProps,
  ContactCardProps
} from '@types'

import '@styles/ui/card.scss'

// ================================
// HELPER COMPONENTS
// ================================

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  subtitle,
  icon,
  color = 'primary',
  size = 'medio',
  showExternalLink = false
}) => {
  const { titleLevel, subtitleSize } = CONFIGS[size]

  return (
    <div className="card__content">
      <div className="card__text">
        <Title color={color} level={titleLevel} className="card__title">
          {title}
        </Title>
        {subtitle && (
          <P size={subtitleSize} className="card__value">
            {subtitle}
          </P>
        )}
      </div>
      <div className="card__icons">
        {icon && <span className="card__icon">{icon}</span>}
        {showExternalLink && (
          <span className="card__icon card__icon--external">
            <ExternalLink />
          </span>
        )}
      </div>
    </div>
  )
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  subtitle,
  icon,
  color = 'primary',
  size = 'medio',
  showExternalLink = false
}) => {
  const { titleLevel, subtitleSize } = CONFIGS[size]

  return (
    <div className="card__content card__content--contact">
      <div className="card__icon card__icon--contact">{icon}</div>
      <div className="card__text">
        <Title color={color} level={titleLevel} className="card__title">
          {title}
        </Title>
        {subtitle && (
          <P size={subtitleSize} className="card__value">
            {subtitle}
          </P>
        )}
      </div>
      {showExternalLink && (
        <span className="card__icon card__icon--external card__icon--right">
          <ExternalLink />
        </span>
      )}
    </div>
  )
}

// ================================
// MAIN CARD COMPONENT
// ================================

/**
 * Componente de card versátil com suporte a variantes horizontal e contato
 * com modos interativo e estático
 *
 * @param {CardProps} props - Propriedades de configuração do card
 * @returns {JSX.Element} Componente de card renderizado
 *
 * @example
 * ```tsx
 * <Card
 *   title="Título do Card"
 *   subtitle="Subtítulo opcional"
 *   variant="horizontal"
 *   size="medio"
 *   onClick={() => handleCardClick()}
 * />
 * ```
 */
export const Card: React.FC<CardProps> = (props) => {
  const {
    onClick,
    disabled = false,
    loading = false,
    children,
    variant = 'horizontal',
    color,
    borderColor,
    ...rest
  } = props

  // ================================
  // DERIVED VALUES
  // ================================

  const canInteract = !disabled && !loading && onClick
  const showExternalLink = !!onClick && !disabled && !loading

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleClick = (): void => {
    if (canInteract) onClick()
  }

  const handleKey = (e: React.KeyboardEvent): void => {
    if ((e.key === 'Enter' || e.key === ' ') && canInteract) {
      e.preventDefault()
      onClick()
    }
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderCardContent = (): React.ReactNode => {
    if (children) return children

    const cardProps = { ...rest, color, showExternalLink }

    switch (variant) {
      case 'contact':
        return <ContactCard {...cardProps} />
      case 'horizontal':
      default:
        return <HorizontalCard {...cardProps} />
    }
  }

  // ================================
  // RENDER
  // ================================

  return (
    <div
      className={buildClasses(props)}
      onClick={handleClick}
      onKeyDown={handleKey}
      tabIndex={canInteract ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {renderCardContent()}
    </div>
  )
}

// ================================
// CARDS CONTAINER COMPONENT
// ================================

/**
 * Componente container para organizar múltiplos cards em layout de grid ou lista
 *
 * @param {ContainerProps} props - Propriedades de configuração do container
 * @returns {JSX.Element} Componente container renderizado
 *
 * @example
 * ```tsx
 * <CardsContainer type="grid" columns={3} compact>
 *   <Card title="Card 1" />
 *   <Card title="Card 2" />
 *   <Card title="Card 3" />
 * </CardsContainer>
 * ```
 */
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
