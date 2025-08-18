import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScroolToTop'

export interface SectionConfig {
  id: string
  label: string
}

interface MainLayoutProps {
  children: ReactNode
  className?: string
  containerSize?: 'lg'
  sections?: SectionConfig[]
  pageTitle?: string
}

const containerSizes = {
  lg: 'max-w-screen-2xl px-8'
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = '',
  containerSize = 'lg',
  sections = [],
  pageTitle
}) => {
  return (
    <div className="theme-container min-h-screen flex flex-col space-y-48">
      <Header
        containerSize={containerSize}
        containerSizes={containerSizes}
        sections={sections}
        pageTitle={pageTitle}
      />
      <main className="flex-grow mx-auto w-full pb-8">
        <div
          className={`mx-auto w-full ${containerSizes[containerSize]} ${className}`}
        >
          {children}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
