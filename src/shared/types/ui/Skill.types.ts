// ================================
// SKILL SPECIFIC TYPES
// ================================

/**
 * Available skill categories for technical classification
 */
export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tools'
  | 'mobile'

/**
 * Skill bar size variants
 */
export type SkillBarSize = 'small' | 'medium' | 'large'

/**
 * Skill bar visual variants
 */
export type SkillBarVariant = 'default' | 'minimal' | 'detailed'

/**
 * Skill grid column options
 */
export type SkillGridColumns = 1 | 2 | 3 | 'responsive'

/**
 * Skill grid gap spacing options
 */
export type SkillGridGap = 'small' | 'medium' | 'large'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Technical skill data structure with proficiency level
 *
 * @interface Skill
 * @property {string} id - Unique skill identifier
 * @property {string} name - Display name of the skill
 * @property {number} percentage - Proficiency percentage (0-100)
 * @property {SkillCategory} category - Classification category
 * @property {string} icon - Optional icon for visual representation
 */
export interface Skill {
  id: string
  name: string
  percentage: number
  category: SkillCategory
  icon?: string
}

/**
 * Props interface for the SkillBar component
 *
 * @interface SkillBarProps
 * @property {Skill} skill - Skill data to display
 * @property {number} animationDelay - Animation delay in milliseconds
 * @property {SkillBarSize} size - Component size variant
 * @property {SkillBarVariant} variant - Visual variant of the component
 * @property {boolean} showPercentage - Whether to show percentage value
 * @property {boolean} showAnimation - Whether to execute animations
 * @property {string} className - Additional CSS classes
 */
export interface SkillBarProps {
  // Content
  skill: Skill

  // Appearance
  size?: SkillBarSize
  variant?: SkillBarVariant
  showPercentage?: boolean

  // Animation
  animationDelay?: number
  showAnimation?: boolean

  // HTML attributes
  className?: string
}

/**
 * Props interface for the SkillGrid component
 *
 * @interface SkillGridProps
 * @property {Skill[]} skills - Array of skills to display
 * @property {string} title - Optional section title
 * @property {boolean} showCategories - Whether to group by categories
 * @property {SkillGridColumns} columns - Number of grid columns
 * @property {SkillGridGap} gap - Spacing between items
 * @property {number} animationDelay - Base delay between animations in milliseconds
 * @property {string} className - Additional CSS classes
 */
export interface SkillGridProps {
  // Content
  skills: Skill[]
  title?: string

  // Layout
  showCategories?: boolean
  columns?: SkillGridColumns
  gap?: SkillGridGap

  // Animation
  animationDelay?: number

  // HTML attributes
  className?: string
}

/**
 * Props interface for complete skills section
 *
 * @interface SkillsSectionProps
 * @property {string} id - Optional ID for anchors/navigation
 */
export interface SkillsSectionProps {
  id?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Builds CSS classes for the SkillBar component
 */
export const buildSkillBarClasses = (
  size: SkillBarSize = 'medium',
  variant: SkillBarVariant = 'default',
  showAnimation = true,
  className = ''
): string => {
  return [
    'skill-bar',
    `skill-bar--${size}`,
    variant !== 'default' && `skill-bar--${variant}`,
    showAnimation && 'skill-bar--animated',
    className
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * Builds CSS classes for the SkillGrid component
 */
export const buildSkillGridClasses = (
  columns: SkillGridColumns = 'responsive',
  gap: SkillGridGap = 'medium',
  className = ''
): string => {
  return [
    'skill-grid',
    `skill-grid--${columns}`,
    gap !== 'medium' && `skill-grid--gap-${gap}`,
    className
  ]
    .filter(Boolean)
    .join(' ')
}
