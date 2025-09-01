import { Size, ColorVariant } from './global.types'

// ================================
// TAG TYPES
// ================================

export type TagVariant = 'solid' | 'outline' | 'ghost'
export type TagStatus = 'online' | 'offline' | 'pending'

/**
 * Props principais do componente Tag
 */
export interface TagProps {
  children: React.ReactNode
  color?: ColorVariant
  size?: Size
  variant?: TagVariant
  className?: string

  // Behavior
  onClick?: () => void
  interactive?: boolean
  disabled?: boolean

  // Features
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  badge?: string | number
}

// ================================
// CONTAINER TYPES
// ================================

/**
 * Props do componente TagGroup para agrupar tags
 */
export interface TagGroupProps {
  children: React.ReactNode
  compact?: boolean
  className?: string
}

// ================================
// STATUS TAG TYPES
// ================================

/**
 * Props do componente StatusTag com indicador visual
 */
export interface StatusTagProps {
  status: TagStatus
  children: React.ReactNode
  className?: string
}

// ================================
// CONSTANTS
// ================================

const SIZE_MAP = {
  pequeno: 'small',
  medio: 'medium',
  grande: 'large'
} as const

// ================================
// CLASS BUILDERS
// ================================

/**
 * Constrói as classes CSS para o componente Tag
 * @param props - Propriedades parciais do Tag
 * @returns String com classes CSS concatenadas
 */
export const buildTagClasses = ({
  color = 'primary',
  size = 'medio',
  variant = 'solid',
  onClick,
  interactive = false,
  disabled = false,
  icon,
  removable = false,
  badge,
  className = ''
}: Partial<TagProps>): string => {
  const mappedSize = SIZE_MAP[size || 'medio']

  const classes = [
    // Base
    'tag',

    // Size
    `tag--${mappedSize}`,

    // Color + Variant
    `tag--${variant}-${color}`,

    // States
    (onClick || interactive) && !disabled && 'tag--interactive',
    disabled && 'tag--disabled',

    // Features
    icon && 'tag--with-icon',
    removable && 'tag--removable',
    badge && 'tag--with-badge',

    // Custom
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói as classes CSS para o componente TagGroup
 * @param props - Propriedades parciais do TagGroup
 * @returns String com classes CSS concatenadas
 */
export const buildTagGroupClasses = ({
  compact = false,
  className = ''
}: Partial<TagGroupProps>): string => {
  const classes = [
    'tag-group',
    compact && 'tag-group--compact',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói as classes CSS para o componente StatusTag
 * @param props - Propriedades parciais do StatusTag
 * @returns String com classes CSS concatenadas
 */
export const buildStatusTagClasses = ({
  status,
  className = ''
}: Partial<StatusTagProps>): string => {
  const classes = [`tag--status-${status}`, className].filter(Boolean)

  return classes.join(' ')
}
