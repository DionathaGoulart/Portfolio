import React from 'react'
import { FormFieldProps } from '@shared/types'
import '@styles/ui/form.scss'

// ============================================================================
// HELPERS PRIVADOS
// ============================================================================

/**
 * Gera classes CSS para o container do FormField
 */
const buildContainerClasses = (error?: string, className?: string): string => {
  const classes = ['form-field', error && 'form-field--error', className]

  return classes.filter(Boolean).join(' ')
}

// ============================================================================
// FORM FIELD COMPONENT
// ============================================================================

/**
 * Componente FormField para estruturação de campos de formulário
 * @param children - Elemento input/textarea a ser envolvido
 * @param label - Texto do label
 * @param error - Mensagem de erro
 * @param required - Define se o campo é obrigatório
 * @param className - Classes CSS customizadas
 */
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

  const containerClasses = buildContainerClasses(error, className)

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
