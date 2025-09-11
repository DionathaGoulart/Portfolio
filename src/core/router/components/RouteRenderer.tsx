import React, { useEffect, useState, ComponentType } from 'react'

import { RouteConfig } from '@/core/types'
import { SectionConfig } from '@/shared/types'

// ================================
// Types & Interfaces
// ================================

interface RouteRendererProps {
  route: RouteConfig
  layout?: ComponentType<any>
  layoutProps?: Record<string, any>
}

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
  const [sections, setSections] = useState<SectionConfig[]>(
    layoutProps.sections || []
  )
  const [pageTitle, setPageTitle] = useState(
    layoutProps.pageTitle || title || ''
  )

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
