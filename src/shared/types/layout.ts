import { ReactNode } from 'react'

// ============================================================================
// TYPES BASE
// ============================================================================
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type HeaderVariant = 'default' | 'minimal' | 'sticky' | 'transparent'
export type FooterVariant = 'default' | 'minimal' | 'extended'
export type LayoutSpacing = 'compact' | 'normal' | 'relaxed'

// ============================================================================
// INTERFACES COMPARTILHADAS
// ============================================================================
export interface SectionConfig {
  id: string
  label: string
}

export interface ContainerSizes {
  [key: string]: string
}

// ============================================================================
// HEADER PROPS
// ============================================================================
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

// ============================================================================
// FOOTER PROPS
// ============================================================================
export interface FooterLink {
  href: string
  label: string
  external?: boolean
}

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

// ============================================================================
// MAIN LAYOUT PROPS
// ============================================================================
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
