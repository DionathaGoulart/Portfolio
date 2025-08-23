import React, { useEffect, useState, ComponentType } from 'react'
import { RouteConfig } from '@/core/types/router'
import { SectionConfig } from '@/shared/types'

interface Props {
  route: RouteConfig
  layout?: ComponentType<any>
  layoutProps?: Record<string, any>
}

export const RouteRenderer: React.FC<Props> = ({
  route,
  layout: Layout,
  layoutProps = {}
}) => {
  const { element: Element, title } = route

  const [sections, setSections] = useState<SectionConfig[]>(
    layoutProps.sections || []
  )
  const [pageTitle, setPageTitle] = useState(
    layoutProps.pageTitle || title || ''
  )

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle
    }
  }, [pageTitle])

  const content = (
    <Element setSections={setSections} setPageTitle={setPageTitle} />
  )

  return Layout ? (
    <Layout {...layoutProps} sections={sections} pageTitle={pageTitle}>
      {content}
    </Layout>
  ) : (
    content
  )
}
