// ============================================================================
// IMAGE COMPONENT TYPES
// ============================================================================

/**
 * Image resource type - can be a direct URL string or an object with string values
 */
export type ImageResource = string | Record<string, string>

/**
 * Props for the Image component
 */
export interface ImageProps {
  /** Image source - URL string or resource object */
  src: ImageResource

  /** Alt text for accessibility */
  alt: string

  /** Additional CSS classes */
  className?: string

  /** Click handler for interactive images */
  onClick?: () => void

  /** Predefined size variants including sidebar */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'sidebar'

  /** Shape format of the image */
  shape?: 'square' | 'rectangle' | 'circle'

  /** Shadow effect - boolean for normal shadow, 'strong' for heavy shadow */
  shadow?: boolean | 'strong'

  /** Enable hover effects */
  hover?: boolean

  /** Neon fire effect - true for fire colors, 'primary' for theme colors */
  neonFire?: boolean | 'primary'

  /** Float positioning */
  float?: 'left' | 'right' | 'none'

  /** Enable responsive sizing */
  responsive?: boolean
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Internal type for CSS class generation
 */
export type ImageClassNames = string[]

/**
 * Keyboard event handler type
 */
export type KeyboardEventHandler = (e: React.KeyboardEvent) => void
