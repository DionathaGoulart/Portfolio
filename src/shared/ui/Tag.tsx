import React from 'react'
import { TagProps, getTagClasses } from '@shared/types'

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'primary',
  size = 'medio',
  variant = 'solid',
  className = '',
  onClick,
  disabled = false,
  icon,
  removable = false,
  onRemove,
  badge,
  interactive = false
}) => {
  const tagClasses = getTagClasses(
    color,
    size,
    variant,
    onClick,
    disabled,
    interactive,
    icon,
    removable,
    className
  )

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Evita trigger do onClick principal
    if (onRemove && !disabled) {
      onRemove()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (onClick || interactive)) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (onClick) onClick()
      }
    }

    if (!disabled && removable && onRemove) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        onRemove()
      }
    }
  }

  return (
    <span
      className={`${tagClasses} ${badge ? 'tag-with-badge' : ''}`}
      onClick={onClick || interactive ? handleClick : undefined}
      onKeyDown={
        onClick || interactive || removable ? handleKeyDown : undefined
      }
      tabIndex={(onClick || interactive) && !disabled ? 0 : undefined}
      role={onClick || interactive ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {/* Ícone */}
      {icon && <span className="icon">{icon}</span>}

      {/* Conteúdo */}
      {children}

      {/* Botão de remoção */}
      {removable && onRemove && (
        <button
          type="button"
          className="remove-btn"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remover tag"
        >
          <span className="icon">×</span>
        </button>
      )}

      {/* Badge */}
      {badge && <span className="badge">{badge}</span>}
    </span>
  )
}
