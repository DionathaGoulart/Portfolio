import React from 'react'
import { Align, Size, ColorVariant } from './global.types'
import { TitleLevel } from './Title.types'

// ================================
// CARD SPECIFIC TYPES
// ================================

/**
 * Card visual layout variants
 */
export type CardVariant = 'horizontal' | 'contact'

// ================================
// CARD CONFIGURATION
// ================================

/**
 * Configuration mapping for card sizes to title and subtitle properties
 */
export const CONFIGS: Record<
  Size,
  { titleLevel: TitleLevel; subtitleSize: Size }
> = {
  pequeno: { titleLevel: 'h5', subtitleSize: 'pequeno' },
  medio: { titleLevel: 'h4', subtitleSize: 'pequeno' },
  grande: { titleLevel: 'h3', subtitleSize: 'medio' }
}

// ================================
// MAIN INTERFACES
// ================================

/**
 * Props interface for the Card component
 *
 * @interface CardProps
 * @property {string} title - Card main title text
 * @property {string} subtitle - Optional card subtitle text
 * @property {React.ReactNode} icon - Optional icon element
 * @property {React.ReactNode} children - Custom card content (overrides default layout)
 * @property {ColorVariant} color - Card color theme
 * @property {ColorVariant} borderColor - Card border color theme
 * @property {Size} size - Card size variant
 * @property {Align} align - Card content alignment
 * @property {boolean} disabled - Disable card interaction
 * @property {boolean} loading - Show loading state
 * @property {boolean} elevated - Apply elevated shadow style
 * @property {boolean} compact - Apply compact spacing
 * @property {CardVariant} variant - Card layout variant
 * @property {() => void} onClick - Click handler function
 * @property {string} className - Additional CSS classes
 */
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

/**
 * Props interface for the CardsContainer component
 *
 * @interface ContainerProps
 * @property {'grid' | 'list'} type - Container layout type
 * @property {1 | 2 | 3 | 4 | 5} columns - Number of columns for grid layout
 * @property {boolean} compact - Apply compact spacing between cards
 * @property {string} className - Additional CSS classes
 * @property {React.ReactNode} children - Card components to display
 */
export interface ContainerProps {
  type?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4 | 5
  compact?: boolean
  className?: string
  children: React.ReactNode
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Builds CSS class string for Card component based on props
 */
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

/**
 * Builds CSS class string for CardsContainer component based on props
 */
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
