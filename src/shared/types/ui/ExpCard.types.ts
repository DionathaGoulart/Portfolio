// ================================
// EXPERIENCE SPECIFIC TYPES
// ================================

/**
 * Experience card visual variants
 */
export type ExpCardVariant = 'default' | 'highlight'

/**
 * Experience list default variants including extended options
 */
export type ExpListVariant = 'default' | 'highlight' | 'secondary' | 'accent'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Props interface for the Experience Card component
 *
 * @interface ExpCardProps
 * @property {string} title - Job title or position name
 * @property {string} company - Company or organization name
 * @property {string} period - Time period of the experience
 * @property {string} description - Detailed description of the role/experience
 * @property {string[]} technologies - Array of technologies/skills used
 * @property {ExpCardVariant} variant - Visual style variant
 * @property {boolean} showTimeline - Whether to show timeline dot and line
 * @property {boolean} interactive - Enable hover/focus interactions
 * @property {() => void} onClick - Click handler function
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 */
export interface ExpCardProps {
  // Content
  title: string
  company: string
  period: string
  description: string
  technologies: string[]

  // Appearance
  variant?: ExpCardVariant
  showTimeline?: boolean

  // Interactivity
  interactive?: boolean
  onClick?: () => void

  // HTML attributes
  className?: string
  id?: string
}

/**
 * Props interface for the Experience List component
 *
 * @interface ExpListProps
 * @property {ExpCardProps[]} experiences - Array of experience card data
 * @property {boolean} showTimeline - Whether to show connecting timeline line
 * @property {ExpListVariant} defaultVariant - Default variant for all cards
 * @property {string} className - Additional CSS classes
 */
export interface ExpListProps {
  experiences: ExpCardProps[]
  showTimeline?: boolean
  defaultVariant?: ExpListVariant
  className?: string
}
