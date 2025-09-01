// ============================================================================
// SKILL TYPES
// ============================================================================

/**
 * Categorias disponíveis para classificação de skills técnicas
 */
export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tools'
  | 'mobile'

/**
 * Representa uma skill técnica com sua respectiva proficiência
 */
export interface Skill {
  /** Identificador único da skill */
  id: string
  /** Nome exibido da skill */
  name: string
  /** Percentual de proficiência (0-100) */
  percentage: number
  /** Categoria de classificação */
  category: SkillCategory
  /** Ícone opcional para representação visual */
  icon?: string
}

/**
 * Propriedades do componente SkillBar
 */
export interface SkillBarProps {
  /** Skill a ser exibida */
  skill: Skill
  /** Delay da animação em milissegundos */
  animationDelay?: number
  /** Tamanho do componente */
  size?: 'small' | 'medium' | 'large'
  /** Variante visual do componente */
  variant?: 'default' | 'minimal' | 'detailed'
  /** Se deve mostrar a porcentagem */
  showPercentage?: boolean
  /** Se deve executar animações */
  showAnimation?: boolean
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Propriedades do componente SkillGrid
 */
export interface SkillGridProps {
  /** Lista de skills a serem exibidas */
  skills: Skill[]
  /** Título opcional da seção */
  title?: string
  /** Se deve agrupar por categorias */
  showCategories?: boolean
  /** Número de colunas do grid */
  columns?: 1 | 2 | 3 | 'responsive'
  /** Espaçamento entre items */
  gap?: 'small' | 'medium' | 'large'
  /** Delay base entre animações em milissegundos */
  animationDelay?: number
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Propriedades da seção completa de skills
 */
export interface SkillsSectionProps {
  /** ID opcional para âncoras/navegação */
  id?: string
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

/**
 * Constrói classes CSS para o componente SkillBar
 * @param size - Tamanho do componente
 * @param variant - Variante visual
 * @param showAnimation - Se deve incluir classes de animação
 * @param className - Classes adicionais
 * @returns String com todas as classes concatenadas
 */
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

/**
 * Constrói classes CSS para o componente SkillGrid
 * @param columns - Configuração de colunas
 * @param gap - Espaçamento entre items
 * @param className - Classes adicionais
 * @returns String com todas as classes concatenadas
 */
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
