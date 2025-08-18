import React from 'react'
import { ButtonProps } from '@shared/types'

export const Button: React.FC<ButtonProps> = ({
  // Conteúdo
  children,

  // Aparência
  size = 'medio',
  color = 'primary',
  variant = 'solid',

  // Layout
  align = 'start',

  // Funcionalidade
  onClick,
  type = 'button',
  disabled = false,
  loading = false,

  // Elementos adicionais
  icon,

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const isDisabled = disabled || loading
  const hasIcon = Boolean(icon)

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const buttonClasses = [
    // Classe base
    'btn',

    // Aparência
    `btn--${size}`,
    `btn--${variant}-${color}`,

    // Estados
    loading && 'btn--loading',
    hasIcon && 'btn--with-icon',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = ['btn-container', `btn-container--${align}`].join(
    ' '
  )

  // ============================================================================
  // RENDER CONTENT
  // ============================================================================
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="btn__spinner" />
          Carregando...
        </>
      )
    }

    return (
      <>
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </>
    )
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={containerClasses}>
      <button
        type={type}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={buttonClasses}
        id={id}
      >
        {renderContent()}
      </button>
    </div>
  )
}
