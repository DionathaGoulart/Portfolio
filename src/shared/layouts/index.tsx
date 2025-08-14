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
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none'
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  containerSize = 'lg'
}) => {
  return (
    <div className="theme-container min-h-screen flex flex-col">
      <Header />

      <main
        className={`flex-grow ${containerSizes[containerSize]} mx-auto w-full px-4 pt-20 pb-8 ${className}`}
      >
        {children}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
