// ============================================================================
// NAV FILTER TYPES
// ============================================================================

/**
 * Represents a single filter option with value and display label
 */
export interface FilterOption {
  value: string
  label: string
}

/**
 * Props interface for NavFilter component
 * @interface NavFilterProps
 */
export interface NavFilterProps {
  /** Array of filter options to display */
  options: FilterOption[]
  /** Currently active filter value */
  activeFilter: string
  /** Callback function when filter changes */
  onFilterChange: (filter: string) => void
  /** Additional CSS classes */
  className?: string
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Size variant of the filter buttons */
  size?: 'small' | 'medium' | 'large'
  /** Layout direction of the filter buttons */
  layout?: 'horizontal' | 'vertical'
  /** Alignment of the filter buttons */
  align?: 'start' | 'center' | 'end'
  /** Loading state */
  loading?: boolean
}

// ============================================================================
// CLASS BUILDERS
// ============================================================================

/**
 * Builds CSS classes for the filter container
 * @param layout - Layout direction
 * @param align - Alignment position
 * @param size - Size variant
 * @param className - Additional classes
 * @returns Combined class string
 */
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

/**
 * Builds CSS classes for individual filter buttons
 * @param isActive - Whether button is in active state
 * @param loading - Whether component is in loading state
 * @param className - Additional classes
 * @returns Combined class string
 */
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

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validates if options array is valid
 * @param options - Options array to validate
 * @returns Boolean indicating validity
 */
export const isValidOptionsArray = (
  options: unknown
): options is FilterOption[] => {
  return Array.isArray(options) && options.length > 0
}

/**
 * Gets safe options array with fallback
 * @param options - Options to validate
 * @returns Valid options array or empty array
 */
export const getSafeOptions = (options: unknown): FilterOption[] => {
  return isValidOptionsArray(options) ? options : []
}
