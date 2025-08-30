import { ReactNode, ChangeEvent, FocusEvent } from 'react'

// ============================================================================
// TYPES BASE PARA FORMULÁRIOS
// ============================================================================
export type InputSize = 'pequeno' | 'medio' | 'grande'
export type InputVariant = 'outline' | 'filled' | 'ghost'
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'
export type ContactCardVariant = 'default' | 'social'

// ============================================================================
// INPUT PROPS
// ============================================================================
export interface InputProps {
  // Conteúdo
  value?: string
  placeholder?: string
  // Estrutura
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
  name?: string
  // Aparência
  size?: InputSize
  variant?: InputVariant
  // Estados
  disabled?: boolean
  required?: boolean
  error?: boolean
  // Funcionalidade
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  // HTML attributes
  className?: string
  id?: string
}

// ============================================================================
// TEXTAREA PROPS
// ============================================================================
export interface TextareaProps {
  // Conteúdo
  value?: string
  placeholder?: string
  // Estrutura
  name?: string
  rows?: number
  // Aparência
  size?: InputSize
  variant?: InputVariant
  // Estados
  disabled?: boolean
  required?: boolean
  error?: boolean
  resize?: TextareaResize
  // Funcionalidade
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  // HTML attributes
  className?: string
  id?: string
}

// ============================================================================
// FORM FIELD PROPS
// ============================================================================
export interface FormFieldProps {
  // Conteúdo
  children: ReactNode
  label?: string
  error?: string
  // Configuração
  required?: boolean
  // HTML attributes
  className?: string
}

// ============================================================================
// CONTACT CARD PROPS
// ============================================================================
export interface ContactCardProps {
  // Conteúdo
  icon: ReactNode
  title: string
  value: string
  // Funcionalidade
  href?: string
  onClick?: () => void
  // Aparência
  variant?: ContactCardVariant
  // HTML attributes
  className?: string
}
