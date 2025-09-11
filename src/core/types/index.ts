import { ComponentType } from 'react'

// ================================
// Core Type Definitions
// ================================

/**
 * Interface for page components that can interact with layout state
 * Provides setters for dynamic page properties
 */
export interface PageLayoutSetters {
  setSections: (sections: any[]) => void
  setPageTitle: (title: string) => void
}

/**
 * Basic route configuration
 */
export interface RouteConfig {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Extended route configuration with layout information
 * Used internally after route processing
 */
export interface FlattenedRouteConfig extends RouteConfig {
  layout?: ComponentType<any>
  layoutProps?: Record<string, any>
}

/**
 * Page configuration within a route group
 * Similar to RouteConfig but used within RouteGroup context
 */
export interface PageWithLayoutProps {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

/**
 * Route group configuration for shared layouts
 * Allows grouping multiple routes under the same layout
 */
export interface RouteGroup {
  layout: ComponentType<any>
  layoutProps?: Record<string, any>
  routes: PageWithLayoutProps[]
  prefix?: string
}
