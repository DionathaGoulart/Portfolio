// ============================================================================
// TYPES FUNDAMENTAIS
// ============================================================================

export type Size = 'pequeno' | 'medio' | 'grande'
export type Align = 'start' | 'center' | 'end'
export type FontWeight = 'normal' | 'semibold' | 'bold'

// ============================================================================
// TYPES DE CORES - PADRONIZADAS
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

// Variantes de cores para componentes específicos (inclui 'default')
export type ColorVariant = ThemeColor | 'default'

// ============================================================================
// TYPES DE COMPONENTES
// ============================================================================

// Button
export type ButtonVariant = 'solid' | 'outline' | 'ghost'

// Typography
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type TextElement = 'p' | 'span'
export type ElementType = TitleLevel | 'span'

// Card
export type CardLayout = 'horizontal' | 'with-icon' | 'varied'

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS
// ============================================================================

// Tamanhos base
export const sizeStyles: Record<Size, string> = {
  pequeno: 'text-sm',
  medio: 'text-base',
  grande: 'text-xl'
}

// Tamanhos específicos para botões (com padding)
export const buttonSizeStyles: Record<Size, string> = {
  pequeno: 'text-sm px-3 py-1.5',
  medio: 'text-base px-4 py-2',
  grande: 'text-xl px-6 py-3'
}

// Tamanhos para tags
export const tagSizeStyles: Record<Size, string> = {
  pequeno: 'text-xs px-2 py-0.5',
  medio: 'text-sm px-3 py-1',
  grande: 'text-base px-4 py-1.5'
}

// Escala tipográfica para títulos
export const titleLevelStyles: Record<TitleLevel, string> = {
  h1: 'text-8xl',
  h2: 'text-5xl',
  h3: 'text-3xl',
  h4: 'text-xl',
  h5: 'text-lg'
}

// ============================================================================
// CLASSES DE ALINHAMENTO
// ============================================================================

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

export const cardAlignClasses: Record<Align, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

// ============================================================================
// CLASSES DE PESO DA FONTE
// ============================================================================

export const fontWeightClasses: Record<FontWeight, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

// ============================================================================
// CLASSES DE CORES DO TEMA
// ============================================================================

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

// ============================================================================
// CLASSES DE CORES PARA BOTÕES
// ============================================================================

export const buttonSolidColorClasses: Record<ThemeColor, string> = {
  primary:
    'bg-theme-primary text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-primary hover:border-2 hover:border-theme-primary',
  secondary:
    'bg-theme-secondary text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-secondary hover:border-2 hover:border-theme-secondary',
  accent:
    'bg-theme-accent text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-accent hover:border-2 hover:border-theme-accent',
  error:
    'bg-theme-error text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-error hover:border-2 hover:border-theme-error',
  success:
    'bg-theme-success text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-success hover:border-2 hover:border-theme-success',
  text: 'bg-theme-text text-theme-text-secondary transform transition hover:scale-105 hover:bg-transparent hover:text-theme-text hover:border-2 hover:border-theme-text',
  textSecondary:
    'bg-theme-text-secondary border-2 border-theme-text text-theme-text transform transition hover:scale-105 hover:bg-theme-text hover:text-theme-text-secondary',
  warning:
    'bg-theme-warning text-theme-text transform transition hover:scale-105 hover:bg-transparent hover:text-theme-warning hover:border-2 hover:border-theme-warning'
}

export const buttonOutlineColorClasses: Record<ThemeColor, string> = {
  primary:
    'border-2 border-theme-primary text-theme-primary transform transition hover:scale-105 hover:bg-theme-primary hover:text-theme-text',
  secondary:
    'border-2 border-theme-secondary text-theme-secondary transform transition hover:scale-105 hover:bg-theme-secondary hover:text-theme-text',
  accent:
    'border-2 border-theme-accent text-theme-accent transform transition hover:scale-105 hover:bg-theme-accent hover:text-theme-text',
  text: 'border-2 border-theme-text text-theme-text transform transition hover:scale-105 hover:bg-theme-text hover:text-theme-background',
  textSecondary:
    'border-2 border-theme-text text-theme-text transform transition hover:scale-105 hover:bg-theme-text hover:text-theme-text-secondary',
  error:
    'border-2 border-theme-error text-theme-error hover:bg-theme-error transform transition hover:scale-105 hover:text-theme-text',
  success:
    'border-2 border-theme-success text-theme-success hover:bg-theme-success transform transition hover:scale-105 hover:text-theme-text',
  warning:
    'border-2 border-theme-warning text-theme-warning hover:bg-theme-warning transform transition hover:scale-105 hover:text-theme-text'
}

