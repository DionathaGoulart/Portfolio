import React from 'react'
import { TitleProps } from '@types'
import '@styles/ui/title.scss'

// ================================
// TITLE COMPONENT
// ================================

/**
 * Componente de título flexível com múltiplas variantes e opções de estilo
 * Suporta diferentes níveis de cabeçalho, cores, pesos, bordas e elementos interativos
 *
 * @param {TitleProps} props - Propriedades de configuração do título
 * @returns {JSX.Element} Componente de título renderizado
 *
 * @example
 * ```tsx
 * <Title
 *   level="h1"
 *   color="primary"
 *   weight="bold"
 *   border="bottom-start"
 *   icon={<IconStar />}
 * >
 *   Título Principal
 * </Title>
 * ```
 */
export const Title: React.FC<TitleProps> = ({
  // Content
  children,

  // Structure
  level = 'h1',
  element,

  // Appearance
  align = 'start',
  color = 'text',
  weight = 'bold',
  variant,

  // Modifiers
  uppercase = false,
  style,
  gradient = false,
  shadow,
  underlined = false,
  highlighted = false,
  border = 'none',

  // Interactivity
  interactive = false,
  disabled = false,
  onClick,

  // Additional elements
  icon,
  badge,

  // HTML attributes
  className = '',
  id
}) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const Element = element || level
  const isInteractive = Boolean(onClick || interactive)

  // ================================
  // CSS CLASS GENERATORS
  // ================================

  const buildClasses = (): string => {
    const classes = [
      'title',
      variant ? `title--${variant}` : `title--${level}`,
      `title--${color}`,
      `title--${weight}`,
      `title--${align}`,
      isInteractive && 'title--interactive',
      disabled && 'title--disabled',
      uppercase && 'title--uppercase',
      style && `title--${style}`,
      gradient && 'title--gradient',
      shadow === true && 'title--shadow',
      shadow === 'strong' && 'title--shadow-strong',
      underlined && 'title--underlined',
      highlighted && 'title--highlighted',
      border !== 'none' && `title--border-${border}`,
      icon && 'title--with-icon',
      badge && 'title--with-badge',
      className
    ]

    return classes.filter(Boolean).join(' ')
  }

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleClick = (e: React.MouseEvent): void => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (!disabled && (onClick || interactive)) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (onClick) onClick()
      }
    }
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderContent = (): React.ReactNode => {
    const hasIcon = Boolean(icon)
    const hasBadge = Boolean(badge)

    // Icon + Badge
    if (hasIcon && hasBadge) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    // Icon only
    if (hasIcon) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
        </>
      )
    }

    // Badge only
    if (hasBadge) {
      return (
        <>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    // Content only
    return children
  }

  const getAccessibilityProps = () => ({
    tabIndex: isInteractive && !disabled ? 0 : undefined,
    role: isInteractive ? 'button' : undefined,
    'aria-disabled': disabled || undefined
  })

  // ================================
  // RENDER
  // ================================

  return (
    <Element
      className={buildClasses()}
      id={id}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...getAccessibilityProps()}
    >
      {renderContent()}
    </Element>
  )
}
