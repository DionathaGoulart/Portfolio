import React from 'react'
import {
  TagProps,
  TagGroupProps,
  StatusTagProps,
  buildTagClasses,
  buildTagGroupClasses,
  buildStatusTagClasses
} from '@shared/types'

// ============================================================================
// MAIN TAG COMPONENT
// ============================================================================

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'primary',
  size = 'medio',
  variant = 'solid',
  className = '',
  onClick,
  interactive = false,
  disabled = false,
  icon,
  removable = false,
  onRemove,
  badge
}) => {
  const tagClasses = buildTagClasses({
    color,
    size,
    variant,
    onClick,
    interactive,
    disabled,
    icon,
    removable,
    badge,
    className
  })

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

  const isInteractive = onClick || interactive
  const needsKeyHandler = isInteractive || removable

  return (
    <span
      className={tagClasses}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={needsKeyHandler ? handleKeyDown : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {/* Ícone */}
      {icon && <span className="tag--with-icon__icon">{icon}</span>}

      {/* Conteúdo */}
      {children}

      {/* Botão de remoção */}
      {removable && onRemove && (
        <button
          type="button"
          className="tag--removable__remove-btn"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remover tag"
        >
          <span className="tag--removable__remove-btn-icon">×</span>
        </button>
      )}

      {/* Badge */}
      {badge && <span className="tag--with-badge__badge">{badge}</span>}
    </span>
  )
}

// ============================================================================
// TAG GROUP COMPONENT
// ============================================================================

export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  compact = false,
  className = ''
}) => {
  const groupClasses = buildTagGroupClasses({ compact, className })

  return <div className={groupClasses}>{children}</div>
}

// ============================================================================
// STATUS TAG COMPONENT
// ============================================================================

export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  children,
  className = ''
}) => {
  const statusClasses = buildStatusTagClasses({ status, className })

  return <span className={statusClasses}>{children}</span>
}
