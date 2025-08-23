import React from 'react'
import { FooterProps } from '@shared/types'

export const Footer: React.FC<FooterProps> = ({
  // Estrutura
  containerSize = 'lg',

  // Conteúdo
  companyName = 'GD',
  year,
  links = [
    { href: '/privacy', label: 'Privacidade' },
    { href: '/terms', label: 'Termos' },
    { href: '/contact', label: 'Contato' }
  ],
  socialLinks = [],

  // Aparência
  variant = 'default',
  showCopyright = true,
  showSocial = false,

  // Layout
  compact = false,

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const currentYear = year || new Date().getFullYear()
  const hasLinks = links.length > 0
  const hasSocial = showSocial && socialLinks.length > 0
  const isExtended = variant === 'extended' && (hasLinks || hasSocial)

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const footerClasses = [
    // Classe base
    'footer',

    // Variante
    `footer--${variant}`,

    // Estados
    compact && 'footer--compact',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  const contentClasses = [
    'footer__content',
    `layout-container--${containerSize}`
  ]
    .filter(Boolean)
    .join(' ')

  const linksClasses = [
    'footer__links',
    variant === 'extended' && 'footer__links--extended'
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================
  const renderLinks = () => {
    if (!hasLinks) return null

    return (
      <div className={linksClasses}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`footer__link ${
              link.external ? 'footer__link--external' : ''
            }`}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    )
  }

  const renderSocialLinks = () => {
    if (!hasSocial) return null

    return (
      <div className="footer__social">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>
    )
  }

  const renderCopyright = () => {
    if (!showCopyright) return null

    return (
      <p className="footer__copyright">
        © {currentYear} {companyName}. Todos os direitos reservados.
      </p>
    )
  }

  const renderDefaultLayout = () => (
    <div className="footer__wrapper">
      {renderLinks()}
      {renderCopyright()}
    </div>
  )

  const renderExtendedLayout = () => (
    <div className="footer__wrapper">
      <div className="footer__main">
        {renderLinks()}
        {renderSocialLinks()}
      </div>
      {showCopyright && (
        <div className="footer__bottom">{renderCopyright()}</div>
      )}
    </div>
  )

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <footer className={footerClasses} id={id}>
      <div className={contentClasses}>
        {isExtended ? renderExtendedLayout() : renderDefaultLayout()}
      </div>
    </footer>
  )
}

export default Footer
