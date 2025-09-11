import { ReactNode } from 'react'
import {
  Size,
  Align,
  ColorVariant,
  Weight,
  Style,
  Shadow
} from './global.types'

// ================================
// TEXT SPECIFIC TYPES
// ================================

/**
 * HTML elements that can be rendered by the Text component
 */
export type TextElement = 'p' | 'span'

/**
 * Text line-height variants
 */
export type TextLeading = 'tight' | 'normal' | 'relaxed' | 'loose'

/**
 * Responsive text size variants for different screen sizes
 */
export type TextResponsiveSize = 'small' | 'medium' | 'large'

/**
 * Decorative border positions for text elements
 */
export type TextBorder = 'none' | 'start' | 'center' | 'end'

/**
 * Number of columns for text layout
 */
export type TextColumns = 1 | 2 | 3 | 4 | 5

/**
 * Gap size between text columns
 */
export type TextColumnGap = 'small' | 'medium' | 'large'

/**
 * Text anchor positions for floating text
 */
export type TextAnchor = 'left' | 'right'

// ================================
// MAIN INTERFACE
// ================================

/**
 * Props interface for the Text component with comprehensive styling and layout options
 *
 * @interface TextProps
 * @property {ReactNode} children - The content to be displayed
 * @property {TextElement} as - HTML element to render
 * @property {Size} size - Text size variant
 * @property {Align} align - Text alignment
 * @property {ColorVariant} color - Text color variant
 * @property {Weight} weight - Font weight
 * @property {Style} style - Text style (italic, underline, etc.)
 * @property {TextLeading} leading - Line height variant
 * @property {boolean} truncate - Whether to truncate text with ellipsis
 * @property {boolean} breakWords - Whether to break long words
 * @property {boolean} highlight - Whether to highlight text with background color
 * @property {boolean} code - Whether to style as code block
 * @property {boolean} gradient - Whether to apply gradient text effect
 * @property {Shadow} shadow - Text shadow variant
 * @property {TextBorder} border - Decorative border position
 * @property {TextAnchor} anchor - Anchor position for floating text
 * @property {boolean} disableAnchorOnMobile - Disable anchor on mobile devices
 * @property {TextResponsiveSize} responsive - Responsive text size behavior
 * @property {TextColumns} columns - Number of columns for text layout
 * @property {TextColumnGap} columnGap - Gap size between columns
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 *
 * @example
 * <Text
 *   as="p"
 *   size="grande"
 *   color="primary"
 *   columns={2}
 *   align="center"
 *   anchor="right"
 * >
 *   Content here
 * </Text>
 */
export interface TextProps {
  // Content
  children: ReactNode

  // Structure
  as?: TextElement

  // Appearance
  size?: Size
  align?: Align
  color?: ColorVariant
  weight?: Weight

  // Style Modifiers
  style?: Style
  leading?: TextLeading

  // Text Behaviors
  truncate?: boolean
  breakWords?: boolean

  // Visual Modifiers
  highlight?: boolean
  code?: boolean
  gradient?: boolean
  shadow?: Shadow
  border?: TextBorder

  // Layout & Positioning
  anchor?: TextAnchor
  disableAnchorOnMobile?: boolean

  // Responsiveness
  responsive?: TextResponsiveSize

  // Column Layout
  columns?: TextColumns
  columnGap?: TextColumnGap

  // HTML Attributes
  className?: string
  id?: string
}
