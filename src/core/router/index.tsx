import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RouteRenderer } from './components/RouteRenderer'
import { AppRouterProps, RouteConfig, RouteGroup } from '../types/router'

const processRoutes = (configs: (RouteConfig | RouteGroup)[]) => {
  return configs.flatMap((config) => {
    if ('routes' in config) {
      return config.routes.map((route) => ({
        ...route,
        path: (config.prefix || '') + route.path,
        layout: route.layout || config.layout
      }))
    }
    return config
  })
}

export const AppRouter: React.FC<AppRouterProps> = ({
  routes,
  fallback = '/404' // Mudança aqui: ao invés de '/', vai para '/404'
}) => {
  const processedRoutes = processRoutes(routes)

  return (
    <Routes>
      {processedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RouteRenderer route={route} />}
        />
      ))}
      <Route path="*" element={<Navigate to={fallback} replace />} />
    </Routes>
  )
}
