import { ReactNode } from 'react'
import { Align, ColorVariant, Size } from './global.types'

// ============================================================================
// BUTTON SPECIFIC TYPES
// ============================================================================

/**
 * Button style variants for different visual appearances
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost'

/**
 * HTML button type attribute values
 */
export type ButtonType = 'button' | 'submit' | 'reset'

// ============================================================================
// BUTTON PROPS INTERFACE
// ============================================================================

/**
 * Props interface for the Button component
 *
 * @interface ButtonProps
 * @property {ReactNode} children - Button content
 * @property {Size} size - Button size variant (pequeno, medio, grande)
 * @property {ColorVariant} color - Button color theme
 * @property {ButtonVariant} variant - Button style variant (solid, outline, ghost)
 * @property {Align} align - Container alignment (start, center, end)
 * @property {() => void} onClick - Click handler function
 * @property {ButtonType} type - HTML button type attribute
 * @property {boolean} disabled - Disable button interaction
 * @property {boolean} loading - Show loading state with spinner
 * @property {ReactNode} icon - Optional icon element to display
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 */
export interface ButtonProps {
  // Content properties
  children: ReactNode

  // Appearance properties
  size?: Size
  color?: ColorVariant
  variant?: ButtonVariant

  // Layout properties
  align?: Align

  // Functionality properties
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
