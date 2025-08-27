import React from 'react'
import {
  buildFilterButtonClasses,
  buildFilterContainerClasses,
  NavFilterProps
} from '../types/ui/NavFilter.types'

// ============================================================================
// NAV FILTER COMPONENT
// ============================================================================

export const NavFilter: React.FC<NavFilterProps> = ({
  options = [], // ← ADICIONEI VALOR PADRÃO AQUI
  activeFilter,
  onFilterChange,
  className = '',
  ariaLabel = 'Filtros de navegação',
  size = 'medium',
  layout = 'horizontal',
  align = 'center',
  loading = false
}) => {
  const containerClasses = buildFilterContainerClasses(
    layout,
    align,
    size,
    className
  )

  const handleFilterClick = (filter: string) => {
    if (!loading) {
      onFilterChange(filter)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, filter: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFilterClick(filter)
    }
  }

  // ← ADICIONEI VERIFICAÇÃO DE SEGURANÇA
  if (!options || !Array.isArray(options)) {
    console.warn('NavFilter: options prop is required and must be an array')
    return null
  }

  return (
    <nav className={containerClasses} aria-label={ariaLabel}>
      {options.map((option) => {
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
