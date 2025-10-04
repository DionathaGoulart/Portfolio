// ================================
// NAV FILTER SPECIFIC TYPES
// ================================

/**
 * Variantes de tamanho do filtro
 */
export type FilterSize = 'small' | 'medium' | 'large'

/**
 * Opções de direção de layout do filtro
 */
export type FilterLayout = 'horizontal' | 'vertical'

/**
 * Opções de alinhamento do filtro
 */
export type FilterAlign = 'start' | 'center' | 'end'

// ================================
// MAIN INTERFACES
// ================================

// FilterOption is now defined in pages/sections.ts to avoid duplication

/**
 * Interface de props para o componente NavFilter
 *
 * @interface NavFilterProps
 * @property {Array<{value: string, label: string}>} options - Array de opções de filtro para exibir
 * @property {string} activeFilter - Valor do filtro atualmente ativo
 * @property {(filter: string) => void} onFilterChange - Função de callback quando filtro muda
 * @property {string} className - Classes CSS adicionais
 * @property {string} ariaLabel - Label ARIA para acessibilidade
 * @property {FilterSize} size - Variante de tamanho dos botões de filtro
 * @property {FilterLayout} layout - Direção de layout dos botões de filtro
 * @property {FilterAlign} align - Alinhamento dos botões de filtro
 * @property {boolean} loading - Estado de carregamento
 */
export interface NavFilterProps {
  // Conteúdo
  options: Array<{value: string, label: string}>
  activeFilter: string

  // Funcionalidade
  onFilterChange: (filter: string) => void

  // Aparência
  size?: FilterSize
  layout?: FilterLayout
  align?: FilterAlign
  loading?: boolean

  // Acessibilidade
  ariaLabel?: string

  // Atributos HTML
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Constrói classes CSS para o container do filtro
 * @param {FilterLayout} layout - Direção do layout
 * @param {FilterAlign} align - Alinhamento
 * @param {FilterSize} size - Tamanho
 * @param {string} className - Classes adicionais
 * @returns {string} String de classes CSS
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
 * Constrói classes CSS para botões de filtro individuais
 * @param {boolean} isActive - Se o botão está ativo
 * @param {boolean} loading - Estado de carregamento
 * @param {string} className - Classes adicionais
 * @returns {string} String de classes CSS
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
 * Valida se array de opções é válido
 * @param {unknown} options - Opções para validar
 * @returns {boolean} Se as opções são válidas
 */
export const isValidOptionsArray = (
  options: unknown
): options is Array<{value: string, label: string}> => {
  return Array.isArray(options) && options.length > 0
}

/**
 * Obtém array de opções seguro com fallback
 * @param {unknown} options - Opções para processar
 * @returns {Array<{value: string, label: string}>} Array de opções seguro
 */
export const getSafeOptions = (options: unknown): Array<{value: string, label: string}> => {
  return isValidOptionsArray(options) ? options : []
}
