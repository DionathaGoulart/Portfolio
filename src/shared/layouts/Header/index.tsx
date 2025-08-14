import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@shared'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Sobre' },
    { path: '/projects', label: 'Projetos' },
    { path: '/prints', label: 'Prints' },
    { path: '/contact', label: 'Contato' }
  ]

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <header className="theme-surface p-4 rounded-lg border theme-border shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold theme-text-primary hover:opacity-80 transition-opacity"
          >
            GD<span className="theme-text-accent">.</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center mx-4">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`
                    relative py-2 px-3 rounded-md transition-all duration-200
                    ${
                      isActivePath(link.path)
                        ? 'theme-text-primary bg-theme-accent bg-opacity-10 font-medium'
                        : 'theme-text-secondary hover:theme-text-primary hover:bg-theme-accent hover:bg-opacity-5'
                    }
                  `}
                >
                  {link.label}
                  {isActivePath(link.path) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-theme-accent rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="
              p-2.5 rounded-md transition-all duration-200
              theme-text-secondary hover:theme-text-primary
              hover:bg-theme-accent hover:bg-opacity-10
              focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-50
              border border-transparent hover:border-theme-accent hover:border-opacity-20
            "
            aria-label={`Trocar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            title={`Trocar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="md:hidden flex items-center space-x-2 mobile-menu-container">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-md transition-all duration-200
              theme-text-secondary hover:theme-text-primary
              hover:bg-theme-accent hover:bg-opacity-10
              focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-50
            "
            aria-label={`Trocar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
              p-2 rounded-md transition-all duration-200
              theme-text-secondary hover:theme-text-primary
              hover:bg-theme-accent hover:bg-opacity-10
              focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-opacity-50
            "
            aria-label="Menu de navegação"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 mobile-menu-container">
          <div className="theme-surface rounded-lg border theme-border shadow-lg p-4 animate-in slide-in-from-top-2 duration-200">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      block py-3 px-4 rounded-md transition-all duration-200 text-center
                      ${
                        isActivePath(link.path)
                          ? 'theme-text-primary bg-theme-accent bg-opacity-10 font-medium border border-theme-accent border-opacity-20'
                          : 'theme-text-secondary hover:theme-text-primary hover:bg-theme-accent hover:bg-opacity-5'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
