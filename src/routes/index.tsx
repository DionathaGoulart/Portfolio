import { RouteConfig, RouteGroup } from '@core/types/router'
import { MainLayout } from '@shared'

import { HomePage, NotFoundPage, TestPage } from '@pages'

export const appRoutes: (RouteConfig | RouteGroup)[] = [
  {
    layout: MainLayout,
    routes: [
      {
        path: '/',
        element: HomePage,
        title: 'Home'
      },
      {
        path: '/test',
        element: TestPage,
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
