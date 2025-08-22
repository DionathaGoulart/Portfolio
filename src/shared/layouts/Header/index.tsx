import React, { useState, useEffect, useRef } from 'react'
import { SectionConfig, useTheme } from '@shared'
import { analytics } from '@/features/Analytics/utils/analytics'

interface HeaderProps {
  containerSize: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  containerSizes: Record<string, string>
  sections?: SectionConfig[]
  pageTitle?: string
}

const Header: React.FC<HeaderProps> = ({
  containerSize,
  containerSizes,
  sections = [],
  pageTitle
}) => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [headerHeight, setHeaderHeight] = useState(0)

  const isScrolling = useRef(false)
  const navLinks = sections

  // Define a primeira section como ativa por padrão
  useEffect(() => {
    if (navLinks.length > 0 && !activeSection) {
      setActiveSection(navLinks[0].id)
    }
  }, [navLinks, activeSection])

  // useEffect para atualizar o título da página
  useEffect(() => {
    if (pageTitle && activeSection) {
      const activeSectionLabel = sections.find(
        (section) => section.id === activeSection
      )?.label

      if (activeSectionLabel) {
        document.title = `${pageTitle} | ${activeSectionLabel}`

        // TRACKING: Atualizar page view virtual quando a seção ativa muda
        analytics.trackSectionView(activeSection, activeSectionLabel)
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // VERIFICA SE ESTAMOS EM UMA ROLAGEM MANUAL. SE SIM, IGNORA A ATUALIZAÇÃO DO ESTADO.
            if (!isScrolling.current) {
              setActiveSection(entry.target.id)
            }
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px' }
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
        document.body.style.paddingTop = `${height}px`
      }

      updateHeaderHeight()
      const observer = new ResizeObserver(updateHeaderHeight)
      observer.observe(headerElement)
      window.addEventListener('resize', updateHeaderHeight)

      return () => {
        observer.disconnect()
        window.removeEventListener('resize', updateHeaderHeight)
        document.body.style.paddingTop = '0'
      }
    }
  }, [isMobileMenuOpen])

  const handleScrollTo = (id: string) => {
    // 1. ATUALIZA O ESTADO IMEDIATAMENTE PARA DAR FEEDBACK VISUAL
    setActiveSection(id)

    // 2. ATIVA O SINALIZADOR DE ROLAGEM MANUAL
    isScrolling.current = true

    // TRACKING: Rastrear clique na navegação
    const section = sections.find((s) => s.id === id)
    if (section) {
      analytics.trackEvent({
        action: 'navigation_click',
        category: 'engagement',
        label: `nav_${id}`
      })
    }

    // 3. ROLA A PÁGINA
    const el = document.getElementById(id)
    if (el) {
      const headerOffset = headerHeight + 20
      const elementPosition = el.offsetTop - headerOffset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)

      // 4. DESATIVA O SINALIZADOR APÓS UM PEQUENO ATRASO (mais que o tempo do smooth scroll)
      setTimeout(() => {
        isScrolling.current = false
      }, 750) // Ajuste este valor se a rolagem for muito lenta
    }
  }

  const handleLogoClick = () => {
    // TRACKING: Rastrear clique no logo
    analytics.trackButtonClick('logo', 'header')

    if (navLinks.length > 0) {
      handleScrollTo(navLinks[0].id)
    } else {
      window.location.href = '/'
    }
  }

  const handleThemeToggle = () => {
    // TRACKING: Rastrear mudança de tema
    analytics.trackEvent({
      action: 'theme_toggle',
      category: 'engagement',
      label: theme === 'light' ? 'to_dark' : 'to_light'
    })

    toggleTheme()
  }

  return (
    <>
      <header className="theme-surface border-b theme-border fixed top-0 w-full z-50">
        <nav
          className={`${containerSizes[containerSize]} mx-auto px-4 py-4 flex items-center justify-between`}
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="text-xl font-bold theme-text-primary hover:theme-text-primary transition-colors"
          >
            GD.
          </button>

          {/* Desktop Navigation */}
          {navLinks.length > 0 && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={
                    activeSection === link.id
                      ? 'theme-text-primary font-medium'
                      : 'theme-text-primary hover:theme-text-primary transition-colors'
                  }
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 theme-text-primary hover:theme-text-primary transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Mobile Menu Button */}
            {navLinks.length > 0 && (
              <button
                onClick={() => {
                  const newState = !isMobileMenuOpen
                  setIsMobileMenuOpen(newState)

                  // TRACKING: Rastrear abertura/fechamento do menu mobile
                  analytics.trackEvent({
                    action: 'mobile_menu_toggle',
                    category: 'engagement',
                    label: newState ? 'open' : 'close'
                  })
                }}
                className="md:hidden p-2 theme-text-primary hover:theme-text-primary"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && navLinks.length > 0 && (
          <div className="md:hidden border-t theme-border">
            <div
              className={`${containerSizes[containerSize]} mx-auto px-4 py-2 space-y-1`}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                    activeSection === link.id
                      ? 'theme-text-primary bg-theme-accent bg-opacity-10'
                      : 'theme-text-primary hover:theme-text-primary hover:bg-theme-accent hover:bg-opacity-5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
