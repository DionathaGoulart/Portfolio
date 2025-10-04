import React from 'react'
import {
  NavFilterProps,
  buildFilterButtonClasses,
  buildFilterContainerClasses,
  getSafeOptions
} from '@types'
import '@styles/ui/navfilter.scss'

// ================================
// NAV FILTER COMPONENT
// ================================

/**
 * Navigation filter component with clickable buttons for filtering content
 * Supports horizontal/vertical layouts and various size variants
 *
 * @component NavFilter
 * @param {NavFilterProps} props - NavFilter configuration props
 * @returns {React.FC<NavFilterProps>} Rendered navigation filter component
 *
 * @example
 * <NavFilter
 *   options={[{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }]}
 *   activeFilter="all"
 *   onFilterChange={handleFilterChange}
 *   size="medium"
 *   layout="horizontal"
 * />
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
  // ================================
  // DERIVED VALUES
  // ================================

  const safeOptions = getSafeOptions(options)
  const containerClasses = buildFilterContainerClasses(
    layout,
    align,
    size,
    className
  )

  // ================================
  // EVENT HANDLERS
  // ================================

  const handleFilterClick = (filter: string): void => {
    if (!loading) {
      onFilterChange(filter)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, filter: string): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFilterClick(filter)
    }
  }

  // ================================
  // EARLY RETURNS
  // ================================

  if (safeOptions.length === 0) {
    console.warn(
      'NavFilter: options prop is required and must be a non-empty array'
    )
    return null
  }

  // ================================
  // RENDER
  // ================================

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
