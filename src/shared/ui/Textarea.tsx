import React from 'react'
import { TextareaProps } from '@shared/types/ui/Form.types'

export const Textarea: React.FC<TextareaProps> = ({
  // Conteúdo
  value,
  placeholder,
  // Estrutura
  name,
  rows = 4,
  // Aparência
  size = 'medio',
  variant = 'outline',
  // Estados
  disabled = false,
  required = false,
  error = false,
  resize = 'vertical',
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
    'textarea',
    // Aparência
    `textarea--${size}`,
    `textarea--${variant}`,
    // Estados
    disabled && 'textarea--disabled',
    error && 'textarea--error',
    // Resize
    `textarea--resize-${resize}`,
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows={rows}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={classes}
      id={id}
    />
  )
}
