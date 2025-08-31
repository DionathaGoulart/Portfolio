import React from 'react'
import { ButtonProps } from '@shared/types'

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

/**
 * Versatile button component with multiple variants, sizes and states
 *
 * @component
 * @param {ButtonProps} props - Button configuration props
 * @returns {React.FC<ButtonProps>} Rendered button component
 *
 * @example
 * <Button size="medio" variant="solid" color="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  // Content
  children,

  // Appearance
  size = 'medio',
  color = 'primary',
  variant = 'solid',

  // Layout
  align = 'start',

  // Functionality
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
  // ============================================================================
  // COMPONENT STATE
  // ============================================================================

  const isDisabled = disabled || loading
  const hasIcon = Boolean(icon)

  // ============================================================================
  // CSS CLASSES
  // ============================================================================

  const getButtonClasses = (): string => {
    const classes = [
      // Base class
      'btn',

      // Appearance
      `btn--${size}`,
      `btn--${variant}-${color}`,

      // States
      loading && 'btn--loading',
      hasIcon && 'btn--with-icon',

      // Custom classes
      className
    ]

    return classes.filter(Boolean).join(' ')
  }

  const getContainerClasses = (): string => {
    return ['btn-container', `btn-container--${align}`].join(' ')
  }

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

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

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleClick = (): void => {
    if (!isDisabled && onClick) {
      onClick()
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

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
