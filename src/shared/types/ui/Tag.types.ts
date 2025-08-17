import { Size, ThemeColor, colorVariants } from './global.types'

// ============================================================================
// TYPES ESPECÍFICOS DO TAG
// ============================================================================

export type TagVariant = 'solid' | 'outline' | 'ghost'

export interface TagProps {
  children: React.ReactNode
  color?: ThemeColor
  size?: Size
  variant?: TagVariant
  className?: string
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  badge?: string | number
  interactive?: boolean
}

// ============================================================================
// ESTILOS ESPECÍFICOS DO TAG
// ============================================================================

// Tamanhos específicos para tags
const tagSizeClasses: Record<Size, string> = {
  pequeno: 'tag-size-pequeno',
  medio: 'tag-size-medio',
  grande: 'tag-size-grande'
}

// Reutiliza as cores globais para tags (para compatibilidade)
export const tagColorClasses: Record<ThemeColor, string> = {
  primary: `${colorVariants.primary.background} ${colorVariants.primary.text}`,
  secondary: `${colorVariants.secondary.background} ${colorVariants.secondary.text}`,
  accent: `${colorVariants.accent.background} ${colorVariants.accent.text}`,
  text: `${colorVariants.text.background} ${colorVariants.text.text}`,
  textSecondary: `${colorVariants.textSecondary.background} ${colorVariants.textSecondary.text}`,
  error: `${colorVariants.error.background} ${colorVariants.error.text}`,
  success: `${colorVariants.success.background} ${colorVariants.success.text}`,
  warning: `${colorVariants.warning.background} ${colorVariants.warning.text}`
}

// Estilos de tamanho para compatibilidade
export const tagSizeStyles: Record<Size, string> = {
  pequeno: 'text-xs px-2 py-0.5',
  medio: 'text-sm px-3 py-1',
  grande: 'text-base px-4 py-1.5'
}

// ============================================================================
// UTILITÁRIOS ESPECÍFICOS DO TAG
// ============================================================================

// Função para gerar classe de cor baseada na variante
const getTagColorClass = (variant: TagVariant, color: ThemeColor): string => {
  return `tag-${variant}-${color}`
}

// Função para gerar classe de tamanho
const getTagSizeClass = (size: Size): string => {
  return tagSizeClasses[size]
}

// Função para gerar todas as classes da tag
export const getTagClasses = (
  color: ThemeColor = 'primary',
  size: Size = 'medio',
  variant: TagVariant = 'solid',
  onClick?: () => void,
  disabled: boolean = false,
  interactive: boolean = false,
  icon?: React.ReactNode,
  removable: boolean = false,
  customClassName: string = ''
): string => {
  const classes = [
    // Classe base
    'tag-base',

    // Tamanho
    getTagSizeClass(size),

    // Cor e variante
    getTagColorClass(variant, color),

    // Estados
    (onClick || interactive) && !disabled && 'tag-interactive',
    disabled && 'tag-disabled',

    // Modificadores
    icon && 'tag-with-icon',
    removable && 'tag-removable',

    // Classe customizada
    customClassName
  ].filter(Boolean)

  return classes.join(' ')
}

// Função para gerar classes de container/grupo de tags
export const getTagGroupClasses = (compact: boolean = false): string => {
  return compact ? 'tag-group tag-group-compact' : 'tag-group'
}

// Tipos e utilitários para tags de status
export type TagStatus = 'online' | 'offline' | 'pending'

export const getTagStatusClass = (status: TagStatus): string => {
  return `tag-status-${status}`
}

// Função para gerar classe composta (para compatibilidade com o padrão atual)
export const getTagComposedClass = (
  color: ThemeColor = 'primary',
  variant: TagVariant = 'solid',
  size: Size = 'medio'
): string => {
  return `tag-${color}-${variant}-${size}`
}
