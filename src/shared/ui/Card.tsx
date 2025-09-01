import { Title } from './Title'
import { P } from './Text'
import {
  CardProps,
  ContainerProps,
  CONFIGS,
  buildClasses,
  buildContainerClasses
} from '@shared/types'

import '@styles/ui/card.scss'

const HorizontalCard: React.FC<Omit<CardProps, 'onClick'>> = ({
  title,
  subtitle,
  icon,
  color = 'primary',
  size = 'medio'
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
      {icon && <span className="card__icon">{icon}</span>}
    </div>
  )
}

const ContactCard: React.FC<Omit<CardProps, 'onClick'>> = ({
  title,
  subtitle,
  icon,
  color = 'primary',
  size = 'medio'
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
    </div>
  )
}

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

  const canInteract = !disabled && !loading && onClick
  const handleClick = () => canInteract && onClick()
  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && canInteract) {
      e.preventDefault()
      onClick()
    }
  }

  const renderCardContent = () => {
    if (children) return children

    const cardProps = { ...rest, color }

    switch (variant) {
      case 'contact':
        return <ContactCard {...cardProps} />
      case 'horizontal':
      default:
        return <HorizontalCard {...cardProps} />
    }
  }

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
