import React, { useEffect, useState } from 'react'
import { P } from '@/shared/ui/Text'
import {
  Skill,
  SkillBarProps,
  SkillGridProps,
  buildSkillBarClasses,
  buildSkillGridClasses
} from '../types/ui/Skill.types'

// ============================================================================
// SKILL BAR COMPONENT
// ============================================================================

export const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  animationDelay = 0,
  size = 'medium',
  variant = 'default',
  showPercentage = true,
  showAnimation = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(!showAnimation)
  const [animatedPercentage, setAnimatedPercentage] = useState(
    showAnimation ? 0 : skill.percentage
  )

  useEffect(() => {
    if (!showAnimation) return

    const timer = setTimeout(() => {
      setIsVisible(true)

      // Anima a porcentagem
      let current = 0
      const increment = skill.percentage / 30
      const animatePercentage = () => {
        current += increment
        if (current < skill.percentage) {
          setAnimatedPercentage(Math.floor(current))
          requestAnimationFrame(animatePercentage)
        } else {
          setAnimatedPercentage(skill.percentage)
        }
      }

      setTimeout(animatePercentage, 200)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [skill.percentage, animationDelay, showAnimation])

  return (
    <div
      className={buildSkillBarClasses(size, variant, showAnimation, className)}
      style={
        { '--animation-delay': `${animationDelay}ms` } as React.CSSProperties
      }
      data-category={skill.category}
      data-skill={skill.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
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

// ============================================================================
// SKILL GRID COMPONENT
// ============================================================================

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Ferramentas',
  mobile: 'Mobile'
} as const

export const SkillGrid: React.FC<SkillGridProps> = ({
  skills,
  title,
  showCategories = false,
  columns = 'responsive',
  gap = 'medium',
  animationDelay = 100,
  className = ''
}) => {
  const gridClasses = buildSkillGridClasses(columns, gap, className)

  // Agrupa skills por categoria se necessário
  const groupedSkills = showCategories
    ? skills.reduce(
        (acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = []
          acc[skill.category].push(skill)
          return acc
        },
        {} as Record<string, Skill[]>
      )
    : { all: skills }

  return (
    <div className="skill-grid-wrapper">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skill-category">
          {showCategories && category !== 'all' && (
            <h3 className="skill-category__title">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ||
                title}
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
