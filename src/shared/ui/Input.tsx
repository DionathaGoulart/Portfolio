import React from 'react'
import { InputProps } from '@shared/types/ui/Form.types'

import '@styles/ui/expcard.scss'

// ============================================================================
// HELPERS PRIVADOS
// ============================================================================

/**
 * Constrói as classes CSS para o componente Input
 * @param size - Tamanho do input
 * @param variant - Variante visual do input
 * @param disabled - Estado de desabilitado
 * @param error - Estado de erro
 * @param className - Classes CSS customizadas
 * @returns String com todas as classes concatenadas
 */
const buildInputClasses = (
  size: string,
  variant: string,
  disabled: boolean,
  error: boolean,
  className: string
): string => {
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

  return classes.filter(Boolean).join(' ')
}

// ============================================================================
// INPUT COMPONENT
// ============================================================================

/**
 * Componente Input reutilizável
 * Suporta diferentes tamanhos, variantes visuais e estados
 *
 * @param value - Valor atual do input
 * @param placeholder - Texto de placeholder
 * @param type - Tipo do input HTML
 * @param name - Nome do campo
 * @param size - Tamanho do input (pequeno, medio, grande)
 * @param variant - Variante visual (outline, filled, ghost)
 * @param disabled - Estado de desabilitado
 * @param required - Campo obrigatório
 * @param error - Estado de erro
 * @param onChange - Callback de mudança
 * @param onFocus - Callback de foco
 * @param onBlur - Callback de perda de foco
 * @param className - Classes CSS customizadas
 * @param id - ID do elemento
 */
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

  const inputClasses = buildInputClasses(
    size,
    variant,
    disabled,
    error,
    className
  )

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
      className={inputClasses}
      id={id}
    />
  )
}
