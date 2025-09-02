import { ComponentType } from 'react'

export interface PageLayoutSetters {
  setSections: (sections: any[]) => void
  setPageTitle: (title: string) => void
}

export interface RouteConfig {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

export interface FlattenedRouteConfig extends RouteConfig {
  layout?: ComponentType<any>
  layoutProps?: Record<string, any>
}

export interface PageWithLayoutProps {
  path: string
  element: ComponentType<PageLayoutSetters>
  title: string
}

export interface RouteGroup {
  layout: ComponentType<any>
  layoutProps?: Record<string, any>
  routes: PageWithLayoutProps[]
  prefix?: string
}
