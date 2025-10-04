import React from 'react'
import { FormFieldProps } from '@types'
import '@styles/ui/form.scss'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Generates CSS classes for FormField container
 */
const buildContainerClasses = (error?: string, className?: string): string => {
  const classes = ['form-field', error && 'form-field--error', className]

  return classes.filter(Boolean).join(' ')
}

// ================================
// FORM FIELD COMPONENT
// ================================

/**
 * FormField component for structuring form input elements with label and error handling
 *
 * @component FormField
 * @param {FormFieldProps} props - FormField configuration props
 * @returns {React.FC<FormFieldProps>} Rendered form field component
 *
 * @example
 * <FormField label="Email" error={errors.email} required>
 *   <Input type="email" value={email} onChange={handleEmailChange} />
 * </FormField>
 */
export const FormField: React.FC<FormFieldProps> = ({
  // Content
  children,
  label,
  error,

  // Configuration
  required = false,

  // HTML attributes
  className = ''
}) => {
  // ================================
  // CSS CLASS GENERATORS
  // ================================

  const containerClasses = buildContainerClasses(error, className)

  // ================================
  // RENDER
  // ================================

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
