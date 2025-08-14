import { RouteConfig, RouteGroup } from '@core/types/router'
import { MainLayout } from '@shared'

import { HomePage } from '@pages'

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
  }
]
