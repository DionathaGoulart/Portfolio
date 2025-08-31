import { ReactNode } from 'react'
import { Align, ColorVariant, Size } from './global.types'

// ============================================================================
// BUTTON SPECIFIC TYPES
// ============================================================================

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonType = 'button' | 'submit' | 'reset'

// ============================================================================
// BUTTON PROPS INTERFACE
// ============================================================================

/**
 * Props interface for the Button component
 *
 * @interface ButtonProps
 * @property {ReactNode} children - Button content
 * @property {Size} size - Button size variant
 * @property {ColorVariant} color - Button color theme
 * @property {ButtonVariant} variant - Button style variant
 * @property {Align} align - Container alignment
 * @property {() => void} onClick - Click handler function
 * @property {ButtonType} type - HTML button type
 * @property {boolean} disabled - Disable button interaction
 * @property {boolean} loading - Show loading state
 * @property {ReactNode} icon - Optional icon element
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 */
export interface ButtonProps {
  // Content
  children: ReactNode

  // Appearance
  size?: Size
  color?: ColorVariant
  variant?: ButtonVariant

  // Layout
  align?: Align

  // Functionality
  onClick?: () => void
  type?: ButtonType
  disabled?: boolean
  loading?: boolean

  // Additional elements
  icon?: ReactNode

  // HTML attributes
  className?: string
  id?: string
}
