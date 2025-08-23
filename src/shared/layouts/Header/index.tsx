import React, { useState, useEffect, useRef } from 'react'

import { analytics } from '@/features/Analytics/utils/analytics'
import { useTheme } from '@/features/Theme'
import { HeaderProps } from '@shared/types'

export const Header: React.FC<HeaderProps> = ({
  // Estrutura
  containerSize = 'lg',
  sections = [],

  // Conteúdo
  pageTitle,
  logoText = 'GD.',

  // Aparência
  variant = 'default',
  showThemeToggle = true,
  fixed = true,
  transparent = false,

  // Estados
  disabled = false,

  // Callbacks
  onLogoClick,
  onSectionClick,
  onThemeToggle,

  // HTML attributes
  className = '',
  id
}) => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [headerHeight, setHeaderHeight] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const isScrolling = useRef(false)
  const navLinks = sections

  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const hasNavigation = navLinks.length > 0
  const isInteractive = !disabled

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const headerClasses = [
    // Classe base
    'header',

    // Variante
    `header--${variant}`,

    // Estados
    fixed && 'header--fixed',
    disabled && 'header--disabled',
    isScrolled && 'header--scrolled',

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  const navClasses = ['header__nav', `layout-container--${containerSize}`]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Define a primeira section como ativa por padrão
  useEffect(() => {
    if (navLinks.length > 0 && !activeSection) {
      setActiveSection(navLinks[0].id)
    }
  }, [navLinks, activeSection])

  // Atualiza o título da página
  useEffect(() => {
    if (pageTitle && activeSection) {
      const activeSectionLabel = sections.find(
        (section) => section.id === activeSection
      )?.label

      if (activeSectionLabel) {
        document.title = `${pageTitle} | ${activeSectionLabel}`
      }
    } else if (pageTitle) {
      document.title = pageTitle
    }
  }, [activeSection, pageTitle, sections])

  // Observador para seções ativas
  useEffect(() => {
    if (navLinks.length === 0) return

    const sectionsElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[]

    if (sectionsElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections[0]
          setActiveSection(mostVisible.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    )

    sectionsElements.forEach((section) => observer.observe(section))
    return () =>
      sectionsElements.forEach((section) => observer.unobserve(section))
  }, [navLinks])

  // Medir altura do header
  useEffect(() => {
    const headerElement = document.querySelector('header')
    if (headerElement) {
      const updateHeaderHeight = () => {
        const height = headerElement.offsetHeight
        setHeaderHeight(height)
        if (fixed) {
          document.body.style.paddingTop = `${height}px`
        }
      }

      updateHeaderHeight()
      const observer = new ResizeObserver(updateHeaderHeight)
      observer.observe(headerElement)
      window.addEventListener('resize', updateHeaderHeight)

      return () => {
        observer.disconnect()
        window.removeEventListener('resize', updateHeaderHeight)
        if (fixed) {
          document.body.style.paddingTop = '0'
        }
      }
    }
  }, [isMobileMenuOpen, fixed])

  // Detectar scroll para efeitos visuais
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleScrollTo = (id: string) => {
    if (!isInteractive) return

    setActiveSection(id)
    isScrolling.current = true

    analytics.trackButtonClick(`nav_${id}`)

    const el = document.getElementById(id)
    if (el) {
      const headerOffset = headerHeight + 20
      const elementPosition = el.offsetTop - headerOffset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)

      setTimeout(() => {
        isScrolling.current = false
      }, 1000)
    }

    if (onSectionClick) {
      onSectionClick(id)
    }
  }

  const handleLogoClick = () => {
    if (!isInteractive) return

    analytics.trackButtonClick('logo')

    if (onLogoClick) {
      onLogoClick()
    } else if (navLinks.length > 0) {
      handleScrollTo(navLinks[0].id)
    } else {
      window.location.href = '/'
    }
  }

  const handleThemeToggle = () => {
    if (!isInteractive) return

    analytics.trackButtonClick(
      `theme_${theme === 'light' ? 'to_dark' : 'to_light'}`
    )

    if (onThemeToggle) {
      onThemeToggle()
    } else {
      toggleTheme()
    }
  }

  const handleMobileMenuToggle = () => {
    if (!isInteractive) return

    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)

    analytics.trackButtonClick(`mobile_menu_${newState ? 'open' : 'close'}`)
  }

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================
  const renderLogo = () => (
    <button
      onClick={handleLogoClick}
      className="header__logo"
      disabled={disabled}
      aria-label="Ir para o início"
    >
      {logoText}
    </button>
  )

  const renderDesktopNavigation = () => {
    if (!hasNavigation) return null

    return (
      <div className="header__nav-desktop">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScrollTo(link.id)}
            className={`header__nav-link ${
              activeSection === link.id ? 'header__nav-link--active' : ''
            }`}
            disabled={disabled}
          >
            {link.label}
          </button>
        ))}
      </div>
    )
  }

  const renderControls = () => (
    <div className="header__controls">
      {showThemeToggle && (
        <button
          onClick={handleThemeToggle}
          className="header__theme-toggle"
          disabled={disabled}
          aria-label="Alternar tema"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      )}

      {hasNavigation && (
        <button
          onClick={handleMobileMenuToggle}
          className="header__mobile-toggle"
          disabled={disabled}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      )}
    </div>
  )

  const renderMobileMenu = () => {
    if (!isMobileMenuOpen || !hasNavigation) return null

    return (
      <div className="header__mobile-menu">
        <div
          className={`header__mobile-nav layout-container--${containerSize}`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className={`header__mobile-link ${
                activeSection === link.id ? 'header__mobile-link--active' : ''
              }`}
              disabled={disabled}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <header className={headerClasses} id={id}>
      <nav className={navClasses}>
        {renderLogo()}
        {renderDesktopNavigation()}
        {renderControls()}
      </nav>
      {renderMobileMenu()}
    </header>
  )
}

export default Header
