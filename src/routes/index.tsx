import { MainLayout } from '@/shared'
import { RouteConfig, RouteGroup } from '@core/types/router'
import { HomePage, NotFoundPage, TestPage } from '@pages'

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
    path: '/test',
    element: TestPage,
    title: 'Test'
  },
  {
    path: '/404',
    element: NotFoundPage,
    title: 'Página não encontrada'
  }
]
