import { Align, Size, ColorVariant } from './global.types'
import { TitleLevel } from './Title.types'

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

export interface CardsContainerProps {
  type?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4 | 5
  compact?: boolean
  className?: string
  children: React.ReactNode
}

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
    'card',
    `card--${layout}`,
    `card--${color}`,
    layout === 'horizontal' && `card--${size}`,
    `card--align-${align}`,
    onClick && !disabled && 'card--clickable',
    disabled && 'card--disabled',
    loading && 'card--loading',
    elevated && 'card--elevated',
    compact && 'card--compact',
    borderColor && `card--border-${borderColor}`,
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
