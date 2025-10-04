import React from 'react'
import {
  TagProps,
  TagGroupProps,
  StatusTagProps,
  buildTagClasses,
  buildTagGroupClasses,
  buildStatusTagClasses
} from '@types'
import '@styles/ui/tag.scss'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Checks if key is an activation key (Enter or Space)
 */
const isActivationKey = (key: string): boolean => {
  return key === 'Enter' || key === ' '
}

/**
 * Checks if key is a removal key (Delete or Backspace)
 */
const isRemovalKey = (key: string): boolean => {
  return key === 'Delete' || key === 'Backspace'
}

// ================================
// MAIN TAG COMPONENT
// ================================

/**
 * Versatile tag component with support for icons, badges, removal and interactions
 *
 * @component Tag
 * @param {TagProps} props - Tag configuration props
 * @returns {React.FC<TagProps>} Rendered tag component
 *
 * @example
 * <Tag
 *   color="primary"
 *   size="medio"
 *   variant="solid"
 *   removable
 *   onRemove={handleRemove}
 *   icon={<Icon />}
 * >
 *   Tag Content
 * </Tag>
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
  // ================================
  // DERIVED VALUES
  // ================================

  const isInteractive = onClick || interactive
  const needsKeyHandler = isInteractive || removable

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

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleClick = (e: React.MouseEvent): void => {
    if (disabled) return
    if (onClick) onClick()
  }

  const handleRemove = (e: React.MouseEvent): void => {
    e.stopPropagation()
    if (disabled) return
    if (onRemove) onRemove()
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (disabled) return

    // Tag activation
    if ((onClick || interactive) && isActivationKey(e.key)) {
      e.preventDefault()
      if (onClick) onClick()
    }

    // Tag removal
    if (removable && onRemove && isRemovalKey(e.key)) {
      e.preventDefault()
      onRemove()
    }
  }

  // ================================
  // RENDER
  // ================================

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
 * Container component for grouping multiple tags with layout options
 *
 * @component TagGroup
 * @param {TagGroupProps} props - TagGroup configuration props
 * @returns {React.FC<TagGroupProps>} Rendered tag group component
 *
 * @example
 * <TagGroup compact>
 *   <Tag>Tag 1</Tag>
 *   <Tag>Tag 2</Tag>
 * </TagGroup>
 */
export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  compact = false,
  className = ''
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const groupClasses = buildTagGroupClasses({ compact, className })

  // ================================
  // RENDER
  // ================================

  return <div className={groupClasses}>{children}</div>
}

// ================================
// STATUS TAG COMPONENT
// ================================

/**
 * Specialized tag component for status indication with predefined styling
 *
 * @component StatusTag
 * @param {StatusTagProps} props - StatusTag configuration props
 * @returns {React.FC<StatusTagProps>} Rendered status tag component
 *
 * @example
 * <StatusTag status="online">
 *   Active
 * </StatusTag>
 */
export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  children,
  className = ''
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const statusClasses = buildStatusTagClasses({ status, className })

  // ================================
  // RENDER
  // ================================

  return <span className={statusClasses}>{children}</span>
}
