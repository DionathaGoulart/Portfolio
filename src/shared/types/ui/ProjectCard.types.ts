// ============================================================================
// PROJECT CARD TYPES
// ============================================================================

import { ProjectCategory } from './NavFilter.types'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: ProjectCategory
  githubUrl: string
  demoUrl: string
}

export interface ProjectCardProps {
  project: Project
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void
  className?: string
}

export interface ProjectGridProps {
  projects: Project[]
  onGithubClick?: (projectId: string) => void
  onDemoClick?: (projectId: string) => void
  emptyMessage?: string
  className?: string
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

export const buildCardClasses = (className = ''): string => {
  const classes = [
    'group theme-surface rounded-2xl overflow-hidden theme-shadow',
    'hover:theme-shadow-lg transition-all duration-300 hover:scale-105',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildCardImageClasses = (): string => {
  return 'relative h-48 overflow-hidden'
}

export const buildImageClasses = (): string => {
  return 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
}

export const buildImageOverlayClasses = (): string => {
  return 'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'
}

export const buildCardContentClasses = (): string => {
  return 'p-6'
}

export const buildCardTitleClasses = (): string => {
  return 'mb-3 group-hover:text-theme-primary transition-colors'
}

export const buildCardDescriptionClasses = (): string => {
  return 'mb-4 line-clamp-3'
}

export const buildTagsContainerClasses = (): string => {
  return 'flex flex-wrap gap-2 mb-6'
}

export const buildButtonsContainerClasses = (): string => {
  return 'flex gap-3'
}

export const buildButtonClasses = (): string => {
  return 'flex-1 flex items-center justify-center gap-2'
}

export const buildGridClasses = (className = ''): string => {
  const classes = [
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildEmptyStateClasses = (): string => {
  return 'text-center py-16'
}
