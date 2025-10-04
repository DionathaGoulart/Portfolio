import { ReactNode } from 'react'
import { Align, ColorVariant, Shadow, Style, Weight } from '../global'

// ================================
// TITLE SPECIFIC TYPES
// ================================

/**
 * Níveis semânticos de título (h1-h6)
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * Elementos HTML permitidos para renderização
 */
export type TitleElement = TitleLevel | 'div' | 'span' | 'p'

/**
 * Variantes de tamanho especiais para diferentes contextos
 */
export type TitleVariant = 'hero' | 'display' | 'section' | 'subsection'

/**
 * Opções de posição de borda decorativa
 */
export type TitleBorder =
  | 'none'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

// ================================
// MAIN INTERFACE
// ================================

/**
 * Interface de props para o componente Title
 *
 * @interface TitleProps
 * @property {ReactNode} children - Conteúdo do título
 * @property {TitleLevel} level - Nível semântico (h1-h6)
 * @property {TitleElement} element - Elemento HTML para renderização
 * @property {Align} align - Alinhamento do texto
 * @property {ColorVariant} color - Variante de cor
 * @property {Weight} weight - Peso da fonte
 * @property {TitleVariant} variant - Variante de tamanho especial
 * @property {boolean} uppercase - Transformar para maiúsculas
 * @property {Style} style - Estilo do texto (italic, underline, etc)
 * @property {boolean} gradient - Aplicar gradiente de cor
 * @property {Shadow} shadow - Variante de sombra do texto
 * @property {boolean} underlined - Sublinhado decorativo
 * @property {boolean} highlighted - Destaque de fundo
 * @property {TitleBorder} border - Posição de borda decorativa
 * @property {boolean} interactive - Habilitar comportamento interativo
 * @property {boolean} disabled - Estado desabilitado
 * @property {() => void} onClick - Manipulador de clique
 * @property {ReactNode} icon - Ícone ao lado do título
 * @property {string | number} badge - Badge com número ou texto
 * @property {string} className - Classes CSS customizadas
 * @property {string} id - ID do elemento
 *
 * @example
 * <Title
 *   level="h1"
 *   color="primary"
 *   weight="bold"
 *   border="bottom-start"
 * >
 *   Meu Título
 * </Title>
 */
export interface TitleProps {
  // Conteúdo
  children: ReactNode

  // Estrutura
  level?: TitleLevel
  element?: TitleElement

  // Aparência
  align?: Align
  color?: ColorVariant
  weight?: Weight
  variant?: TitleVariant

  // Modificadores de estilo
  uppercase?: boolean
  style?: Style
  gradient?: boolean
  shadow?: Shadow
  underlined?: boolean
  highlighted?: boolean
  border?: TitleBorder

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
