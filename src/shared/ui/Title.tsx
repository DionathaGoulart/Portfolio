import React from 'react'
import { TitleProps } from '@shared/types'

export const Title: React.FC<TitleProps> = ({
  // Conteúdo
  children,

  // Estrutura
  level = 'h1',
  element,

  // Aparência
  align = 'start',
  color = 'text',
  weight = 'bold',
  variant,

  // Modificadores
  uppercase = false,
  style,
  gradient = false,
  shadow,
  underlined = false,
  highlighted = false,

  // Interatividade
  interactive = false,
  disabled = false,
  onClick,

  // Elementos adicionais
  icon,
  badge,

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const Element = element || level
  const isInteractive = Boolean(onClick || interactive)

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'title',

    // Tamanho (nível ou variante)
    variant ? `title--${variant}` : `title--${level}`,

    // Aparência
    `title--${color}`,
    `title--${weight}`,
    `title--${align}`,

    // Estados
    isInteractive && 'title--interactive',
    disabled && 'title--disabled',

    // Modificadores
    uppercase && 'title--uppercase',
    style && `title--${style}`,
    gradient && 'title--gradient',
    shadow === true && 'title--shadow',
    shadow === 'strong' && 'title--shadow-strong',
    underlined && 'title--underlined',
    highlighted && 'title--highlighted',

    // Layout
    icon && 'title--with-icon',
    badge && 'title--with-badge',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (onClick || interactive)) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (onClick) onClick()
      }
    }
  }

  // ============================================================================
  // RENDER CONTENT
  // ============================================================================
  const renderContent = () => {
    if (icon && badge) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    if (icon) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
        </>
      )
    }

    if (badge) {
      return (
        <>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    return children
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <Element
      className={classes}
      id={id}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      aria-disabled={disabled || undefined}
    >
      {renderContent()}
    </Element>
  )
}
