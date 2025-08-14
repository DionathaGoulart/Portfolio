import React from 'react'

export interface RouteConfig {
  path: string
  element: React.ComponentType
  layout?: React.ComponentType<{ children: React.ReactNode }>
  title?: string
}

export interface RouteGroup {
  prefix?: string
  layout?: React.ComponentType<{ children: React.ReactNode }>
  routes: RouteConfig[]
}

export interface AppRouterProps {
  routes: (RouteConfig | RouteGroup)[]
  fallback?: string
}
