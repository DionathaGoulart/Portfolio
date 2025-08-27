import React from 'react'
import {
  buildFilterButtonClasses,
  buildFilterContainerClasses,
  FilterOption,
  NavFilterProps
} from '../types/ui/NavFilter.types'

// ============================================================================
// FILTER OPTIONS DATA
// ============================================================================

const filterOptions: FilterOption[] = [
  { value: 'todos', label: 'todos' },
  { value: 'frontend', label: 'frontend' },
  { value: 'backend', label: 'backend' },
  { value: 'fullstack', label: 'fullstack' },
  { value: 'mobile', label: 'mobile' }
]

// ============================================================================
// PROJECT FILTER COMPONENT
// ============================================================================

export const NavFilter: React.FC<NavFilterProps> = ({
  activeFilter,
  onFilterChange,
  className = ''
}) => {
  const containerClasses = buildFilterContainerClasses(className)

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter)
  }

  const handleKeyDown = (e: React.KeyboardEvent, filter: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFilterClick(filter)
    }
  }

  return (
    <nav className={containerClasses}>
      {filterOptions.map((option) => {
        const isActive = activeFilter === option.value
        const buttonClasses = buildFilterButtonClasses(isActive)

        return (
          <button
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            className={buttonClasses}
            type="button"
            role="button"
            aria-pressed={isActive}
            aria-label={`Filtrar projetos por ${option.label}`}
          >
            {option.label}
          </button>
        )
      })}
    </nav>
  )
}
