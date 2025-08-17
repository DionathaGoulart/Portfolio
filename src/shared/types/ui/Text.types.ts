import { Align, Size, ThemeColor } from './global.types'

// ============================================================================
// TYPES ESPECÍFICOS DO TEXT
// ============================================================================

export type TextElement = 'p' | 'span'

export interface TextProps {
  as?: TextElement
  size?: Size
  align?: Align
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
}
