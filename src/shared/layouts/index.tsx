import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'
import '@styles/layout.scss'

// ================================
// INTERFACES
// ================================

interface MainLayoutSection {
  id: string
  label: string
}

interface MainLayoutProps {
  // Conteúdo
  children: React.ReactNode

  // Estrutura
  containerSize?: 'sm' | 'md' | 'lg' | 'xl'
  sections?: MainLayoutSection[]
  pageTitle?: string

  // Aparência
  spacing?: 'tight' | 'normal' | 'loose'
  headerVariant?: 'default' | 'minimal' | 'transparent'
  footerVariant?: 'default' | 'extended'

  // Configuração
  showHeader?: boolean
  showFooter?: boolean
  showScrollToTop?: boolean

  // Props passthrough
  headerProps?: Record<string, any>
  footerProps?: Record<string, any>

  // HTML attributes
  className?: string
  id?: string
}

// ================================
// MAIN COMPONENT
// ================================

/**
 * Main application layout component
 * Manages Header, Footer, content and additional features like scroll to top
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  containerSize = 'lg',
  sections = [],
  pageTitle,
  spacing = 'normal',
  headerVariant = 'default',
  footerVariant = 'default',
  showHeader = true,
  showFooter = true,
  showScrollToTop = true,
  headerProps = {},
  footerProps = {},
  className = '',
  id
}) => {
  // ================================
  // CLASS BUILDERS
  // ================================

  const getLayoutClasses = (): string => {
    const baseClasses = ['main-layout', `main-layout--${spacing}`]

    if (className) baseClasses.push(className)

    return baseClasses.join(' ')
  }

  const getContainerClasses = (): string => {
    return [
      'main-layout__container',
      `layout-container--${containerSize}`
    ].join(' ')
  }

  // ================================
  // RENDER HELPERS
  // ================================

  const renderHeader = () => {
    if (!showHeader) return null

    return (
      <Header
        containerSize={containerSize}
        sections={sections}
        pageTitle={pageTitle}
        variant={headerVariant}
        {...headerProps}
      />
    )
  }

  const renderFooter = () => {
    if (!showFooter) return null

    return (
      <Footer
        containerSize={containerSize}
        variant={footerVariant}
        {...footerProps}
      />
    )
  }

  const renderScrollToTop = () => {
    if (!showScrollToTop) return null

    return <ScrollToTop />
  }

  const renderContent = () => (
    <main className="main-layout__content">
      <div className={getContainerClasses()}>{children}</div>
    </main>
  )

  // ================================
  // MAIN RENDER
  // ================================

  return (
    <div className={getLayoutClasses()} id={id}>
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      {renderScrollToTop()}
    </div>
  )
}

export default MainLayout
