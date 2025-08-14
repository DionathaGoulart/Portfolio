import React, { useState, useEffect } from 'react'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full theme-surface border theme-border theme-text-primary hover:bg-theme-accent hover:bg-opacity-10 transition-all shadow-lg"
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  )
}

export default ScrollToTop
