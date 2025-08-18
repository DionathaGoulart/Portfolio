import { Size, ColorVariant } from './global.types'

// ============================================================================
// TAG TYPES
// ============================================================================

export type TagVariant = 'solid' | 'outline' | 'ghost'
export type TagStatus = 'online' | 'offline' | 'pending'

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

// ============================================================================
// CONTAINER TYPES
// ============================================================================

export interface TagGroupProps {
  children: React.ReactNode
  compact?: boolean
  className?: string
}

// ============================================================================
// STATUS TAG PROPS
// ============================================================================

export interface StatusTagProps {
  status: TagStatus
  children: React.ReactNode
  className?: string
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

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
  const sizeMap = {
    pequeno: 'small',
    medio: 'medium',
    grande: 'large'
  }

  const classes = [
    // Base
    'tag',

    // Size
    `tag--${sizeMap[size || 'medio']}`,

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

export const buildStatusTagClasses = ({
  status,
  className = ''
}: Partial<StatusTagProps>): string => {
  // Altere de StatusTagProps para Partial<StatusTagProps>
  const classes = [`tag--status-${status}`, className].filter(Boolean)
  return classes.join(' ')
}
