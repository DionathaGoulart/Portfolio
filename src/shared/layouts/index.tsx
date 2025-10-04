import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'
import { MainLayoutComponentProps } from '@types'
import '@styles/layout.scss'

// ================================
// MAIN COMPONENT
// ================================

/**
 * Main application layout component
 * Manages Header, Footer, content and additional features like scroll to top
 */
export const MainLayout: React.FC<MainLayoutComponentProps> = ({
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
