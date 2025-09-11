import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { RouteRenderer } from './components/RouteRenderer'
import { RouteConfig, RouteGroup, FlattenedRouteConfig } from '../types'

// ================================
// Types & Interfaces
// ================================

interface AppRouterProps {
  routes: (RouteConfig | RouteGroup)[]
  fallback?: string
}

// ================================
// Helper Functions
// ================================

/**
 * Process route configurations and flatten grouped routes
 * Handles both individual routes and route groups with shared layouts
 */
const processRoutes = (
  configs: (RouteConfig | RouteGroup)[]
): FlattenedRouteConfig[] => {
  return configs.flatMap((config) => {
    // Handle route groups with shared layouts
    if ('routes' in config) {
      return config.routes.map((route) => ({
        ...route,
        path: (config.prefix || '') + route.path,
        layout: config.layout,
        layoutProps: config.layoutProps
      }))
    }

    // Handle individual routes
    return config as FlattenedRouteConfig
  })
}

// ================================
// Main Component
// ================================

/**
 * AppRouter component manages application routing
 * Processes route configurations and renders them with React Router
 */
export const AppRouter: React.FC<AppRouterProps> = ({
  routes,
  fallback = '/404'
}) => {
  const processedRoutes = processRoutes(routes)

  return (
    <Routes>
      {processedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <RouteRenderer
              route={route}
              layout={route.layout}
              layoutProps={route.layoutProps}
            />
          }
        />
      ))}
      <Route path="*" element={<Navigate to={fallback} replace />} />
    </Routes>
  )
}
