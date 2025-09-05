import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'
import { MainLayoutProps } from '@shared/types'
import '@styles/layout.scss'

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

/**
 * Layout principal da aplicação
 * Gerencia Header, Footer, conteúdo e funcionalidades extras
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  // Conteúdo
  children,

  // Estrutura
  containerSize = 'lg',
  sections = [],
  pageTitle,

  // Aparência
  spacing = 'normal',
  headerVariant = 'default',
  footerVariant = 'default',

  // Configuração
  showHeader = true,
  showFooter = true,
  showScrollToTop = true,

  // Props passthrough
  headerProps = {},
  footerProps = {},

  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CLASSES CSS COM BEM + TAILWIND
  // ============================================================================

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

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

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

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================

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
