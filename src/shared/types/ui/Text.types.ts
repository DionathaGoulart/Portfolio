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
// CONSTANTS
// ================================

export const TEXT_ELEMENTS = ['p', 'span'] as const
export const TEXT_LEADING_OPTIONS = [
  'tight',
  'normal',
  'relaxed',
  'loose'
] as const
export const TEXT_RESPONSIVE_SIZES = ['small', 'medium', 'large'] as const
export const TEXT_BORDER_POSITIONS = ['none', 'start', 'center', 'end'] as const
export const TEXT_COLUMN_COUNTS = [1, 2, 3, 4, 5] as const
export const TEXT_COLUMN_GAPS = ['small', 'medium', 'large'] as const

// ================================
// NOVA CONSTANTE PARA ANCHOR
// ================================

export const TEXT_ANCHOR_POSITIONS = ['left', 'right'] as const

// ================================
// BASE TYPES
// ================================

/**
 * HTML elements that can be rendered by the Text component
 */
export type TextElement = (typeof TEXT_ELEMENTS)[number]

/**
 * Text line-height variants
 */
export type TextLeading = (typeof TEXT_LEADING_OPTIONS)[number]

/**
 * Responsive text size variants for different screen sizes
 */
export type TextResponsiveSize = (typeof TEXT_RESPONSIVE_SIZES)[number]

/**
 * Decorative border positions for text elements
 */
export type TextBorder = (typeof TEXT_BORDER_POSITIONS)[number]

/**
 * Number of columns for text layout (1-5)
 */
export type TextColumns = (typeof TEXT_COLUMN_COUNTS)[number]

/**
 * Gap size between text columns
 */
export type TextColumnGap = (typeof TEXT_COLUMN_GAPS)[number]

/**
 * Text anchor positions (left or right)
 */
export type TextAnchor = (typeof TEXT_ANCHOR_POSITIONS)[number]

// ================================
// INTERFACES
// ================================

/**
 * Props for the Text component
 *
 * @interface TextProps
 * @example
 * ```tsx
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
 * ```
 */
export interface TextProps {
  // ================================
  // Content
  // ================================

  /** The content to be displayed */
  children: ReactNode

  // ================================
  // Structure
  // ================================

  /** HTML element to render */
  as?: TextElement

  // ================================
  // Appearance
  // ================================

  /** Text size variant */
  size?: Size

  /** Text alignment */
  align?: Align

  /** Text color variant */
  color?: ColorVariant

  /** Font weight */
  weight?: Weight

  // ================================
  // Style Modifiers
  // ================================

  /** Text style (italic, underline, etc.) */
  style?: Style

  /** Line height variant */
  leading?: TextLeading

  // ================================
  // Text Behaviors
  // ================================

  /** Whether to truncate text with ellipsis */
  truncate?: boolean

  /** Whether to break long words */
  breakWords?: boolean

  // ================================
  // Visual Modifiers
  // ================================

  /** Whether to highlight text with background color */
  highlight?: boolean

  /** Whether to style as code block */
  code?: boolean

  /** Whether to apply gradient text effect */
  gradient?: boolean

  /** Text shadow variant */
  shadow?: Shadow

  /** Decorative border position */
  border?: TextBorder

  // ================================
  // Layout & Positioning
  // ================================

  /** Anchor position for floating text (left or right) */
  anchor?: TextAnchor

  /** Disable anchor on mobile devices (default: true) */
  disableAnchorOnMobile?: boolean

  // ================================
  // Responsiveness
  // ================================

  /** Responsive text size behavior */
  responsive?: TextResponsiveSize

  // ================================
  // Column Layout
  // ================================

  /** Number of columns for text layout */
  columns?: TextColumns

  /** Gap size between columns */
  columnGap?: TextColumnGap

  // ================================
  // HTML Attributes
  // ================================

  /** Additional CSS classes */
  className?: string

  /** HTML id attribute */
  id?: string
}
