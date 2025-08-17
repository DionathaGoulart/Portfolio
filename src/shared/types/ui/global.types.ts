// ============================================================================
// TYPES FUNDAMENTAIS - Usados globalmente
// ============================================================================

export type Size = 'pequeno' | 'medio' | 'grande'
export type Align = 'start' | 'center' | 'end'

// ============================================================================
// TYPES DE CORES - PADRONIZADAS - Usados globalmente
// ============================================================================

// Cores principais do tema
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textSecondary'
  | 'error'
  | 'success'
  | 'warning'

// ============================================================================
// TYPES DE COMPONENTES - Título (usado por Card e Title)
// ============================================================================
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS - Usadas globalmente
// ============================================================================

// Tamanhos base
export const sizeStyles: Record<Size, string> = {
  pequeno: 'text-xs sm:text-sm',
  medio: 'text-sm sm:text-base',
  grande: 'text-base sm:text-lg md:text-xl'
}

// Classes de alinhamento
export const alignClasses: Record<Align, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
}

export const flexAlignClasses: Record<Align, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end'
}

// Classes de cores do tema
export const colorClasses: Record<ThemeColor, string> = {
  primary: 'text-theme-primary',
  secondary: 'text-theme-secondary',
  accent: 'text-theme-accent',
  text: 'text-theme-text',
  textSecondary: 'text-theme-text-secondary',
  error: 'text-theme-error',
  success: 'text-theme-success',
  warning: 'text-theme-warning'
}
