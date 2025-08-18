import { ReactNode } from 'react'
import { Align, ColorVariant, Size } from './global.types'

// ============================================================================
// TYPES BASE
// ============================================================================

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonType = 'button' | 'submit' | 'reset'

// ============================================================================
// INTERFACE PRINCIPAL
// ============================================================================
export interface ButtonProps {
  // Conteúdo
  children: ReactNode

  // Aparência
  size?: Size
  color?: ColorVariant
  variant?: ButtonVariant

  // Layout
  align?: Align

  // Funcionalidade
  onClick?: () => void
  type?: ButtonType
  disabled?: boolean
  loading?: boolean

  // Elementos adicionais
  icon?: ReactNode

  // HTML attributes
  className?: string
  id?: string
}
