import React from 'react'
import { TextProps } from '@shared/types'

export const Text: React.FC<TextProps> = ({
  // Conteúdo
  children,

  // Estrutura
  as = 'p',

  // Aparência
  size = 'medio',
  align = 'start',
  color = 'text',
  weight,

  // Modificadores de estilo
  style,
  leading,

  // Comportamentos
  truncate = false,
  breakWords = false,

  // Modificadores visuais
  highlight = false,
  code = false,
  gradient = false,
  shadow,

  // Responsividade
  responsive,

  // Interatividade
  interactive = false,
  disabled = false,
  onClick,

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const Element = as
  const isInteractive = Boolean(onClick || interactive)

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'text',

    // Elemento e aparência básica
    `text--${as}`,
    `text--${size}`,
    `text--${color}`,
    `text--${align}`,

    // Estados
    isInteractive && 'text--interactive',
    disabled && 'text--disabled',

    // Modificadores de aparência
    weight && `text--${weight}`,
    style && `text--${style}`,
    leading && `text--leading-${leading}`,

    // Comportamentos de texto
    truncate && 'text--truncate',
    breakWords && 'text--break-words',

    // Modificadores visuais
    highlight && 'text--highlight',
    code && 'text--code',
    gradient && 'text--gradient',
    shadow === true && 'text--shadow',
    shadow === 'strong' && 'text--shadow-strong',

    // Responsividade
    responsive && `text--responsive-${responsive}`,

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
      {children}
    </Element>
  )
}

// ============================================================================
// COMPONENTES ESPECÍFICOS (para compatibilidade)
// ============================================================================
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
