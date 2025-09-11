import { ReactNode, ChangeEvent, FocusEvent } from 'react'

// ================================
// FORM SPECIFIC TYPES
// ================================

/**
 * Input and textarea size variants
 */
export type InputSize = 'pequeno' | 'medio' | 'grande'

/**
 * Input and textarea visual variants
 */
export type InputVariant = 'outline' | 'filled' | 'ghost'

/**
 * Textarea resize behavior options
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

/**
 * Contact card display variants
 */
export type ContactCardVariant = 'default' | 'social'

// ================================
// INPUT INTERFACE
// ================================

/**
 * Props interface for the Input component
 *
 * @interface InputProps
 * @property {string} value - Input current value
 * @property {string} placeholder - Placeholder text
 * @property {'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'} type - HTML input type
 * @property {string} name - HTML name attribute
 * @property {InputSize} size - Input size variant
 * @property {InputVariant} variant - Input visual variant
 * @property {boolean} disabled - Disable input interaction
 * @property {boolean} required - Mark input as required
 * @property {boolean} error - Show error state styling
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Value change handler
 * @property {(e: FocusEvent<HTMLInputElement>) => void} onFocus - Focus event handler
 * @property {(e: FocusEvent<HTMLInputElement>) => void} onBlur - Blur event handler
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 */
export interface InputProps {
  // Content
  value?: string
  placeholder?: string

  // Structure
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
  name?: string

  // Appearance
  size?: InputSize
  variant?: InputVariant

  // States
  disabled?: boolean
  required?: boolean
  error?: boolean

  // Functionality
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void

  // HTML attributes
  className?: string
  id?: string
}

// ================================
// TEXTAREA INTERFACE
// ================================

/**
 * Props interface for the Textarea component
 *
 * @interface TextareaProps
 * @property {string} value - Textarea current value
 * @property {string} placeholder - Placeholder text
 * @property {string} name - HTML name attribute
 * @property {number} rows - Number of visible text rows
 * @property {InputSize} size - Textarea size variant
 * @property {InputVariant} variant - Textarea visual variant
 * @property {boolean} disabled - Disable textarea interaction
 * @property {boolean} required - Mark textarea as required
 * @property {boolean} error - Show error state styling
 * @property {TextareaResize} resize - Textarea resize behavior
 * @property {(e: ChangeEvent<HTMLTextAreaElement>) => void} onChange - Value change handler
 * @property {(e: FocusEvent<HTMLTextAreaElement>) => void} onFocus - Focus event handler
 * @property {(e: FocusEvent<HTMLTextAreaElement>) => void} onBlur - Blur event handler
 * @property {string} className - Additional CSS classes
 * @property {string} id - HTML id attribute
 */
export interface TextareaProps {
  // Content
  value?: string
  placeholder?: string

  // Structure
  name?: string
  rows?: number

  // Appearance
  size?: InputSize
  variant?: InputVariant

  // States
  disabled?: boolean
  required?: boolean
  error?: boolean
  resize?: TextareaResize

  // Functionality
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void

  // HTML attributes
  className?: string
  id?: string
}

// ================================
// FORM FIELD INTERFACE
// ================================

/**
 * Props interface for the FormField component
 *
 * @interface FormFieldProps
 * @property {ReactNode} children - Form input element to be wrapped
 * @property {string} label - Label text for the form field
 * @property {string} error - Error message to display
 * @property {boolean} required - Mark field as required with asterisk
 * @property {string} className - Additional CSS classes
 */
export interface FormFieldProps {
  // Content
  children: ReactNode
  label?: string
  error?: string

  // Configuration
  required?: boolean

  // HTML attributes
  className?: string
}

// ================================
// CONTACT CARD INTERFACE
// ================================

/**
 * Props interface for the ContactCard component
 *
 * @interface ContactCardProps
 * @property {ReactNode} icon - Icon element to display
 * @property {string} title - Contact method title
 * @property {string} value - Contact value (email, phone, etc.)
 * @property {string} href - Optional href for clickable contact
 * @property {() => void} onClick - Click handler function
 * @property {ContactCardVariant} variant - Contact card visual variant
 * @property {string} className - Additional CSS classes
 */
export interface ContactCardProps {
  // Content
  icon: ReactNode
  title: string
  value: string

  // Functionality
  href?: string
  onClick?: () => void

  // Appearance
  variant?: ContactCardVariant

  // HTML attributes
  className?: string
}
