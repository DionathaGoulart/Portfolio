import React from 'react'

// Internal imports
import {
  buildFilterButtonClasses,
  buildFilterContainerClasses,
  getSafeOptions,
  type NavFilterProps
} from '../types/ui/NavFilter.types'

// ============================================================================
// NAV FILTER COMPONENT
// ============================================================================

/**
 * NavFilter Component
 * Renders a navigation filter with clickable buttons for filtering content
 *
 * @param props - NavFilterProps
 * @returns JSX.Element | null
 */
export const NavFilter: React.FC<NavFilterProps> = ({
  options = [],
  activeFilter,
  onFilterChange,
  className = '',
  ariaLabel = 'Filtros de navegação',
  size = 'medium',
  layout = 'horizontal',
  align = 'center',
  loading = false
}) => {
  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handles filter button click
   * @param filter - Filter value to set as active
   */
  const handleFilterClick = (filter: string): void => {
    if (!loading) {
      onFilterChange(filter)
    }
  }

  /**
   * Handles keyboard navigation for filter buttons
   * @param e - Keyboard event
   * @param filter - Filter value to set as active
   */
  const handleKeyDown = (e: React.KeyboardEvent, filter: string): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFilterClick(filter)
    }
  }

  // ============================================================================
  // VALIDATION & EARLY RETURNS
  // ============================================================================

  const safeOptions = getSafeOptions(options)

  if (safeOptions.length === 0) {
    console.warn(
      'NavFilter: options prop is required and must be a non-empty array'
    )
    return null
  }

  // ============================================================================
  // CLASS BUILDING
  // ============================================================================

  const containerClasses = buildFilterContainerClasses(
    layout,
    align,
    size,
    className
  )

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <nav className={containerClasses} aria-label={ariaLabel}>
      {safeOptions.map((option) => {
        const isActive = activeFilter === option.value
        const buttonClasses = buildFilterButtonClasses(isActive, loading)

        return (
          <button
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            className={buttonClasses}
            type="button"
            role="button"
            aria-pressed={isActive}
            aria-label={`Filtrar por ${option.label}`}
            disabled={loading}
          >
            {option.label}
          </button>
        )
      })}
    </nav>
  )
}
