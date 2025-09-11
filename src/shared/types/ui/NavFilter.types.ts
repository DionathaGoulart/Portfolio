// ================================
// NAV FILTER SPECIFIC TYPES
// ================================

/**
 * Filter size variants
 */
export type FilterSize = 'small' | 'medium' | 'large'

/**
 * Filter layout direction options
 */
export type FilterLayout = 'horizontal' | 'vertical'

/**
 * Filter alignment options
 */
export type FilterAlign = 'start' | 'center' | 'end'

// ================================
// MAIN INTERFACES
// ================================

/**
 * Represents a single filter option with value and display label
 *
 * @interface FilterOption
 * @property {string} value - Unique identifier for the filter option
 * @property {string} label - Display text for the filter option
 */
export interface FilterOption {
  value: string
  label: string
}

/**
 * Props interface for NavFilter component
 *
 * @interface NavFilterProps
 * @property {FilterOption[]} options - Array of filter options to display
 * @property {string} activeFilter - Currently active filter value
 * @property {(filter: string) => void} onFilterChange - Callback function when filter changes
 * @property {string} className - Additional CSS classes
 * @property {string} ariaLabel - ARIA label for accessibility
 * @property {FilterSize} size - Size variant of the filter buttons
 * @property {FilterLayout} layout - Layout direction of the filter buttons
 * @property {FilterAlign} align - Alignment of the filter buttons
 * @property {boolean} loading - Loading state
 */
export interface NavFilterProps {
  // Content
  options: FilterOption[]
  activeFilter: string

  // Functionality
  onFilterChange: (filter: string) => void

  // Appearance
  size?: FilterSize
  layout?: FilterLayout
  align?: FilterAlign
  loading?: boolean

  // Accessibility
  ariaLabel?: string

  // HTML attributes
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Builds CSS classes for the filter container
 */
export const buildFilterContainerClasses = (
  layout: FilterLayout = 'horizontal',
  align: FilterAlign = 'center',
  size: FilterSize = 'medium',
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

/**
 * Validates if options array is valid
 */
export const isValidOptionsArray = (
  options: unknown
): options is FilterOption[] => {
  return Array.isArray(options) && options.length > 0
}

/**
 * Gets safe options array with fallback
 */
export const getSafeOptions = (options: unknown): FilterOption[] => {
  return isValidOptionsArray(options) ? options : []
}
