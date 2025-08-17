import { Size, ThemeColor } from './global.types'

export interface TagProps {
  children: React.ReactNode
  color?: ThemeColor
  size?: Size
  className?: string
}

// Tamanhos para tags
export const tagSizeStyles: Record<Size, string> = {
  pequeno: 'text-xs px-2 py-0.5',
  medio: 'text-sm px-3 py-1',
  grande: 'text-base px-4 py-1.5'
}

// Classes de cores para tags
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
