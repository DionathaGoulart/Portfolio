// ============================================================================
// TYPES FUNDAMENTAIS - Usados globalmente
// ============================================================================

export type Size = 'pequeno' | 'medio' | 'grande'
export type Align = 'start' | 'center' | 'end'
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type ElementType = TitleLevel | 'span' | 'p'
export type FontWeight = 'normal' | 'semibold' | 'bold'

// ============================================================================
// TYPES DE CORES - PADRONIZADAS - Usados globalmente
// ============================================================================

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textSecondary'
  | 'error'
  | 'success'
  | 'warning'

export type ColorVariant = ThemeColor | 'default'

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

// Classes de peso da fonte
export const fontWeightClasses: Record<FontWeight, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

// Escala tipográfica
export const levelStyles: Record<TitleLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl',
  h5: 'text-base sm:text-lg'
}

// Esquema de cores para componentes
export const colorVariants: Record<
  ColorVariant,
  {
    background: string
    border: string
    hover: string
    text: string
    textMuted: string
  }
> = {
  default: {
    background: 'bg-theme-surface',
    border: 'border-theme-border',
    hover: 'hover:bg-theme-surface',
    text: 'text-theme-text',
    textMuted: 'text-theme-text-secondary'
  },
  primary: {
    background: 'bg-theme-primary/10',
    border: 'border-theme-primary/30',
    hover: 'hover:bg-theme-primary/15',
    text: 'text-theme-primary',
    textMuted: 'theme-text-primary'
  },
  secondary: {
    background: 'bg-theme-secondary/10',
    border: 'border-theme-secondary/30',
    hover: 'hover:bg-theme-secondary/15',
    text: 'text-theme-secondary',
    textMuted: 'theme-text-secondary'
  },
  accent: {
    background: 'bg-theme-accent/10',
    border: 'border-theme-accent/30',
    hover: 'hover:bg-theme-accent/15',
    text: 'text-theme-accent',
    textMuted: 'theme-text-accent'
  },
  success: {
    background: 'bg-theme-success/10',
    border: 'border-theme-success/30',
    hover: 'hover:bg-theme-success/15',
    text: 'text-theme-success',
    textMuted: 'theme-text-success'
  },
  error: {
    background: 'bg-theme-error/10',
    border: 'border-theme-error/30',
    hover: 'hover:bg-theme-error/15',
    text: 'text-theme-error',
    textMuted: 'theme-text-error'
  },
  warning: {
    background: 'bg-theme-warning/10',
    border: 'border-theme-warning/30',
    hover: 'hover:bg-theme-warning/15',
    text: 'text-theme-warning',
    textMuted: 'theme-text-warning'
  },
  text: {
    background: 'bg-theme-text/10',
    border: 'border-theme-text/30',
    hover: 'hover:bg-theme-text/15',
    text: 'text-theme-text',
    textMuted: 'theme-text-primary'
  },
  textSecondary: {
    background: 'bg-theme-text-secondary/10',
    border: 'border-theme-text-secondary/30',
    hover: 'hover:bg-theme-text-secondary/15',
    text: 'text-theme-text-secondary',
    textMuted: 'theme-text-secondary'
  }
}
