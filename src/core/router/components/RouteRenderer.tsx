import React, { useEffect } from 'react'
import { RouteConfig } from '@/core/types/router'

interface Props {
  route: RouteConfig
}

export const RouteRenderer: React.FC<Props> = ({ route }) => {
  const { element: Element, layout: Layout, title } = route

  // Define o título da página se especificado
  useEffect(() => {
    if (title) document.title = title
  }, [title])

  const content = <Element />

  return Layout ? <Layout>{content}</Layout> : content
}
