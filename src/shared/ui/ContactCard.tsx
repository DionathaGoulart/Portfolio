import React from 'react'
import { ContactCardProps } from '@shared/types/ui/Form.types'

export const ContactCard: React.FC<ContactCardProps> = ({
  // Conteúdo
  icon,
  title,
  value,
  // Funcionalidade
  href,
  onClick,
  // Aparência
  variant = 'default',
  // HTML attributes
  className = ''
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const isClickable = Boolean(href || onClick)
  const Element = href ? 'a' : 'div'

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'contact-card',
    // Variante
    `contact-card--${variant}`,
    // Estado interativo
    isClickable && 'contact-card--clickable',
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  const content = (
    <>
      <div className="contact-card__icon">{icon}</div>

      <div className="contact-card__content">
        <h3 className="contact-card__title">{title}</h3>
        <p className="contact-card__value">{value}</p>
      </div>
    </>
  )

  if (href) {
    return (
      <Element
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </Element>
    )
  }

  return (
    <Element
      className={classes}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {content}
    </Element>
  )
}
