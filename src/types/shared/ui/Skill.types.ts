// ================================
// SKILL SPECIFIC TYPES
// ================================

// SkillCategory is now defined in pages/sections.ts to avoid duplication

/**
 * Variantes de tamanho da barra de habilidade
 */
export type SkillBarSize = 'small' | 'medium' | 'large'

/**
 * Variantes visuais da barra de habilidade
 */
export type SkillBarVariant = 'default' | 'minimal' | 'detailed'

/**
 * Opções de colunas do grid de habilidades
 */
export type SkillGridColumns = 1 | 2 | 3 | 'responsive'

/**
 * Opções de espaçamento do grid de habilidades
 */
export type SkillGridGap = 'small' | 'medium' | 'large'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Estrutura de dados de habilidade técnica com nível de proficiência
 *
 * @interface Skill
 * @property {string} id - Identificador único da habilidade
 * @property {string} name - Nome de exibição da habilidade
 * @property {number} percentage - Porcentagem de proficiência (0-100)
 * @property {string} category - Categoria de classificação
 * @property {string} icon - Ícone opcional para representação visual
 */
export interface Skill {
  id: string
  name: string
  percentage: number
  category: string
  icon?: string
}

/**
 * Interface de props para o componente SkillBar
 *
 * @interface SkillBarProps
 * @property {Skill} skill - Dados da habilidade para exibir
 * @property {number} animationDelay - Atraso de animação em milissegundos
 * @property {SkillBarSize} size - Variante de tamanho do componente
 * @property {SkillBarVariant} variant - Variante visual do componente
 * @property {boolean} showPercentage - Se deve mostrar valor de porcentagem
 * @property {boolean} showAnimation - Se deve executar animações
 * @property {string} className - Classes CSS adicionais
 */
export interface SkillBarProps {
  // Conteúdo
  skill: Skill

  // Aparência
  size?: SkillBarSize
  variant?: SkillBarVariant
  showPercentage?: boolean

  // Animação
  animationDelay?: number
  showAnimation?: boolean

  // Atributos HTML
  className?: string
}

/**
 * Interface de props para o componente SkillGrid
 *
 * @interface SkillGridProps
 * @property {Skill[]} skills - Array de habilidades para exibir
 * @property {string} title - Título opcional da seção
 * @property {boolean} showCategories - Se deve agrupar por categorias
 * @property {SkillGridColumns} columns - Número de colunas do grid
 * @property {SkillGridGap} gap - Espaçamento entre itens
 * @property {number} animationDelay - Atraso base entre animações em milissegundos
 * @property {string} className - Classes CSS adicionais
 */
export interface SkillGridProps {
  // Conteúdo
  skills: Skill[]
  title?: string

  // Layout
  showCategories?: boolean
  columns?: SkillGridColumns
  gap?: SkillGridGap

  // Animação
  animationDelay?: number

  // Atributos HTML
  className?: string
}

// SkillsSectionProps is now defined in pages/sections.ts to avoid duplication

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Constrói classes CSS para o componente SkillBar
 * @param {SkillBarSize} size - Tamanho da barra
 * @param {SkillBarVariant} variant - Variante da barra
 * @param {boolean} showAnimation - Se deve mostrar animação
 * @param {string} className - Classes adicionais
 * @returns {string} String de classes CSS
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
 * Constrói classes CSS para o componente SkillGrid
 * @param {SkillGridColumns} columns - Número de colunas
 * @param {SkillGridGap} gap - Espaçamento
 * @param {string} className - Classes adicionais
 * @returns {string} String de classes CSS
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
