import React from 'react'
import {
  TagProps,
  TagGroupProps,
  StatusTagProps,
  buildTagClasses,
  buildTagGroupClasses,
  buildStatusTagClasses
} from '@shared/types'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Verifica se uma tecla é de ativação (Enter ou Space)
 */
const isActivationKey = (key: string): boolean => {
  return key === 'Enter' || key === ' '
}

/**
 * Verifica se uma tecla é de remoção (Delete ou Backspace)
 */
const isRemovalKey = (key: string): boolean => {
  return key === 'Delete' || key === 'Backspace'
}

// ================================
// MAIN TAG COMPONENT
// ================================

/**
 * Componente Tag principal com suporte a ícones, badges e remoção
 */
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
    if (disabled) return
    if (onClick) onClick()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    if (onRemove) onRemove()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    // Ativação do tag
    if ((onClick || interactive) && isActivationKey(e.key)) {
      e.preventDefault()
      if (onClick) onClick()
    }

    // Remoção do tag
    if (removable && onRemove && isRemovalKey(e.key)) {
      e.preventDefault()
      onRemove()
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
      {/* Icon */}
      {icon && <span className="tag--with-icon__icon">{icon}</span>}

      {/* Content */}
      {children}

      {/* Remove Button */}
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

// ================================
// TAG GROUP COMPONENT
// ================================

/**
 * Componente para agrupar múltiplos Tags
 */
export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  compact = false,
  className = ''
}) => {
  const groupClasses = buildTagGroupClasses({ compact, className })

  return <div className={groupClasses}>{children}</div>
}

// ================================
// STATUS TAG COMPONENT
// ================================

/**
 * Componente Tag especializado para indicação de status
 */
export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  children,
  className = ''
}) => {
  const statusClasses = buildStatusTagClasses({ status, className })

  return <span className={statusClasses}>{children}</span>
}
