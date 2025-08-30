import React from 'react'
import { FormFieldProps } from '@shared/types/ui/Form.types'

export const FormField: React.FC<FormFieldProps> = ({
  // Conteúdo
  children,
  label,
  error,
  // Configuração
  required = false,
  // HTML attributes
  className = ''
}) => {
  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const containerClasses = [
    // Classe base
    'form-field',
    // Estado de erro
    error && 'form-field--error',
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={containerClasses}>
      {label && (
        <label className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}

      <div className="form-field__input">{children}</div>

      {error && <span className="form-field__error">{error}</span>}
    </div>
  )
}
