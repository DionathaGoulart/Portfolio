// ================================
// LAYOUT COMPONENTS TYPES
// ================================

import { ReactNode } from 'react'
import { FooterLink } from '../../core/layout'

/**
 * Seção de layout principal
 */
export interface MainLayoutSection {
  id: string
  label: string
}

/**
 * Props para o componente MainLayout
 */
export interface MainLayoutComponentProps {
  // Conteúdo
  children: ReactNode

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

  // Props de componentes filhos
  headerProps?: Partial<HeaderComponentProps>
  footerProps?: Partial<FooterComponentProps>

  // HTML attributes
  className?: string
  id?: string
}

/**
 * Seção do header
 */
export interface HeaderSection {
  id: string
  label: string
}

/**
 * Props para o componente Header
 */
export interface HeaderComponentProps {
  // Estrutura
  containerSize?: 'sm' | 'md' | 'lg' | 'xl'
  sections?: HeaderSection[]

  // Conteúdo
  pageTitle?: string
  logoText?: string

  // Aparência
  variant?: 'default' | 'minimal' | 'transparent'
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

// FooterLink já está definido em core/layout.ts

/**
 * Link social
 */
export interface SocialLink {
  href: string
  label: string
}

/**
 * Props para o componente Footer
 */
export interface FooterComponentProps {
  // Estrutura
  containerSize?: 'sm' | 'md' | 'lg' | 'xl'

  // Conteúdo
  companyName?: string
  year?: number
  links?: FooterLink[]
  socialLinks?: SocialLink[]

  // Aparência
  variant?: 'default' | 'extended'
  showCopyright?: boolean
  showSocial?: boolean

  // Layout
  compact?: boolean

  // HTML attributes
  className?: string
  id?: string
}
