// ================================
// CARD COMPONENTS TYPES
// ================================

import { CardProps } from './Card.types'

/**
 * Interface de props para o componente HorizontalCard
 * Estende CardProps excluindo onClick para uso interno
 *
 * @interface HorizontalCardProps
 * @property {boolean} showExternalLink - Se deve mostrar o ícone de link externo
 */
export interface HorizontalCardProps extends Omit<CardProps, 'onClick'> {
  /** Se deve mostrar o link externo */
  showExternalLink?: boolean
}

/**
 * Interface de props para o componente ContactCard
 * Estende CardProps excluindo onClick para uso interno
 *
 * @interface ContactCardProps
 * @property {boolean} showExternalLink - Se deve mostrar o ícone de link externo
 */
export interface ContactCardProps extends Omit<CardProps, 'onClick'> {
  /** Se deve mostrar o link externo */
  showExternalLink?: boolean
}
