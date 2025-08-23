import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'
import { MainLayoutProps } from '@shared/types'

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
  // CLASSES CSS
  // ============================================================================
  const layoutClasses = [
    // Classe base
    'main-layout',

    // Espaçamento
    `main-layout--${spacing}`,

    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  const containerClasses = [
    'main-layout__container',
    `layout-container--${containerSize}`
  ]
    .filter(Boolean)
    .join(' ')

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
      <div className={containerClasses}>{children}</div>
    </main>
  )

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className={layoutClasses} id={id}>
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      {renderScrollToTop()}
    </div>
  )
}

export default MainLayout
