import { Align, Size, ThemeColor } from './global.types'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'

export interface ButtonProps {
  size?: Size
  align?: Align
  color?: ThemeColor
  variant?: ButtonVariant
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  className?: string
  id?: string
}

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS para Botões
// ============================================================================

// Tamanhos específicos para botões (com padding)
export const buttonSizeStyles: Record<Size, string> = {
  pequeno: 'text-sm px-3 py-1.5',
  medio: 'text-base px-4 py-2',
  grande: 'text-xl px-6 py-3'
}

// Classes de cores para botões
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

// Classes de focus para botões
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
