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
export type TextBorder = 'none' | 'start' | 'center' | 'end'

// ============================================================================
// TYPES PARA LAYOUT DE COLUNAS E ESPECIAIS
// ============================================================================
export type ImageResource = string | Record<string, string>

export interface TextColumnImage {
  src: ImageResource
  alt: string
  className?: string
  onClick?: () => void
}

export type TextLayoutType =
  | 'columns'
  | 'sidebar'
  | 'overlay'
  | 'floating'
  | 'magazine'

export interface TextColumnConfig {
  enabled: boolean
  layoutType?: TextLayoutType
  image?: TextColumnImage
  columns?: 2 | 3 | 4
  imagePosition?: 'center' | 'top' | 'bottom'
  gap?: 'small' | 'medium' | 'large'
  // Opção específica para layout sidebar
  sidebarColumns?: 1 | 2 | 3
}

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
  border?: TextBorder
  // Responsividade
  responsive?: TextResponsiveSize
  // Layout de colunas e especiais
  columnLayout?: TextColumnConfig
  // HTML attributes
  className?: string
  id?: string
}
