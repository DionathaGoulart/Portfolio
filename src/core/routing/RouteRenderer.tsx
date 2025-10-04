import React, { useEffect, useState, ComponentType } from 'react'

import { RouteConfig, RouteRendererProps, SectionConfig } from '@types'

// ================================
// Main Component
// ================================

/**
 * RouteRenderer component handles the rendering of routes with optional layouts
 * and manages page-level state like sections and page title
 */
export const RouteRenderer: React.FC<RouteRendererProps> = ({
  route,
  layout: Layout,
  layoutProps = {}
}) => {
  const { element: Element, title } = route

  // State management for dynamic page properties
  const [sections, setSections] = useState<SectionConfig[]>([])
  const [pageTitle, setPageTitle] = useState(title || '')

  // Update document title when pageTitle changes
  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle
    }
  }, [pageTitle])

  // Render the page element with state setters
  const content = (
    <Element setSections={setSections} setPageTitle={setPageTitle} />
  )

  // Return content with or without layout wrapper
  if (Layout) {
    return (
      <Layout {...layoutProps} sections={sections} pageTitle={pageTitle}>
        {content}
      </Layout>
    )
  }

  return content
}
