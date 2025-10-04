import { ComponentType } from 'react'
import { SectionConfig } from './layout'

// ================================
// CORE ROUTING TYPES
// ================================

/**
 * Interface para componentes de página que podem interagir com estado de layout
 * Fornece setters para propriedades dinâmicas da página
 *
 * @interface PageLayoutSetters
 * @property {function} setSections - Função para definir seções da página para navegação
 * @property {function} setPageTitle - Função para definir título da página dinamicamente
 */
export interface PageLayoutSetters {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}

// ================================
// ROUTE CONFIGURATION TYPES
// ================================

/**
 * Configuração básica de rota para roteamento da aplicação
 *
 * @interface RouteConfig
 * @property {string} path - Padrão de caminho da rota
 * @property {ComponentType} element - Componente React para renderizar
 * @property {string} title - Título da página para SEO e navegação
 */
export interface RouteConfig {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Configuração estendida de rota com informações de layout
 * Usado internamente após processamento de rotas
 *
 * @interface FlattenedRouteConfig
 * @extends RouteConfig
 * @property {ComponentType} layout - Componente de layout opcional
 * @property {Record<string, any>} layoutProps - Props para passar ao componente de layout
 */
export interface FlattenedRouteConfig extends RouteConfig {
  layout?: ComponentType<unknown>
  layoutProps?: Record<string, unknown>
}

/**
 * Configuração de página dentro de um grupo de rotas
 * Similar ao RouteConfig mas usado dentro do contexto RouteGroup
 *
 * @interface PageWithLayoutProps
 * @property {string} path - Padrão de caminho da rota
 * @property {ComponentType} element - Componente React para renderizar
 * @property {string} title - Título da página para SEO e navegação
 */
export interface PageWithLayoutProps {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Configuração de grupo de rotas para layouts compartilhados
 * Permite agrupar múltiplas rotas sob o mesmo layout
 *
 * @interface RouteGroup
 * @property {ComponentType} layout - Componente de layout para envolver rotas
 * @property {Record<string, any>} layoutProps - Props para passar ao componente de layout
 * @property {PageWithLayoutProps[]} routes - Array de rotas neste grupo
 * @property {string} prefix - Prefixo de caminho opcional para todas as rotas no grupo
 */
export interface RouteGroup {
  layout: ComponentType<unknown>
  layoutProps?: Record<string, unknown>
  routes: PageWithLayoutProps[]
  prefix?: string
}