export const buttonGhostColorClasses: Record<ThemeColor, string> = {
  primary:
    'text-theme-primary transform transition hover:scale-105 hover:bg-theme-primary hover:bg-opacity-10',
  secondary:
    'text-theme-secondary transform transition hover:scale-105 hover:bg-theme-secondary hover:bg-opacity-10',
  accent:
    'text-theme-accent transform transition hover:scale-105 hover:bg-theme-accent hover:bg-opacity-10',
  text: 'text-theme-text transform transition hover:scale-105 hover:bg-theme-text hover:bg-opacity-10',
  textSecondary:
    'text-theme-text-secondary transform transition hover:scale-105 hover:bg-theme-text-secondary hover:bg-opacity-10',
  error:
    'text-theme-error transform transition hover:scale-105 hover:bg-theme-error hover:bg-opacity-10',
  success:
    'text-theme-success transform transition hover:scale-105 hover:bg-theme-success hover:bg-opacity-10',
  warning:
    'text-theme-warning transform transition hover:scale-105 hover:bg-theme-warning hover:bg-opacity-10'
}

// ============================================================================
// CLASSES DE FOCUS PARA BOTÕES
// ============================================================================

export const buttonFocusRingClasses: Record<ThemeColor, string> = {
  primary: 'focus:ring-theme-primary',
  secondary: 'focus:ring-theme-secondary',
  accent: 'focus:ring-theme-accent',
  error: 'focus:ring-theme-error',
  success: 'focus:ring-theme-success',
  warning: 'focus:ring-theme-warning',
  text: 'focus:ring-theme-text',
  textSecondary: 'focus:ring-theme-text-secondary'
}

// ============================================================================
// CLASSES DE CORES PARA TAGS
// ============================================================================

export const tagColorClasses: Record<ThemeColor, string> = {
  primary: 'theme-bg-primary-muted theme-text-primary',
  secondary: 'theme-bg-secondary-muted theme-text-secondary',
  accent: 'theme-bg-accent-muted theme-text-accent',
  text: 'theme-bg-text-muted theme-text-primary',
  textSecondary: 'theme-bg-text-secondary-muted theme-text-secondary',
  error: 'theme-bg-error-muted theme-text-error',
  success: 'theme-bg-success-muted theme-text-success',
  warning: 'theme-bg-warning-muted theme-text-warning'
}

// ============================================================================
// CLASSES DE CORES PARA CARDS
// ============================================================================

export const cardColorVariants: Record<
  ColorVariant,
  {
    background: string
    border: string
    hover: string
  }
> = {
  default: {
    background: 'bg-theme-surface',
    border: 'border-theme-border',
    hover: 'hover:bg-theme-surface'
  },
  primary: {
    background: 'bg-theme-primary/10',
    border: 'border-theme-primary/30',
    hover: 'hover:bg-theme-primary/15'
  },
  secondary: {
    background: 'bg-theme-secondary/10',
    border: 'border-theme-secondary/30',
    hover: 'hover:bg-theme-secondary/15'
  },
  accent: {
    background: 'bg-theme-accent/10',
    border: 'border-theme-accent/30',
    hover: 'hover:bg-theme-accent/15'
  },
  success: {
    background: 'bg-theme-success/10',
    border: 'border-theme-success/30',
    hover: 'hover:bg-theme-success/15'
  },
  error: {
    background: 'bg-theme-error/10',
    border: 'border-theme-error/30',
    hover: 'hover:bg-theme-error/15'
  },
  warning: {
    background: 'bg-theme-warning/10',
    border: 'border-theme-warning/30',
    hover: 'hover:bg-theme-warning/15'
  },
  text: {
    background: 'bg-theme-text/10',
    border: 'border-theme-text/30',
    hover: 'hover:bg-theme-text/15'
  },
  textSecondary: {
    background: 'bg-theme-text-secondary/10',
    border: 'border-theme-text-secondary/30',
    hover: 'hover:bg-theme-text-secondary/15'
  }
}

// ============================================================================
// CONFIGURAÇÕES ESPECÍFICAS PARA CARDS
// ============================================================================

export const cardHorizontalSizeStyles: Record<
  Size,
  {
    container: string
    titleLevel: TitleLevel
    subtitleSize: Size
    padding: string
  }
> = {
  pequeno: {
    container: 'min-h-16',
    titleLevel: 'h5',
    subtitleSize: 'pequeno',
    padding: 'p-3'
  },
  medio: {
    container: 'min-h-20',
    titleLevel: 'h4',
    subtitleSize: 'pequeno',
    padding: 'p-4'
  },
  grande: {
    container: 'min-h-24',
    titleLevel: 'h3',
    subtitleSize: 'medio',
    padding: 'p-5'
  }
}
