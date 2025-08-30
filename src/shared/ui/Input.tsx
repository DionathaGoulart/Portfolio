import React from 'react'
import { InputProps } from '@shared/types/ui/Form.types'

export const Input: React.FC<InputProps> = ({
  // Conteúdo
  value,
  placeholder,
  // Estrutura
  type = 'text',
  name,
  // Aparência
  size = 'medio',
  variant = 'outline',
  // Estados
  disabled = false,
  required = false,
  error = false,
  // Funcionalidade
  onChange,
  onFocus,
  onBlur,
  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'input',
    // Aparência
    `input--${size}`,
    `input--${variant}`,
    // Estados
    disabled && 'input--disabled',
    error && 'input--error',
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // RENDER
  // ============================================================================
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
      className={classes}
      id={id}
    />
  )
}
