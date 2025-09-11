import { MainLayout } from '@shared/layouts'
import { HomePage, NotFoundPage } from '@pages'

import { RouteConfig, RouteGroup } from '@core/types'

// ================================
// Route Configuration
// ================================

/**
 * Application routes configuration
 * Defines all routes with their layouts and properties
 */
export const appRoutes: (RouteConfig | RouteGroup)[] = [
  {
    layout: MainLayout,
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
