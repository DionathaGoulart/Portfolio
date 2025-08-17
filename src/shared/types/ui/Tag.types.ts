import { Size, ThemeColor, colorVariants } from './global.types'

// ============================================================================
// TYPES ESPECÍFICOS DO TAG
// ============================================================================

export interface TagProps {
  children: React.ReactNode
  color?: ThemeColor
  size?: Size
  className?: string
}

// ============================================================================
// ESTILOS ESPECÍFICOS DO TAG
// ============================================================================

// Tamanhos específicos para tags (padding diferente dos textos globais)
export const tagSizeStyles: Record<Size, string> = {
  pequeno: 'text-xs px-2 py-0.5',
  medio: 'text-sm px-3 py-1',
  grande: 'text-base px-4 py-1.5'
}

// Classes de cores específicas para tags (usando o esquema global)
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
