import { ComponentType } from 'react'
import { SectionConfig } from './layout'

// Importar tipos específicos de roteamento
export * from './routing/Router.types'

// Exportar tipos de layout
export * from './layout'

// ================================
// CORE TYPE DEFINITIONS
// ================================

/**
 * Interface for page components that can interact with layout state
 * Provides setters for dynamic page properties
 *
 * @interface PageLayoutSetters
 * @property {function} setSections - Function to set page sections for navigation
 * @property {function} setPageTitle - Function to set page title dynamically
 */
export interface PageLayoutSetters {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}

// ================================
// ROUTE CONFIGURATION TYPES
// ================================

/**
 * Basic route configuration for application routing
 *
 * @interface RouteConfig
 * @property {string} path - Route path pattern
 * @property {ComponentType} element - React component to render
 * @property {string} title - Page title for SEO and navigation
 */
export interface RouteConfig {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Extended route configuration with layout information
 * Used internally after route processing
 *
 * @interface FlattenedRouteConfig
 * @extends RouteConfig
 * @property {ComponentType} layout - Optional layout component
 * @property {Record<string, any>} layoutProps - Props to pass to layout component
 */
export interface FlattenedRouteConfig extends RouteConfig {
  layout?: ComponentType<unknown>
  layoutProps?: Record<string, unknown>
}

/**
 * Page configuration within a route group
 * Similar to RouteConfig but used within RouteGroup context
 *
 * @interface PageWithLayoutProps
 * @property {string} path - Route path pattern
 * @property {ComponentType} element - React component to render
 * @property {string} title - Page title for SEO and navigation
 */
export interface PageWithLayoutProps {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Route group configuration for shared layouts
 * Allows grouping multiple routes under the same layout
 *
 * @interface RouteGroup
 * @property {ComponentType} layout - Layout component to wrap routes
 * @property {Record<string, any>} layoutProps - Props to pass to layout component
 * @property {PageWithLayoutProps[]} routes - Array of routes in this group
 * @property {string} prefix - Optional path prefix for all routes in group
 */
export interface RouteGroup {
  layout: ComponentType<unknown>
  layoutProps?: Record<string, unknown>
  routes: PageWithLayoutProps[]
  prefix?: string
}
