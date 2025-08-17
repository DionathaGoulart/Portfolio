import {
  Align,
  ThemeColor,
  TitleLevel,
  ElementType,
  FontWeight
} from './global.types'

// ============================================================================
// TYPES ESPECÍFICOS DO TITLE
// ============================================================================

export interface TitleProps {
  level?: TitleLevel
  element?: ElementType
  align?: Align
  color?: ThemeColor
  children: React.ReactNode
  className?: string
  id?: string
  uppercase?: boolean
  weight?: FontWeight
}
