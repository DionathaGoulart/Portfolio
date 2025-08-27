import React, { useState, useEffect, useRef } from 'react'

import { analytics } from '@/features/Analytics/utils/analytics'
import { useTheme } from '@/features/Theme'
import { HeaderProps } from '@shared/types'

// ============================================================================
// ÍCONES SVG
// ============================================================================
const SunIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
)

const MoonIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
)

const MenuIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
)

const CloseIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

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

  // Atualiza o título da página E inicia o tracking por tempo
  useEffect(() => {
    if (pageTitle && activeSection) {
      const activeSectionLabel = sections.find(
        (section) => section.id === activeSection
      )?.label

      if (activeSectionLabel) {
        const newTitle = `${pageTitle} | ${activeSectionLabel}`
        document.title = newTitle

        // NOVO: Iniciar tracking por tempo no analytics
        analytics.trackTitleChange(newTitle, activeSection)
      }
    } else if (pageTitle) {
      document.title = pageTitle
      analytics.trackTitleChange(pageTitle, 'home')
    }
  }, [activeSection, pageTitle, sections])

  // Observador para seções ativas
  useEffect(() => {
    if (navLinks.length === 0) return

    const sectionsElements = navLinks
      .map((link) => {
        const element = document.getElementById(link.id)
        if (!element) {
          console.warn(`Seção com ID "${link.id}" não encontrada`)
        }
        return element
      })
      .filter(Boolean) as HTMLElement[]

    if (sectionsElements.length === 0) {
      console.warn('Nenhuma seção encontrada para observar')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return

        const visibleSections = entries.filter((entry) => entry.isIntersecting)

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          )

          const newActiveSection = mostVisible.target.id
          setActiveSection(newActiveSection)
        }
      },
      {
        rootMargin: `-${headerHeight + 20}px 0px 0px 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    )

    sectionsElements.forEach((section) => observer.observe(section))

    return () => {
      sectionsElements.forEach((section) => observer.unobserve(section))
      analytics.clearTitleTimer()
    }
  }, [navLinks, headerHeight])

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
          aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      )}

      {hasNavigation && (
        <button
          onClick={handleMobileMenuToggle}
          className="header__mobile-toggle"
          disabled={disabled}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
