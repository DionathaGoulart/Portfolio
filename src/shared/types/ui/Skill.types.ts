// ============================================================================
// SKILL TYPES
// ============================================================================

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tools'
  | 'mobile'

export interface Skill {
  id: string
  name: string
  percentage: number
  category: SkillCategory
  icon?: string
}

export interface SkillBarProps {
  skill: Skill
  animationDelay?: number
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'minimal' | 'detailed'
  showPercentage?: boolean
  showAnimation?: boolean
  className?: string
}

export interface SkillGridProps {
  skills: Skill[]
  title?: string
  showCategories?: boolean
  columns?: 1 | 2 | 3 | 'responsive'
  gap?: 'small' | 'medium' | 'large'
  animationDelay?: number
  className?: string
}

export interface SkillsSectionProps {
  id?: string
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

export const buildSkillBarClasses = (
  size: SkillBarProps['size'] = 'medium',
  variant: SkillBarProps['variant'] = 'default',
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

export const buildSkillGridClasses = (
  columns: SkillGridProps['columns'] = 'responsive',
  gap: SkillGridProps['gap'] = 'medium',
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
