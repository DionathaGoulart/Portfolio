import { ReactNode } from 'react'
import { Align, ColorVariant, Shadow, Style, Weight } from './global.types'

// ================================
// TITLE SPECIFIC TYPES
// ================================

/**
 * Semantic title levels (h1-h6)
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * HTML elements allowed for rendering
 */
export type TitleElement = TitleLevel | 'div' | 'span' | 'p'

/**
 * Special size variants for different contexts
 */
export type TitleVariant = 'hero' | 'display' | 'section' | 'subsection'

/**
 * Decorative border position options
 */
export type TitleBorder =
  | 'none'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

// ================================
// MAIN INTERFACE
// ================================

/**
 * Props interface for the Title component
 *
 * @interface TitleProps
 * @property {ReactNode} children - Title content
 * @property {TitleLevel} level - Semantic level (h1-h6)
 * @property {TitleElement} element - HTML element for rendering
 * @property {Align} align - Text alignment
 * @property {ColorVariant} color - Color variant
 * @property {Weight} weight - Font weight
 * @property {TitleVariant} variant - Special size variant
 * @property {boolean} uppercase - Transform to uppercase
 * @property {Style} style - Text style (italic, underline, etc)
 * @property {boolean} gradient - Apply color gradient
 * @property {Shadow} shadow - Text shadow variant
 * @property {boolean} underlined - Decorative underline
 * @property {boolean} highlighted - Background highlight
 * @property {TitleBorder} border - Decorative border position
 * @property {boolean} interactive - Enable interactive behavior
 * @property {boolean} disabled - Disabled state
 * @property {() => void} onClick - Click handler
 * @property {ReactNode} icon - Icon next to title
 * @property {string | number} badge - Badge with number or text
 * @property {string} className - Custom CSS classes
 * @property {string} id - Element ID
 *
 * @example
 * <Title
 *   level="h1"
 *   color="primary"
 *   weight="bold"
 *   border="bottom-start"
 * >
 *   My Title
 * </Title>
 */
export interface TitleProps {
  // Content
  children: ReactNode

  // Structure
  level?: TitleLevel
  element?: TitleElement

  // Appearance
  align?: Align
  color?: ColorVariant
  weight?: Weight
  variant?: TitleVariant

  // Style Modifiers
  uppercase?: boolean
  style?: Style
  gradient?: boolean
  shadow?: Shadow
  underlined?: boolean
  highlighted?: boolean
  border?: TitleBorder

  // Interactivity
  interactive?: boolean
  disabled?: boolean
  onClick?: () => void

  // Additional Elements
  icon?: ReactNode
  badge?: string | number

  // HTML Attributes
  className?: string
  id?: string
}
