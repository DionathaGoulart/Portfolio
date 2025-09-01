import React from 'react'
import { TitleProps } from '@shared/types'

import '@styles/ui/title.scss'

// ============================================================================
// TITLE COMPONENT
// ============================================================================

/**
 * Componente de título flexível com múltiplas variantes e estilos
 *
 * @component
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
  border = 'none',

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
  // ================================
  // CONFIGURAÇÃO
  // ================================

  const Element = element || level
  const isInteractive = Boolean(onClick || interactive)

  // ================================
  // CLASSES CSS
  // ================================

  const buildClasses = (): string => {
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

      // Border decorativa
      border !== 'none' && `title--border-${border}`,

      // Layout
      icon && 'title--with-icon',
      badge && 'title--with-badge',

      // Classes customizadas
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

    // Ícone + Badge
    if (hasIcon && hasBadge) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    // Apenas ícone
    if (hasIcon) {
      return (
        <>
          <span className="title__icon">{icon}</span>
          {children}
        </>
      )
    }

    // Apenas badge
    if (hasBadge) {
      return (
        <>
          {children}
          <span className="title__badge">{badge}</span>
        </>
      )
    }

    // Apenas conteúdo
    return children
  }

  // ================================
  // ACCESSIBILITY ATTRIBUTES
  // ================================

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
