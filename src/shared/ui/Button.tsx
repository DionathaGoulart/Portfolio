import React from 'react'
import {
  ButtonProps,
  getButtonClasses,
  getButtonContainerClasses
} from '@shared/types'

export const Button: React.FC<ButtonProps> = ({
  size = 'medio',
  align = 'start',
  color = 'primary',
  variant = 'solid',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  children,
  className = '',
  icon,
  id
}) => {
  const hasIcon = Boolean(icon)

  const buttonClasses = getButtonClasses(
    size,
    variant,
    color,
    disabled,
    loading,
    hasIcon,
    className
  )

  const containerClasses = getButtonContainerClasses(align)

  return (
    <div className={containerClasses}>
      <button
        type={type}
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
        className={buttonClasses}
        id={id}
      >
        {loading ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            Carregando...
          </>
        ) : (
          <>
            {icon && <span className="icon">{icon}</span>}
            {children}
          </>
        )}
      </button>
    </div>
  )
}
