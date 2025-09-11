import React, { useEffect, useState } from 'react'
import { P } from '@shared/ui'
import {
  Skill,
  SkillBarProps,
  SkillGridProps,
  buildSkillBarClasses,
  buildSkillGridClasses
} from '@shared/types'
import '@styles/ui/skill.scss'

// ================================
// CONSTANTS
// ================================

const ANIMATION_STEPS = 30
const ANIMATION_DELAY_STEP = 200

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Ferramentas',
  mobile: 'Mobile'
} as const

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Calculates increment for smooth percentage animation
 */
const calculateAnimationIncrement = (targetPercentage: number): number => {
  return targetPercentage / ANIMATION_STEPS
}

/**
 * Animates percentage smoothly using requestAnimationFrame
 */
const animatePercentage = (
  currentValue: number,
  targetValue: number,
  increment: number,
  setter: (value: number) => void
): void => {
  const newValue = currentValue + increment

  if (newValue < targetValue) {
    setter(Math.floor(newValue))
    requestAnimationFrame(() =>
      animatePercentage(newValue, targetValue, increment, setter)
    )
  } else {
    setter(targetValue)
  }
}

/**
 * Groups skills by category for visual organization
 */
const groupSkillsByCategory = (skills: Skill[]): Record<string, Skill[]> => {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )
}

/**
 * Gets display label for a category
 */
const getCategoryLabel = (category: string, fallbackTitle?: string): string => {
  return (
    CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ||
    fallbackTitle ||
    category
  )
}

// ================================
// SKILL BAR COMPONENT
// ================================

/**
 * Skill bar component displaying individual skill with animated progress bar
 *
 * @component SkillBar
 * @param {SkillBarProps} props - SkillBar configuration props
 * @returns {React.FC<SkillBarProps>} Rendered skill bar component
 *
 * @example
 * <SkillBar
 *   skill={{ name: 'React', percentage: 90, category: 'frontend' }}
 *   animationDelay={200}
 *   showAnimation={true}
 * />
 */
export const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  animationDelay = 0,
  size = 'medium',
  variant = 'default',
  showPercentage = true,
  showAnimation = true,
  className = ''
}) => {
  // ================================
  // COMPONENT STATE
  // ================================

  const [isVisible, setIsVisible] = useState(!showAnimation)
  const [animatedPercentage, setAnimatedPercentage] = useState(
    showAnimation ? 0 : skill.percentage
  )

  // ================================
  // DERIVED VALUES
  // ================================

  const skillBarClasses = buildSkillBarClasses(
    size,
    variant,
    showAnimation,
    className
  )

  const skillDataAttributes = {
    'data-category': skill.category,
    'data-skill': skill.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  }

  // ================================
  // EFFECTS
  // ================================

  useEffect(() => {
    if (!showAnimation) return

    const timer = setTimeout(() => {
      setIsVisible(true)

      const increment = calculateAnimationIncrement(skill.percentage)

      setTimeout(() => {
        animatePercentage(0, skill.percentage, increment, setAnimatedPercentage)
      }, ANIMATION_DELAY_STEP)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [skill.percentage, animationDelay, showAnimation])

  // ================================
  // RENDER
  // ================================

  return (
    <div
      className={skillBarClasses}
      style={
        { '--animation-delay': `${animationDelay}ms` } as React.CSSProperties
      }
      {...skillDataAttributes}
    >
      <div className="skill-bar__header">
        <P className="skill-bar__name">{skill.name}</P>
        {showPercentage && (
          <P className="skill-bar__percentage">{animatedPercentage}%</P>
        )}
      </div>

      <div className="skill-bar__container">
        <div className="skill-bar__track">
          <div
            className="skill-bar__fill"
            style={
              {
                '--skill-percentage': `${isVisible ? skill.percentage : 0}%`
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  )
}

// ================================
// SKILL GRID COMPONENT
// ================================

/**
 * Grid container component for organizing and displaying multiple skills
 * with optional category grouping and animations
 *
 * @component SkillGrid
 * @param {SkillGridProps} props - SkillGrid configuration props
 * @returns {React.FC<SkillGridProps>} Rendered skill grid component
 *
 * @example
 * <SkillGrid
 *   skills={skillsData}
 *   showCategories={true}
 *   columns="responsive"
 *   animationDelay={100}
 * />
 */
export const SkillGrid: React.FC<SkillGridProps> = ({
  skills,
  title,
  showCategories = false,
  columns = 'responsive',
  gap = 'medium',
  animationDelay = 100,
  className = ''
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const gridClasses = buildSkillGridClasses(columns, gap, className)
  const groupedSkills = showCategories
    ? groupSkillsByCategory(skills)
    : { all: skills }

  // ================================
  // RENDER
  // ================================

  return (
    <div className="skill-grid-wrapper">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skill-category">
          {showCategories && category !== 'all' && (
            <h3 className="skill-category__title">
              {getCategoryLabel(category, title)}
            </h3>
          )}

          <div className={gridClasses}>
            {categorySkills.map((skill, index) => (
              <SkillBar
                key={skill.id}
                skill={skill}
                animationDelay={index * animationDelay}
                showAnimation
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
