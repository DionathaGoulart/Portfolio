import React from 'react'

// ================================
// IMAGE SPECIFIC TYPES
// ================================

/**
 * Image resource type - can be a direct URL string or an object with string values
 */
export type ImageResource = string | Record<string, string>

/**
 * Predefined image size variants including sidebar
 */
export type ImageSize = 'small' | 'medium' | 'large' | 'xlarge' | 'sidebar'

/**
 * Image shape format options
 */
export type ImageShape = 'square' | 'rectangle' | 'circle'

/**
 * Shadow effect intensity options
 */
export type ImageShadow = boolean | 'strong'

/**
 * Neon fire effect variants
 */
export type ImageNeonFire = boolean | 'primary'

/**
 * Float positioning options
 */
export type ImageFloat = 'left' | 'right' | 'none'

/**
 * Keyboard event handler type
 */
export type KeyboardEventHandler = (e: React.KeyboardEvent) => void

// ================================
// UTILITY TYPES
// ================================

/**
 * Internal type for CSS class generation
 */
export type ImageClassNames = string[]

// ================================
// MAIN INTERFACE
// ================================

/**
 * Props interface for the Image component
 *
 * @interface ImageProps
 * @property {ImageResource} src - Image source - URL string or resource object
 * @property {string} alt - Alt text for accessibility
 * @property {string} className - Additional CSS classes
 * @property {() => void} onClick - Click handler for interactive images
 * @property {ImageSize} size - Predefined size variants including sidebar
 * @property {ImageShape} shape - Shape format of the image
 * @property {ImageShadow} shadow - Shadow effect - boolean for normal shadow, 'strong' for heavy shadow
 * @property {boolean} hover - Enable hover effects
 * @property {ImageNeonFire} neonFire - Neon fire effect - true for fire colors, 'primary' for theme colors
 * @property {ImageFloat} float - Float positioning
 * @property {boolean} responsive - Enable responsive sizing
 */
export interface ImageProps {
  // Content
  src: ImageResource
  alt: string

  // Appearance
  size?: ImageSize
  shape?: ImageShape
  shadow?: ImageShadow
  hover?: boolean
  neonFire?: ImageNeonFire

  // Layout
  float?: ImageFloat
  responsive?: boolean

  // Functionality
  onClick?: () => void

  // HTML attributes
  className?: string
}
