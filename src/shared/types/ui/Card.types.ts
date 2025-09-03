import { Align, Size, ColorVariant } from './global.types'
import { TitleLevel } from './Title.types'

export type CardVariant = 'horizontal' | 'contact'

export interface CardProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  color?: ColorVariant
  borderColor?: ColorVariant
  size?: Size
  align?: Align
  disabled?: boolean
  loading?: boolean
  elevated?: boolean
  compact?: boolean
  variant?: CardVariant
  onClick?: () => void
  className?: string
}

export const CONFIGS: Record<
  Size,
  { titleLevel: TitleLevel; subtitleSize: Size }
> = {
  pequeno: { titleLevel: 'h5', subtitleSize: 'pequeno' },
  medio: { titleLevel: 'h4', subtitleSize: 'pequeno' },
  grande: { titleLevel: 'h3', subtitleSize: 'medio' }
}

export interface ContainerProps {
  type?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4 | 5
  compact?: boolean
  className?: string
  children: React.ReactNode
}

export const buildClasses = ({
  color = 'primary',
  size = 'medio',
  align = 'start',
  onClick,
  disabled = false,
  loading = false,
  elevated = false,
  compact = false,
  borderColor,
  variant = 'horizontal',
  className = ''
}: Partial<CardProps>): string =>
  [
    'card',
    `card--${color}`,
    `card--${size}`,
    `card--align-${align}`,
    `card--${variant}`,
    onClick && !disabled && 'card--clickable',
    disabled && 'card--disabled',
    loading && 'card--loading',
    elevated && 'card--elevated',
    compact && 'card--compact',
    borderColor && `card--border-${borderColor}`,
    className
  ]
    .filter(Boolean)
    .join(' ')

export const buildContainerClasses = ({
  type = 'grid',
  columns = 2,
  compact = false,
  className = ''
}: Partial<ContainerProps>): string =>
  type === 'list'
    ? [compact ? 'cards-list--compact' : 'cards-list', className]
        .filter(Boolean)
        .join(' ')
    : ['cards-grid', `cards-grid--${columns}`, className]
        .filter(Boolean)
        .join(' ')
