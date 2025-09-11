import { ReactNode } from 'react'

// ================================
// BASE TYPES
// ================================

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type HeaderVariant = 'default' | 'minimal' | 'sticky' | 'transparent'
export type FooterVariant = 'default' | 'minimal' | 'extended'
export type LayoutSpacing = 'compact' | 'normal' | 'relaxed'

// ================================
// SHARED INTERFACES
// ================================

/**
 * Navigation section configuration
 */
export interface SectionConfig {
  id: string
  label: string
}

/**
 * Footer link configuration
 */
export interface FooterLink {
  href: string
  label: string
  external?: boolean
}

/**
 * Container sizes mapping
 */
export interface ContainerSizes {
  [key: string]: string
}

// ================================
// COMPONENT PROPS
// ================================

/**
 * Header component props
 */
export interface HeaderProps {
  // Estrutura
  containerSize?: ContainerSize
  sections?: SectionConfig[]

  // Conteúdo
  pageTitle?: string
  logoText?: string

  // Aparência
  variant?: HeaderVariant
  showThemeToggle?: boolean
  fixed?: boolean
  transparent?: boolean

  // Estados
  disabled?: boolean

  // Callbacks
  onLogoClick?: () => void
  onSectionClick?: (sectionId: string) => void
  onThemeToggle?: () => void

  // HTML attributes
  className?: string
  id?: string
}

/**
 * Footer component props
 */
export interface FooterProps {
  // Estrutura
  containerSize?: ContainerSize

  // Conteúdo
  companyName?: string
  year?: number
  links?: FooterLink[]
  socialLinks?: FooterLink[]

  // Aparência
  variant?: FooterVariant
  showCopyright?: boolean
  showSocial?: boolean

  // Layout
  compact?: boolean

  // HTML attributes
  className?: string
  id?: string
}

/**
 * Main layout component props
 */
export interface MainLayoutProps {
  // Conteúdo
  children: ReactNode

  // Estrutura
  containerSize?: ContainerSize
  sections?: SectionConfig[]
  pageTitle?: string

  // Aparência
  spacing?: LayoutSpacing
  headerVariant?: HeaderVariant
  footerVariant?: FooterVariant

  // Configuração
  showHeader?: boolean
  showFooter?: boolean
  showScrollToTop?: boolean

  // Header/Footer props passthrough
  headerProps?: Partial<HeaderProps>
  footerProps?: Partial<FooterProps>

  // HTML attributes
  className?: string
  id?: string
}
