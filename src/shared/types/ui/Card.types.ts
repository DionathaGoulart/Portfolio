import { Align, Size, ColorVariant } from './global.types'
import { TitleLevel } from './Title.types'

// ============================================================================
// CARD TYPES
// ============================================================================

export type CardLayout = 'horizontal' | 'with-icon' | 'varied'

export interface CardProps {
  layout: CardLayout
  title: string
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  date?: string
  tags?: string[]
  children?: React.ReactNode

  // Styling
  color?: ColorVariant
  borderColor?: ColorVariant
  size?: Size
  align?: Align

  // States
  disabled?: boolean
  loading?: boolean
  elevated?: boolean
  compact?: boolean

  // Behavior
  onClick?: () => void
  className?: string
}

// ============================================================================
// SIZE CONFIG FOR HORIZONTAL CARDS
// ============================================================================

export interface CardHorizontalConfig {
  titleLevel: TitleLevel
  subtitleSize: Size
}

export const CARD_HORIZONTAL_CONFIGS: Record<Size, CardHorizontalConfig> = {
  pequeno: {
    titleLevel: 'h5',
    subtitleSize: 'pequeno'
  },
  medio: {
    titleLevel: 'h4',
    subtitleSize: 'pequeno'
  },
  grande: {
    titleLevel: 'h3',
    subtitleSize: 'medio'
  }
}

// ============================================================================
// CONTAINER TYPES
// ============================================================================

export interface CardsContainerProps {
  type?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
  compact?: boolean
  className?: string
  children: React.ReactNode
}

// ============================================================================
// CLASS BUILDERS (integrados no types)
// ============================================================================

export const buildCardClasses = ({
  layout = 'horizontal',
  color = 'default',
  size = 'medio',
  align = 'start',
  onClick,
  disabled = false,
  loading = false,
  elevated = false,
  compact = false,
  borderColor,
  className = ''
}: Partial<CardProps>): string => {
  const classes = [
    // Base
    'card',

    // Layout
    `card--${layout}`,

    // Color
    `card--${color}`,

    // Size (apenas para horizontal)
    layout === 'horizontal' && `card--${size}`,

    // Alignment
    `card--align-${align}`,

    // States
    onClick && !disabled && 'card--clickable',
    disabled && 'card--disabled',
    loading && 'card--loading',
    elevated && 'card--elevated',
    compact && 'card--compact',

    // Border color
    borderColor && `card--border-${borderColor}`,

    // Custom
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildCardsContainerClasses = ({
  type = 'grid',
  columns = 2,
  compact = false,
  className = ''
}: Partial<CardsContainerProps>): string => {
  if (type === 'list') {
    return [compact ? 'cards-list--compact' : 'cards-list', className]
      .filter(Boolean)
      .join(' ')
  }

  return ['cards-grid', `cards-grid--${columns}`, className]
    .filter(Boolean)
    .join(' ')
}
