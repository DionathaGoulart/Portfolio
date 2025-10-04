import React from 'react'
import { Align, Size, ColorVariant } from '../global'
import { TitleLevel } from './Title.types'

// ================================
// CARD SPECIFIC TYPES
// ================================

/**
 * Variantes de layout visual do card
 */
export type CardVariant = 'horizontal' | 'contact'

// ================================
// CARD CONFIGURATION
// ================================

/**
 * Mapeamento de configuração para tamanhos de card para propriedades de título e subtítulo
 */
export const CONFIGS: Record<
  Size,
  { titleLevel: TitleLevel; subtitleSize: Size }
> = {
  pequeno: { titleLevel: 'h5', subtitleSize: 'pequeno' },
  medio: { titleLevel: 'h4', subtitleSize: 'pequeno' },
  grande: { titleLevel: 'h3', subtitleSize: 'medio' }
}

// ================================
// MAIN INTERFACES
// ================================

/**
 * Interface de props para o componente Card
 *
 * @interface CardProps
 * @property {string} title - Texto do título principal do card
 * @property {string} subtitle - Texto do subtítulo opcional do card
 * @property {React.ReactNode} icon - Elemento de ícone opcional
 * @property {React.ReactNode} children - Conteúdo customizado do card (sobrescreve layout padrão)
 * @property {ColorVariant} color - Tema de cor do card
 * @property {ColorVariant} borderColor - Tema de cor da borda do card
 * @property {Size} size - Variante de tamanho do card
 * @property {Align} align - Alinhamento do conteúdo do card
 * @property {boolean} disabled - Desabilitar interação do card
 * @property {boolean} loading - Mostrar estado de carregamento
 * @property {boolean} elevated - Aplicar estilo de sombra elevada
 * @property {boolean} compact - Aplicar espaçamento compacto
 * @property {CardVariant} variant - Variante de layout do card
 * @property {() => void} onClick - Função manipuladora de clique
 * @property {string} className - Classes CSS adicionais
 */
export interface CardProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  color?: ColorVariant
  borderColor?: ColorVariant
  size?: Size
  align?: Align
  disabled?: boolean
  loading?: boolean
  elevated?: boolean
  compact?: boolean
  variant?: CardVariant
  onClick?: () => void
  className?: string
}

/**
 * Interface de props para o componente CardsContainer
 *
 * @interface ContainerProps
 * @property {'grid' | 'list'} type - Tipo de layout do container
 * @property {1 | 2 | 3 | 4 | 5} columns - Número de colunas para layout de grid
 * @property {boolean} compact - Aplicar espaçamento compacto entre cards
 * @property {string} className - Classes CSS adicionais
 * @property {React.ReactNode} children - Componentes de card para exibir
 */
export interface ContainerProps {
  type?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4 | 5
  compact?: boolean
  className?: string
  children: React.ReactNode
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Constrói string de classes CSS para componente Card baseado nas props
 * @param {Partial<CardProps>} props - Propriedades do card
 * @returns {string} String de classes CSS
 */
export const buildClasses = ({
  color = 'primary',
  size = 'medio',
  align = 'start',
  onClick,
  disabled = false,
  loading = false,
  elevated = false,
  compact = false,
  borderColor,
  variant = 'horizontal',
  className = ''
}: Partial<CardProps>): string =>
  [
    'card',
    `card--${color}`,
    `card--${size}`,
    `card--align-${align}`,
    `card--${variant}`,
    onClick && !disabled && 'card--clickable',
    disabled && 'card--disabled',
    loading && 'card--loading',
    elevated && 'card--elevated',
    compact && 'card--compact',
    borderColor && `card--border-${borderColor}`,
    className
  ]
    .filter(Boolean)
    .join(' ')

/**
 * Constrói string de classes CSS para componente CardsContainer baseado nas props
 * @param {Partial<ContainerProps>} props - Propriedades do container
 * @returns {string} String de classes CSS
 */
export const buildContainerClasses = ({
  type = 'grid',
  columns = 2,
  compact = false,
  className = ''
}: Partial<ContainerProps>): string =>
  type === 'list'
    ? [compact ? 'cards-list--compact' : 'cards-list', className]
        .filter(Boolean)
        .join(' ')
    : ['cards-grid', `cards-grid--${columns}`, className]
        .filter(Boolean)
        .join(' ')
