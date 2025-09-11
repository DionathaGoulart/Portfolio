import React from 'react'
import { ButtonProps } from '@shared/types'
import '@styles/ui/button.scss'

// ================================
// BUTTON COMPONENT
// ================================

/**
 * Versatile button component with multiple variants, sizes and states
 *
 * @component Button
 * @param {ButtonProps} props - Button configuration props
 * @returns {React.FC<ButtonProps>} Rendered button component
 *
 * @example
 * <Button size="medio" variant="solid" color="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  // Content properties
  children,

  // Appearance properties
  size = 'medio',
  color = 'primary',
  variant = 'solid',

  // Layout properties
  align = 'start',

  // Functionality properties
  onClick,
  type = 'button',
  disabled = false,
  loading = false,

  // Additional elements
  icon,

  // HTML attributes
  className = '',
  id
}) => {
  // ================================
  // COMPONENT STATE & DERIVED VALUES
  // ================================

  const isDisabled = disabled || loading
  const hasIcon = Boolean(icon)

  // ================================
  // CSS CLASS GENERATORS
  // ================================

  const getButtonClasses = (): string => {
    const classes = [
      'btn',
      `btn--${size}`,
      `btn--${variant}-${color}`,
      loading && 'btn--loading',
      hasIcon && 'btn--with-icon',
      className
    ]

    return classes.filter(Boolean).join(' ')
  }

  const getContainerClasses = (): string => {
    return ['btn-container', `btn-container--${align}`].join(' ')
  }

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleClick = (): void => {
    if (!isDisabled && onClick) {
      onClick()
    }
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderContent = (): React.ReactNode => {
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

  // ================================
  // RENDER
  // ================================

  return (
    <div className={getContainerClasses()}>
      <button
        type={type}
        onClick={handleClick}
        disabled={isDisabled}
        className={getButtonClasses()}
        id={id}
      >
        {renderContent()}
      </button>
    </div>
  )
}
