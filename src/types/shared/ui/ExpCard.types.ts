// ================================
// EXPERIENCE SPECIFIC TYPES
// ================================

/**
 * Variantes visuais do card de experiência
 */
export type ExpCardVariant = 'default' | 'highlight'

/**
 * Variantes padrão da lista de experiência incluindo opções estendidas
 */
export type ExpListVariant = 'default' | 'highlight' | 'secondary' | 'accent'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Interface de props para o componente Experience Card
 *
 * @interface ExpCardProps
 * @property {string} title - Título do cargo ou nome da posição
 * @property {string} company - Nome da empresa ou organização
 * @property {string} period - Período de tempo da experiência
 * @property {string} description - Descrição detalhada do cargo/experiência
 * @property {string[]} technologies - Array de tecnologias/habilidades utilizadas
 * @property {ExpCardVariant} variant - Variante de estilo visual
 * @property {boolean} showTimeline - Se deve mostrar ponto e linha da timeline
 * @property {boolean} interactive - Habilitar interações de hover/focus
 * @property {() => void} onClick - Função manipuladora de clique
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - Atributo id HTML
 */
export interface ExpCardProps {
  // Conteúdo
  title: string
  company: string
  period: string
  description: string
  technologies: string[]

  // Aparência
  variant?: ExpCardVariant
  showTimeline?: boolean

  // Interatividade
  interactive?: boolean
  onClick?: () => void

  // Atributos HTML
  className?: string
  id?: string
}

/**
 * Interface de props para o componente Experience List
 *
 * @interface ExpListProps
 * @property {ExpCardProps[]} experiences - Array de dados de cards de experiência
 * @property {boolean} showTimeline - Se deve mostrar linha de timeline conectando
 * @property {ExpListVariant} defaultVariant - Variante padrão para todos os cards
 * @property {string} className - Classes CSS adicionais
 */
export interface ExpListProps {
  experiences: ExpCardProps[]
  showTimeline?: boolean
  defaultVariant?: ExpListVariant
  className?: string
}
