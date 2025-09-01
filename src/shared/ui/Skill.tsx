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
// CONSTANTS
// ============================================================================

const ANIMATION_STEPS = 30
const ANIMATION_DELAY_STEP = 200

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Ferramentas',
  mobile: 'Mobile'
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calcula o incremento para animação suave da porcentagem
 * @param targetPercentage - Porcentagem final desejada
 * @returns Valor do incremento por frame
 */
const calculateAnimationIncrement = (targetPercentage: number): number => {
  return targetPercentage / ANIMATION_STEPS
}

/**
 * Anima a porcentagem de forma suave usando requestAnimationFrame
 * @param currentValue - Valor atual
 * @param targetValue - Valor final
 * @param increment - Incremento por frame
 * @param setter - Função para atualizar o state
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

// ============================================================================
// SKILL BAR COMPONENT
// ============================================================================

/**
 * Componente que exibe uma skill com barra de progresso animada
 * @param props - Propriedades do componente SkillBar
 * @returns JSX.Element
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
  const [isVisible, setIsVisible] = useState(!showAnimation)
  const [animatedPercentage, setAnimatedPercentage] = useState(
    showAnimation ? 0 : skill.percentage
  )

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

// ============================================================================
// SKILL GRID COMPONENT
// ============================================================================

/**
 * Agrupa skills por categoria para organização visual
 * @param skills - Lista de skills
 * @returns Objeto com skills agrupadas por categoria
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
 * Obtém o label de exibição para uma categoria
 * @param category - Categoria da skill
 * @param fallbackTitle - Título fallback se categoria não encontrada
 * @returns Label formatado para exibição
 */
const getCategoryLabel = (category: string, fallbackTitle?: string): string => {
  return (
    CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ||
    fallbackTitle ||
    category
  )
}

/**
 * Componente grid que organiza e exibe múltiplas skills
 * @param props - Propriedades do componente SkillGrid
 * @returns JSX.Element
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
  const gridClasses = buildSkillGridClasses(columns, gap, className)

  const groupedSkills = showCategories
    ? groupSkillsByCategory(skills)
    : { all: skills }

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
