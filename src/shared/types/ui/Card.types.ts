// ============================================================================
// TYPES DE COMPONENTES - Card
// ============================================================================

import { Align, Size, ThemeColor, TitleLevel } from './global.types'

// Variantes de cores para componentes específicos (inclui 'default')
export type ColorVariant = ThemeColor | 'default'

export type CardLayout = 'horizontal' | 'with-icon' | 'varied'

export interface CardProps {
  layout: CardLayout
  title: string
  subtitle?: string
  align?: Align
  className?: string
  onClick?: () => void
  size?: Size
  icon?: React.ReactNode
  date?: string
  description?: string
  tags?: string[]
  children?: React.ReactNode
  color?: ColorVariant
  borderColor?: ColorVariant
}

// ============================================================================
// CONSTANTES DE ESTILOS - PADRONIZADAS para Cards
// ============================================================================

// Classes de alinhamento para cards
export const cardAlignClasses: Record<Align, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

// Classes de cores para cards
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

// Configurações específicas para cards horizontais
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
