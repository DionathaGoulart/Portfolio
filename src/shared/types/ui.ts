// ============================================================================
// TYPES COMPARTILHADOS
// ============================================================================

export type Size = 'pequeno' | 'medio' | 'grande'
export type Align = 'start' | 'center' | 'end'
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textSecondary'
  | 'error'
  | 'success'
  | 'warning'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type TextElement = 'p' | 'span'

// ============================================================================
// CONSTANTES COMPARTILHADAS
// ============================================================================

// Tamanhos
export const sizeStyles: Record<Size, string> = {
  pequeno: 'text-sm',
  medio: 'text-base',
  grande: 'text-xl'
}

// Classes de alinhamento
export const alignClasses: Record<Align, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right'
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
