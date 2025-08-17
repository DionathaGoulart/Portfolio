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
  disabled?: boolean
  loading?: boolean
  elevated?: boolean
  compact?: boolean
}

// ============================================================================
// ESTILOS ESPECÍFICOS DO CARD
// ============================================================================

// Classes de alinhamento específicas para cards
const cardAlignClasses: Record<Align, string> = {
  start: 'card-align-start',
  center: 'card-align-center',
  end: 'card-align-end'
}

// Classes de layout
const cardLayoutClasses: Record<CardLayout, string> = {
  horizontal: 'card-layout-horizontal',
  'with-icon': 'card-layout-with-icon',
  varied: 'card-layout-varied'
}

// Classes de tamanho para layout horizontal
const cardHorizontalSizeClasses: Record<Size, string> = {
  pequeno: 'card-horizontal-pequeno',
  medio: 'card-horizontal-medio',
  grande: 'card-horizontal-grande'
}

// Reutiliza as cores globais para cards
export const cardColorVariants = colorVariants

// Configurações específicas para cards horizontais (para uso no React)
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

// ============================================================================
// UTILITÁRIOS ESPECÍFICOS DO CARD
// ============================================================================

// Função para gerar classe de cor baseada no layout
const getCardColorClass = (layout: CardLayout, color: ColorVariant): string => {
  return `card-${color}-${layout}`
}

// Função para gerar classe de tamanho para horizontal
const getCardSizeClass = (layout: CardLayout, size: Size): string => {
  if (layout === 'horizontal') {
    return cardHorizontalSizeClasses[size]
  }
  return '' // outros layouts não precisam de classe de tamanho específica
}

// Função para gerar classes de borda customizada
const getCardBorderClass = (borderColor?: ColorVariant): string => {
  return borderColor ? `card-border-${borderColor}` : ''
}

// Função para gerar todas as classes do card
export const getCardClasses = (
  layout: CardLayout = 'horizontal',
  color: ColorVariant = 'default',
  size: Size = 'medio',
  align: Align = 'start',
  onClick?: () => void,
  disabled: boolean = false,
  loading: boolean = false,
  elevated: boolean = false,
  compact: boolean = false,
  borderColor?: ColorVariant,
  customClassName: string = ''
): string => {
  const classes = [
    // Classe base
    'card-base',

    // Layout e cor
    getCardColorClass(layout, color),

    // Tamanho (apenas para horizontal)
    getCardSizeClass(layout, size),

    // Alinhamento
    cardAlignClasses[align],

    // Estados
    onClick && !disabled && 'card-clickable',
    disabled && 'card-disabled',
    loading && 'card-loading',
    elevated && 'card-elevated',
    compact && 'card-compact',

    // Borda customizada
    getCardBorderClass(borderColor),

    // Classe customizada
    customClassName
  ].filter(Boolean)

  return classes.join(' ')
}

// Função para gerar classes específicas do alinhamento (para uso direto)
export const getCardAlignClasses = (align: Align = 'start'): string => {
  return cardAlignClasses[align]
}

// Função para gerar classes de container/grid de cards
export const getCardsContainerClasses = (
  type: 'grid' | 'list' = 'grid',
  columns: 1 | 2 | 3 | 4 = 2,
  compact: boolean = false
): string => {
  if (type === 'list') {
    return compact ? 'cards-list-compact' : 'cards-list'
  }

  return `cards-grid cards-grid-${columns}`
}
