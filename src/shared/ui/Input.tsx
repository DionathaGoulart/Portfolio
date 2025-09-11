import React from 'react'
import { InputProps } from '@shared/types'
import '@styles/ui/form.scss'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Builds CSS classes for Input component based on props
 */
const buildInputClasses = (
  size: string,
  variant: string,
  disabled: boolean,
  error: boolean,
  className: string
): string => {
  const classes = [
    'input',
    `input--${size}`,
    `input--${variant}`,
    disabled && 'input--disabled',
    error && 'input--error',
    className
  ]

  return classes.filter(Boolean).join(' ')
}

// ================================
// INPUT COMPONENT
// ================================

/**
 * Reusable Input component with multiple sizes, variants and states
 * Supports various input types and interactive states
 *
 * @component Input
 * @param {InputProps} props - Input configuration props
 * @returns {React.FC<InputProps>} Rendered input component
 *
 * @example
 * <Input
 *   type="email"
 *   size="medio"
 *   variant="outline"
 *   placeholder="Enter your email"
 *   onChange={handleChange}
 *   error={!!errors.email}
 * />
 */
export const Input: React.FC<InputProps> = ({
  // Content
  value,
  placeholder,

  // Structure
  type = 'text',
  name,

  // Appearance
  size = 'medio',
  variant = 'outline',

  // States
  disabled = false,
  required = false,
  error = false,

  // Functionality
  onChange,
  onFocus,
  onBlur,

  // HTML attributes
  className = '',
  id
}) => {
  // ================================
  // CSS CLASS GENERATORS
  // ================================

  const inputClasses = buildInputClasses(
    size,
    variant,
    disabled,
    error,
    className
  )

  // ================================
  // RENDER
  // ================================

  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={inputClasses}
      id={id}
    />
  )
}
