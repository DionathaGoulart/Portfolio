import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteRenderer } from './components/RouteRenderer'
import { RouteConfig, RouteGroup, FlattenedRouteConfig } from '../types/router'

const processRoutes = (
  configs: (RouteConfig | RouteGroup)[]
): FlattenedRouteConfig[] => {
  return configs.flatMap((config) => {
    if ('routes' in config) {
      return config.routes.map((route) => ({
        ...route,
        path: (config.prefix || '') + route.path,
        layout: config.layout,
        layoutProps: config.layoutProps
      }))
    }
    return config as FlattenedRouteConfig
  })
}

interface AppRouterProps {
  routes: (RouteConfig | RouteGroup)[]
  fallback?: string
}

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
