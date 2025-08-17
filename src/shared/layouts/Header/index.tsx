import React, { useState, useEffect } from 'react'
import { useTheme } from '@shared'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contato' }
  ]

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-60px 0px -60% 0px' } // detecta quando a seção está centralizada
    )

    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false) // fecha menu mobile
    }
  }

  return (
    <header className="theme-surface border-b theme-border fixed top-0 w-full z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleScrollTo('home')}
          className="text-xl font-bold theme-text-primary"
        >
          GD.
        </button>

        {/* Desktop Navigation */}
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

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 theme-text-primary hover:theme-text-primary transition-colors"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 theme-text-primary hover:theme-text-primary"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t theme-border">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`block w-full text-left py-2 px-3 rounded ${
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
  )
}

export default Header
