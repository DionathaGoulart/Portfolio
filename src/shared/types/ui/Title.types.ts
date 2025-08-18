import { ReactNode } from 'react'
import { Align, ColorVariant, Shadow, Style, Weight } from './global.types'

// ============================================================================
// TYPES BASE
// ============================================================================
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export type TitleElement = TitleLevel | 'div' | 'span' | 'p'
export type TitleVariant = 'hero' | 'display' | 'section' | 'subsection'

// ============================================================================
// INTERFACE PRINCIPAL
// ============================================================================
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

  // Interatividade
  interactive?: boolean
  disabled?: boolean
  onClick?: () => void

  // Elementos adicionais
  icon?: ReactNode
  badge?: string | number

  // HTML attributes
  className?: string
  id?: string
}
