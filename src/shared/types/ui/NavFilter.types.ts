// ============================================================================
// NAV FILTER TYPES
// ============================================================================

export interface FilterOption {
  value: string
  label: string
}

export interface NavFilterProps {
  options: FilterOption[] // ← Mantive obrigatório, mas o componente tem fallback
  activeFilter: string
  onFilterChange: (filter: string) => void
  className?: string
  ariaLabel?: string
  size?: 'small' | 'medium' | 'large'
  layout?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end'
  loading?: boolean
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

export const buildFilterContainerClasses = (
  layout: 'horizontal' | 'vertical' = 'horizontal',
  align: 'start' | 'center' | 'end' = 'center',
  size: 'small' | 'medium' | 'large' = 'medium',
  className = ''
): string => {
  const classes = [
    'nav-filter',
    layout === 'vertical' && 'nav-filter--vertical',
    align === 'start' && 'nav-filter--start',
    align === 'end' && 'nav-filter--end',
    size === 'small' && 'nav-filter--small',
    size === 'large' && 'nav-filter--large',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

export const buildFilterButtonClasses = (
  isActive: boolean,
  loading: boolean = false,
  className = ''
): string => {
  const classes = [
    'nav-filter__button',
    isActive && 'nav-filter__button--active',
    loading && 'nav-filter__button--loading',
    className
  ].filter(Boolean)

  return classes.join(' ')
}
