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
  loading?: boolean
  icon?: React.ReactNode
}

// ============================================================================
// CLASSES SIMPLIFICADAS - Agora usando as classes do SCSS
// ============================================================================

// Mapeamento dos tamanhos (agora usa classes do SCSS)
export const buttonSizeClasses: Record<Size, string> = {
  pequeno: 'px-3 py-1.5 text-xs sm:text-sm',
  medio: 'px-4 py-2 text-sm sm:text-base',
  grande: 'px-6 py-3 text-base sm:text-lg'
}

// Função para gerar classe de cor baseada na variante
export const getButtonColorClass = (
  variant: ButtonVariant,
  color: ThemeColor
): string => {
  return `btn-${variant}-${color}`
}

// Classes de alinhamento do container
export const buttonContainerClasses: Record<Align, string> = {
  start: 'btn-container-start',
  center: 'btn-container-center',
  end: 'btn-container-end'
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

// Função para gerar todas as classes do botão
export const getButtonClasses = (
  size: Size = 'medio',
  variant: ButtonVariant = 'solid',
  color: ThemeColor = 'primary',
  disabled: boolean = false,
  loading: boolean = false,
  hasIcon: boolean = false,
  customClassName: string = ''
): string => {
  const classes = [
    'btn-base',
    buttonSizeClasses[size],
    getButtonColorClass(variant, color),
    loading && 'btn-loading',
    hasIcon && 'btn-with-icon',
    customClassName
  ].filter(Boolean)

  return classes.join(' ')
}

// Função para gerar classes do container
export const getButtonContainerClasses = (align: Align = 'start'): string => {
  return `btn-container ${buttonContainerClasses[align]}`
}
