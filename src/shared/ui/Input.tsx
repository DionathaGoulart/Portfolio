import React from 'react'
import { InputProps } from '@types'
import '@styles/ui/form.scss'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Constrói classes CSS para o componente Input baseado nas propriedades
 * @param {string} size - Tamanho do input
 * @param {string} variant - Variante do input
 * @param {boolean} disabled - Se o input está desabilitado
 * @param {boolean} error - Se o input tem erro
 * @param {string} className - Classes CSS adicionais
 * @returns {string} String de classes CSS
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
 * Componente de input reutilizável com múltiplos tamanhos, variantes e estados
 * Suporta vários tipos de input e estados interativos
 *
 * @param {InputProps} props - Propriedades de configuração do input
 * @returns {JSX.Element} Componente de input renderizado
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   size="medio"
 *   variant="outline"
 *   placeholder="Digite seu email"
 *   onChange={handleChange}
 *   error={!!errors.email}
 * />
 * ```
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
