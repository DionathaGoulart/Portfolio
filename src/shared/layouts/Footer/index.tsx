import React from 'react'
import { FooterComponentProps } from '@types'

// ================================
// MAIN COMPONENT
// ================================

/**
 * Footer component with links, copyright and social media
 * Manages navigation links, company information and social connections
 */
export const Footer: React.FC<FooterComponentProps> = ({
  containerSize = 'lg',
  companyName = 'GD',
  year,
  links = [
    { href: '/privacy', label: 'Privacidade' },
    { href: '/terms', label: 'Termos' },
    { href: '/contact', label: 'Contato' }
  ],
  socialLinks = [],
  variant = 'default',
  showCopyright = true,
  showSocial = false,
  compact = false,
  className = '',
  id
}) => {
  // ================================
  // DERIVED STATE
  // ================================

  const getCurrentYear = (): number => year || new Date().getFullYear()
  const hasLinks = links.length > 0
  const hasSocial = showSocial && socialLinks.length > 0
  const isExtended = variant === 'extended' && (hasLinks || hasSocial)

  // ================================
  // CLASS BUILDERS
  // ================================

  const getFooterClasses = (): string => {
    const baseClasses = ['footer', `footer--${variant}`]

    if (compact) baseClasses.push('footer--compact')
    if (className) baseClasses.push(className)

    return baseClasses.join(' ')
  }

  const getContentClasses = (): string => {
    return ['footer__content', `layout-container--${containerSize}`].join(' ')
  }

  const getLinksClasses = (): string => {
    const classes = ['footer__links']

    if (variant === 'extended') classes.push('footer__links--extended')

    return classes.join(' ')
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderLinks = () => {
    if (!hasLinks) return null

    return (
      <div className={getLinksClasses()}>
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
        © {getCurrentYear()} {companyName}. Todos os direitos reservados.
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

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <footer className={getFooterClasses()} id={id}>
      <div className={getContentClasses()}>
        {isExtended ? renderExtendedLayout() : renderDefaultLayout()}
      </div>
    </footer>
  )
}

export default Footer
