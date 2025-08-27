// ============================================================================
// PROJECT FILTER TYPES
// ============================================================================

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile'

export interface FilterOption {
  value: string
  label: string
}

export interface NavFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  className?: string
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

export const buildFilterButtonClasses = (
  isActive: boolean,
  className = ''
): string => {
  const classes = [
    'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-theme-primary text-theme-textSecondary shadow-lg'
      : 'bg-theme-surface text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildFilterContainerClasses = (className = ''): string => {
  const classes = [
    'flex flex-wrap justify-center gap-4 mb-12',
    className
  ].filter(Boolean)

  return classes.join(' ')
}
