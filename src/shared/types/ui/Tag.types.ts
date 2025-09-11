import React from 'react'
import { Size, ColorVariant } from './global.types'

// ================================
// TAG SPECIFIC TYPES
// ================================

/**
 * Tag visual variants
 */
export type TagVariant = 'solid' | 'outline' | 'ghost'

/**
 * Status tag states for visual indication
 */
export type TagStatus = 'online' | 'offline' | 'pending'

// ================================
// CONSTANTS
// ================================

/**
 * Size mapping for consistent naming across components
 */
const SIZE_MAP = {
  pequeno: 'small',
  medio: 'medium',
  grande: 'large'
} as const

// ================================
// MAIN INTERFACES
// ================================

/**
 * Props interface for the main Tag component
 *
 * @interface TagProps
 * @property {React.ReactNode} children - Tag content
 * @property {ColorVariant} color - Tag color theme
 * @property {Size} size - Tag size variant
 * @property {TagVariant} variant - Tag visual variant
 * @property {string} className - Additional CSS classes
 * @property {() => void} onClick - Click handler function
 * @property {boolean} interactive - Enable interactive styling without onClick
 * @property {boolean} disabled - Disable tag interactions
 * @property {React.ReactNode} icon - Optional icon element
 * @property {boolean} removable - Enable remove button
 * @property {() => void} onRemove - Remove button click handler
 * @property {string | number} badge - Optional badge content
 */
export interface TagProps {
  // Content
  children: React.ReactNode

  // Appearance
  color?: ColorVariant
  size?: Size
  variant?: TagVariant

  // Behavior
  onClick?: () => void
  interactive?: boolean
  disabled?: boolean

  // Features
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  badge?: string | number

  // HTML attributes
  className?: string
}

/**
 * Props interface for the TagGroup container component
 *
 * @interface TagGroupProps
 * @property {React.ReactNode} children - Tag components to group
 * @property {boolean} compact - Apply compact spacing between tags
 * @property {string} className - Additional CSS classes
 */
export interface TagGroupProps {
  // Content
  children: React.ReactNode

  // Layout
  compact?: boolean

  // HTML attributes
  className?: string
}

/**
 * Props interface for the StatusTag component
 *
 * @interface StatusTagProps
 * @property {TagStatus} status - Status indicator type
 * @property {React.ReactNode} children - Tag content
 * @property {string} className - Additional CSS classes
 */
export interface StatusTagProps {
  // Content
  status: TagStatus
  children: React.ReactNode

  // HTML attributes
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Builds CSS classes for the Tag component
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
    'tag',
    `tag--${mappedSize}`,
    `tag--${variant}-${color}`,
    (onClick || interactive) && !disabled && 'tag--interactive',
    disabled && 'tag--disabled',
    icon && 'tag--with-icon',
    removable && 'tag--removable',
    badge && 'tag--with-badge',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Builds CSS classes for the TagGroup component
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
 * Builds CSS classes for the StatusTag component
 */
export const buildStatusTagClasses = ({
  status,
  className = ''
}: Partial<StatusTagProps>): string => {
  const classes = [`tag--status-${status}`, className].filter(Boolean)

  return classes.join(' ')
}
