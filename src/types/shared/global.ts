// ================================
// GLOBAL UI TYPES
// ================================

/**
 * Variantes de tamanho de componente para tamanhos consistentes em componentes UI
 */
export type Size = 'pequeno' | 'medio' | 'grande'

/**
 * Opções de alinhamento de texto e conteúdo
 */
export type Align = 'start' | 'center' | 'end'

/**
 * Opções de peso de fonte para tipografia
 */
export type Weight = 'normal' | 'medium' | 'semibold' | 'bold'

/**
 * Modificadores de estilo de texto para tipografia
 */
export type Style = 'italic' | 'underline' | 'line-through'

/**
 * Opções de intensidade de sombra para efeitos visuais
 */
export type Shadow = boolean | 'strong'

// ================================
// THEME COLOR TYPES
// ================================

/**
 * Cores de tema disponíveis do sistema de design
 */
type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textSecondary'
  | 'error'
  | 'success'
  | 'warning'

/**
 * Tipo de variante de cor incluindo cores de tema e opção padrão
 */
export type ColorVariant = ThemeColor | 'default'
