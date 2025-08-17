import {
  Align,
  Size,
  ColorVariant,
  TitleLevel,
  colorVariants
} from './global.types'

// ============================================================================
// TYPES ESPECÍFICOS DO CARD
// ============================================================================

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
// ESTILOS ESPECÍFICOS DO CARD
// ============================================================================

// Classes de alinhamento específicas para cards (inclui flex)
export const cardAlignClasses: Record<Align, string> = {
  start: 'text-left items-start',
  center: 'text-center items-center',
  end: 'text-right items-end'
}

// Reutiliza as cores globais para cards
export const cardColorVariants = colorVariants

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
    container: 'min-h-12 sm:min-h-16',
    titleLevel: 'h5',
    subtitleSize: 'pequeno',
    padding: 'p-2 sm:p-3'
  },
  medio: {
    container: 'min-h-16 sm:min-h-20',
    titleLevel: 'h4',
    subtitleSize: 'pequeno',
    padding: 'p-3 sm:p-4'
  },
  grande: {
    container: 'min-h-20 sm:min-h-24',
    titleLevel: 'h3',
    subtitleSize: 'medio',
    padding: 'p-4 sm:p-5'
  }
}
