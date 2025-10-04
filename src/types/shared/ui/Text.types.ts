import { ReactNode } from 'react'
import {
  Size,
  Align,
  ColorVariant,
  Weight,
  Style,
  Shadow
} from '../global'

// ================================
// TEXT SPECIFIC TYPES
// ================================

/**
 * Elementos HTML que podem ser renderizados pelo componente Text
 */
export type TextElement = 'p' | 'span'

/**
 * Variantes de line-height do texto
 */
export type TextLeading = 'tight' | 'normal' | 'relaxed' | 'loose'

/**
 * Variantes de tamanho responsivo do texto para diferentes tamanhos de tela
 */
export type TextResponsiveSize = 'small' | 'medium' | 'large'

/**
 * Posições de borda decorativa para elementos de texto
 */
export type TextBorder = 'none' | 'start' | 'center' | 'end'

/**
 * Número de colunas para layout de texto
 */
export type TextColumns = 1 | 2 | 3 | 4 | 5

/**
 * Tamanho de gap entre colunas de texto
 */
export type TextColumnGap = 'small' | 'medium' | 'large'

/**
 * Posições de âncora de texto para texto flutuante
 */
export type TextAnchor = 'left' | 'right'

// ================================
// MAIN INTERFACE
// ================================

/**
 * Interface de props para o componente Text
 *
 * @interface TextProps
 * @property {ReactNode} children - Conteúdo do texto
 * @property {TextElement} element - Elemento HTML para renderização
 * @property {Size} size - Variante de tamanho do texto
 * @property {Align} align - Alinhamento do texto
 * @property {ColorVariant} color - Variante de cor do texto
 * @property {Weight} weight - Peso da fonte
 * @property {Style} style - Estilo do texto (italic, underline, etc)
 * @property {Shadow} shadow - Variante de sombra do texto
 * @property {TextLeading} leading - Line-height do texto
 * @property {TextResponsiveSize} responsiveSize - Tamanho responsivo
 * @property {TextBorder} border - Posição de borda decorativa
 * @property {TextColumns} columns - Número de colunas
 * @property {TextColumnGap} columnGap - Gap entre colunas
 * @property {TextAnchor} anchor - Posição de âncora
 * @property {boolean} uppercase - Transformar para maiúsculas
 * @property {boolean} gradient - Aplicar gradiente de cor
 * @property {boolean} highlighted - Destaque de fundo
 * @property {boolean} interactive - Habilitar comportamento interativo
 * @property {boolean} disabled - Estado desabilitado
 * @property {() => void} onClick - Manipulador de clique
 * @property {ReactNode} icon - Ícone ao lado do texto
 * @property {string | number} badge - Badge com número ou texto
 * @property {string} className - Classes CSS customizadas
 * @property {string} id - ID do elemento
 *
 * @example
 * <Text
 *   size="grande"
 *   color="primary"
 *   weight="medium"
 *   leading="relaxed"
 * >
 *   Meu texto
 * </Text>
 */
export interface TextProps {
  // Conteúdo
  children: ReactNode

  // Estrutura
  element?: TextElement
  as?: TextElement

  // Aparência
  size?: Size
  align?: Align
  color?: ColorVariant
  weight?: Weight
  style?: Style
  shadow?: Shadow
  leading?: TextLeading
  responsiveSize?: TextResponsiveSize

  // Layout
  border?: TextBorder
  columns?: TextColumns
  columnGap?: TextColumnGap
  anchor?: TextAnchor

  // Modificadores de estilo
  uppercase?: boolean
  gradient?: boolean
  highlighted?: boolean
  truncate?: boolean
  breakWords?: boolean
  highlight?: boolean
  code?: boolean
  responsive?: boolean
  disableAnchorOnMobile?: boolean

  // Interatividade
  interactive?: boolean
  disabled?: boolean
  onClick?: () => void

  // Elementos adicionais
  icon?: ReactNode
  badge?: string | number

  // Atributos HTML
  className?: string
  id?: string
}
