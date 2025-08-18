import { ReactNode } from 'react'
import {
  Size,
  Align,
  ColorVariant,
  Weight,
  Style,
  Shadow
} from './global.types'

// ============================================================================
// TYPES BASE
// ============================================================================
export type TextElement = 'p' | 'span'
export type TextLeading = 'tight' | 'normal' | 'relaxed' | 'loose'
export type TextResponsiveSize = 'small' | 'medium' | 'large'

// ============================================================================
// INTERFACE PRINCIPAL
// ============================================================================
export interface TextProps {
  // Conteúdo
  children: ReactNode

  // Estrutura
  as?: TextElement

  // Aparência
  size?: Size
  align?: Align
  color?: ColorVariant
  weight?: Weight

  // Modificadores de estilo
  style?: Style
  leading?: TextLeading

  // Comportamentos de texto
  truncate?: boolean
  breakWords?: boolean

  // Modificadores visuais
  highlight?: boolean
  code?: boolean
  gradient?: boolean
  shadow?: Shadow

  // Responsividade
  responsive?: TextResponsiveSize

  // Interatividade
  interactive?: boolean
  disabled?: boolean
  onClick?: () => void

  // HTML attributes
  className?: string
  id?: string
}
