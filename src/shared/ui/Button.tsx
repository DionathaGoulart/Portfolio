import React from 'react'
import { ButtonProps } from '@shared/types'

import '@styles/ui/button.scss'

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

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
  // ============================================================================
  // COMPONENT STATE & DERIVED VALUES
  // ============================================================================

  const isDisabled = disabled || loading
  const hasIcon = Boolean(icon)

  // ============================================================================
  // CSS CLASS GENERATORS
  // ============================================================================

  /**
   * Generates button CSS classes based on props
   */
  const getButtonClasses = (): string => {
    const classes = [
      // Base BEM class
      'btn',

      // Size modifier
      `btn--${size}`,

      // Variant and color modifier
      `btn--${variant}-${color}`,

      // State modifiers
      loading && 'btn--loading',
      hasIcon && 'btn--with-icon',

      // Custom classes
      className
    ]

    return classes.filter(Boolean).join(' ')
  }

  /**
   * Generates container CSS classes for alignment
   */
  const getContainerClasses = (): string => {
    return ['btn-container', `btn-container--${align}`].join(' ')
  }

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Renders button content based on loading state
   */
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

  /**
   * Handles button click events with disabled state check
   */
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
