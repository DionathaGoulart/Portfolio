import { ReactNode } from 'react'

// ================================
// CORE LAYOUT TYPES
// ================================

/**
 * Variantes de tamanho de container para layouts responsivos
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/**
 * Variantes visuais e de comportamento do header
 */
export type HeaderVariant = 'default' | 'minimal' | 'sticky' | 'transparent'

/**
 * Variantes visuais do footer
 */
export type FooterVariant = 'default' | 'minimal' | 'extended'

/**
 * Opções de espaçamento de layout para densidade de conteúdo
 */
export type LayoutSpacing = 'compact' | 'normal' | 'relaxed'

// ================================
// SHARED INTERFACES
// ================================

/**
 * Configuração de seção de navegação para navegação dinâmica
 *
 * @interface SectionConfig
 * @property {string} id - Identificador único da seção para âncoras
 * @property {string} label - Label legível para humanos para navegação
 */
export interface SectionConfig {
  id: string
  label: string
}

/**
 * Configuração de link do footer com tratamento opcional de links externos
 *
 * @interface FooterLink
 * @property {string} href - URL de destino do link
 * @property {string} label - Texto de exibição para o link
 * @property {boolean} external - Se o link abre em nova aba
 */
export interface FooterLink {
  href: string
  label: string
  external?: boolean
}

/**
 * Mapeamento de tamanhos de container para breakpoints responsivos
 *
 * @interface ContainerSizes
 * @property {string} [key] - Chave do breakpoint
 * @property {string} [key] - Classe CSS ou valor para o breakpoint
 */
export interface ContainerSizes {
  [key: string]: string
}

// ================================
// COMPONENT PROPS INTERFACES
// ================================

/**
 * Props do componente Header para navegação e branding
 *
 * @interface HeaderProps
 * @property {ContainerSize} containerSize - Tamanho de container responsivo
 * @property {SectionConfig[]} sections - Configuração de seções de navegação
 * @property {string} pageTitle - Título da página atual para exibição
 * @property {string} logoText - Texto do logo ou nome da marca
 * @property {HeaderVariant} variant - Variante visual do header
 * @property {boolean} showThemeToggle - Se deve mostrar botão de alternância de tema
 * @property {boolean} fixed - Se o header é fixo no topo
 * @property {boolean} transparent - Se o header tem fundo transparente
 * @property {boolean} disabled - Estado desabilitado para interações do header
 * @property {function} onLogoClick - Manipulador de clique do logo
 * @property {function} onSectionClick - Manipulador de clique de navegação de seção
 * @property {function} onThemeToggle - Manipulador do botão de alternância de tema
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - ID do elemento HTML
 */
export interface HeaderProps {
  // Structure
  containerSize?: ContainerSize
  sections?: SectionConfig[]

  // Content
  pageTitle?: string
  logoText?: string

  // Appearance
  variant?: HeaderVariant
  showThemeToggle?: boolean
  fixed?: boolean
  transparent?: boolean

  // States
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
 * Props do componente Footer para rodapé do site e links
 *
 * @interface FooterProps
 * @property {ContainerSize} containerSize - Tamanho de container responsivo
 * @property {string} companyName - Nome da empresa ou site
 * @property {number} year - Ano de copyright
 * @property {FooterLink[]} links - Links de navegação do footer
 * @property {FooterLink[]} socialLinks - Links de redes sociais
 * @property {FooterVariant} variant - Variante visual do footer
 * @property {boolean} showCopyright - Se deve mostrar aviso de copyright
 * @property {boolean} showSocial - Se deve mostrar links de redes sociais
 * @property {boolean} compact - Layout compacto do footer
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - ID do elemento HTML
 */
export interface FooterProps {
  // Structure
  containerSize?: ContainerSize

  // Content
  companyName?: string
  year?: number
  links?: FooterLink[]
  socialLinks?: FooterLink[]

  // Appearance
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
 * Props do componente MainLayout para estrutura de página
 *
 * @interface MainLayoutProps
 * @property {ReactNode} children - Conteúdo da página para renderizar
 * @property {ContainerSize} containerSize - Tamanho de container responsivo
 * @property {SectionConfig[]} sections - Seções de navegação
 * @property {string} pageTitle - Título da página para header
 * @property {LayoutSpacing} spacing - Densidade de espaçamento de conteúdo
 * @property {HeaderVariant} headerVariant - Variante visual do header
 * @property {FooterVariant} footerVariant - Variante visual do footer
 * @property {boolean} showHeader - Se deve renderizar header
 * @property {boolean} showFooter - Se deve renderizar footer
 * @property {boolean} showScrollToTop - Se deve mostrar botão de scroll para o topo
 * @property {Partial<HeaderProps>} headerProps - Props do componente header
 * @property {Partial<FooterProps>} footerProps - Props do componente footer
 * @property {string} className - Classes CSS adicionais
 * @property {string} id - ID do elemento HTML
 */
export interface MainLayoutProps {
  // Content
  children: ReactNode

  // Structure
  containerSize?: ContainerSize
  sections?: SectionConfig[]
  pageTitle?: string

  // Appearance
  spacing?: LayoutSpacing
  headerVariant?: HeaderVariant
  footerVariant?: FooterVariant

  // Configuration
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
