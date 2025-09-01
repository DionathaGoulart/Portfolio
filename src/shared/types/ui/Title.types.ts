import { ReactNode } from 'react'
import { Align, ColorVariant, Shadow, Style, Weight } from './global.types'

// ============================================================================
// BASE TYPES
// ============================================================================

/**
 * Níveis semânticos de título (h1-h6)
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * Elementos HTML permitidos para renderização
 */
export type TitleElement = TitleLevel | 'div' | 'span' | 'p'

/**
 * Variantes especiais de tamanho
 */
export type TitleVariant = 'hero' | 'display' | 'section' | 'subsection'

/**
 * Opções de bordas decorativas
 */
export type TitleBorder =
  | 'none'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

// ============================================================================
// MAIN INTERFACE
// ============================================================================

/**
 * Props do componente Title
 *
 * @interface TitleProps
 * @example
 * ```tsx
 * <Title
 *   level="h1"
 *   color="primary"
 *   weight="bold"
 *   border="bottom-start"
 * >
 *   Meu Título
 * </Title>
 * ```
 */
export interface TitleProps {
  // ================================
  // CONTEÚDO
  // ================================

  /** Conteúdo do título */
  children: ReactNode

  // ================================
  // ESTRUTURA
  // ================================

  /** Nível semântico (h1-h6) */
  level?: TitleLevel

  /** Elemento HTML para renderização */
  element?: TitleElement

  // ================================
  // APARÊNCIA
  // ================================

  /** Alinhamento do texto */
  align?: Align

  /** Variante de cor */
  color?: ColorVariant

  /** Peso da fonte */
  weight?: Weight

  /** Variante especial de tamanho */
  variant?: TitleVariant

  // ================================
  // MODIFICADORES DE ESTILO
  // ================================

  /** Transformar em maiúsculas */
  uppercase?: boolean

  /** Estilo de texto (italic, underline, etc) */
  style?: Style

  /** Aplicar gradiente de cor */
  gradient?: boolean

  /** Sombra no texto */
  shadow?: Shadow

  /** Linha decorativa embaixo */
  underlined?: boolean

  /** Fundo destacado */
  highlighted?: boolean

  /** Borda decorativa */
  border?: TitleBorder

  // ================================
  // INTERATIVIDADE
  // ================================

  /** Habilitar comportamento interativo */
  interactive?: boolean

  /** Estado desabilitado */
  disabled?: boolean

  /** Handler de clique */
  onClick?: () => void

  // ================================
  // ELEMENTOS ADICIONAIS
  // ================================

  /** Ícone ao lado do título */
  icon?: ReactNode

  /** Badge com número ou texto */
  badge?: string | number

  // ================================
  // HTML ATTRIBUTES
  // ================================

  /** Classes CSS customizadas */
  className?: string

  /** ID do elemento */
  id?: string
}
