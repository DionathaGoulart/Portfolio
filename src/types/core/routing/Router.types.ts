// ================================
// ROUTING COMPONENTS TYPES
// ================================

import { RouteConfig, RouteGroup } from '../routing'

/**
 * Props para o componente AppRouter
 */
export interface AppRouterProps {
  /** Array de rotas configuradas */
  routes: (RouteConfig | RouteGroup)[]
  /** Rota de fallback quando nenhuma rota corresponde */
  fallback?: string
}

/**
 * Props para o componente RouteRenderer
 */
export interface RouteRendererProps {
  /** Configuração da rota */
  route: RouteConfig
  /** Layout opcional para a rota */
  layout?: React.ComponentType<Record<string, unknown>>
  /** Props do layout */
  layoutProps?: Record<string, unknown>
}
