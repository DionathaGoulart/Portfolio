import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'

interface MainLayoutProps {
  children: ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'max-w-none'
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  containerSize = 'lg'
}) => {
  return (
    <div className="theme-container min-h-screen flex flex-col">
      {/* Background Pattern/Gradient (opcional) */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-theme-accent/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="px-2 sm:px-4 pt-2 sm:pt-4">
        <Header />
      </div>

      {/* Main Content */}
      <main
        className={`
        flex-grow w-full px-2 sm:px-4 lg:px-8
        ${containerSizes[containerSize]} mx-auto
        ${className}
      `}
      >
        {/* Content Wrapper */}
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="space-y-6 sm:space-y-8">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <div className="px-2 sm:px-4 pb-2 sm:pb-4">
        <Footer />
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  )
}
