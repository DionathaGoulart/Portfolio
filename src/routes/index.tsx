import { RouteConfig, RouteGroup } from '@core/types/router'
import { MainLayout } from '@shared'

import { HomePage } from '@pages'
import { NotFoundPage } from '@/pages/NotFound'

export const appRoutes: (RouteConfig | RouteGroup)[] = [
  {
    layout: MainLayout,
    routes: [
      {
        path: '/',
        element: HomePage,
        title: 'Home'
      }
    ]
  },
  {
    path: '/404',
    element: NotFoundPage,
    title: 'Página não encontrada'
  }
]
