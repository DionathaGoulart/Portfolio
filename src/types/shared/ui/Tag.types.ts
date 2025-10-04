import React from 'react'
import { Size, ColorVariant } from '../global'

// ================================
// TAG SPECIFIC TYPES
// ================================

/**
 * Variantes visuais de tag
 */
export type TagVariant = 'solid' | 'outline' | 'ghost'

/**
 * Estados de tag de status para indicação visual
 */
export type TagStatus = 'online' | 'offline' | 'pending'

// ================================
// CONSTANTS
// ================================

/**
 * Mapeamento de tamanho para nomenclatura consistente entre componentes
 */
const SIZE_MAP = {
  pequeno: 'small',
  medio: 'medium',
  grande: 'large'
} as const

// ================================
// MAIN INTERFACES
// ================================

/**
 * Interface de props para o componente principal Tag
 *
 * @interface TagProps
 * @property {React.ReactNode} children - Conteúdo da tag
 * @property {ColorVariant} color - Tema de cor da tag
 * @property {Size} size - Variante de tamanho da tag
 * @property {TagVariant} variant - Variante visual da tag
 * @property {string} className - Classes CSS adicionais
 * @property {() => void} onClick - Função manipuladora de clique
 * @property {boolean} interactive - Habilitar estilo interativo sem onClick
 * @property {boolean} disabled - Desabilitar interações da tag
 * @property {React.ReactNode} icon - Elemento de ícone opcional
 * @property {boolean} removable - Habilitar botão de remoção
 * @property {() => void} onRemove - Manipulador de clique do botão de remoção
 * @property {string | number} badge - Conteúdo de badge opcional
 */
export interface TagProps {
  // Conteúdo
  children: React.ReactNode

  // Aparência
  color?: ColorVariant
  size?: Size
  variant?: TagVariant

  // Comportamento
  onClick?: () => void
  interactive?: boolean
  disabled?: boolean

  // Recursos
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  badge?: string | number

  // Atributos HTML
  className?: string
}

/**
 * Interface de props para o componente container TagGroup
 *
 * @interface TagGroupProps
 * @property {React.ReactNode} children - Componentes de tag para agrupar
 * @property {boolean} compact - Aplicar espaçamento compacto entre tags
 * @property {string} className - Classes CSS adicionais
 */
export interface TagGroupProps {
  // Conteúdo
  children: React.ReactNode

  // Layout
  compact?: boolean

  // Atributos HTML
  className?: string
}

/**
 * Interface de props para o componente StatusTag
 *
 * @interface StatusTagProps
 * @property {TagStatus} status - Tipo de indicador de status
 * @property {React.ReactNode} children - Conteúdo da tag
 * @property {string} className - Classes CSS adicionais
 */
export interface StatusTagProps {
  // Conteúdo
  status: TagStatus
  children: React.ReactNode

  // Atributos HTML
  className?: string
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Constrói classes CSS para o componente Tag
 * @param {Partial<TagProps>} props - Propriedades da tag
 * @returns {string} String de classes CSS
 */
export const buildTagClasses = ({
  color = 'primary',
  size = 'medio',
  variant = 'solid',
  onClick,
  interactive = false,
  disabled = false,
  icon,
  removable = false,
  badge,
  className = ''
}: Partial<TagProps>): string => {
  const mappedSize = SIZE_MAP[size || 'medio']

  const classes = [
    'tag',
    `tag--${mappedSize}`,
    `tag--${variant}-${color}`,
    (onClick || interactive) && !disabled && 'tag--interactive',
    disabled && 'tag--disabled',
    icon && 'tag--with-icon',
    removable && 'tag--removable',
    badge && 'tag--with-badge',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói classes CSS para o componente TagGroup
 * @param {Partial<TagGroupProps>} props - Propriedades do grupo de tags
 * @returns {string} String de classes CSS
 */
export const buildTagGroupClasses = ({
  compact = false,
  className = ''
}: Partial<TagGroupProps>): string => {
  const classes = [
    'tag-group',
    compact && 'tag-group--compact',
    className
  ].filter(Boolean)

  return classes.join(' ')
}

/**
 * Constrói classes CSS para o componente StatusTag
 * @param {Partial<StatusTagProps>} props - Propriedades da tag de status
 * @returns {string} String de classes CSS
 */
export const buildStatusTagClasses = ({
  status,
  className = ''
}: Partial<StatusTagProps>): string => {
  const classes = [`tag--status-${status}`, className].filter(Boolean)

  return classes.join(' ')
}
