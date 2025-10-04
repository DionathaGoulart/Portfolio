import React from 'react'
import { MainLayout } from '@shared'
import { HomePage, NotFoundPage } from '@pages'

import { RouteConfig, RouteGroup } from '@types'

// ================================
// Route Configuration
// ================================

/**
 * Application routes configuration
 * Defines all routes with their layouts and properties
 */
export const appRoutes: (RouteConfig | RouteGroup)[] = [
  {
    layout: MainLayout as React.ComponentType<unknown>,
    layoutProps: {
      pageTitle: 'Dionatha',
      containerSize: 'lg'
    },
    routes: [
      {
        path: '/',
        element: HomePage,
        title: 'Dionatha'
      }
    ]
  },
  {
    path: '/404',
    element: NotFoundPage,
    title: 'Página não encontrada'
  }
]
